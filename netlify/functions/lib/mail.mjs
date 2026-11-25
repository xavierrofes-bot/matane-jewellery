// Transactional emails through Resend (EU sending region recommended). Optional:
// without RESEND_API_KEY nothing is sent and customers still get Stripe's receipt.
import catalog from '../../../src/catalog.json' with { type: 'json' };

const B = catalog.business;
const money = (lang, c) => new Intl.NumberFormat({ en: 'en-IE', es: 'es-ES', ja: 'ja-JP' }[lang] || 'en-IE',
  { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(c / 100);
const esc = s => String(s ?? '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

const T = {
  en: {
    confirmSubject: n => `Your Matane order ${n}`,
    confirmIntro: 'Thank you for your order. We start making your piece now and will email you again when it ships.',
    shippedSubject: n => `Your Matane order ${n} is on its way`,
    shippedIntro: 'Your piece has left our workshop.',
    tracking: 'Tracking', follow: 'Follow your order', total: 'Total (VAT included)', lead: w => `Made to order: ready to ship in ${w} weeks.`,
    footer: 'You can withdraw within 14 days of delivery. Terms and privacy:'
  },
  es: {
    confirmSubject: n => `Tu pedido Matane ${n}`,
    confirmIntro: 'Gracias por tu pedido. Empezamos a hacer tu pieza y te escribiremos de nuevo cuando la enviemos.',
    shippedSubject: n => `Tu pedido Matane ${n} está en camino`,
    shippedIntro: 'Tu pieza ha salido de nuestro taller.',
    tracking: 'Seguimiento', follow: 'Ver tu pedido', total: 'Total (IVA incluido)', lead: w => `Hecho por encargo: listo para enviar en ${w} semanas.`,
    footer: 'Puedes desistir en los 14 días siguientes a la entrega. Condiciones y privacidad:'
  },
  ja: {
    confirmSubject: n => `Matane ご注文確認 ${n}`,
    confirmIntro: 'ご注文ありがとうございます。これより制作に入り、発送時に改めてご連絡します。',
    shippedSubject: n => `Matane ご注文 ${n} を発送しました`,
    shippedIntro: '工房から商品を発送しました。',
    tracking: '追跡番号', follow: 'ご注文状況を見る', total: '合計（税込）', lead: w => `受注制作：${w}週間で発送します。`,
    footer: 'お届けから14日以内であれば撤回できます。販売条件・プライバシー：'
  }
};

function layout(lang, title, inner, site) {
  const t = T[lang] || T.en;
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#fff;font-family:Helvetica,Arial,sans-serif;color:#262422">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="font-family:Georgia,serif;font-size:22px;margin:0 0 28px">Matane <span style="font-size:12px;color:#8c8780;letter-spacing:.1em">Jewellery</span></p>
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;margin:0 0 16px">${esc(title)}</h1>
${inner}
<p style="font-size:12px;color:#8c8780;margin-top:40px;border-top:1px solid #e4e2dd;padding-top:16px">${esc(t.footer)}
<a href="${site}/${lang}/terms/" style="color:#8c8780">${site.replace(/^https?:\/\//, '')}/${lang}/terms</a><br>
${esc(B.name)} · ${esc(B.tradeName)} · NIF ${esc(B.taxId)} · ${esc(B.address)}</p></div></body></html>`;
}

export function confirmationEmail(order, items, site) {
  const lang = order.lang, t = T[lang] || T.en;
  const rows = items.map(i => `<tr><td style="padding:8px 0;border-bottom:1px solid #e4e2dd">${i.quantity} × ${esc(i.name)}</td>
    <td style="padding:8px 0;border-bottom:1px solid #e4e2dd;text-align:right">${money(lang, i.unit_amount * i.quantity)}</td></tr>`).join('');
  const link = `${site}/${lang}/order/?t=${order.public_token}`;
  const html = layout(lang, t.confirmSubject(order.order_number), `
<p style="font-size:15px;line-height:1.6">${esc(t.confirmIntro)}</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:20px 0">${rows}
<tr><td style="padding:10px 0;font-weight:bold">${esc(t.total)}</td><td style="padding:10px 0;text-align:right;font-weight:bold">${money(lang, order.amount_total)}</td></tr></table>
<p style="font-size:14px;color:#4a4642">${esc(t.lead(catalog.leadTimeWeeks))}</p>
<p><a href="${link}" style="display:inline-block;background:#262422;color:#fff;text-decoration:none;padding:12px 22px;font-size:14px">${esc(t.follow)}</a></p>`, site);
  return { to: order.email, subject: t.confirmSubject(order.order_number), html };
}

export function shippedEmail(order, site) {
  const lang = order.lang, t = T[lang] || T.en;
  const link = `${site}/${lang}/order/?t=${order.public_token}`;
  const track = order.tracking_number ? `<p style="font-size:15px">${esc(t.tracking)}: <b>${esc([order.tracking_carrier, order.tracking_number].filter(Boolean).join(' '))}</b></p>` : '';
  const html = layout(lang, t.shippedSubject(order.order_number), `
<p style="font-size:15px;line-height:1.6">${esc(t.shippedIntro)}</p>${track}
<p><a href="${link}" style="display:inline-block;background:#262422;color:#fff;text-decoration:none;padding:12px 22px;font-size:14px">${esc(t.follow)}</a></p>`, site);
  return { to: order.email, subject: t.shippedSubject(order.order_number), html };
}

export function ownerEmail(subject, lines) {
  return { to: process.env.OWNER_EMAIL || B.email, subject, html: `<pre style="font:14px/1.5 monospace">${esc(lines.join('\n'))}</pre>` };
}

export async function send(mail) {
  if (!process.env.RESEND_API_KEY || !mail?.to) return { skipped: true };
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM || `Matane Jewellery <orders@${B.domain}>`, reply_to: B.email, ...mail })
  });
  if (!r.ok) console.error('resend', r.status, await r.text());
  return { ok: r.ok };
}
