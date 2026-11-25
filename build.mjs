// Static site generator for Matane Jewellery. Run: node build.mjs
// PREVIEW=1 node build.mjs  -> links point at index.html files and the 3D viewer uses .json models
// SITE_URL=https://example.com node build.mjs  -> canonical / hreflang URLs (Netlify sets URL automatically)
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { LANGS, T } from './src/i18n.mjs';
import { legal as LEGAL } from './src/legal.mjs';

const PREVIEW = process.env.PREVIEW === '1';
const SITE = (process.env.SITE_URL || process.env.URL || 'https://matanejewellery.com').replace(/\/$/, '');
const C = JSON.parse(readFileSync('src/catalog.json', 'utf8'));
const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('src/img', join(OUT, 'img'), { recursive: true });
mkdirSync(join(OUT, 'viewer'), { recursive: true });
let viewer = readFileSync('src/viewer/index.html', 'utf8');
if (PREVIEW) viewer = viewer.replace(/file: '([a-z-]+)\.glb'/g, "file: '$1.json'");
writeFileSync(join(OUT, 'viewer/index.html'), viewer);
cpSync('src/viewer/three-bundle.js', join(OUT, 'viewer', 'three-bundle.js'));
// owner admin (orders + messages). Public Supabase URL + anon key are safe in the browser; RLS protects the data.
mkdirSync(join(OUT, 'admin'), { recursive: true });
cpSync('src/admin/supabase.js', join(OUT, 'admin', 'supabase.js'));
writeFileSync(join(OUT, 'admin', 'index.html'), readFileSync('src/admin/index.html', 'utf8').replace('<script type="module">',
  `<script>window.MATANE_ADMIN=${JSON.stringify({ url: process.env.PUBLIC_SUPABASE_URL || '', anonKey: process.env.PUBLIC_SUPABASE_ANON_KEY || '' })};</script>\n<script type="module">`));
for (const m of [...new Set(C.products.map(p => p.viewer))]) {
  if (PREVIEW) writeFileSync(join(OUT, 'viewer', `${m}.json`), JSON.stringify({ glb: readFileSync(`src/viewer/${m}.glb`).toString('base64') }));
  else cpSync(`src/viewer/${m}.glb`, join(OUT, 'viewer', `${m}.glb`));
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sub = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');
const lead = C.leadTimeWeeks;
const money = (lang, cents) => new Intl.NumberFormat(T[lang].locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(cents / 100);
const fromPrice = (lang, p) => {
  const min = Math.min(...Object.values(p.prices));
  return lang === 'ja' ? `${money(lang, min)}〜` : `${T[lang].home.from} ${money(lang, min)}`;
};
const imgName = (p, metal, view, w) => `${p.imgKey}_${C.metalFileName[metal]}_${view}-${w}.webp`;

// paths are relative to the language root, '' = home
const PAGES = ['', 'shop/', 'story/', 'about/', 'metals/', 'size-guide/', 'shipping-returns/', 'contact/', 'legal/', 'terms/', 'privacy/', 'cookies/', 'bag/', 'thank-you/', 'order/',
  ...C.collections.map(k => `${k.id}/`), ...C.products.map(p => `${p.collection}/${p.slug}/`)];

function ctx(lang, path) {
  const depth = 1 + path.split('/').filter(Boolean).length;
  const up = '../'.repeat(depth);
  const link = (l, p) => up + l + '/' + p + (PREVIEW ? 'index.html' : '');
  return { lang, t: T[lang], path, up, link: p => link(lang, p), linkLang: l => link(l, path) };
}

function head(c, title, desc, extra = '') {
  const alts = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/${c.path}">`).join('\n');
  return `<!DOCTYPE html>
<html lang="${c.t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/${c.lang}/${c.path}">
${alts}
<link rel="alternate" hreflang="x-default" href="${SITE}/en/${c.path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/img/mizuhiki-tama-pendant_14k-yellow-gold_cord-1200.webp">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='9' fill='none' stroke='%23b5232f' stroke-width='2.5'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${c.up}assets/fonts.css">
<link rel="stylesheet" href="${c.up}assets/site.css">
${extra}
</head>`;
}

function header(c, current) {
  const n = c.t.nav;
  const cur = k => (k === current ? ' aria-current="page"' : '');
  return `<body>
<a class="skip" href="#main">${c.t.skip}</a>
${C.previewBanner ? `<div class="preview">${c.t.previewBanner}</div>` : ''}
<header class="site-head"><div class="wrap">
  <a class="logo" href="${c.link('')}">Matane<span>Jewellery</span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav class="site-nav" id="nav" aria-label="Main">
    <a href="${c.link('shop/')}"${cur('collection')}>${n.collection}</a>
    <a href="${c.link('story/')}"${cur('story')}>${n.story}</a>
    <a href="${c.link('about/')}"${cur('about')}>${n.about}</a>
    <a href="${c.link('size-guide/')}"${cur('size')}>${n.size}</a>
    <a class="bag-link" href="${c.link('bag/')}"${cur('bag')}>${n.bag} <span class="bag-count" data-n="0">0</span></a>
    <span class="langs">${LANGS.map(l => `<a href="${c.linkLang(l)}" hreflang="${l}" lang="${l}"${l === c.lang ? ' aria-current="true"' : ''}>${l === 'ja' ? '日本語' : l.toUpperCase()}</a>`).join('')}</span>
  </nav>
</div></header>
<main id="main">`;
}

function footer(c, extraT = {}) {
  const f = c.t.footer;
  const data = {
    lang: c.lang, locale: c.t.locale, lead, preview: PREVIEW,
    t: { ...c.t.product, ...c.t.bag, sent: c.t.contact.sent, mustAccept: c.t.legalMeta.mustAccept },
    products: C.products.map(p => ({ worn: p.worn, id: p.id, imgKey: p.imgKey, views: p.views, needsSize: p.needsSize, viewer: p.viewer, prices: p.prices, name: p.name[c.lang] })),
    metals: Object.fromEntries(Object.entries(C.metals).map(([k, v]) => [k, v.label[c.lang]])),
    metalFile: C.metalFileName,
    img: c.up + 'img/', viewer: c.up + 'viewer/' + (PREVIEW ? 'index.html' : ''), bagUrl: c.link('bag/'), ...extraT
  };
  return `</main>
<footer class="site-foot"><div class="wrap">
  <div><div class="foot-brand">Matane Jewellery</div><div>${f.designed}</div></div>
  <nav aria-label="Footer">
    <a href="${c.link('about/')}">${c.t.nav.about}</a>
    <a href="${c.link('metals/')}">${c.t.metals.link}</a>
    <a href="${c.link('shipping-returns/')}">${f.shipping}</a>
    <a href="${c.link('size-guide/')}">${c.t.nav.size}</a>
    <a href="${c.link('contact/')}">${f.contact}</a>
    <a href="${c.link('terms/')}">${c.t.legalMeta.terms}</a>
    <a href="${c.link('privacy/')}">${c.t.legalMeta.privacy}</a>
    <a href="${c.link('cookies/')}">${c.t.legalMeta.cookies}</a>
    <a href="${c.link('legal/')}">${c.t.legalMeta.legal}</a>
  </nav>
  <div>© ${new Date().getFullYear()} Matane Jewellery. ${f.rights}</div>
</div></footer>
<div class="toast" role="status" aria-live="polite"></div>
<script>window.MATANE=${JSON.stringify(data)};</script>
<script src="${c.up}assets/site.js" defer></script>
</body>
</html>`;
}

const img = (c, p, metal, view, alt, attrs = '') =>
  `<img src="${c.up}img/${imgName(p, metal, view, 1200)}" srcset="${c.up}img/${imgName(p, metal, view, 600)} 600w, ${c.up}img/${imgName(p, metal, view, 1200)} 1200w" sizes="(max-width: 700px) 100vw, 50vw" width="1200" height="1200" alt="${esc(alt)}" ${attrs}>`;

const P = id => C.products.find(p => p.id === id);
const altOf = (c, p, metal, view) => sub(c.t.product.alt, { name: p.name[c.lang], metal: C.metals[metal].label[c.lang], view: c.t.product.viewsName[view] });

const ALT_PIC = { hero: 'top', front: 'flat', flat: 'top', top: 'flat', cord: 'macro' };
function tiles(c, products) {
  return `<div class="tiles">${products.map(p => {
    const v1 = p.views[0], v2 = p.views.includes(ALT_PIC[v1]) ? ALT_PIC[v1] : p.views[1] || v1;
    return `<a class="tile" href="${c.link(`${p.collection}/${p.slug}/`)}">
      <figure>${img(c, p, 'wg', v1, altOf(c, p, 'wg', v1), 'loading="lazy"')}${img(c, p, 'yg', v2, '', 'class="alt-img" loading="lazy" aria-hidden="true"')}</figure>
      <div class="tile-meta"><h3>${p.name[c.lang]}</h3><span class="price">${fromPrice(c.lang, p)}</span></div>
      <div class="dots" aria-label="${c.t.collection.metals}">${Object.values(C.metals).map(m => `<span class="dot" style="background:${m.swatch}"></span>`).join('')}</div>
    </a>`;
  }).join('')}</div>`;
}
const inColl = id => C.products.filter(p => p.collection === id);
const coverImg = (c, k) => { const [key, m, v] = k.cover; const p = C.products.find(x => x.imgKey === key); return img(c, p, m, v, altOf(c, p, m, v), 'loading="lazy"'); };
function collectionsGrid(c) {
  return `<div class="colls">${C.collections.map(k => `<a class="coll" href="${c.link(`${k.id}/`)}">
    <figure>${coverImg(c, k)}</figure>
    <div class="coll-meta"><h3>${k.name[c.lang]}${c.lang === 'ja' ? '' : ` <span lang="ja">${k.kanji}</span>`}</h3>
    <p>${k.lede[c.lang]}</p><span class="coll-count">${inColl(k.id).length === 1 ? c.t.collection.countOne : sub(c.t.collection.count, { n: inColl(k.id).length })}</span></div></a>`).join('')}</div>`;
}

// ---------------- pages ----------------
const render = {
  '': c => {
    const h = c.t.home, ring = P('ring'), tama = C.products.find(p => p.flagship), tamaUrl = c.link(`${tama.collection}/${tama.slug}/`);
    const heroAlt = altOf(c, tama, 'yg18', 'cord');
    return head(c, h.title, h.desc, `<link rel="preload" as="image" href="${c.up}img/hero-tama-1000.webp" imagesrcset="${c.up}img/hero-tama-560.webp 560w, ${c.up}img/hero-tama-1000.webp 1000w, ${c.up}img/hero-tama-1500.webp 1500w" imagesizes="(max-width: 860px) 90vw, 46vw">`) + header(c, 'home') + `
<section class="hero hero-tama">
  <div class="wrap">
    <div class="hero-copy">
      <h1>${h.h1}</h1>
      <p class="lede">${h.lede}</p>
      <div class="cta-row"><a class="btn" href="${tamaUrl}">${h.flagCta}</a><a class="btn ghost" href="${c.link('shop/')}">${h.allCta}</a></div>
    </div>
    <div class="hero-art"><img src="${c.up}img/hero-tama-1000.webp" srcset="${c.up}img/hero-tama-560.webp 560w, ${c.up}img/hero-tama-1000.webp 1000w, ${c.up}img/hero-tama-1500.webp 1500w" sizes="(max-width: 860px) 90vw, 46vw" width="1000" height="1053" alt="${esc(heroAlt)}" fetchpriority="high"></div>
  </div>
  <div class="tategaki" lang="ja" aria-hidden="true">${h.vertical}</div>
</section>
<section class="flagship"><div class="wrap">
  <a class="flag-banner" href="${tamaUrl}" tabindex="-1" aria-hidden="true"><img src="${c.up}img/mizuhiki-tama-set_mixed_trio-1600.webp" srcset="${c.up}img/mizuhiki-tama-set_mixed_trio-800.webp 800w, ${c.up}img/mizuhiki-tama-set_mixed_trio-1600.webp 1600w" sizes="(max-width: 1240px) 100vw, 1240px" width="1600" height="900" alt="" loading="lazy"></a>
  <div class="flag-copy">
    <h2><a href="${tamaUrl}">${tama.name[c.lang]}</a></h2>
    <div><p>${h.flagP}</p>
    <p class="flag-meta"><span class="price">${fromPrice(c.lang, tama)}</span><span class="dots">${Object.values(C.metals).map(m => `<span class="dot" style="background:${m.swatch}"></span>`).join('')}</span></p>
    <a class="btn ghost" href="${tamaUrl}">${h.flagCta}</a></div>
  </div>
</div></section>
<section class="worn-strip"><div class="wrap">
  <div class="section-head"><h2>${c.t.home.wornH}</h2><p>${c.t.home.wornP}</p></div>
  <div class="worn-grid">${[['mizuhiki-tama','pendant','worn_mizuhiki-tama-pendant_18k-yellow-gold_close'],['ume-musubi','ring','worn_ume-musubi-ring_18k-yellow-gold_display'],['shimenawa','earrings','worn_shimenawa-earrings_18k-yellow-gold_display']].map(([col, slug, f]) => { const pr = C.products.find(x => x.collection === col && x.slug === slug); return `<a href="${c.link(`${col}/${slug}/`)}"><img src="${c.up}img/${f}-600.webp" srcset="${c.up}img/${f}-600.webp 600w, ${c.up}img/${f}-1200.webp 1200w" sizes="(max-width: 760px) 100vw, 33vw" width="600" height="750" alt="${esc(c.t.product.wornAlt.replace('{name}', pr.name[c.lang]))}" loading="lazy"><span>${pr.name[c.lang]}</span></a>`; }).join('')}</div>
</div></section>
<section class="section mist metals-strip"><div class="wrap">
  <div class="section-head"><h2>${c.t.metals.homeH}</h2><p>${c.t.metals.homeP}</p></div>
  <ul class="metal-row">${Object.entries(C.metals).map(([k, m]) => `<li><a href="${c.link('metals/')}#${k}">
    <img src="${c.up}img/mizuhiki-tama-pendant_${C.metalFileName[k]}_macro-600.webp" width="600" height="600" alt="${esc(altOf(c, tama, k, 'macro'))}" loading="lazy">
    <span class="mr-short">${m.short}</span><span class="mr-name">${m.label[c.lang]}</span><span class="mr-price">${(c.lang === 'ja' ? '' : c.t.home.from + ' ') + money(c.lang, Math.min(...C.products.map(p => p.prices[k])))}${c.lang === 'ja' ? '〜' : ''}</span></a></li>`).join('')}</ul>
  <p class="metals-more"><a href="${c.link('metals/')}">${c.t.metals.homeLink}</a></p>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2>${h.collH}</h2><p>${h.collP}</p></div>
  ${collectionsGrid(c)}
</div></section>
<section class="section mist"><div class="wrap story-teaser">
  ${img(c, ring, 'yg', 'top', altOf(c, ring, 'yg', 'top'), 'loading="lazy"')}
  <div><h2>${h.storyH}</h2><p>${h.storyP}</p><a href="${c.link('story/')}">${h.storyLink}</a></div>
</div></section>
<section class="section"><div class="wrap">
  <div class="facts">${h.facts.map(([a, b]) => `<div><h3>${a}</h3><p>${sub(b, { lead })}</p></div>`).join('')}</div>
</div></section>` + footer(c);
  },

  'shop/': c => {
    const k = c.t.collection;
    return head(c, k.title, k.desc) + header(c, 'collection') + `
<div class="wrap"><div class="page-head"><h1>${k.h1}</h1><p class="lede">${k.lede}</p></div>
${C.collections.map(col => `<section class="shop-coll" id="${col.id}">
  <div class="section-head"><h2><a href="${c.link(`${col.id}/`)}">${col.name[c.lang]}</a></h2><p>${col.lede[c.lang]}</p></div>
  ${tiles(c, inColl(col.id))}</section>`).join('')}
<div style="height:64px"></div></div>` + footer(c);
  },

  'story/': c => {
    const s = c.t.story, pend = P('pendant');
    return head(c, s.title, s.desc) + header(c, 'story') + `
<div class="wrap">
  <div class="page-head story-hero"><h1>${s.h1}</h1>${img(c, pend, 'wg', 'flat', altOf(c, pend, 'wg', 'flat'))}</div>
  <div class="prose">${s.sections.map(([a, b]) => `<section><h2>${a}</h2><p>${b}</p></section>`).join('')}
    <div class="cta-row"><a class="btn" href="${c.link('shop/')}">${s.cta}</a></div></div>
</div>` + footer(c);
  },

  'about/': c => {
    const a = c.t.about, ja = c.lang === 'ja';
    return head(c, a.title, a.desc) + header(c, 'about') + `
<article class="about">
  <div class="wrap">
    <header class="page-head"><h1>${a.h1}</h1></header>
    <section class="about-name">
      <p class="about-lead">${a.name}</p>
      <p class="about-line" lang="ja">${a.line.replace("、", "、<wbr>")}</p>
      <p class="about-lead${ja ? '' : ' about-trans'}">${a.lineT}</p>
    </section>
  </div>
  <section class="about-cities" aria-label="${esc(a.cityA)} – ${esc(a.cityB)}">
    <div class="wrap">
      <div class="cities">
        <span class="city">${a.cityA}</span>
        <svg class="cities-cord" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M4 92 C 120 92, 160 20, 300 20 S 480 92, 596 92"/>
          <circle class="sun" cx="300" cy="20" r="0"/>
        </svg>
        <span class="city">${a.cityB}</span>
      </div>
      <div class="about-story">
        <p class="about-two">${a.two}</p>
        ${a.story.map((p, i) => `<p${i === 2 ? ' class="about-pull"' : ''}>${p}</p>`).join('')}
      </div>
    </div>
  </section>
  <section class="about-nature"><div class="wrap">
    <div>
      <h2>${a.natureH}</h2>
      ${a.nature.map(p => `<p>${p}</p>`).join('')}
    </div>
    ${(t => img(c, t, 'yg', 'macro', altOf(c, t, 'yg', 'macro'), 'loading="lazy"'))(C.products.find(p => p.flagship))}
  </div></section>
  <section class="about-close"><div class="wrap">
    <p class="about-miracle">${a.miracle}</p>
    <p class="about-ask">${a.ask}</p>
    <div class="cta-row"><a class="btn" href="${c.link('shop/')}">${a.cta}</a></div>
  </div></section>
</article>` + footer(c);
  },

  'metals/': c => {
    const k = c.t.metals, tama = C.products.find(p => p.flagship);
    return head(c, k.title, k.desc) + header(c, '') + `
<div class="wrap"><div class="page-head"><h1>${k.h1}</h1><p class="lede">${k.lede}</p></div>
  <div class="metal-grid">${Object.entries(C.metals).map(([key, m]) => `<section class="metal-card" id="${key}">
    <img src="${c.up}img/mizuhiki-tama-pendant_${C.metalFileName[key]}_macro-600.webp" width="600" height="600" alt="${esc(altOf(c, tama, key, 'macro'))}" loading="lazy">
    <h2><span class="mc-short">${m.short}</span>${m.label[c.lang]}</h2>
    <p>${k.items[key][0]}</p>
    <p class="muted small">${c.lang === 'ja' ? '' : c.t.home.from + ' '}${money(c.lang, Math.min(...C.products.map(p => p.prices[key])))}${c.lang === 'ja' ? '〜' : ''}</p>
  </section>`).join('')}</div>
  <p class="note" style="margin-top:40px">${k.care}</p>
  <div class="cta-row" style="margin-bottom:96px"><a class="btn" href="${c.link('shop/')}">${c.t.home.allCta}</a></div>
</div>` + footer(c);
  },

  'size-guide/': c => {
    const s = c.t.size;
    return head(c, s.title, s.desc) + header(c, 'size') + `
<div class="wrap"><div class="page-head"><h1>${s.h1}</h1><p class="lede">${s.lede}</p></div>
<div class="prose">
  <section><h2>${s.howH}</h2><div><ol class="steps">${s.how.map(x => `<li>${x}</li>`).join('')}</ol><p class="muted small">${s.tip}</p></div></section>
  <section><h2>${s.th[0]} / ${s.th[2]} / ${s.th[3]}</h2><div>
    <table><thead><tr>${s.th.map(x => `<th scope="col">${x}</th>`).join('')}</tr></thead>
    <tbody>${C.ringSizes.map(eu => `<tr data-size-row="${eu}"></tr>`).join('')}</tbody></table>
    <p class="muted small" style="margin-top:12px">${s.approx}</p>
    <p><a href="${c.link('contact/')}">${s.help}</a></p></div></section>
</div></div>` + footer(c);
  },

  'shipping-returns/': c => {
    const s = c.t.shipping;
    return head(c, s.title, s.desc) + header(c, '') + `
<div class="wrap"><div class="page-head"><h1>${s.h1}</h1></div>
<div class="prose">${s.sections.map(([a, b]) => `<section><h2>${a}</h2><p>${sub(b, { lead })}</p></section>`).join('')}</div></div>` + footer(c);
  },

  'contact/': c => {
    const s = c.t.contact;
    return head(c, s.title, s.desc) + header(c, '') + `
<div class="wrap"><div class="page-head"><h1>${s.h1}</h1><p class="lede">${s.lede}</p></div>
<div class="prose"><section><h2>${s.email}</h2><div>
  <p><a href="mailto:${C.business.email}">${C.business.email}</a></p>
  <form class="form" name="contact" method="POST" action="/api/contact" data-contact>
    <p hidden><label>Company <input name="company"></label></p>
    <input type="hidden" name="lang" value="${c.lang}">
    <label>${s.name}<input name="name" autocomplete="name" required></label>
    <label>${s.emailField}<input name="email" type="email" autocomplete="email" required></label>
    <label>${s.order}<input name="order"></label>
    <label>${s.message}<textarea name="message" required></textarea></label>
    <p class="muted small">${sub(c.t.legalMeta.contactNote, { privacy: `<a href="${c.link('privacy/')}">${c.t.legalMeta.privacyLower}</a>` })}</p>
    <div><button class="btn" type="submit">${s.send}</button></div>
    <p class="small" role="status" data-sent></p>
  </form></div></section></div></div>` + footer(c);
  },

  ...Object.fromEntries(['legal', 'terms', 'privacy', 'cookies'].map(k => [`${k}/`, c => {
    const L = LEGAL(c.lang, C.business, lead)[k];
    return head(c, `${L.title} — Matane Jewellery`, L.desc) + header(c, '') + `
<div class="wrap"><div class="page-head"><h1>${L.title}</h1><p class="muted small">${c.t.legalMeta.updated} ${C.business.termsVersion}</p></div>
<div class="prose">${L.sections.map(([h, p]) => `<section id="${h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 's'}"><h2>${h}</h2><p>${esc(p)}</p></section>`).join('')}</div></div>` + footer(c);
  }])),

  'bag/': c => {
    const b = c.t.bag;
    return head(c, b.title, b.title, '<meta name="robots" content="noindex">') + header(c, 'bag') + `
<div class="wrap" data-bag><div class="page-head"><h1>${b.h1}</h1></div>
  <div data-empty hidden><p>${b.empty}</p><a class="btn" href="${c.link('shop/')}">${b.emptyCta}</a><div style="height:96px"></div></div>
  <div class="bag">
    <div data-lines></div>
    <aside class="summary" data-summary hidden>
      <dl><dt>${b.subtotal}</dt><dd data-total></dd><dt>${b.shipping}</dt><dd>${b.free}</dd><dt class="tot">${b.total}</dt><dd class="tot" data-total></dd></dl>
      <p class="muted small">${b.vat} ${sub(b.made, { lead })}</p>
      <label class="consent"><input type="checkbox" data-terms> <span>${sub(c.t.legalMeta.accept, { terms: `<a href="${c.link('terms/')}" target="_blank">${c.t.legalMeta.termsLower}</a>`, privacy: `<a href="${c.link('privacy/')}" target="_blank">${c.t.legalMeta.privacyLower}</a>` })}</span></label>
      <button class="btn block" type="button" data-checkout>${b.checkout}</button>
      <p class="err" role="status" data-msg></p>
    </aside>
  </div>
</div>` + footer(c);
  },

  'order/': c => {
    const o = c.t.order;
    return head(c, o.title, o.title, '<meta name="robots" content="noindex">') + header(c, '') + `
<div class="wrap" data-order><div class="page-head"><h1>${o.h1}</h1><p class="lede" data-order-msg>${o.loading}</p></div>
  <div class="order-box" data-order-box hidden>
    <ol class="order-steps">${['paid', 'in_production', 'shipped', 'delivered'].map(k => `<li data-step="${k}"><span>${o.steps[k]}</span></li>`).join('')}</ol>
    <dl class="order-meta"><dt>${o.number}</dt><dd data-o="number"></dd><dt>${o.date}</dt><dd data-o="date"></dd><dt>${o.total}</dt><dd data-o="total"></dd><dt data-track-row hidden>${o.tracking}</dt><dd data-o="tracking" hidden></dd></dl>
    <ul class="order-items" data-o="items"></ul>
  </div><div style="height:96px"></div>
</div>` + footer(c, { order: o });
  },

  'thank-you/': c => {
    const s = c.t.thanks;
    return head(c, s.title, s.title, '<meta name="robots" content="noindex">') + header(c, '') + `
<div class="wrap" data-thanks><div class="page-head"><h1>${s.h1}</h1><p class="lede">${s.p}</p>
<div class="cta-row"><a class="btn ghost" href="${c.link('shop/')}">${s.cta}</a></div></div><div style="height:80px"></div></div>` + footer(c);
  }
};

for (const col of C.collections) {
  render[`${col.id}/`] = c => head(c, `${col.name[c.lang]} — Matane Jewellery`, col.lede[c.lang]) + header(c, 'collection') + `
<div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${c.link('shop/')}">${c.t.nav.collection}</a> / ${col.name[c.lang]}</nav>
  <div class="page-head coll-head"><h1>${col.name[c.lang]}</h1>${c.lang === 'ja' ? '' : `<p class="coll-kanji" lang="ja">${col.kanji}</p>`}<p class="lede">${col.lede[c.lang]}</p></div>
  ${col.banner ? (b => `<figure class="coll-banner"><img src="${c.up}img/${b}-1600.webp" srcset="${c.up}img/${b}-800.webp 800w, ${c.up}img/${b}-1600.webp 1600w" sizes="100vw" width="1600" height="900" alt="${esc(col.name[c.lang])}"></figure>`)(`${col.banner}_${col.bannerMetal}_${col.bannerView}`) : ''}
  ${tiles(c, inColl(col.id))}
  <div style="height:96px"></div>
</div>` + footer(c);
}
for (const p of C.products) render[`${p.collection}/${p.slug}/`] = c => productPage(c, p);

function productPage(c, p) {
  const t = c.t.product, name = p.name[c.lang];
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name, brand: { '@type': 'Brand', name: 'Matane Jewellery' },
    image: Object.keys(C.metals).map(m => `${SITE}/img/${imgName(p, m, p.views[0], 1200)}`),
    description: p.about[c.lang],
    offers: Object.keys(C.metals).map(m => ({ '@type': 'Offer', priceCurrency: 'EUR', price: (p.prices[m] / 100).toFixed(2), availability: 'https://schema.org/PreOrder', name: C.metals[m].label[c.lang], url: `${SITE}/${c.lang}/${c.path}?metal=${m}` }))
  };
  return head(c, `${name} — Matane Jewellery`, p.about[c.lang], `<script type="application/ld+json">${JSON.stringify(ld)}</script>`) + header(c, 'collection') + `
<div class="wrap" data-pdp="${p.id}">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${c.link('shop/')}">${c.t.nav.collection}</a> / <a href="${c.link(`${p.collection}/`)}">${C.collections.find(k => k.id === p.collection).name[c.lang]}</a> / ${name}</nav>
  <div class="pdp">
    <div class="gallery">
      <div class="gallery-tabs" role="tablist">
        <button role="tab" data-tab="photos" aria-selected="true">${t.photos}</button>
        <button role="tab" data-tab="3d" aria-selected="false">${t.view3d}</button>
      </div>
      <div class="stage">
        ${img(c, p, 'wg', p.views[0], altOf(c, p, 'wg', p.views[0]), 'fetchpriority="high"')}
        <iframe hidden title="${esc(name)} 3D" loading="lazy" allow="fullscreen"></iframe>
      </div>
      <p class="hint3d" hidden>${t.drag}</p>
      <div class="thumbs">${p.views.map((v, i) => `<button type="button" data-view="${v}" aria-current="${i === 0}"><img src="${c.up}img/${imgName(p, 'wg', v, 600)}" alt="${esc(altOf(c, p, 'wg', v))}" width="84" height="84" loading="lazy"></button>`).join('')}${(p.worn?.shots || []).map(w => `<button type="button" class="worn-thumb" data-worn="${w.shot}" data-worn-metals="${w.metals.join(',')}" aria-current="false"><img src="${c.up}img/worn_${p.worn.key}_${w.metals[0]}_${w.shot}-600.webp" alt="${esc(c.t.product.wornAlt.replace('{name}', p.name[c.lang]))}" width="84" height="105" loading="lazy"></button>`).join('')}</div>
    </div>
    <div class="buy">
      <h1>${name}</h1>
      <p class="price" data-price>${money(c.lang, p.prices.wg)}</p>
      <form novalidate>
        <fieldset class="field"><legend>${t.metal} <b data-metal-name>${C.metals.wg.label[c.lang]}</b></legend>
          <div class="swatches">${Object.entries(C.metals).map(([k, m]) => `<label title="${esc(m.label[c.lang])}"><input type="radio" name="metal" value="${k}"${k === 'wg' ? ' checked' : ''} aria-label="${esc(m.label[c.lang])}"><span class="sw" style="background:radial-gradient(circle at 32% 28%,#fff 0,${m.swatch} 45%,color-mix(in srgb,${m.swatch} 70%,#000) 100%)"></span><span class="sw-short" aria-hidden="true">${m.short}</span></label>`).join('')}</div>
          <p class="metal-link small"><a href="${c.link('metals/')}">${c.t.metals.link}</a></p>
        </fieldset>
        ${p.needsSize ? `<div class="field"><label class="lbl" for="size"><span>${t.size}</span><a href="${c.link('size-guide/')}">${t.sizeGuide}</a></label>
          <select id="size" name="size" aria-describedby="size-err"><option value="">${t.choose}</option>${C.ringSizes.map(s => `<option value="${s}">${sizeLabel(c.lang, s)}</option>`).join('')}</select>
          <p class="err" id="size-err" role="alert"></p></div>` : '<p class="err" role="alert"></p>'}
        <button class="btn block" type="submit">${t.add}</button>
      </form>
      <ul class="assure"><li>${sub(t.made, { lead })}</li><li>${t.ship}</li></ul>
      <div class="details"><h2>${t.details}</h2><p>${p.about[c.lang]}</p><ul>${p.specs[c.lang].map(s => `<li>${s}</li>`).join('')}</ul></div>
    </div>
  </div>
</div>` + footer(c);
}

function sizeLabel(lang, eu) {
  const us = Math.round(((eu - 36.5) / 2.55) * 2) / 2, jp = Math.round(eu - 40);
  if (lang === 'ja') return `${jp}号（EU ${eu}）`;
  if (lang === 'en') return `${eu} (US ${us})`;
  return `${eu}`;
}

// ---------------- write ----------------
for (const lang of LANGS) for (const path of PAGES) {
  const file = join(OUT, lang, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render[path](ctx(lang, path)));
}

// 404 (Netlify serves /404.html)
{
  const c = { ...ctx('en', ''), up: '/', link: p => '/en/' + p, linkLang: l => '/' + l + '/' };
  const n = T.en.notFound;
  writeFileSync(join(OUT, '404.html'), head(c, n.title, n.p) + header(c, '') + `
<div class="wrap"><div class="page-head"><h1>${n.h1}</h1><p class="lede">${n.p}</p><div class="cta-row"><a class="btn" href="/en/ume-musubi/">${n.cta}</a></div></div><div style="height:80px"></div></div>` + footer(c));
}

// root: send visitors to their language
const idx = PREVIEW ? 'index.html' : '';
writeFileSync(join(OUT, 'index.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Matane Jewellery</title>
${LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`).join('')}
<script>(function(){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'en').toLowerCase();var t=l.indexOf('ja')===0?'ja':(l.indexOf('es')===0||l.indexOf('ca')===0)?'es':'en';location.replace(t+'/${idx}');})();</script>
</head><body style="font-family:sans-serif;padding:40px"><p><a href="en/${idx}">English</a> · <a href="es/${idx}">Español</a> · <a href="ja/${idx}">日本語</a></p></body></html>`);

// sitemap
if (!PREVIEW) writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.filter(p => !['bag/', 'thank-you/', 'order/', 'legal/', 'terms/', 'privacy/', 'cookies/'].includes(p)).flatMap(p => LANGS.map(l => `<url><loc>${SITE}/${l}/${p}</loc>${LANGS.map(a => `<xhtml:link rel="alternate" hreflang="${a}" href="${SITE}/${a}/${p}"/>`).join('')}</url>`)).join('\n')}
</urlset>`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nDisallow: /admin/\nDisallow: /api/\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built ${LANGS.length * PAGES.length} pages${PREVIEW ? ' (preview)' : ''} -> ${OUT}/`);
