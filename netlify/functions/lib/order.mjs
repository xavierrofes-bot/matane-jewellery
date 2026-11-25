// Builds Stripe line items from the bag, using ONLY server-side prices from catalog.json.
// The browser sends { id, metal, size, qty }; anything that doesn't match the catalog is rejected.
import catalog from '../../../src/catalog.json' with { type: 'json' };

export const LANGS = ['en', 'es', 'ja'];
export const STRIPE_LOCALE = { en: 'en', es: 'es', ja: 'ja' };

export function sizeLabel(eu, lang) {
  const jp = Math.round(eu - 40);
  return lang === 'ja' ? `${jp}号（EU ${eu}）` : `EU ${eu}`;
}

export function buildOrder(items, lang, siteUrl) {
  if (!LANGS.includes(lang)) lang = 'en';
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) throw new Error('Your bag is empty.');
  const lines = [];
  const compact = [];
  for (const raw of items) {
    const p = catalog.products.find(x => x.id === raw?.id);
    if (!p) throw new Error('Unknown product.');
    const metal = raw.metal;
    if (!catalog.metals[metal] || !(metal in p.prices)) throw new Error('Unknown metal.');
    const qty = Number(raw.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 5) throw new Error('Invalid quantity.');
    let size = null;
    if (p.needsSize) {
      size = Number(raw.size);
      if (!catalog.ringSizes.includes(size)) throw new Error('Choose a valid ring size.');
    }
    const metalLabel = catalog.metals[metal].label[lang];
    const name = [p.name[lang], metalLabel, size ? sizeLabel(size, lang) : null].filter(Boolean).join(' · ');
    const img = `${siteUrl}/img/${p.imgKey}_${catalog.metalFileName[metal]}_${p.views[0]}-1200.webp`;
    lines.push({
      quantity: qty,
      price_data: {
        currency: catalog.currency,
        unit_amount: p.prices[metal],
        tax_behavior: 'inclusive',
        product_data: {
          name,
          images: siteUrl.startsWith('https://') ? [img] : [],
          metadata: { product: p.id, metal, size: size ? String(size) : '' }
        }
      }
    });
    compact.push(`${p.id}:${metal}:${size ?? '-'}:${qty}`);
  }
  return { lang, lines, summary: compact.join('|').slice(0, 490) };
}

export { catalog };
