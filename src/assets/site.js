// Matane Jewellery — bag, product page, checkout. No dependencies.
(() => {
  const M = window.MATANE; // { lang, locale, t, products, metals, lead, preview, root, idx, img }
  const KEY = 'matane_bag_v1';
  const fmt = new Intl.NumberFormat(M.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const money = c => fmt.format(c / 100);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const sub = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');

  // ---------- storage ----------
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = b => { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch {} updateCount(); };
  const product = id => M.products.find(p => p.id === id);
  const price = l => product(l.id)?.prices[l.metal] ?? 0;

  function updateCount() {
    const n = load().reduce((a, l) => a + l.qty, 0);
    $$('.bag-count').forEach(el => { el.textContent = n; el.dataset.n = n; });
  }

  // ---------- size labels ----------
  window.sizeLabel = (eu, lang = M.lang) => {
    const us = Math.round(((eu - 36.5) / 2.55) * 2) / 2;
    const jp = Math.round(eu - 40);
    if (lang === 'ja') return `${jp}号（EU ${eu}）`;
    if (lang === 'en') return `${eu} (US ${us})`;
    return `${eu}`;
  };

  // ---------- mobile menu ----------
  const mb = $('.menu-btn');
  if (mb) mb.addEventListener('click', () => {
    const nav = $('.site-nav'); const open = nav.classList.toggle('open');
    mb.setAttribute('aria-expanded', open);
  });

  // ---------- toast ----------
  let toastTimer;
  function toast(html) {
    const el = $('.toast'); if (!el) return;
    el.innerHTML = html; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 5000);
  }

  // ---------- product page ----------
  const pdp = $('[data-pdp]');
  if (pdp) {
    const p = product(pdp.dataset.pdp);
    const stage = $('.stage', pdp), main = $('.stage > img', pdp), frame = $('.stage iframe', pdp);
    const priceEl = $('[data-price]', pdp), metalName = $('[data-metal-name]', pdp);
    const thumbs = $$('.thumbs button:not(.worn-thumb)', pdp);
    const wornThumbs = $$('.thumbs .worn-thumb', pdp);
    let worn = null;
    let metal = new URLSearchParams(location.search).get('metal');
    if (!M.metals[metal]) metal = 'wg';
    let view = p.views[0];

    const src = (v, w) => `${M.img}${p.imgKey}_${M.metalFile[metal]}_${v}-${w}.webp`;
    const alt = v => sub(M.t.alt, { name: p.name, metal: M.metals[metal], view: M.t.viewsName[v] });

    const SILVERISH = ['ag', 'wg', 'wg18', 'pt'];
    const wornMetal = ms => { const want = SILVERISH.includes(metal) ? 'sterling-silver' : '18k-yellow-gold'; return ms.includes(want) ? want : ms[0]; };
    const wornSrc = (b, w) => `${M.img}worn_${p.worn.key}_${wornMetal(b.dataset.wornMetals.split(','))}_${b.dataset.worn}-${w}.webp`;
    function render() {
      if (worn) {
        main.src = wornSrc(worn, 1200); main.srcset = `${wornSrc(worn, 600)} 600w, ${wornSrc(worn, 1200)} 1200w`;
        main.alt = $('img', worn).alt; main.classList.add('is-worn');
      } else {
        main.src = src(view, 1200); main.srcset = `${src(view, 600)} 600w, ${src(view, 1200)} 1200w`;
        main.alt = alt(view); main.classList.remove('is-worn');
      }
      wornThumbs.forEach(b => { $('img', b).src = wornSrc(b, 600); b.setAttribute('aria-current', b === worn); });
      thumbs.forEach(b => {
        const v = b.dataset.view; const im = $('img', b);
        im.src = src(v, 600); im.alt = alt(v);
        b.setAttribute('aria-current', !worn && v === view);
      });
      priceEl.textContent = money(p.prices[metal]);
      metalName.textContent = M.metals[metal];
      if (frame && frame.contentWindow) frame.contentWindow.postMessage({ matane: true, metal }, '*');
    }
    $$('input[name="metal"]', pdp).forEach(r => {
      r.checked = r.value === metal;
      r.addEventListener('change', () => { metal = r.value; render(); });
    });
    thumbs.forEach(b => b.addEventListener('click', () => { view = b.dataset.view; worn = null; showTab('photos'); render(); }));
    wornThumbs.forEach(b => b.addEventListener('click', () => { worn = b; showTab('photos'); render(); }));

    // photos / 3D tabs
    const tabs = $$('.gallery-tabs button', pdp);
    function showTab(name) {
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === name));
      main.hidden = name !== 'photos';
      if (name === '3d' && !frame.src) {
        frame.src = `${M.viewer}?piece=${p.viewer}&metal=${metal}&ui=none#piece=${p.viewer}&metal=${metal}&ui=none`;
        frame.addEventListener('load', () => frame.contentWindow.postMessage({ matane: true, metal }, '*'), { once: true });
      }
      frame.hidden = name !== '3d';
      $('.hint3d', pdp).hidden = name !== '3d';
    }
    tabs.forEach(t => t.addEventListener('click', () => showTab(t.dataset.tab)));

    // add to bag
    const sizeSel = $('select[name="size"]', pdp), err = $('.err', pdp);
    if (sizeSel) sizeSel.addEventListener('change', () => { sizeSel.removeAttribute('aria-invalid'); err.textContent = ''; });
    $('form', pdp).addEventListener('submit', e => {
      e.preventDefault();
      let size = null;
      if (p.needsSize) {
        size = +sizeSel.value;
        if (!size) { sizeSel.setAttribute('aria-invalid', 'true'); err.textContent = M.t.needSize; sizeSel.focus(); return; }
      }
      const bag = load();
      const same = bag.find(l => l.id === p.id && l.metal === metal && l.size === size);
      if (same) same.qty = Math.min(5, same.qty + 1); else bag.push({ id: p.id, metal, size, qty: 1 });
      save(bag);
      toast(`<span>${M.t.added}</span><a href="${M.bagUrl}">${M.t.viewBag}</a>`);
    });
    render();
  }

  // ---------- bag page ----------
  const bagEl = $('[data-bag]');
  function renderBag() {
    const bag = load();
    const list = $('[data-lines]', bagEl), sum = $('[data-summary]', bagEl), empty = $('[data-empty]', bagEl);
    empty.hidden = bag.length > 0; sum.hidden = bag.length === 0;
    list.innerHTML = '';
    let total = 0;
    bag.forEach((l, i) => {
      const p = product(l.id); if (!p) return;
      const lineTotal = price(l) * l.qty; total += lineTotal;
      const el = document.createElement('div'); el.className = 'line';
      const meta = [M.metals[l.metal], l.size ? `${M.t.size} ${sizeLabel(l.size)}` : ''].filter(Boolean).join(', ');
      el.innerHTML = `
        <img src="${M.img}${p.imgKey}_${M.metalFile[l.metal]}_${p.views[0]}-600.webp" alt="" width="110" height="110">
        <div><h3>${p.name}</h3><p class="meta">${meta}</p>
          <div class="controls"><label>${M.t.qty} <select aria-label="${M.t.qty}">${[1,2,3,4,5].map(n => `<option${n === l.qty ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
          <button class="linkbtn" type="button">${M.t.remove}</button></div></div>
        <div class="lp">${money(lineTotal)}</div>`;
      $('select', el).addEventListener('change', e => { const b = load(); b[i].qty = +e.target.value; save(b); renderBag(); });
      $('.linkbtn', el).addEventListener('click', () => { const b = load(); b.splice(i, 1); save(b); renderBag(); });
      list.appendChild(el);
    });
    $$('[data-total]', bagEl).forEach(e => e.textContent = money(total));
  }
  if (bagEl) {
    renderBag();
    const btn = $('[data-checkout]', bagEl), msg = $('[data-msg]', bagEl);
    btn.addEventListener('click', async () => {
      msg.textContent = '';
      const terms = $('[data-terms]', bagEl);
      if (terms && !terms.checked) { msg.textContent = M.t.mustAccept; terms.focus(); return; }
      if (M.preview) { msg.textContent = M.t.previewOnly; return; }
      btn.disabled = true; btn.textContent = M.t.redirect;
      try {
        const r = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ lang: M.lang, items: load(), termsAccepted: true }) });
        const d = await r.json();
        if (!r.ok || !d.url) throw new Error(d.error || 'checkout');
        location.href = d.url;
      } catch (e) {
        btn.disabled = false; btn.textContent = M.t.checkout; msg.textContent = M.t.error;
      }
    });
  }

  // ---------- thank-you: clear bag ----------
  if ($('[data-thanks]') && new URLSearchParams(location.search).get('session_id')) save([]);

  // ---------- contact form (stored in the EU database) ----------
  const cf = $('form[data-contact]');
  if (cf) cf.addEventListener('submit', async e => {
    e.preventDefault();
    const out = $('[data-sent]', cf), btn = $('button[type=submit]', cf);
    if (M.preview) { out.textContent = M.t.sent; cf.reset(); return; }
    btn.disabled = true;
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(cf))) });
      if (!r.ok) throw new Error();
      out.textContent = M.t.sent; cf.reset();
    } catch { out.textContent = M.t.error; }
    btn.disabled = false;
  });

  // ---------- order status (private link from the confirmation email) ----------
  const ob = $('[data-order]');
  if (ob) (async () => {
    const O = M.order, msgEl = $('[data-order-msg]', ob), box = $('[data-order-box]', ob);
    const t = new URLSearchParams(location.search).get('t');
    try {
      if (!t || M.preview) throw new Error();
      const r = await fetch('/api/order?t=' + encodeURIComponent(t)); if (!r.ok) throw new Error();
      const o = await r.json();
      msgEl.textContent = O.intro[o.status] || '';
      $('[data-o="number"]', ob).textContent = o.order_number;
      $('[data-o="date"]', ob).textContent = new Date(o.created_at).toLocaleDateString(M.locale, { dateStyle: 'long' });
      $('[data-o="total"]', ob).textContent = money(o.amount_total);
      if (o.tracking_number) { const d = $('[data-o="tracking"]', ob); d.hidden = false; $('[data-track-row]', ob).hidden = false;
        d.textContent = [o.tracking_carrier, o.tracking_number].filter(Boolean).join(' '); }
      $('[data-o="items"]', ob).innerHTML = o.items.map(i => `<li>${i.quantity} × ${i.name}</li>`).join('');
      const order = ['paid', 'in_production', 'shipped', 'delivered'], at = order.indexOf(o.status);
      $$('[data-step]', ob).forEach((li, i) => { li.classList.toggle('done', i <= at); li.classList.toggle('now', i === at); });
      box.hidden = false;
    } catch { msgEl.textContent = O.notFound; }
  })();

  // ---------- size table ----------
  $$('[data-size-row]').forEach(tr => {
    const eu = +tr.dataset.sizeRow;
    tr.innerHTML = `<td>${eu}</td><td>${eu} mm</td><td>${Math.round(((eu - 36.5) / 2.55) * 2) / 2}</td><td>${Math.round(eu - 40)}</td>`;
  });

  updateCount();
})();
