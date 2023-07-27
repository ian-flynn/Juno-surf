const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log('passport setting up');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired');
      console.log('user is: ', profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializing user');
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('deserializing user');
  done(null, user);
});

console.log('passport done setting up');
