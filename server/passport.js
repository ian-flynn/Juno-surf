const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log('passport setting up');
const User = require('./userSchema.js');

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const doc = await User.findById(id);
    return done(null, doc);
  } catch (err) {
    console.log('error: ', err);
    return done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        console.log('error: ', err);
        return done(err, null);
      }
    }
  )
);

console.log('passport done setting up');
