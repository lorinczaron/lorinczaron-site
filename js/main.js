// Mobil menü
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Lightbox — csoportos lapozással (nyilak + bal/jobb billentyű)
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = '<button class="lb-nav lb-prev" aria-label="Előző">‹</button>' +
               '<img alt="">' +
               '<button class="lb-nav lb-next" aria-label="Következő">›</button>' +
               '<div class="lb-count"></div>';
document.body.appendChild(lb);
const lbImg = lb.querySelector('img');
const lbPrev = lb.querySelector('.lb-prev');
const lbNext = lb.querySelector('.lb-next');
const lbCount = lb.querySelector('.lb-count');
let lbGroup = [], lbIndex = 0;
function lbShow(i) {
  if (!lbGroup.length) return;
  lbIndex = (i + lbGroup.length) % lbGroup.length;
  const it = lbGroup[lbIndex];
  lbImg.src = it.full || it.src; lbImg.alt = it.alt || '';
  const multi = lbGroup.length > 1;
  lbPrev.style.display = lbNext.style.display = multi ? '' : 'none';
  lbCount.style.display = multi ? '' : 'none';
  lbCount.textContent = (lbIndex + 1) + ' / ' + lbGroup.length;
}
function openLightbox(items, index) {
  lbGroup = items || []; lbShow(index || 0); lb.classList.add('open');
}
lbPrev.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex - 1); });
lbNext.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex + 1); });
lbImg.addEventListener('click', e => e.stopPropagation());
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') { lb.classList.remove('open'); e.stopImmediatePropagation(); }
  else if (e.key === 'ArrowLeft' && lbGroup.length > 1) lbShow(lbIndex - 1);
  else if (e.key === 'ArrowRight' && lbGroup.length > 1) lbShow(lbIndex + 1);
});

// Galéria-művek (nem az in-situ rács): kattintásra a detail-panel nyílik; fallback: lightbox.
document.querySelectorAll('.work-grid:not(.insitu) figure img, .single-work img').forEach(img => {
  img.addEventListener('click', () => {
    const s = img.currentSrc || img.src;
    const art = artworkFromSrc(s);
    if (art) { openArtworkPanel(art); return; }
    openLightbox([{ full: s.replace('/works/', '/works/full/') }], 0);
  });
});

// In-situ sorozat a galéria alján: az egész sorozat lapozható lightboxban.
document.querySelectorAll('.work-grid.insitu').forEach(grid => {
  const imgs = Array.prototype.slice.call(grid.querySelectorAll('figure img'));
  imgs.forEach((im, i) => im.addEventListener('click', e => {
    e.stopPropagation();
    const items = imgs.map(x => ({ full: x.currentSrc || x.getAttribute('src'), alt: x.alt || '' }));
    openLightbox(items, i);
  }));
});

// "Kukucskáló" ablak (details & in situ): a kép fixen áll a háttérben
// (background-attachment:fixed), a csík mint egy lyuk mozog fölötte
// scrollozáskor. A prev/next gomb csak azt váltja, melyik kép aktív
// éppen az ablakban. Az eredeti <img> rejtve marad a DOM-ban (alt szöveg,
// onerror fallback működik tovább), a betöltött forrását másoljuk át
// a slide CSS background-image-jébe.
document.querySelectorAll('.carousel').forEach(car => {
  const slides = car.querySelectorAll('.carousel-slide');
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (!img) return;
    const setBg = () => { slide.style.backgroundImage = "url('" + (img.currentSrc || img.src) + "')"; };
    // display:none kép + loading="lazy" kombó nem tölt be soha (nincs
    // layout-boxa, amit a böngésző intersection-figyelője láthatna) —
    // ezért itt explicit eager-re kapcsoljuk, hogy azonnal induljon a betöltés.
    if (img.loading === 'lazy') img.loading = 'eager';
    if (img.complete && img.naturalWidth) setBg();
    img.addEventListener('load', setBg);
  });
  let i = 0;
  slides[i].classList.add('active');
  const go = d => {
    slides[i].classList.remove('active');
    i = (i + d + slides.length) % slides.length;
    slides[i].classList.add('active');
  };
  // automatikus váltás 4mp-enként, valódi crossfade-del (mindkét slide
  // egyszerre animál ellentétes irányba, nincs "visibility" ugrás közte)
  let auto = setInterval(() => go(1), 4000);
  const resetAuto = () => { clearInterval(auto); auto = setInterval(() => go(1), 4000); };
  car.querySelector('.prev').addEventListener('click', () => { go(-1); resetAuto(); });
  car.querySelector('.next').addEventListener('click', () => { go(1); resetAuto(); });
});

// Bevezető kép(ek) magassága igazodjon a szöveg blokk magasságához:
// a médiaoszlop (.intro-media) pontosan olyan magas lesz, mint a mellette
// lévő szöveg, a kép(ek) pedig object-fit:contain-nel zsugorodnak bele
// (sosem vágódnak), lásd .intro-media szabály a style.css-ben.
function matchIntroHeights() {
  document.querySelectorAll('.intro-grid').forEach(grid => {
    const text = grid.querySelector('.intro-text');
    const media = grid.querySelector('.intro-media');
    if (!text || !media) return;
    media.style.height = text.offsetHeight + 'px';
  });
}
window.addEventListener('load', matchIntroHeights);
window.addEventListener('resize', matchIntroHeights);
matchIntroHeights();

// Kontakt űrlap — Netlify Forms. A beküldést a Netlify kapja el szerveroldalon
// (a form data-netlify="true" + rejtett form-name alapján), AJAX-szal küldjük a "/"
// endpointra, hogy a látogató az oldalon maradjon és inline visszajelzést kapjon.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const hu = document.documentElement.lang === 'hu';
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = hu ? 'Küldés…' : 'Sending…'; }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(r => {
      if (!r.ok) throw new Error('network');
      form.innerHTML = hu
        ? '<p class="form-success">Köszönöm, az üzenetét elküldtem.<br>Hamarosan válaszolok.</p>'
        : '<p class="form-success">Thank you — your message has been sent.<br>I&rsquo;ll get back to you soon.</p>';
    }).catch(() => {
      if (btn) { btn.disabled = false; btn.textContent = hu ? 'KÜLDÉS' : 'SEND'; }
      if (!form.querySelector('.form-error')) {
        form.insertAdjacentHTML('beforeend', hu
          ? '<p class="form-error">Valami hiba történt. Kérem, írjon közvetlenül a <a href="mailto:aron@aronlorincz.com">aron@aronlorincz.com</a> címre.</p>'
          : '<p class="form-error">Something went wrong. Please email <a href="mailto:aron@aronlorincz.com">aron@aronlorincz.com</a> directly.</p>');
      }
    });
  });
}

// Mobilon (max 600px, egyezik a style.css breakpointjával) a bevezető médiaoszlop
// (animáció/kép) átkerül a "details" carousel ALÁ, "progress" felirattal.
// Asztali/tablet nézetben marad az eredeti helyén, a szöveg mellett.
// Fontos: ugyanazt a DOM-elemet mozgatjuk, nem másoljuk — így a videó/kép nem
// töltődik be kétszer. Visszaváltáskor a matchIntroHeights újra lefut, hogy a
// médiaoszlop megint a szöveg magasságához igazodjon.
(function () {
  const grid = document.querySelector('.intro-grid');
  const media = document.querySelector('.intro-media');
  const carousel = document.querySelector('.carousel');
  if (!grid || !media || !carousel) return;   // index/about oldalon nincs mit tenni

  const mq = window.matchMedia('(max-width: 600px)');
  let head = null;

  function apply() {
    if (mq.matches) {
      if (head) return;                       // már át van helyezve
      head = document.createElement('h4');
      head.className = 'section-head progress-head';
      head.textContent = 'progress';
      carousel.insertAdjacentElement('afterend', head);
      head.insertAdjacentElement('afterend', media);
    } else {
      if (!head) return;                      // már az eredeti helyén van
      grid.appendChild(media);
      head.remove();
      head = null;
      matchIntroHeights();
    }
  }

  apply();
  if (mq.addEventListener) mq.addEventListener('change', apply);
  else mq.addListener(apply);                 // régebbi Safari
})();

// Mobil swipe-galéria nyíl-jelzői: a .can-left / .can-right osztályt a tényleges
// görgethetőség szerint tesszük ki, így az első képnél nincs balra mutató nyíl,
// az utolsónál pedig eltűnik a jobbra mutató. A nyilakat a style.css rajzolja
// (két háttérréteg), itt csak a kapcsolgatás történik.
(function () {
  const grids = document.querySelectorAll('.work-grid:not(.insitu)');
  if (!grids.length) return;
  const mq = window.matchMedia('(max-width: 600px)');
  const EPS = 4;                              // tolerancia a lebegőpontos scrollLeft-re

  function update(g) {
    const max = g.scrollWidth - g.clientWidth;
    const on = mq.matches && max > EPS;       // asztali nézetben / ha nincs mit görgetni: nincs nyíl
    g.classList.toggle('can-left', on && g.scrollLeft > EPS);
    g.classList.toggle('can-right', on && g.scrollLeft < max - EPS);
  }
  const updateAll = () => grids.forEach(g => update(g));

  grids.forEach(g => g.addEventListener('scroll', () => update(g), { passive: true }));
  window.addEventListener('resize', updateAll);
  // a képek lusta betöltése után változhat a scrollWidth, ezért a load után is
  window.addEventListener('load', updateAll);
  if (mq.addEventListener) mq.addEventListener('change', updateAll);
  updateAll();
})();

/* ============================================================
   ARTWORK DETAIL PANEL
   Adatforrás: data/artworks.js -> window.ARTWORK_DATA[id]
   Desktop: lebegő ablak; mobil: teljes képernyős lap.
   Bezárás: X, háttérre kattintás, ESC, alsó "Back to gallery".
   ============================================================ */
function artworkFromSrc(src) {
  if (!window.ARTWORK_DATA) return null;
  const s = String(src);
  // csak a galéria-művek (works/...), az in-situ / details képek NEM
  if (!/\/works\//.test(s) || /-insitu-/.test(s)) return null;
  const gm = s.match(/images\/([a-z-]+)\/works\//i);
  const nm = s.match(/-(\d{1,2})\.jpg(?:\?.*)?$/i);
  if (!gm || !nm) return null;
  const data = window.ARTWORK_DATA[gm[1]];
  const num = String(parseInt(nm[1], 10));
  return (data && data[num]) ? data[num] : null;
}

const apBackdrop = document.createElement('div');
apBackdrop.className = 'ap-backdrop';
const CHEV_L = '<svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true"><path d="M10 2 3.5 11 10 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV_R = '<svg width="14" height="22" viewBox="0 0 14 22" aria-hidden="true"><path d="M4 2 10.5 11 4 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
apBackdrop.innerHTML =
  '<div class="ap-panel" role="dialog" aria-modal="true">' +
    '<button class="ap-close" aria-label="Close">&#10005;</button>' +
    '<button class="ap-nav ap-prev" aria-label="Előző mű">' + CHEV_L + '</button>' +
    '<button class="ap-nav ap-next" aria-label="Következő mű">' + CHEV_R + '</button>' +
    '<div class="ap-head"><h2></h2><div class="ap-meta"></div></div>' +
    '<div class="ap-hero"></div>' +
    '<div class="ap-sections"></div>' +
    '<div class="ap-foot"><button class="ap-back">&#8592; Back to gallery</button></div>' +
  '</div>';
document.body.appendChild(apBackdrop);
const apPanel = apBackdrop.querySelector('.ap-panel');

function openArtworkPanel(d) {
  if (!d) return;
  apBackdrop.querySelector('.ap-head h2').textContent = d.title || '';
  apBackdrop.querySelector('.ap-head .ap-meta').textContent = d.meta || '';
  // sold marker (set by _DASHBOARD_/tools/site_mark_sold.py via "sold": true)
  const apHead = apBackdrop.querySelector('.ap-head');
  const oldSold = apHead.querySelector('.ap-sold'); if (oldSold) oldSold.remove();
  if (d.sold) {
    const s = document.createElement('div'); s.className = 'ap-sold';
    s.textContent = (window.__lorinczLang === 'hu') ? 'eladva · magángyűjtemény' : 'sold · private collection';
    apHead.appendChild(s);
  }

  // nagy kép kerettel — a galériás (kisebb) megjelenítő-kép, nem a teljes 2500-as
  const heroWrap = apBackdrop.querySelector('.ap-hero');
  heroWrap.innerHTML =
    '<figure class="framed"><div class="framed-frame ' + (d.frameClass || 'frame-large') + '">' +
    '<div class="framed-crop"><img src="' + (d.heroFull || d.hero) + '" alt="' + (d.title || '') + '"></div>' +
    '</div></figure>';
  // landscape mű (pl. Vestigia, 60×85 keret): kitölti a szélesebb panelt; portré marad a mostani méreten
  apBackdrop.classList.toggle('ap-wide-mode', /frame-60x85/.test(d.frameClass || ''));

  // a keretes képre kattintva a teljes felbontás nyílik (zoomhoz)
  const heroImg = heroWrap.querySelector('img');
  if (heroImg) heroImg.addEventListener('click', e => {
    e.stopPropagation();
    openLightbox([{ full: d.heroFull || d.hero, alt: d.title }], 0);
  });

  // előző / következő MŰ (a méretsorozatokon át is), a gyűjtemény két végén megáll (nincs körforgás)
  const set = window.ARTWORK_DATA[d.gallery] || {};
  const nums = Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  const idx = nums.indexOf(d.num);
  const prevN = idx > 0 ? nums[idx - 1] : null;
  const nextN = (idx >= 0 && idx < nums.length - 1) ? nums[idx + 1] : null;
  const prevBtn = apBackdrop.querySelector('.ap-prev');
  const nextBtn = apBackdrop.querySelector('.ap-next');
  prevBtn.disabled = !prevN; nextBtn.disabled = !nextN;
  apBackdrop._prev = prevN ? function () { openArtworkPanel(set[prevN]); } : null;
  apBackdrop._next = nextN ? function () { openArtworkPanel(set[nextN]); } : null;
  prevBtn.onclick = function (e) { e.stopPropagation(); if (apBackdrop._prev) apBackdrop._prev(); };
  nextBtn.onclick = function (e) { e.stopPropagation(); if (apBackdrop._next) apBackdrop._next(); };

  // szekciók — az összes szekció képe EGY folytatólagos listába kerül,
  // így a lightboxban a szekció végén automatikusan a következőre ugrik a lapozás.
  const wrap = apBackdrop.querySelector('.ap-sections');
  wrap.innerHTML = '';
  const flat = [];
  (d.sections || []).forEach(sec => sec.items && sec.items.forEach(it => flat.push(it)));
  (d.sections || []).forEach(sec => {
    if (!sec.items || !sec.items.length) return;
    const s = document.createElement('section');
    s.className = 'ap-section';
    const h = document.createElement('h3');
    h.textContent = sec.label;
    const g = document.createElement('div');
    g.className = 'ap-grid';
    sec.items.forEach(it => {
      const gi = flat.indexOf(it);
      const fig = document.createElement('figure');
      const im = document.createElement('img');
      im.src = it.src; im.alt = it.alt || ''; im.loading = 'lazy';
      im.addEventListener('click', e => {
        e.stopPropagation();
        openLightbox(flat, gi);   // folytatólagos lapozás minden szekción át
      });
      fig.appendChild(im); g.appendChild(fig);
    });
    s.appendChild(h); s.appendChild(g); wrap.appendChild(s);
  });

  apBackdrop.classList.add('open');
  document.body.classList.add('ap-lock');
  apBackdrop.scrollTop = 0;
}

function closeArtworkPanel() {
  apBackdrop.classList.remove('open');
  document.body.classList.remove('ap-lock');
}
apBackdrop.querySelector('.ap-close').addEventListener('click', closeArtworkPanel);
apBackdrop.querySelector('.ap-back').addEventListener('click', closeArtworkPanel);
apBackdrop.addEventListener('click', e => { if (e.target === apBackdrop) closeArtworkPanel(); });
apPanel.addEventListener('click', e => e.stopPropagation());
document.addEventListener('keydown', e => {
  if (!apBackdrop.classList.contains('open')) return;
  if (lb.classList.contains('open')) return;      // a lightbox kezeli a saját nyilait/ESC-jét
  if (e.key === 'Escape') closeArtworkPanel();
  else if (e.key === 'ArrowLeft' && apBackdrop._prev) apBackdrop._prev();
  else if (e.key === 'ArrowRight' && apBackdrop._next) apBackdrop._next();
});
