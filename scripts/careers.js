/* ZADALOG — open positions ---------------------------------------------- */
window.CAREERS = (function () {
  'use strict';
  var T = window.I18N;

  function email() {
    var c = window.ZD_CONTENT && window.ZD_CONTENT.contact;
    return (c && c.email) || 'info@zadalog.com';
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
      return '<article class="job reveal"' + (i % 3 ? ' data-delay="' + (i % 3) + '"' : '') + '>' +
        '<button class="job__head" type="button" aria-expanded="false" data-job="' + i + '">' +
          '<span class="job__title">' + (he ? j.titleHe : j.titleEn) + '</span>' +
          '<span class="job__tags">' +
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
            '<a class="btn btn--primary btn--sm" href="' + mailto(j) + '">' + T.t('jbApply') + '</a>' +
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
