/* Nyelvi preferencia: a fejléc EN/HU váltójára kattintva megjegyzi a választást
   (localStorage), hogy a főoldal automatikus magyar-indítása ne írja felül. */
(function () {
  var K = 'lang';
  document.addEventListener('click', function (e) {
    var t = e.target, a = (t && t.closest) ? t.closest('.lang-switch a') : null;
    if (!a) return;
    var p;
    try { p = new URL(a.href).pathname; } catch (_) { p = a.getAttribute('href') || ''; }
    try { localStorage.setItem(K, /^\/hu(\/|$)/.test(p) ? 'hu' : 'en'); } catch (_) {}
  }, true);
})();
