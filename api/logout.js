const auth = require('./_auth');

module.exports = async (req, res) => {
  auth.setCookie(res, '', 0);
  res.status(200).json({ ok: true });
};
