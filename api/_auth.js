/* Shared session helpers for the ZADALOG back office.
   The password never reaches the browser: it lives in Vercel env vars and is
   only ever compared server side. The browser gets a signed, HttpOnly cookie. */
const crypto = require('crypto');

const COOKIE = 'zd_admin';
const TTL_MS = 8 * 60 * 60 * 1000;           /* 8 hours */

function secret() {
  return process.env.SESSION_SECRET || '';
}

function configured() {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASS && secret());
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64url(str) {
  return Buffer.from(String(str).replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/* Constant-time compare that does not leak length through an early return. */
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function issue(user) {
  const payload = b64url(JSON.stringify({ u: user, exp: Date.now() + TTL_MS }));
  return payload + '.' + sign(payload);
}

function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  const hit = raw.split(';').map(s => s.trim()).find(s => s.indexOf(name + '=') === 0);
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

/* Returns the session user, or null. */
function verify(req) {
  if (!configured()) return null;
  const token = readCookie(req, COOKIE);
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return null;
  const payload = token.slice(0, dot), mac = token.slice(dot + 1);
  let expected;
  try { expected = sign(payload); } catch (e) { return null; }
  if (mac.length !== expected.length || !safeEqual(mac, expected)) return null;
  let data;
  try { data = JSON.parse(unb64url(payload)); } catch (e) { return null; }
  if (!data || !data.exp || Date.now() > data.exp) return null;
  return data.u;
}

function setCookie(res, value, maxAgeSec) {
  res.setHeader('Set-Cookie',
    COOKIE + '=' + encodeURIComponent(value) +
    '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=' + maxAgeSec);
}

module.exports = { COOKIE, TTL_MS, configured, issue, verify, setCookie, safeEqual };
