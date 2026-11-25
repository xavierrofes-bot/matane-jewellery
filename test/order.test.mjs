import assert from 'node:assert/strict';
import { buildOrder } from '../netlify/functions/lib/order.mjs';
const site = 'https://example.com';
const o = buildOrder([{ id: 'ring', metal: 'yg', size: 52, qty: 2 }, { id: 'pendant', metal: 'pt', qty: 1 }], 'ja', site);
assert.equal(o.lines.length, 2);
assert.equal(o.lines[0].price_data.unit_amount, 89000);
assert.equal(o.lines[0].quantity, 2);
assert.equal(o.lines[1].price_data.unit_amount, 99000);
assert.match(o.lines[0].price_data.product_data.name, /12号/);
assert.equal(o.summary, 'ring:yg:52:2|pendant:pt:-:1');
// tampering is rejected
assert.throws(() => buildOrder([{ id: 'ring', metal: 'yg', qty: 1 }], 'en', site), /size/);
assert.throws(() => buildOrder([{ id: 'ring', metal: 'gold', size: 52, qty: 1 }], 'en', site), /metal/);
assert.throws(() => buildOrder([{ id: 'ring', metal: 'wg', size: 52, qty: 50 }], 'en', site), /quantity/);
assert.throws(() => buildOrder([{ id: 'x', metal: 'wg', qty: 1 }], 'en', site), /product/);
assert.throws(() => buildOrder([], 'en', site), /empty/);
// client-sent price is ignored
const t = buildOrder([{ id: 'pendant', metal: 'wg', qty: 1, price: 1 }], 'xx', site);
assert.equal(t.lines[0].price_data.unit_amount, 69000); assert.equal(t.lang, 'en');
console.log('order tests passed');
// new collections
const n = buildOrder([{ id: 'awaji-ring', metal: 'pt', size: 55, qty: 1 }, { id: 'shimenawa-earrings', metal: 'yg', qty: 1 }, { id: 'ume-bracelet', metal: 'wg', qty: 2 }], 'es', site);
assert.deepEqual(n.lines.map(l => l.price_data.unit_amount), [125000, 79000, 59000]);
assert.throws(() => buildOrder([{ id: 'awaji-ring', metal: 'pt', qty: 1 }], 'en', site), /size/);
console.log('new collection tests passed');
const f = buildOrder([{ id: 'tama-pendant', metal: 'yg', qty: 1 }], 'ja', site);
assert.equal(f.lines[0].price_data.unit_amount, 42000); assert.match(f.lines[0].price_data.product_data.name, /水引玉/);
console.log('flagship tests passed');
// six metals
const six = buildOrder([{ id: 'tama-pendant', metal: 'ag', qty: 1 }, { id: 'ring', metal: 'yg18', size: 50, qty: 1 }, { id: 'awaji-ring', metal: 'wg18', size: 60, qty: 1 }], 'en', site);
assert.deepEqual(six.lines.map(l => l.price_data.unit_amount), [13000, 120000, 115000]);
assert.match(six.lines[0].price_data.product_data.name, /Sterling silver 925/);
assert.match(six.lines[0].price_data.product_data.images[0], /sterling-silver_cord/);
assert.match(six.lines[2].price_data.product_data.images[0], /14k-white-gold/); // 18K white reuses white-gold photos
console.log('six-metal tests passed');

// ---- backend helpers ----
const { validateContact } = await import('../netlify/functions/contact.mjs');
assert.ok(validateContact({ company: 'x' }).spam);
assert.match(validateContact({ name: 'A', email: 'bad', message: 'hi' }).error, /email/);
assert.equal(validateContact({ name: ' Ana ', email: 'a@b.es', message: ' Hola ', lang: 'es', order: 'MAT-1001' }).row.name, 'Ana');
assert.equal(validateContact({ name: 'A', email: 'a@b.es', message: 'x', lang: 'fr' }).row.lang, 'en');

const { orderRowsFromSession } = await import('../netlify/functions/stripe-webhook.mjs');
const { order: o1, items: it1 } = orderRowsFromSession(
  { id: 'cs_1', payment_intent: 'pi_1', metadata: { lang: 'ja', terms_version: '2026-11-23' }, amount_total: 129000, currency: 'eur',
    customer_details: { email: 'k@x.jp', name: 'K', phone: '+81' }, collected_information: { shipping_details: { name: 'K', address: { city: 'Tokyo' } } } },
  [{ quantity: 1, description: 'Ring', amount_total: 129000, price: { unit_amount: 129000, product: { metadata: { product: 'ring', metal: 'pt', size: '52' } } } }]);
assert.equal(o1.lang, 'ja'); assert.equal(o1.terms_version, '2026-11-23'); assert.equal(o1.shipping_address.city, 'Tokyo');
assert.deepEqual(it1[0], { product_id: 'ring', metal: 'pt', size: 52, quantity: 1, unit_amount: 129000, name: 'Ring' });

process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
const checkout = (await import('../netlify/functions/checkout.mjs')).default;
const r = await checkout(new Request('http://x/api/checkout', { method: 'POST', body: JSON.stringify({ lang: 'en', items: [{ id: 'ring', metal: 'wg', size: 52, qty: 1 }] }) }));
assert.equal(r.status, 400); assert.match((await r.json()).error, /terms/);

const orderFn = (await import('../netlify/functions/order.mjs')).default;
assert.equal((await orderFn(new Request('http://x/api/order?t=not-a-token'))).status, 404);
const adminFn = (await import('../netlify/functions/admin-update.mjs')).default;
assert.equal((await adminFn(new Request('http://x/api/admin/update', { method: 'POST', body: '{}' }))).status, 403);
const mail = await import('../netlify/functions/lib/mail.mjs');
const em = mail.confirmationEmail({ lang: 'es', order_number: 'MAT-1001', public_token: 'abc', amount_total: 89000, email: 'a@b.es' }, [{ quantity: 1, name: 'Anillo', unit_amount: 89000 }], 'https://matanejewellery.com');
assert.match(em.subject, /MAT-1001/); assert.match(em.html, /order\/\?t=abc/); assert.match(em.html, /890/);
console.log('backend tests passed');
