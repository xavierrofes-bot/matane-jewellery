// GET /api/order?t=<public token> — what the customer's private order page shows. No personal data beyond the order itself.
import { db, json } from './lib/db.mjs';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async (req) => {
  const t = new URL(req.url).searchParams.get('t') || '';
  if (!UUID.test(t)) return json({ error: 'Not found' }, 404);
  try {
    const rows = await db(`orders?select=order_number,status,created_at,amount_total,currency,tracking_carrier,tracking_number,shipped_at,order_items(name,quantity)&public_token=eq.${t}`);
    if (!rows.length) return json({ error: 'Not found' }, 404);
    const { order_items, ...o } = rows[0];
    return json({ ...o, items: order_items });
  } catch (e) {
    console.error('order', e.message);
    return json({ error: 'Unavailable' }, 500);
  }
};

export const config = { path: '/api/order' };
