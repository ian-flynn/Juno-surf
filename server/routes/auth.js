const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:8080/';

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
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

module.exports = router;
