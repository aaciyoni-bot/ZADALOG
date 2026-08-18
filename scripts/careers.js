/* ZADALOG — open positions ---------------------------------------------- */
window.CAREERS = (function () {
  'use strict';
  var T = window.I18N;

  function email() {
    var c = window.ZD_CONTENT && window.ZD_CONTENT.contact;
    return (c && c.email) || 'info@zadalog.com';
  }

  function waLink(job) {
    var c = window.ZD_CONTENT && window.ZD_CONTENT.contact;
    var num = (c && c.whatsapp) || '972506095528';
    var he = T.lang === 'he';
    var title = he ? job.titleHe : job.titleEn;
    var msg = he ? 'היי, אני פונה לגבי המשרה: ' + title : 'Hi, I am applying for: ' + title;
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
  }

  function mailto(job) {
    var he = T.lang === 'he';
    var title = job ? (he ? job.titleHe : job.titleEn) : (he ? 'משרה כללית' : 'General application');
    var subject = (he ? 'מועמדות — ' : 'Application — ') + title;
    var body = he
      ? 'שלום,\n\nאני מעוניין/ת להגיש מועמדות לתפקיד: ' + title +
        '\n\nשם:\nטלפון:\nניסיון רלוונטי:\n\n(נא לצרף קורות חיים למייל)\n'
      : 'Hello,\n\nI would like to apply for: ' + title +
        '\n\nName:\nPhone:\nRelevant experience:\n\n(Please attach your CV to this email)\n';
    return 'mailto:' + email() + '?subject=' + encodeURIComponent(subject) +
           '&body=' + encodeURIComponent(body);
  }

  function render() {
    var wrap = document.getElementById('jobsList');
    if (!wrap) return;
    var data = window.ZD_CONTENT;
    var jobs = (data && Array.isArray(data.jobs) ? data.jobs : []).filter(function (j) { return j.open !== false; });
    var he = T.lang === 'he';

    document.getElementById('jobsEmpty').hidden = jobs.length > 0;

    wrap.innerHTML = jobs.map(function (j, i) {
      var reqs = (he ? j.reqHe : j.reqEn) || [];
      var cta = j.wa
        ? '<a class="btn btn--primary btn--sm job__wa" href="' + waLink(j) + '" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 32 32" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3Zm0 23.6c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 0 1 5.4 16C5.4 10.2 10.2 5.4 16 5.4S26.6 10.2 26.6 16 21.8 26.6 16 26.6Z"/></svg>' +
            T.t('jbWa') + '</a>'
        : '<a class="btn btn--primary btn--sm" href="' + mailto(j) + '">' + T.t('jbApply') + '</a>';
      return '<article class="job reveal"' + (i % 3 ? ' data-delay="' + (i % 3) + '"' : '') + '>' +
        '<button class="job__head" type="button" aria-expanded="false" data-job="' + i + '">' +
          '<span class="job__title">' + (he ? j.titleHe : j.titleEn) + '</span>' +
          '<span class="job__tags">' +
            (j.hot ? '<span class="job__tag job__tag--hot">' + T.t('jbHot') + '</span>' : '') +
            '<span class="job__tag">' + (he ? j.locationHe : j.locationEn) + '</span>' +
            '<span class="job__tag">' + (he ? j.typeHe : j.typeEn) + '</span>' +
          '</span>' +
          '<span class="job__chev" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="job__body">' +
          '<div class="job__inner">' +
            '<p>' + (he ? j.descHe : j.descEn) + '</p>' +
            (reqs.length ? '<ul class="job__req">' + reqs.map(function (r) {
              return '<li>' + r + '</li>'; }).join('') + '</ul>' : '') +
            cta +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');

    wrap.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });

    var open = document.getElementById('jbOpenApply');
    if (open) open.href = mailto(null);
  }

  function init() {
    var wrap = document.getElementById('jobsList');
    if (!wrap) return;

    wrap.addEventListener('click', function (e) {
      var head = e.target.closest('.job__head');
      if (!head) return;
      var art = head.parentElement;
      var isOpen = art.classList.toggle('is-open');
      head.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var body = art.querySelector('.job__body');
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
    });

    window.ZD_CONTENT_READY.then(render);
    T.onChange(render);
  }

  return { init: init, render: render };
})();
