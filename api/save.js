const auth = require('./_auth');

/* Publishing writes content.json straight back to the repository. GitHub then
   fires the deploy hook, Vercel rebuilds, and the change is live — no database
   to run and full history of who changed what. */
module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const user = auth.verify(req);
  if (!user) { res.status(401).json({ error: 'not_authenticated' }); return; }

  const token  = process.env.GITHUB_TOKEN;
  const repo   = process.env.GITHUB_REPO;                       /* "owner/name" */
  const branch = process.env.GITHUB_BRANCH || 'main';
  const path   = process.env.CONTENT_PATH  || 'content.json';

  if (!token || !repo) {
    res.status(503).json({
      error: 'publishing_not_configured',
      message: 'Set GITHUB_TOKEN and GITHUB_REPO in the Vercel environment variables to publish from here. Until then, use "Download JSON" and commit the file yourself.'
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || typeof body !== 'object' || !body.contact || !Array.isArray(body.jobs)) {
    res.status(400).json({ error: 'bad_content' });
    return;
  }

  body.updatedAt = new Date().toISOString();
  body.updatedBy = user;

  const api = 'https://api.github.com/repos/' + repo + '/contents/' + path;
  const headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'zadalog-backoffice',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  try {
    /* Need the blob sha of the file we are replacing. */
    let sha;
    const cur = await fetch(api + '?ref=' + encodeURIComponent(branch), { headers });
    if (cur.status === 200) { sha = (await cur.json()).sha; }
    else if (cur.status !== 404) {
      const t = await cur.text();
      res.status(502).json({ error: 'github_read_failed', status: cur.status, detail: t.slice(0, 300) });
      return;
    }

    const put = await fetch(api, {
      method: 'PUT',
      headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
      body: JSON.stringify({
        message: 'Back office: content updated by ' + user,
        content: Buffer.from(JSON.stringify(body, null, 2), 'utf8').toString('base64'),
        branch: branch,
        sha: sha
      })
    });

    if (!put.ok) {
      const t = await put.text();
      res.status(502).json({ error: 'github_write_failed', status: put.status, detail: t.slice(0, 300) });
      return;
    }

    const out = await put.json();
    res.status(200).json({ ok: true, commit: out.commit && out.commit.sha, updatedAt: body.updatedAt });
  } catch (e) {
    res.status(500).json({ error: 'unexpected', detail: String(e && e.message || e).slice(0, 300) });
  }
};
