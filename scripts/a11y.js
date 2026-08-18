/* ZADALOG — accessibility menu ------------------------------------------ */
(function () {
  'use strict';
  var T = window.I18N;
  var KEY = 'zd-a11y';
  var FLAGS = ['font1', 'font2', 'contrast', 'gray', 'motion', 'links', 'font'];
  var state = {};

  try { state = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { state = {}; }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function apply() {
    var root = document.documentElement;
    FLAGS.forEach(function (f) { root.classList.toggle('a11y-' + f, !!state[f]); });

    /* CSS cannot pause SMIL — pause the map's SVG engine directly */
    var map = document.getElementById('worldMap');
    if (map && map.pauseAnimations) {
      if (state.motion) map.pauseAnimations(); else map.unpauseAnimations();
    }
  }

  function toggle(flag) {
    if (flag === 'font1') { state.font1 = !state.font1; if (state.font1) state.font2 = false; }
    else if (flag === 'font2') { state.font2 = !state.font2; if (state.font2) state.font1 = false; }
    else state[flag] = !state[flag];
    save(); apply(); paint();
  }

  function reset() {
    state = {}; save(); apply(); paint();
  }

  var ITEMS = [
    { f: 'font1',    he: 'הגדלת טקסט',        en: 'Larger text' },
    { f: 'font2',    he: 'טקסט גדול מאוד',     en: 'Largest text' },
    { f: 'contrast', he: 'ניגודיות גבוהה',     en: 'High contrast' },
    { f: 'gray',     he: 'גווני אפור',         en: 'Grayscale' },
    { f: 'links',    he: 'הדגשת קישורים',      en: 'Highlight links' },
    { f: 'font',     he: 'פונט קריא',          en: 'Readable font' },
    { f: 'motion',   he: 'עצירת אנימציות',     en: 'Stop animations' }
  ];

  var panel, btn;

  function paint() {
    if (!panel) return;
    var he = T.lang === 'he';
    panel.innerHTML =
      '<div class="a11y__head">' +
        '<b>' + (he ? 'תפריט נגישות' : 'Accessibility') + '</b>' +
        '<button type="button" class="a11y__close" aria-label="' + (he ? 'סגירה' : 'Close') + '">&times;</button>' +
      '</div>' +
      ITEMS.map(function (it) {
        return '<button type="button" class="a11y__item' + (state[it.f] ? ' is-on' : '') +
               '" data-a11y="' + it.f + '" aria-pressed="' + (state[it.f] ? 'true' : 'false') + '">' +
               '<span class="a11y__check" aria-hidden="true"></span>' + (he ? it.he : it.en) + '</button>';
      }).join('') +
      '<button type="button" class="a11y__item a11y__reset" data-a11y-reset>' + (he ? 'איפוס הגדרות' : 'Reset') + '</button>' +
      '<a class="a11y__link" href="/accessibility">' + (he ? 'הצהרת נגישות' : 'Accessibility statement') + '</a>';
  }

  function open(v) {
    panel.classList.toggle('is-open', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    if (v) { paint(); var first = panel.querySelector('.a11y__item'); if (first) first.focus(); }
  }

  function init() {
    btn = document.createElement('button');
    btn.className = 'a11y-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'תפריט נגישות / Accessibility menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">' +
      '<circle cx="12" cy="4.4" r="2.1"/>' +
      '<path d="M12 8.2c-2.5 0-5-.5-7.2-1.2l-.6 1.9c1.8.6 3.7 1 5.6 1.2v2.6L7.6 20l1.9.7 2.3-6h.4l2.3 6 1.9-.7-2.2-7.3v-2.6c1.9-.2 3.8-.6 5.6-1.2l-.6-1.9C17 7.7 14.5 8.2 12 8.2Z"/></svg>';

    panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'תפריט נגישות');

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    btn.addEventListener('click', function () { open(!panel.classList.contains('is-open')); });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('.a11y__close')) { open(false); btn.focus(); return; }
      if (e.target.closest('[data-a11y-reset]')) { reset(); return; }
      var b = e.target.closest('[data-a11y]');
      if (b) toggle(b.dataset.a11y);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) { open(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) {
      /* a repaint may have detached the clicked node — that is an inside click, not an outside one */
      if (!document.contains(e.target)) return;
      if (panel.classList.contains('is-open') && !panel.contains(e.target) && !btn.contains(e.target)) open(false);
    });

    T.onChange(paint);
    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
