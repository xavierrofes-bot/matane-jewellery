// POST /api/admin/update — signed-in admins change an order's status / tracking. Sends the "shipped" email.
import { db, json, adminFromToken } from './lib/db.mjs';
import { shippedEmail, send } from './lib/mail.mjs';

const STATUSES = ['paid', 'in_production', 'shipped', 'delivered', 'refunded', 'cancelled'];

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const admin = await adminFromToken(token).catch(() => null);
  if (!admin) return json({ error: 'Not allowed' }, 403);

  let b; try { b = await req.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  if (!/^[0-9a-f-]{36}$/i.test(b.id || '')) return json({ error: 'Invalid order.' }, 400);
  const patch = {};
  if (b.status !== undefined) { if (!STATUSES.includes(b.status)) return json({ error: 'Invalid status.' }, 400); patch.status = b.status; }
  if (b.tracking_carrier !== undefined) patch.tracking_carrier = String(b.tracking_carrier).slice(0, 60) || null;
  if (b.tracking_number !== undefined) patch.tracking_number = String(b.tracking_number).slice(0, 80) || null;
  if (b.notes !== undefined) patch.notes = String(b.notes).slice(0, 2000) || null;

  try {
    const [before] = await db(`orders?select=status&id=eq.${b.id}`);
    if (!before) return json({ error: 'Not found' }, 404);
    if (patch.status === 'shipped' && before.status !== 'shipped') patch.shipped_at = new Date().toISOString();
    const [order] = await db(`orders?id=eq.${b.id}`, { method: 'PATCH', body: patch, prefer: 'return=representation' });
    if (patch.status === 'shipped' && before.status !== 'shipped') {
      const site = (process.env.URL || 'https://matanejewellery.com').replace(/\/$/, '');
      await send(shippedEmail(order, site));
    }
    return json({ ok: true, order });
  } catch (e) {
    console.error('admin-update', e.message);
    return json({ error: 'Update failed.' }, 500);
  }
};

export const config = { path: '/api/admin/update' };
