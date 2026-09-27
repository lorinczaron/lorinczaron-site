/* =============================================================
   EN / HU nyelvváltó (kliensoldali, gyors verzió)
   - A magyar szövegeket helyben cseréli be szelektorok alapján.
   - A választást localStorage-ben jegyzi meg; első látogatáskor
     a böngésző nyelve dönt (magyar böngésző -> HU, egyébként EN).
   - A váltó gombot a fejlécbe injektálja, külön HTML-szerkesztés nélkül.
   - A mű-panel (dinamikusan épül a main.js-ből) feliratait futásidőben fordítja.
   Megjegyzés: ez SEO szempontból gyengébb, mint külön /hu/ oldalak;
   későbbi lépésben átalakítható valódi /hu/ URL-ekre.
   ============================================================= */
(function () {
  'use strict';

  var STORE = 'lorincz_lang';
  function getStored() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function setStored(v) { try { localStorage.setItem(STORE, v); } catch (e) {} }
  function prefersHu() {
    var ls = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    return ls.some(function (l) { return String(l).toLowerCase().indexOf('hu') === 0; });
  }

  var lang = getStored() || (prefersHu() ? 'hu' : 'en');

  // Oldalfelismerés kiterjesztéstől függetlenül: helyben "statusintermedius.html",
  // a Netlify "szép URL"-nél viszont "/statusintermedius" (.html nélkül) érkezik.
  var seg = (location.pathname.split('/').pop() || '').toLowerCase();
  seg = seg.split('?')[0].split('#')[0].replace(/\.html?$/, '');
  var file = seg || 'index';

  /* ---------- Magyar szövegek ---------- */
  var ABOUT = [
    'Elképzelt, megrendezett jeleneteket fest: hétköznapi tárgyakat és csendes tereket, amelyek egyszerre hatnak találtnak és felépítettnek. Bár másodlagosnak tűnik, mégis elsőként a tökéletességet szeretné éreztetni. A természet önmagában tökéletes, és tökéletes a fénye is; ezt realista stílussal, finom fényekkel, arányokkal és perspektívával éri el, nyugodt, rendezett és harmonikus alapot építve.',
    'A feszültséget és a történetet az emberi szál hozza. Bár senki nem jelenik meg rajtuk, ezek a jelenetek mégis portrék: gondolatok, tapasztalatok és érzések portréi, az emberi létezés lenyomatai. A rendezett felszín alatt apró egyensúlytalanságokat, függő és bizonytalan állapotokat, magyarázatnak ellenálló tárgyakat és helyzeteket keres. A jelenetek fiktívek, és szándékosan sosem teljesen beazonosíthatók, hogy mindenki a saját tapasztalatain és emlékein át kapcsolódjon hozzájuk, és találjon bennük valamit, ami már eleve az övé.',
    'Minden festményt a digitális kísérletezés hosszú szakasza előz meg: képek végtelen áramlása, amelyben megrendezi és megkomponálja elképzelt jeleneteit. Ami a képernyőn végtelenül változik, a festékben egyszerivé válik. Analóg film, festészet és építészeti látványtervezés adja a hátteret, amely élessé teszi a kompozícióra és a fényre való figyelmét, és minden kész mű megőrzi az alkotó kéz nyomát.'
  ];
  var SUBTITLE = 'Digitális konstrukciók alapján készült olajfestmények';
  var INTRO = {
    'statusintermedius': [
      'Hétköznapi tárgyak csendéletei: edények, eszközök, gyümölcs, papír és üveg, olyan jelenetekbe rendezve, amelyek egyszerre hatnak találtnak és felépítettnek. Felszínük nyugodt és rendezett, realista formára, fényre és arányokra épül, arra a tökéletességre, amelyet Lőrincz a természetben talál.',
      'Ezen a renden belül az emberi szál hozza a feszültséget. Ami véletlennek látszik, szándékossá válik, ami egyszerűnek tűnik, mélyebb szerkezetet rejt, és az apró egyensúlytalanságok feloldatlanul tartják az elrendezést. Ezek nem vanitasok vagy jelképek: a tárgyak gondolatokat, emlékeket és érzéseket hordoznak, egy távozott jelenlét lenyomatait. Fiktívek és sosem teljesen beazonosíthatók, így mindenki a saját tapasztalatán át kapcsolódhat hozzájuk, és találhat bennük valamit, ami már az övé.'
    ],
    'vestigia': [
      'Balkonok mint kicsi, lakatlan színpadok, ahol a fény, a kilátás és az otthagyott tárgyak alkotják a saját csendes rendjüket. A valóságban gyökereznek, mégis kissé elemelkednek tőle; realista perspektívára és a természetes fény tökéletességére épülnek.',
      'A történetet a hiány adja. Senki sem jelenik meg, a balkonok mégis telve vannak jelenléttel, függő és bizonytalan állapotban, ahol a látható a láthatatlannal találkozik. Hihetők, de fiktívek, szándékosan sosem teljesen beazonosíthatók; mindegyik küszöbbé válik, amelyet a néző a saját emlékeivel lép át, felismerve valamit, amit előbb érez, mint hogy megnevezhetné.'
    ],
    'machines': [
      'Gépi formák állnak össze kompozíciókká, amelyek egyszerre hatnak megtervezettnek és rögtönzöttnek. A látszólagos káosz alatt a vonal, a felület és a fény realista rendje húzódik, egy mögöttes szerkezet, amely működést sejtet akkor is, ha a funkció homályban marad.',
      'Leplek borulnak a gépezetre, épp annyit takarva, amennyit felfednek, és az élessé tett geometriát valami már-már élővé oldják. A jelenetek a portré és az építészet közt lebegnek: nem a technológiáról szólnak, hanem arról, hogyan tartanak össze egymástól idegen részek egy törékeny egyensúlyban. Fiktívek, és épp csak megfejthetők; arra hívják a nézőt, hogy megérezze a jelentést és a feszültséget, amelyet mindenki a saját tapasztalatán át olvas.'
    ]
  };
  var TITLE_HU = { 'about': 'rólam — Aron Lorincz' };

  /* ---------- Fordítási célok ---------- */
  var T = [];
  function q(s) { return document.querySelector(s); }
  function qa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function pushHTML(el, hu) { if (el) T.push({ get: function () { return el.innerHTML; }, set: function (v) { el.innerHTML = v; }, hu: hu }); }
  function pushTC(el, hu) { if (el) T.push({ get: function () { return el.textContent; }, set: function (v) { el.textContent = v; }, hu: hu }); }
  function pushNode(n, hu) { if (n) T.push({ get: function () { return n.nodeValue; }, set: function (v) { n.nodeValue = v; }, hu: hu }); }

  function collect() {
    // Közös: navigáció, lábléc
    // A menü "about" linkje lehet about.html (helyben) vagy /about (Netlify szép URL) — mindkettőre illesztünk.
    var navAbout = qa('.site-nav a').filter(function (a) { return /(^|\/)about(\.html)?\/?$/i.test(a.getAttribute('href') || ''); })[0];
    pushTC(navAbout, 'rólam');
    var fh = qa('.footer-cols h4');
    if (fh[0]) pushTC(fh[0], 'műterem');
    if (fh[1]) pushTC(fh[1], 'kapcsolat');
    pushHTML(q('.copyright'), 'minden jog fenntartva &copy; L&#337;rincz &Aacute;ron - 2026');

    // Főoldal
    if (file === 'index') {
      pushTC(q('.hero-text h3'), 'lassú jelenlét egy gyors világban');
    }

    // Rólam oldal
    if (file === 'about') {
      pushTC(q('.about-title'), 'Lőrincz víziója');
      var ps = qa('.vision-text > p');
      if (ps[0]) pushHTML(ps[0], '<strong>Lőrincz Áron</strong> (Aron Lorincz) Budapesten élő és alkotó kortárs olajfestő.');
      for (var i = 0; i < ABOUT.length; i++) { if (ps[i + 1]) pushHTML(ps[i + 1], ABOUT[i]); }

      var sums = qa('.cv-acc summary');
      var cvh = ['VÉGZETTSÉG', 'KIÁLLÍTÁSOK', 'DÍJAK, PUBLIKÁCIÓK, ELŐADÁSOK'];
      sums.forEach(function (s, idx) { if (cvh[idx]) pushTC(s, cvh[idx]); });

      pushTC(q('.contact-split h2'), 'Kapcsolat');

      // Kontakt-űrlap (a beviteli mezőket nem bántjuk: csak a felirat-szövegeket)
      var f = document.getElementById('contact-form');
      if (f) {
        pushTC(f.querySelector('.form-label'), 'Név');
        [['first', 'Keresztnév'], ['last', 'Vezetéknév'], ['email', 'E-mail'], ['message', 'Üzenet']].forEach(function (pair) {
          var input = f.querySelector('[name="' + pair[0] + '"]');
          if (!input) return;
          var label = input.closest ? input.closest('label') : null;
          if (!label) return;
          var tn = label.firstChild;
          if (tn && tn.nodeType === 3) pushNode(tn, pair[1] + ' ');
          var span = label.querySelector('span');
          if (span) pushTC(span, '(kötelező)');
        });
        pushTC(f.querySelector('button[type="submit"]'), 'KÜLDÉS');
      }
    }

    // Galéria oldalak
    if (INTRO[file]) {
      pushTC(q('.page-subtitle'), SUBTITLE);
      var ip = qa('.intro-text p');
      INTRO[file].forEach(function (txt, idx) { if (ip[idx]) pushHTML(ip[idx], txt); });
      pushTC(q('.section-head'), 'Részletek');
    }
  }

  var EN_TITLE = document.title;

  function applyLang(l) {
    T.forEach(function (t) {
      if (!('_o' in t)) t._o = t.get();
      t.set(l === 'hu' ? t.hu : t._o);
    });
    document.documentElement.lang = l;
    if (l === 'hu' && TITLE_HU[file]) document.title = TITLE_HU[file];
    else document.title = EN_TITLE;
    translateDynamic(l);
    window.__lorinczLang = l;
    updateSwitcher(l);
  }

  /* ---------- Dinamikus (mű-panel) ---------- */
  var SOLD_EN = 'sold · private collection', SOLD_HU = 'eladva · magángyűjtemény';
  var SEC = { 'Detail views': 'Részletek', 'Progress stages': 'Munkafázisok', 'Exhibition': 'Kiállítás', 'Details': 'Részletek' };
  function translateDynamic(l) {
    if (l === 'hu') {
      var back = q('.ap-back');
      if (back && back.textContent.indexOf('Vissza') < 0) back.textContent = '← Vissza a galériához';
      qa('.ap-section h3').forEach(function (h) { if (SEC[h.textContent]) h.textContent = SEC[h.textContent]; });
      var ph = q('.progress-head');
      if (ph && /progress/i.test(ph.textContent)) ph.textContent = 'Munkafázisok';
      qa('.fw-sold, .ap-sold').forEach(function (e) { if (e.textContent !== SOLD_HU) e.textContent = SOLD_HU; });
    } else {
      var back2 = q('.ap-back');
      if (back2 && back2.textContent.indexOf('Back to gallery') < 0) back2.textContent = '← Back to gallery';
      var ph2 = q('.progress-head');
      if (ph2 && /Munkafázisok/.test(ph2.textContent)) ph2.textContent = 'progress';
      qa('.fw-sold, .ap-sold').forEach(function (e) { if (e.textContent !== SOLD_EN) e.textContent = SOLD_EN; });
    }
  }

  /* ---------- Váltó gomb ---------- */
  function buildSwitcher() {
    var host = q('.site-nav') || q('.header-inner');
    if (!host || q('.lang-switch')) return;
    var w = document.createElement('div');
    w.className = 'lang-switch';
    ['en', 'hu'].forEach(function (code, i) {
      if (i) { var sep = document.createElement('span'); sep.className = 'sep'; sep.textContent = '/'; w.appendChild(sep); }
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lang-btn';
      b.setAttribute('data-lang', code);
      b.textContent = code.toUpperCase();
      b.addEventListener('click', function () { setStored(code); applyLang(code); });
      w.appendChild(b);
    });
    host.appendChild(w);
  }
  function updateSwitcher(l) {
    qa('.lang-switch .lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === l);
    });
  }

  /* ---------- Indítás ---------- */
  collect();
  buildSwitcher();
  applyLang(lang);

  // A mű-panelt a main.js dinamikusan építi; figyeljük a DOM-ot,
  // hogy a feliratok magyarul jelenjenek meg megnyitáskor (mobil "progress" is).
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { translateDynamic(window.__lorinczLang || lang); });
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();
