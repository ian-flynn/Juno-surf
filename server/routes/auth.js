const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:8080/';

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);
router.get('/user', (req, res) => {
  console.log('authed?:  ', req.isAuthenticated());
  console.log('fun def?:  ', `${req.isAuthenticated}`);
  console.log('req.user: ', req.user);
  res.json({ user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
