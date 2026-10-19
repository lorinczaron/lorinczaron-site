/* A nyitolap hero-hattere: a kepek veletlen sorrendben valtjak egymast, atlatszo
   athalassal, es kozben lassan mozognak is - mint egy film. A lista a
   webpage/images/home/hero/ mappa tartalma; ha Aron torol vagy betesz oda kepet,
   ezt a tombot ujra kell generalni (_DASHBOARD_/tools/gen_hero_js.py).
   A kepek 2500 px szelesek, a build ezt a mappat NEM kicsinyiti.
   prefers-reduced-motion eseten nincs sem valtas, sem mozgas. */
(function () {
  var IMGS = [
    "/images/home/hero/aron-lorincz-process-01.jpg",
    "/images/home/hero/aron-lorincz-process-02.jpg",
    "/images/home/hero/aron-lorincz-process-03.jpg",
    "/images/home/hero/aron-lorincz-process-04.jpg",
    "/images/home/hero/aron-lorincz-process-05.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-01-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-01-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-01-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-01-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-05.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-02-detail-06.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-03-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-03-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-03-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-06.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-08.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-09.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-04-detail-10.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-05-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-06-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-06-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-06-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-06-detail-05.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-06-detail-06.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-07-detail-08.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-07-detail-09.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-07-detail-11.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-07-detail-12.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-08-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-09-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-10-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-10-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-10-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-11-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-11-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-11-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-11-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-12-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-12-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-01.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-05.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-07.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-14-detail-08.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-15-detail-02.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-15-detail-03.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-15-detail-04.jpg",
    "/images/home/hero/aron-lorincz-status-intermedius-15-detail-05.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-01-detail-01.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-01-detail-02.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-01-detail-03.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-02-detail-01.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-02-detail-02.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-02-detail-03.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-02-detail-04.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-01.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-02.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-03.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-04.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-05.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-06.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-07.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-08.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-09.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-10.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-11.jpg",
    "/images/home/hero/aron-lorincz-structura-ex-machina-03-detail-12.jpg",
    "/images/home/hero/aron-lorincz-studio-01.jpg",
    "/images/home/hero/aron-lorincz-studio-02.jpg",
    "/images/home/hero/aron-lorincz-studio-04.jpg",
    "/images/home/hero/aron-lorincz-studio-05.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-01-detail-01.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-01-detail-02.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-01-detail-03.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-01-detail-04.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-02-detail-01.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-02-detail-02.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-02-detail-03.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-02-detail-04.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-03-detail-01.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-03-detail-02.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-03-detail-03.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-04-detail-01.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-04-detail-02.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-04-detail-03.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-04-detail-04.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-05-detail-01.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-05-detail-02.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-05-detail-03.jpg",
    "/images/home/hero/aron-lorincz-vestigia-vitae-05-detail-04.jpg"
  ];

  var HOLD = 3000;   /* ennyi ideig all ki egy kep teljes fedettsegben (ms) */
  var FADE = 1200;   /* a ket kep kozti athalas (ms) - a valtas igy ~4,2 mp-enkent */

  /* A mozgasok. A kep a kepkockanal mindig szelesebb (2,5:1 vagas egy ~16:9 savban),
     ezert a vizszintes sodras mindig fer; a fuggolegeshez es a zoomhoz a kis
     alap-nagyitas ad helyet. Minden ertek szazalek, szandekosan apro. */
  var MOVES = [
    {s0:1.06, s1:1.06, x0: 1.6, x1:-1.6, y0: 0,   y1: 0  },  /* sodras balra   */
    {s0:1.06, s1:1.06, x0:-1.6, x1: 1.6, y0: 0,   y1: 0  },  /* sodras jobbra  */
    {s0:1.02, s1:1.09, x0: 0,   x1: 0,   y0: 0,   y1: 0  },  /* rakozelit      */
    {s0:1.09, s1:1.02, x0: 0,   x1: 0,   y0: 0,   y1: 0  },  /* kihatral       */
    {s0:1.07, s1:1.07, x0: 0,   x1: 0,   y0: 1.4, y1:-1.4},  /* lentrol fel    */
    {s0:1.07, s1:1.07, x0: 0,   x1: 0,   y0:-1.4, y1: 1.4}   /* fentrol le     */
  ];
  var LIFE = FADE + HOLD + FADE;   /* ennyi ideig lathato egy kep, a mozgas eddig tart */

  var base = document.querySelector('.hero-img');
  if (!base || !IMGS.length) return;

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* lejatszasi lista: minden kep egyszer jon sorra, aztan ujrakeverjuk */
  var queue = shuffle(IMGS), qi = 0, last = null;
  function nextUrl() {
    if (qi >= queue.length) {
      queue = shuffle(IMGS); qi = 0;
      /* ne ugyanazzal a keppel kezdodjon az uj kor, mint amivel az elozo vegzodott */
      if (queue.length > 1 && queue[0] === last) { queue.push(queue.shift()); }
    }
    last = queue[qi++];
    return last;
  }

  var hero = base.parentNode;
  if (!hero) { base.src = nextUrl(); return; }

  /* ket reteg, amik felvaltva viszik a kepeket */
  var LAYER = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
  base.style.cssText += LAYER;
  var other = document.createElement('img');
  other.alt = ''; other.setAttribute('aria-hidden', 'true'); other.decoding = 'async';
  other.style.cssText = LAYER + 'opacity:0;';
  hero.insertBefore(other, base.nextSibling);

  var layers = [base, other], cur = 0, mi = Math.floor(Math.random() * MOVES.length);
  var timer = null;

  function animate(el) {
    if (reduce || !el.animate) return;
    var m = MOVES[mi % MOVES.length]; mi++;
    try {
      el.animate(
        [{transform: 'scale(' + m.s0 + ') translate(' + m.x0 + '%,' + m.y0 + '%)'},
         {transform: 'scale(' + m.s1 + ') translate(' + m.x1 + '%,' + m.y1 + '%)'}],
        {duration: LIFE, easing: 'linear', fill: 'forwards'}
      );
    } catch (e) {}
  }

  /* elso kep */
  base.src = nextUrl();
  base.style.opacity = '1';
  animate(base);

  if (reduce || IMGS.length < 2) return;

  /* A kovetkezo kepet mar a varakozas alatt letoltjuk, hogy a valtas ne csusszon
     el a halozat miatt - igy a ritmus egyenletes marad. */
  var ahead = null;
  function preloadNext() {
    var url = nextUrl(), im = new Image();
    ahead = {url: url, img: im, ok: false, failed: false};
    im.onload  = function () { ahead.ok = true; };
    im.onerror = function () { ahead.failed = true; };
    im.src = url;
  }

  function swap(url) {
    var nxt = layers[1 - cur], old = layers[cur];
    nxt.src = url;
    nxt.style.transition = 'none';
    nxt.style.opacity = '0';
    void nxt.offsetWidth;
    animate(nxt);
    nxt.style.transition = 'opacity ' + FADE + 'ms ease-in-out';
    old.style.transition = 'opacity ' + FADE + 'ms ease-in-out';
    nxt.style.opacity = '1';
    old.style.opacity = '0';
    cur = 1 - cur;
    preloadNext();                /* a kovetkezo kep mar tolthet */
    schedule(FADE + HOLD);        /* a kovetkezo valtas az athalas utan szamolt 3 mp */
  }

  function step() {
    if (!ahead) { preloadNext(); }
    if (ahead.failed) { preloadNext(); schedule(80); return; }   /* hianyzo kep: tovabb */
    if (ahead.ok) { swap(ahead.url); return; }
    /* meg tolt: megvarjuk, de nem kesleltetjuk tovabb a kelletenel */
    var a = ahead;
    a.img.onload  = function () { if (ahead === a) swap(a.url); };
    a.img.onerror = function () { if (ahead === a) { preloadNext(); schedule(80); } };
  }

  function schedule(delay) {
    window.clearTimeout(timer);
    /* hatterben levo (vagy ugy megnyitott) fulon ne porogjon es ne toltson kepet */
    if (document.hidden) return;
    timer = window.setTimeout(step, delay || HOLD);
  }

  /* hatterben levo fulon ne porogjon tovabb */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) window.clearTimeout(timer); else schedule(HOLD);
  });

  preloadNext();
  schedule(HOLD);
})();
