// POST /api/checkout  { lang, items: [{ id, metal, size, qty }] }  ->  { url }
import Stripe from 'stripe';
import { buildOrder, catalog, STRIPE_LOCALE } from './lib/order.mjs';

const MADE = {
  en: `Made to order: your piece will be ready to ship in ${catalog.leadTimeWeeks} weeks.`,
  es: `Hecho por encargo: tu pieza estará lista para enviar en ${catalog.leadTimeWeeks} semanas.`,
  ja: `受注制作：${catalog.leadTimeWeeks}週間で発送します。`
};
const SHIP = { en: 'Free insured shipping', es: 'Envío asegurado gratuito', ja: '送料無料（保険付き）' };

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return json({ error: 'Checkout is not configured yet.' }, 500);
  const site = (process.env.URL || new URL(req.url).origin).replace(/\/$/, '');

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  if (body.termsAccepted !== true) return json({ error: 'Accept the terms of sale to continue.' }, 400);
  let order;
  try { order = buildOrder(body.items, body.lang, site); }
  catch (e) { return json({ error: e.message }, 400); }

  const stripe = new Stripe(key);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: order.lines,
      locale: STRIPE_LOCALE[order.lang],
      shipping_address_collection: { allowed_countries: catalog.shipping.countries },
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: SHIP[order.lang],
          fixed_amount: { amount: 0, currency: catalog.currency },
          tax_behavior: 'inclusive'
        }
      }],
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      custom_text: { submit: { message: MADE[order.lang] } },
      metadata: { lang: order.lang, items: order.summary, terms_version: catalog.business.termsVersion },
      payment_intent_data: { metadata: { lang: order.lang, items: order.summary } },
      success_url: `${site}/${order.lang}/thank-you/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/${order.lang}/bag/`
    });
    return json({ url: session.url });
  } catch (e) {
    console.error('stripe', e?.message);
    return json({ error: 'Checkout could not start.' }, 502);
  }
};

const json = (d, status = 200) => new Response(JSON.stringify(d), { status, headers: { 'content-type': 'application/json' } });

export const config = { path: '/api/checkout' };
