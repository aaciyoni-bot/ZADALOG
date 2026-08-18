const auth = require('./_auth');

/* Very small in-memory throttle. Serverless instances are short lived, so this
   slows down a burst rather than being a complete lockout — good enough to make
   online guessing impractical against a strong password. */
const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRIES = 8;

function tooMany(ip) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) { attempts.set(ip, { start: now, n: 1 }); return false; }
  rec.n += 1;
  return rec.n > MAX_TRIES;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  if (!auth.configured()) {
    res.status(503).json({
      error: 'not_configured',
      message: 'Set ADMIN_USER, ADMIN_PASS and SESSION_SECRET in the Vercel project environment variables, then redeploy.'
    });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) { res.status(429).json({ error: 'too_many_attempts' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const okUser = auth.safeEqual(body.user || '', process.env.ADMIN_USER);
  const okPass = auth.safeEqual(body.pass || '', process.env.ADMIN_PASS);
  if (!okUser || !okPass) { res.status(401).json({ error: 'bad_credentials' }); return; }

  attempts.delete(ip);
  auth.setCookie(res, auth.issue(process.env.ADMIN_USER), auth.TTL_MS / 1000);
  res.status(200).json({ ok: true, user: process.env.ADMIN_USER });
};
