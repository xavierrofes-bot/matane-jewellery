// POST /api/stripe-webhook — Stripe → site. Saves paid orders to Supabase and sends the confirmation email.
// Stripe Dashboard → Developers → Webhooks → Add endpoint → https://matanejewellery.com/api/stripe-webhook
// Events: checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded
import Stripe from 'stripe';
import { db } from './lib/db.mjs';
import { confirmationEmail, ownerEmail, send } from './lib/mail.mjs';

export function orderRowsFromSession(s, lineItems) {
  const shipping = s.collected_information?.shipping_details || s.shipping_details || null;
  const order = {
    stripe_session_id: s.id,
    stripe_payment_intent: typeof s.payment_intent === 'string' ? s.payment_intent : s.payment_intent?.id ?? null,
    status: 'paid',
    lang: ['en', 'es', 'ja'].includes(s.metadata?.lang) ? s.metadata.lang : 'en',
    email: s.customer_details?.email ?? null,
    name: s.customer_details?.name ?? null,
    phone: s.customer_details?.phone ?? null,
    shipping_name: shipping?.name ?? null,
    shipping_address: shipping?.address ?? null,
    amount_total: s.amount_total,
    currency: s.currency,
    terms_version: s.metadata?.terms_version ?? null
  };
  const items = lineItems.map(li => {
    const md = li.price?.product?.metadata || {};
    return {
      product_id: md.product || 'unknown', metal: md.metal || 'unknown',
      size: md.size ? Number(md.size) : null, quantity: li.quantity,
      unit_amount: li.price?.unit_amount ?? Math.round(li.amount_total / li.quantity), name: li.description
    };
  });
  return { order, items };
}

export default async (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, req.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return new Response(`Webhook signature error: ${e.message}`, { status: 400 });
  }
  const site = (process.env.URL || 'https://matanejewellery.com').replace(/\/$/, '');

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const s = event.data.object;
      if (s.payment_status !== 'paid') return new Response('waiting for payment', { status: 200 });
      const existing = await db(`orders?select=id&stripe_session_id=eq.${encodeURIComponent(s.id)}`);
      if (existing.length) return new Response('already stored', { status: 200 });   // Stripe retries are safe

      const li = await stripe.checkout.sessions.listLineItems(s.id, { limit: 50, expand: ['data.price.product'] });
      const { order, items } = orderRowsFromSession(s, li.data);
      const [saved] = await db('orders', { method: 'POST', body: order, prefer: 'return=representation' });
      await db('order_items', { method: 'POST', body: items.map(i => ({ ...i, order_id: saved.id })), prefer: 'return=minimal' });

      await send(confirmationEmail(saved, items, site));
      await send(ownerEmail(`New order ${saved.order_number} — ${(saved.amount_total / 100).toFixed(2)} €`,
        [`${saved.name} <${saved.email}>`, ...items.map(i => `${i.quantity} × ${i.name}`), '', `${site}/admin/`]));
    }

    if (event.type === 'charge.refunded') {
      const ch = event.data.object;
      if (ch.refunded && ch.payment_intent) {
        await db(`orders?stripe_payment_intent=eq.${encodeURIComponent(ch.payment_intent)}`,
          { method: 'PATCH', body: { status: 'refunded' }, prefer: 'return=minimal' });
      }
    }
  } catch (e) {
    console.error('webhook', e.message);
    return new Response('storage error', { status: 500 });   // Stripe will retry
  }
  return new Response('ok', { status: 200 });
};

export const config = { path: '/api/stripe-webhook' };
