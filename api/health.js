/* Deployment health — shape checks only, no values ever leave the server.
   Lets us diagnose a mistyped dashboard variable without a login attempt. */
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  function shape(name, minLen) {
    var v = process.env[name];
    if (!v) return { set: false };
    return {
      set: true,
      trimmed: v === v.trim(),           /* false → stray space pasted in */
      expectedLength: v.trim().length >= (minLen || 1)
    };
  }

  res.status(200).json({
    adminUser: shape('ADMIN_USER', 4),
    adminPass: shape('ADMIN_PASS', 4),
    sessionSecret: shape('SESSION_SECRET', 32),
    githubRepo: shape('GITHUB_REPO', 10),
    githubToken: shape('GITHUB_TOKEN', 20)
  });
};
