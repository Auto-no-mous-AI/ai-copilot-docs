/**
 * Light / Dark / System color scheme for HonKit (persists in localStorage).
 * Storage key: ai-copilot-color-scheme → "light" | "dark" | "system"
 *
 * Uses event delegation + gitbook page.change so theme controls keep working
 * after HonKit's in-app navigation (no full reload).
 */
(function () {
  var STORAGE_KEY = 'ai-copilot-color-scheme';
  var gitbookHooked = false;

  function getPreference() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === 'light' || v === 'dark' || v === 'system') return v;
    } catch (e) {}
    return 'system';
  }

  function isDarkEffective() {
    var pref = getPreference();
    if (pref === 'dark') return true;
    if (pref === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyToDocument() {
    var pref = getPreference();
    var dark = isDarkEffective();
    var root = document.documentElement;
    root.setAttribute('data-ai-color-scheme', pref);
    root.setAttribute('data-ai-effective', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';

    var book = document.querySelector('.book');
    if (book) {
      book.classList.toggle('ai-copilot-scheme-dark', dark);
      book.classList.toggle('ai-copilot-scheme-light', !dark);
    }

    document.querySelectorAll('.ai-copilot-theme-btn').forEach(function (btn) {
      var t = btn.getAttribute('data-ai-theme');
      var pressed = t === pref;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      btn.classList.toggle('is-active', pressed);
    });
  }

  function closestThemeBtn(el) {
    if (!el || !el.closest) return null;
    return el.closest('.ai-copilot-theme-btn');
  }

  function onDocumentClick(e) {
    var btn = closestThemeBtn(e.target);
    if (!btn) return;
    var v = btn.getAttribute('data-ai-theme');
    if (v !== 'light' && v !== 'dark' && v !== 'system') return;
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch (err) {}
    applyToDocument();
  }

  function hookGitbook() {
    if (gitbookHooked) return;
    var gb;
    try {
      gb = typeof gitbook !== 'undefined' ? gitbook : window.gitbook;
    } catch (e) {
      gb = undefined;
    }
    if (!gb || !gb.events) return;
    var sub = gb.events.on || gb.events.bind;
    if (typeof sub !== 'function') return;
    sub.call(gb.events, 'page.change', function () {
      applyToDocument();
    });
    gitbookHooked = true;
  }

  function init() {
    applyToDocument();
    document.addEventListener('click', onDocumentClick, false);
    hookGitbook();

    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) {
      mq.addEventListener('change', function () {
        if (getPreference() === 'system') applyToDocument();
      });
    } else if (mq.addListener) {
      mq.addListener(function () {
        if (getPreference() === 'system') applyToDocument();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
