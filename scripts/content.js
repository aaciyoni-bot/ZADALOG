/* ZADALOG — editable content, loaded from /content.json ------------------
   Everything the back office can change lives in that one file. The markup
   carries sensible defaults, so the site is still correct if the fetch fails. */
window.ZD_CONTENT = null;

window.ZD_CONTENT_READY = fetch('/content.json', { cache: 'no-cache' })
  .then(function (r) { return r.ok ? r.json() : null; })
  .catch(function () { return null; })
  .then(function (data) {
    if (!data) return null;
    window.ZD_CONTENT = data;
    applyStats(data);
    return data;
  });

/* Headline figures are read by the counter animation, so they must be in place
   before it starts — main.js waits on ZD_CONTENT_READY for exactly this. */
function applyStats(data) {
  if (!Array.isArray(data.stats)) return;
  var dds = document.querySelectorAll('.hero__stats dd[data-count]');
  data.stats.forEach(function (s, i) {
    var el = dds[i];
    if (!el || typeof s.value !== 'number') return;
    el.dataset.count = s.value;
    el.dataset.suffix = s.suffix || '';
  });
}

/* Contact details appear in several places and in both languages, so they are
   re-applied after every language switch. */
window.ZD_APPLY_CONTACT = function () {
  var d = window.ZD_CONTENT;
  if (!d || !d.contact) return;
  var c = d.contact, he = document.documentElement.lang === 'he';

  document.querySelectorAll('[data-ct="phone"]').forEach(function (el) {
    el.textContent = c.phoneDisplay || el.textContent;
    if (c.phoneHref) el.href = 'tel:' + c.phoneHref;
  });
  document.querySelectorAll('[data-ct="email"]').forEach(function (el) {
    if (!c.email) return;
    el.textContent = c.email;
    el.href = 'mailto:' + c.email;
  });
  document.querySelectorAll('[data-ct="address"]').forEach(function (el) {
    var v = he ? c.addressHe : c.addressEn;
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-ct="hours"]').forEach(function (el) {
    var v = he ? c.hoursHe : c.hoursEn;
    if (v) el.textContent = v;
  });

  var wa = document.getElementById('waBtn');
  if (wa && c.whatsapp) {
    wa.href = 'https://wa.me/' + c.whatsapp + '?text=' + encodeURIComponent(
      he ? 'שלום, אשמח לקבל הצעת מחיר לשילוח.' : 'Hi, I would like a freight quote.');
  }
};
