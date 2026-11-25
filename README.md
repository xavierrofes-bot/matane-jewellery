# Matane Jewellery — webshop

Static multilingual shop (EN / ES / JA) on Netlify, payments through Stripe Checkout, orders and messages in Supabase (Frankfurt, EU). Domain: **matanejewellery.com**. Seller: **Asaka Suzuki (autónoma)**.

```
src/catalog.json        products, metals, PRICES, business details, terms version   ← edit this most
src/i18n.mjs            site text EN / ES / JA
src/legal.mjs           legal notice, terms of sale, privacy, cookies (EN / ES / JA)
src/assets/             CSS, JS, self-hosted fonts
src/viewer/             3D viewer + models + local three.js bundle
src/admin/              owner admin page (/admin): orders, status, tracking, messages
build.mjs               generates dist/ (81 pages)
netlify/functions/      checkout · stripe-webhook · contact · order · admin-update
supabase/schema.sql     database, security rules, GDPR retention and data-request helpers
test/                   npm test
```

## How an order flows

1. The customer ticks “I accept the terms of sale…” in the bag and clicks Checkout.
2. `/api/checkout` rebuilds the order from `catalog.json` prices (the browser never sends a price) and opens Stripe Checkout.
3. Stripe calls `/api/stripe-webhook` → the order is saved as `MAT-1001`, `MAT-1002`… with its items, and the customer gets a confirmation email with a private link to `/{lang}/order/?t=…`.
4. You manage it at **/admin**: *To make → In production → Shipped* (adds tracking and emails the customer) → *Delivered*. Refunds made in Stripe mark the order *Refunded* automatically.

## 1 · Supabase (EU)

1. Create a project in region **Central EU (Frankfurt)**.
2. **SQL Editor** → run `supabase/schema.sql`.
3. Still in SQL Editor, add yourself as admin: `insert into public.admins (email) values ('YOUR@EMAIL');`
4. **Authentication → Users → Invite user** → the same email (the admin page only lets existing users in).
5. **Authentication → URL Configuration** → Site URL `https://matanejewellery.com`, Redirect URLs `https://matanejewellery.com/admin/`.
6. **Database → Extensions** → enable `pg_cron`, then in SQL Editor:
   `select cron.schedule('matane-retention', '15 3 * * *', $$select public.apply_retention()$$);`
7. **Project Settings → API** → copy *Project URL*, *anon public* key and *service_role* key (secret).

## 2 · Stripe (start in test mode)

1. Turn on **Test mode**. **Developers → API keys** → copy the **Secret key** (`sk_test_…`).
2. **Settings → Business → Public details**: business name *Matane Jewellery*, support email, website `https://matanejewellery.com`.
3. **Settings → Payments → Payment methods**: turn on Cards, Apple Pay, Google Pay (and Bizum if offered).
4. **Settings → Customer emails**: turn on **Successful payments** and **Refunds** (Stripe receipts).
5. After the first deploy: **Developers → Webhooks → Add endpoint** → `https://matanejewellery.com/api/stripe-webhook`, events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded` → copy the **Signing secret** (`whsec_…`).
6. Test with card `4242 4242 4242 4242`, any future date, any CVC. Check the order in **/admin** and in Supabase **Table Editor → orders**.
7. Going live: switch off Test mode, complete **Settings → Business** verification, repeat step 1 and step 5 with live keys.

## 3 · Emails (optional, recommended): Resend

Without it customers still get Stripe’s receipt, but not the order link or the shipping email.

1. Create a Resend account, **Domains → Add domain** `matanejewellery.com`, region **EU (Ireland)**, add the DNS records it shows.
2. **API Keys → Create** → copy it.

## 4 · Netlify + domain

1. Push this folder to a Git repo → **Add new site → Import from Git** (build settings come from `netlify.toml`).
2. **Site configuration → Environment variables**:

| Variable | Value | Secret |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` / `sk_live_…` | yes |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | yes |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key | yes |
| `SUPABASE_ANON_KEY` | anon public key | |
| `PUBLIC_SUPABASE_URL` | same as `SUPABASE_URL` (for /admin) | |
| `PUBLIC_SUPABASE_ANON_KEY` | anon public key (for /admin) | |
| `RESEND_API_KEY` | Resend key (optional) | yes |
| `MAIL_FROM` | `Matane Jewellery <orders@matanejewellery.com>` | |
| `OWNER_EMAIL` | where new-order and message alerts go | |

3. **Domain management → Add a domain** → `matanejewellery.com`; use Netlify DNS (change the nameservers at your registrar) or add the A / CNAME records it shows. Add `www` too: `netlify.toml` redirects it to the bare domain. HTTPS is issued automatically.
4. Deploy, then do the Stripe webhook (2.5).

## GDPR / EU consumer checklist

Done in the code:
- [x] No cookies, no analytics, no third-party requests: fonts, 3D library and Supabase client are self-hosted → no cookie banner needed. The bag uses localStorage, strictly necessary and explained on the Cookies page.
- [x] Personal data only in Stripe (payments) and Supabase Frankfurt (orders, messages). Contact form moved off Netlify Forms (US) to Supabase EU.
- [x] Legal notice (LSSI art. 10), terms of sale, 14-day withdrawal + model form, 3-year legal guarantee, privacy policy, cookies page, Japanese 特定商取引法 page.
- [x] Terms acceptance required before checkout; accepted version stored with each order.
- [x] No ODR-platform link (the EU platform closed on 20 July 2025).
- [x] Retention: orders anonymised after 6 years, messages deleted after 12 months (`apply_retention`, nightly with pg_cron).
- [x] Data requests: `select public.export_customer_data('email');` / `select public.erase_customer_data('email');` in the SQL Editor.
- [x] Database locked with row-level security; only signed-in admins can read; secrets only in server functions.
- [x] Security headers (CSP, HSTS, etc.), admin and API excluded from search engines.

You still need to:
- [ ] Fill `business` in `src/catalog.json`: NIF, address, phone. Fill the remaining `[brackets]` (delivery days, chain length, resizing).
- [ ] Have `src/legal.mjs` reviewed by a lawyer/gestoría, especially whether made-to-size rings are excluded from withdrawal.
- [ ] Sign the data processing agreements (DPA) with Stripe, Supabase, Netlify and Resend (each offers one in its dashboard or legal pages).
- [ ] Keep a simple record of processing activities (art. 30 GDPR), a one-page document listing the tables above.
- [ ] VAT: you sell B2C across the EU. Above €10,000 a year of sales to other EU countries, register for the **OSS** and charge the buyer’s country VAT (Stripe Tax can calculate it). Ask your gestoría.
- [ ] Real prices in `catalog.json`, then `"previewBanner": false`.

## Local

```
npm install
npm test
node build.mjs            # → dist/
npx netlify dev           # site + functions at http://localhost:8888 (uses your env vars)
```
