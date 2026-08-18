const auth = require('./_auth');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const user = auth.verify(req);
  res.status(200).json({
    authenticated: Boolean(user),
    user: user || null,
    configured: auth.configured(),
    canPublish: Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO)
  });
};
