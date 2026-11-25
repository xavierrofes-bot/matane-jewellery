-- Matane Jewellery — database schema (Supabase, EU / Frankfurt).
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Personal data lives only here and in Stripe. Retention: orders 6 years (Código de Comercio art. 30), messages 12 months.

create extension if not exists pgcrypto;

-- ---------- orders ----------
create sequence if not exists public.order_seq start 1001;

create table if not exists public.orders (
  id                    uuid primary key default gen_random_uuid(),
  order_number          text not null unique default ('MAT-' || nextval('public.order_seq')),
  public_token          uuid not null unique default gen_random_uuid(),   -- private link for the customer's order page
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  stripe_session_id     text not null unique,
  stripe_payment_intent text,
  status                text not null default 'paid'
                        check (status in ('paid', 'in_production', 'shipped', 'delivered', 'refunded', 'cancelled')),
  lang                  text not null default 'en' check (lang in ('en', 'es', 'ja')),
  email                 text,
  name                  text,
  phone                 text,
  shipping_name         text,
  shipping_address      jsonb,
  amount_total          integer not null,        -- euro cents, VAT included
  currency              text not null default 'eur',
  terms_version         text,                    -- version of the terms the customer accepted
  tracking_carrier      text,
  tracking_number       text,
  shipped_at            timestamptz,
  notes                 text,                    -- internal only
  anonymized_at         timestamptz
);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_email_idx      on public.orders (lower(email));

create table if not exists public.order_items (
  id          bigint generated always as identity primary key,
  order_id    uuid not null references public.orders (id) on delete cascade,
  product_id  text not null,
  metal       text not null,
  size        integer,
  quantity    integer not null check (quantity between 1 and 5),
  unit_amount integer not null,
  name        text not null
);
create index if not exists order_items_order_idx on public.order_items (order_id);

-- ---------- contact messages (replaces Netlify Forms, so messages stay in the EU) ----------
create table if not exists public.contact_messages (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  lang         text,
  name         text not null,
  email        text not null,
  order_number text,
  message      text not null check (char_length(message) <= 5000),
  handled      boolean not null default false
);

-- ---------- who can use /admin ----------
create table if not exists public.admins (
  email text primary key
);
-- insert into public.admins (email) values ('hello@matanejewellery.com');   -- ← the owner's login email

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins a where lower(a.email) = lower(auth.jwt() ->> 'email'));
$$;

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders for each row execute function public.touch_updated_at();

-- ---------- row-level security ----------
-- The website's server functions use the service-role key and bypass RLS.
-- In the browser, only signed-in admins can read; nobody else can read or write anything.
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admins           enable row level security;

drop policy if exists admin_read_orders   on public.orders;
drop policy if exists admin_read_items    on public.order_items;
drop policy if exists admin_read_messages on public.contact_messages;
drop policy if exists admin_mark_messages on public.contact_messages;
create policy admin_read_orders   on public.orders           for select to authenticated using (public.is_admin());
create policy admin_read_items    on public.order_items      for select to authenticated using (public.is_admin());
create policy admin_read_messages on public.contact_messages for select to authenticated using (public.is_admin());
create policy admin_mark_messages on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- GDPR: retention ----------
-- Anonymise orders after 6 years and delete messages after 12 months.
create or replace function public.apply_retention() returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.orders
     set email = null, name = null, phone = null, shipping_name = null, shipping_address = null,
         notes = null, anonymized_at = now()
   where created_at < now() - interval '6 years' and anonymized_at is null;
  delete from public.contact_messages where created_at < now() - interval '12 months';
end $$;
-- Run it every night (Supabase → Database → Extensions → enable pg_cron, then):
-- select cron.schedule('matane-retention', '15 3 * * *', $$select public.apply_retention()$$);

-- ---------- GDPR: data-subject requests (run from the SQL Editor) ----------
-- Access / portability: everything we hold for one email, as JSON.
create or replace function public.export_customer_data(p_email text) returns jsonb
language sql security definer set search_path = public as $$
  select jsonb_build_object(
    'orders',   coalesce((select jsonb_agg(to_jsonb(o) - 'public_token' || jsonb_build_object('items',
                  (select jsonb_agg(to_jsonb(i) - 'order_id') from public.order_items i where i.order_id = o.id)))
                  from public.orders o where lower(o.email) = lower(p_email)), '[]'::jsonb),
    'messages', coalesce((select jsonb_agg(to_jsonb(m)) from public.contact_messages m where lower(m.email) = lower(p_email)), '[]'::jsonb)
  );
$$;
-- Erasure: deletes messages now. For finished orders (delivered, refunded or cancelled) removes phone and delivery
-- details; name, email, items and amounts stay until the 6-year accounting period ends (legal obligation, art. 17.3.b GDPR).
-- Open orders are kept intact until they are finished, because they are still needed to deliver the piece.
create or replace function public.erase_customer_data(p_email text) returns void
language plpgsql security definer set search_path = public as $$
begin
  delete from public.contact_messages where lower(email) = lower(p_email);
  update public.orders
     set phone = null, shipping_name = null, shipping_address = null, notes = null
   where lower(email) = lower(p_email) and status in ('delivered', 'refunded', 'cancelled');
end $$;

revoke all on function public.export_customer_data(text) from public, anon, authenticated;
revoke all on function public.erase_customer_data(text)  from public, anon, authenticated;
revoke all on function public.apply_retention()          from public, anon, authenticated;
