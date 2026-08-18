/* ZADALOG — back office ------------------------------------------------- */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var state = null;      /* working copy of content.json */
  var dirty = false;

  /* ------------------------------------------------------------------ */
  /* session                                                             */
  /* ------------------------------------------------------------------ */

  function api(path, opts) {
    return fetch(path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts || {}))
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, body: j }; }); });
  }

  function boot() {
    api('/api/session').then(function (r) {
      if (r.body && r.body.authenticated) openConsole(r.body);
      else showGate(r.body);
    }).catch(function () {
      showGate({ configured: false, offline: true });
    });
  }

  function showGate(info) {
    $('gate').hidden = false;
    $('console').hidden = true;
    if (info && info.offline) {
      msg('אין תשובה מהשרת. הבק אופיס עובד רק על הדומיין החי (Vercel), לא בתצוגה מקומית של קבצים.', false);
    } else if (info && !info.configured) {
      msg('הבק אופיס עדיין לא הוגדר. יש להגדיר ADMIN_USER, ADMIN_PASS ו‑SESSION_SECRET במשתני הסביבה של הפרויקט ב‑Vercel ואז לפרוס מחדש.', false);
    }
  }

  function msg(text, ok) {
    var el = $('gMsg');
    el.textContent = text;
    el.classList.toggle('is-ok', Boolean(ok));
  }

  $('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = $('gBtn');
    btn.disabled = true; msg('בודק…', true);
    api('/api/login', { method: 'POST', body: JSON.stringify({ user: $('gUser').value, pass: $('gPass').value }) })
      .then(function (r) {
        btn.disabled = false;
        if (r.ok) { $('gPass').value = ''; boot(); return; }
        if (r.status === 401) msg('שם משתמש או סיסמה שגויים.', false);
        else if (r.status === 429) msg('יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.', false);
        else msg((r.body && r.body.message) || 'שגיאה בהתחברות.', false);
      })
      .catch(function () { btn.disabled = false; msg('שגיאת רשת.', false); });
  });

  $('aLogout').addEventListener('click', function () {
    if (dirty && !confirm('יש שינויים שלא פורסמו. לצאת בכל זאת?')) return;
    api('/api/logout', { method: 'POST' }).then(function () { location.reload(); });
  });

  /* ------------------------------------------------------------------ */
  /* console                                                             */
  /* ------------------------------------------------------------------ */

  function openConsole(session) {
    $('gate').hidden = true;
    $('console').hidden = false;
    $('aWho').textContent = session.user ? '· ' + session.user : '';

    if (!session.canPublish) {
      note('פרסום ישיר מכאן עדיין לא מחובר. הגדירו <code>GITHUB_TOKEN</code> ו‑<code>GITHUB_REPO</code> ב‑Vercel — עד אז אפשר להשתמש ב״הורדת JSON״ ולהעלות את הקובץ לריפו ידנית.', 'warn');
    }

    fetch('/content.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) { state = data; renderAll(); })
      .catch(function () { note('לא הצלחתי לטעון את content.json.', 'bad'); });
  }

  function note(html, kind) {
    var el = $('aNote');
    el.hidden = false;
    el.innerHTML = html;
    el.className = 'anote' + (kind ? ' is-' + kind : '');
  }

  function markDirty() {
    dirty = true;
    $('aDirty').hidden = false;
  }

  window.addEventListener('beforeunload', function (e) {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = '';
  });

  /* tabs */
  document.querySelector('.atabs').addEventListener('click', function (e) {
    var b = e.target.closest('.atab'); if (!b) return;
    document.querySelectorAll('.atab').forEach(function (t) { t.classList.toggle('is-on', t === b); });
    document.querySelectorAll('.apanel').forEach(function (p) {
      p.classList.toggle('is-on', p.dataset.panel === b.dataset.tab);
    });
  });

  /* ------------------------------------------------------------------ */
  /* rendering                                                           */
  /* ------------------------------------------------------------------ */

  var CONTACT_FIELDS = [
    ['cPhoneDisplay', 'phoneDisplay'], ['cPhoneHref', 'phoneHref'],
    ['cWhatsapp', 'whatsapp'], ['cEmail', 'email'],
    ['cAddressHe', 'addressHe'], ['cAddressEn', 'addressEn'],
    ['cHoursHe', 'hoursHe'], ['cHoursEn', 'hoursEn']
  ];

  var STAT_LABELS = ['מכולות בשנה', 'נמלי מוצא', 'פריקה בתוך', 'שביעות רצון'];

  function renderAll() { renderContact(); renderStats(); renderJobs(); }

  function renderContact() {
    state.contact = state.contact || {};
    CONTACT_FIELDS.forEach(function (pair) {
      var el = $(pair[0]);
      el.value = state.contact[pair[1]] || '';
      el.oninput = function () { state.contact[pair[1]] = el.value.trim(); markDirty(); };
    });
  }

  function renderStats() {
    state.stats = Array.isArray(state.stats) ? state.stats : [];
    while (state.stats.length < 4) state.stats.push({ key: 'stat' + (state.stats.length + 1), value: 0, suffix: '' });

    $('aStats').innerHTML = state.stats.slice(0, 4).map(function (s, i) {
      return '<div class="astat">' +
        '<span class="astat__label">' + (STAT_LABELS[i] || s.key) + '</span>' +
        '<label class="field"><span>ערך</span><input type="number" data-stat="' + i + '" data-f="value" value="' + s.value + '"></label>' +
        '<label class="field"><span>סיומת</span><input data-stat="' + i + '" data-f="suffix" value="' + (s.suffix || '') + '"></label>' +
      '</div>';
    }).join('');

    $('aStats').oninput = function (e) {
      var el = e.target; if (!el.dataset.stat) return;
      var s = state.stats[+el.dataset.stat];
      s[el.dataset.f] = el.dataset.f === 'value' ? (+el.value || 0) : el.value;
      markDirty();
    };
  }

  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function renderJobs() {
    state.jobs = Array.isArray(state.jobs) ? state.jobs : [];
    $('aJobs').innerHTML = state.jobs.map(function (j, i) {
      return '<article class="ajob' + (j.open === false ? ' is-closed' : '') + '" data-i="' + i + '">' +
        '<div class="ajob__top">' +
          '<span class="ajob__id">' + esc(j.id || 'job-' + (i + 1)) + '</span>' +
          '<div class="ajob__tools">' +
            '<label class="switch"><input type="checkbox" data-j="' + i + '" data-f="open"' + (j.open === false ? '' : ' checked') + '>' +
              '<span class="switch__ui"></span><span>מוצגת באתר</span></label>' +
            '<button class="alink" type="button" data-move="' + i + '" data-dir="-1">↑ למעלה</button>' +
            '<button class="alink" type="button" data-move="' + i + '" data-dir="1">↓ למטה</button>' +
            '<button class="alink alink--danger" type="button" data-del="' + i + '">מחיקה</button>' +
          '</div>' +
        '</div>' +
        '<div class="agrid">' +
          fld(i, 'titleHe', 'שם התפקיד (עברית)', j.titleHe) +
          fld(i, 'titleEn', 'שם התפקיד (אנגלית)', j.titleEn, 'ltr') +
          fld(i, 'locationHe', 'מיקום (עברית)', j.locationHe) +
          fld(i, 'locationEn', 'מיקום (אנגלית)', j.locationEn, 'ltr') +
          fld(i, 'typeHe', 'היקף (עברית)', j.typeHe) +
          fld(i, 'typeEn', 'היקף (אנגלית)', j.typeEn, 'ltr') +
        '</div>' +
        '<div class="agrid">' +
          area(i, 'descHe', 'תיאור (עברית)', j.descHe) +
          area(i, 'descEn', 'תיאור (אנגלית)', j.descEn, 'ltr') +
          area(i, 'reqHe', 'דרישות (עברית) — שורה לכל דרישה', (j.reqHe || []).join('\n'), '', 'areq') +
          area(i, 'reqEn', 'דרישות (אנגלית) — שורה לכל דרישה', (j.reqEn || []).join('\n'), 'ltr', 'areq') +
        '</div>' +
      '</article>';
    }).join('');
  }

  function fld(i, f, label, v, dir) {
    return '<label class="field"><span>' + label + '</span>' +
      '<input data-j="' + i + '" data-f="' + f + '"' + (dir ? ' dir="' + dir + '"' : '') +
      ' value="' + esc(v) + '"></label>';
  }
  function area(i, f, label, v, dir, cls) {
    return '<label class="field"><span>' + label + '</span>' +
      '<textarea data-j="' + i + '" data-f="' + f + '"' + (dir ? ' dir="' + dir + '"' : '') +
      (cls ? ' class="' + cls + '"' : '') + ' rows="4">' + esc(v) + '</textarea></label>';
  }

  $('aJobs').addEventListener('input', function (e) {
    var el = e.target; if (el.dataset.j === undefined) return;
    var job = state.jobs[+el.dataset.j], f = el.dataset.f;
    if (f === 'reqHe' || f === 'reqEn') {
      job[f] = el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    } else {
      job[f] = el.value;
    }
    markDirty();
  });

  $('aJobs').addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset.f === 'open') {
      state.jobs[+el.dataset.j].open = el.checked;
      el.closest('.ajob').classList.toggle('is-closed', !el.checked);
      markDirty();
    }
  });

  $('aJobs').addEventListener('click', function (e) {
    var del = e.target.closest('[data-del]');
    if (del) {
      var i = +del.dataset.del;
      if (!confirm('למחוק את המשרה "' + (state.jobs[i].titleHe || '') + '"?')) return;
      state.jobs.splice(i, 1); markDirty(); renderJobs(); return;
    }
    var mv = e.target.closest('[data-move]');
    if (mv) {
      var from = +mv.dataset.move, to = from + (+mv.dataset.dir);
      if (to < 0 || to >= state.jobs.length) return;
      var tmp = state.jobs[from]; state.jobs[from] = state.jobs[to]; state.jobs[to] = tmp;
      markDirty(); renderJobs();
    }
  });

  $('aAddJob').addEventListener('click', function () {
    state.jobs.push({
      id: 'job-' + Date.now().toString(36),
      open: true,
      titleHe: 'תפקיד חדש', titleEn: 'New role',
      locationHe: 'אשדוד', locationEn: 'Ashdod',
      typeHe: 'משרה מלאה', typeEn: 'Full time',
      descHe: '', descEn: '', reqHe: [], reqEn: []
    });
    markDirty(); renderJobs();
    var last = $('aJobs').lastElementChild;
    if (last) last.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ------------------------------------------------------------------ */
  /* publish                                                             */
  /* ------------------------------------------------------------------ */

  $('aPublish').addEventListener('click', function () {
    var btn = $('aPublish');
    btn.disabled = true; btn.textContent = 'מפרסם…';
    api('/api/save', { method: 'POST', body: JSON.stringify(state) })
      .then(function (r) {
        btn.disabled = false; btn.textContent = 'פרסום';
        if (r.ok) {
          dirty = false; $('aDirty').hidden = true;
          note('פורסם. Vercel בונה מחדש עכשיו — השינוי יופיע באתר תוך כדקה.', null);
        } else if (r.status === 401) {
          note('פג תוקף ההתחברות. רעננו את הדף והתחברו שוב.', 'bad');
        } else {
          note('הפרסום נכשל: ' + ((r.body && (r.body.message || r.body.detail || r.body.error)) || r.status), 'bad');
        }
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'פרסום';
        note('שגיאת רשת בפרסום.', 'bad');
      });
  });

  $('aDownload').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  });

  boot();
})();
