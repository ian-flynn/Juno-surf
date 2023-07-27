const router = require('express').Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);
// router.get('/user', (req, res) => {
//   // console.log('req.session: ', req.session);
//   // console.log('REQ: ', req);
//   console.log('authed?:  ', req.isAuthenticated());
//   console.log('req.user: ', req.user);
//   res.send({ user: req.user });
// });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
