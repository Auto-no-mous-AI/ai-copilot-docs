/**
 * Right-column "In this Chapter" mini-nav from h2–h4 in .markdown-section.
 * Rebuilds on HonKit page.change; removes previous scroll/resize listeners.
 */
(function () {
  var HEADING_SEL = 'h2[id], h3[id], h4[id]';
  var gitbookHooked = false;

  var scrollHandler = null;
  var resizeHandler = null;
  var hashHandler = null;
  /** HonKit scrolls `.body-inner`, not `window`. */
  var scrollTarget = null;

  function getScrollContainer() {
    return document.querySelector('.book .book-body .body-inner');
  }

  function headingOffsetInScroller(heading, scroller) {
    if (!scroller) {
      return heading.getBoundingClientRect().top + window.scrollY;
    }
    var h = heading.getBoundingClientRect();
    var s = scroller.getBoundingClientRect();
    return h.top - s.top + scroller.scrollTop;
  }

  function trimText(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function teardown() {
    if (scrollHandler) {
      var st = scrollTarget || window;
      st.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('hashchange', hashHandler);
      scrollHandler = resizeHandler = hashHandler = null;
      scrollTarget = null;
    }
  }

  function init() {
    teardown();

    var section = document.querySelector('.book .page-inner .markdown-section');
    var wrap = document.querySelector('.ai-copilot-chapter-toc-wrap');
    var nav = document.getElementById('ai-copilot-chapter-toc');
    if (!section || !wrap || !nav) return;

    var nodes = section.querySelectorAll(HEADING_SEL);
    if (!nodes.length) {
      wrap.setAttribute('hidden', '');
      return;
    }

    var ul = document.createElement('ul');
    ul.className = 'ai-copilot-chapter-toc__list';

    for (var i = 0; i < nodes.length; i++) {
      var h = nodes[i];
      var id = h.id;
      if (!id) continue;

      var tag = h.tagName.toLowerCase();
      var level = tag === 'h2' ? 0 : tag === 'h3' ? 1 : 2;

      var li = document.createElement('li');
      li.className =
        'ai-copilot-chapter-toc__item ai-copilot-chapter-toc__item--lvl' + level;
      li.dataset.targetId = id;

      var a = document.createElement('a');
      a.href = '#' + id;
      a.className = 'ai-copilot-chapter-toc__link';
      a.textContent = trimText(h);

      (function (headingId) {
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          var target = document.getElementById(headingId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (history.replaceState) {
              history.replaceState(null, '', '#' + headingId);
            }
          }
        });
      })(id);

      li.appendChild(a);
      ul.appendChild(li);
    }

    if (!ul.children.length) {
      wrap.setAttribute('hidden', '');
      return;
    }

    nav.innerHTML = '';
    var title = document.createElement('div');
    title.className = 'ai-copilot-chapter-toc__title';
    title.innerHTML =
      '<span class="ai-copilot-chapter-toc__title-icon" aria-hidden="true"></span>In this Chapter';
    nav.appendChild(title);
    nav.appendChild(ul);
    wrap.removeAttribute('hidden');

    var mapped = [];
    nav.querySelectorAll('.ai-copilot-chapter-toc__item').forEach(function (li) {
      var id = li.dataset.targetId;
      var el = document.getElementById(id);
      if (el) mapped.push({ id: id, el: el, li: li });
    });
    if (!mapped.length) return;

    function setActive(id) {
      mapped.forEach(function (h) {
        h.li.classList.toggle('is-active', h.id === id);
      });
    }

    var scroller = getScrollContainer();

    function updateActive() {
      var scrollTop = scroller ? scroller.scrollTop : window.scrollY;
      var line = scrollTop + 110;
      var current = mapped[0].id;
      for (var j = 0; j < mapped.length; j++) {
        var top = headingOffsetInScroller(mapped[j].el, scroller);
        if (top <= line) current = mapped[j].id;
      }
      setActive(current);
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    }

    scrollHandler = onScroll;
    resizeHandler = onScroll;
    hashHandler = function () {
      var h = (location.hash || '').replace(/^#/, '');
      if (h && document.getElementById(h)) setActive(h);
    };

    scrollTarget = scroller || window;
    scrollTarget.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });
    updateActive();

    window.addEventListener('hashchange', hashHandler, false);
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
    sub.call(gb.events, 'page.change', init);
    gitbookHooked = true;
  }

  function boot() {
    init();
    hookGitbook();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
