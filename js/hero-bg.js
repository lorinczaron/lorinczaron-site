/* A nyitolap hero-hattere: a kepek veletlen sorrendben valtjak egymast, atlatszo
   athalassal. A lista a webpage/images/home/hero/ mappa tartalma - ha Aron torol
   vagy betesz oda kepet, ezt a tombot ujra kell generalni (tools: gen_hero_js.py).
   A kepek 2500-2560 px szelesek, hogy nagy monitoron is elesek legyenek; a build
   ezt a mappat NEM kicsinyiti. prefers-reduced-motion eseten nincs valtas; a sorrend minden betolteskor mas. */
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

  var PER_IMAGE = 4000;  /* ennyi ido jut EGY kepre, az athalassal egyutt (ms) */
  var FADE      = 1200;  /* ebbol ennyi a ket kep kozti athalas */
  var HOLD      = Math.max(300, PER_IMAGE - FADE - 60);   /* a mozdulatlan resz */

  var base = document.querySelector('.hero-img');
  if (!base || !IMGS.length) return;

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

  base.src = nextUrl();

  var still = IMGS.length < 2 ||
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (still) return;

  var hero = base.parentNode;
  if (!hero) return;

  /* egy felso reteg: ide toltjuk a kovetkezo kepet, majd ide halunk at */
  var top = document.createElement('img');
  top.alt = '';
  top.setAttribute('aria-hidden', 'true');
  top.decoding = 'async';
  top.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
    'object-fit:cover;opacity:0;z-index:0;transition:opacity ' + FADE + 'ms ease-in-out;';
  hero.insertBefore(top, base.nextSibling);

  var timer = null;

  function settle(url) {
    /* a felso reteget atmenet nelkul visszatesszuk lathatatlanra,
       miutan az also mar ugyanazt a kepet mutatja */
    base.src = url;
    top.style.transition = 'none';
    top.style.opacity = '0';
    void top.offsetWidth;                /* kenyszeritett ujraszamolas */
    top.style.transition = 'opacity ' + FADE + 'ms ease-in-out';
    schedule();
  }

  function step() {
    var url = nextUrl();
    var pre = new Image();
    pre.onload = function () {
      top.src = url;
      void top.offsetWidth;
      top.style.opacity = '1';
      window.setTimeout(function () { settle(url); }, FADE + 60);
    };
    pre.onerror = function () { schedule(); };   /* hianyzo kep: tovabb a kovetkezore */
    pre.src = url;
  }

  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(step, HOLD);
  }

  /* hatterben levo fulon ne porgessen tovabb */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) window.clearTimeout(timer); else schedule();
  });

  schedule();
})();
