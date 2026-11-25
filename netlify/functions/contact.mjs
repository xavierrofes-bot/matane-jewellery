// POST /api/contact — contact form → Supabase (EU). Optional email notification to the owner.
import { db, json } from './lib/db.mjs';
import { ownerEmail, send } from './lib/mail.mjs';

export function validateContact(b) {
  if (!b || typeof b !== 'object') return { error: 'Invalid request.' };
  if (b.company) return { spam: true };                                   // honeypot field, hidden from people
  const name = String(b.name || '').trim().slice(0, 120);
  const email = String(b.email || '').trim().slice(0, 200);
  const message = String(b.message || '').trim();
  const order_number = String(b.order || '').trim().slice(0, 40) || null;
  const lang = ['en', 'es', 'ja'].includes(b.lang) ? b.lang : 'en';
  if (!name || !message) return { error: 'Name and message are required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (message.length > 5000) return { error: 'Message is too long.' };
  return { row: { name, email, message, order_number, lang } };
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body; try { body = await req.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  const v = validateContact(body);
  if (v.spam) return json({ ok: true });
  if (v.error) return json({ error: v.error }, 400);
  try {
    await db('contact_messages', { method: 'POST', body: v.row, prefer: 'return=minimal' });
    await send(ownerEmail(`New message from ${v.row.name}`, [`${v.row.name} <${v.row.email}>`, v.row.order_number ? `Order: ${v.row.order_number}` : '', '', v.row.message]));
    return json({ ok: true });
  } catch (e) {
    console.error('contact', e.message);
    return json({ error: 'Could not send the message.' }, 500);
  }
};

export const config = { path: '/api/contact' };
