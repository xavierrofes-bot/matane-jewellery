// Minimal Supabase REST client for server functions (service-role key; never sent to the browser).
const url = () => process.env.SUPABASE_URL?.replace(/\/$/, '');
const key = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function db(path, { method = 'GET', body, prefer } = {}) {
  if (!url() || !key()) throw new Error('Supabase is not configured');
  const r = await fetch(`${url()}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key(), Authorization: `Bearer ${key()}`, 'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`supabase ${r.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

// Verify a signed-in admin from the browser's Supabase access token.
export async function adminFromToken(token) {
  if (!token) return null;
  const r = await fetch(`${url()}/auth/v1/user`, { headers: { apikey: process.env.SUPABASE_ANON_KEY || key(), Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const user = await r.json();
  if (!user?.email) return null;
  const rows = await db(`admins?select=email&email=ilike.${encodeURIComponent(user.email)}`);
  return rows.length ? user : null;
}

export const json = (d, status = 200) => new Response(JSON.stringify(d), {
  status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
});
