const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  (req, res) => {
    return res.redirect(process.env.CLIENT_URL);
  }
);

router.post('/logout', (req, res, next) => {
  console.log('logging out route hit');

  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      console.log('session destroyed');
    });
    return res
      .status(200)
      .clearCookie('connect.sid', {
        path: '/',
      })
      .json('logged out');
  });
});

module.exports = router;
