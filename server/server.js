const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
// const { urlencoded } = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const User = require('./userSchema.js');

const dbSetup = require('./db.js');

// app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.set('trust proxy', 1);

// mongo session store
app.use(
  session({
    secret: 'randomsecretstring',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 second, 1 min, 1 hour, 1 day
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
// app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());

const passportSetup = require('./passport.js');

// const authRouter = require('./routes/auth.js');
const buoysRouter = require('./routes/buoys.js');
// app.use('/auth', authRouter);
app.use('/buoys', buoysRouter);

//
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  (req, res) => {
    return res.redirect(process.env.CLIENT_URL);
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, './index.html'));
  });
} else {
  app.get('/', (req, res) => {
    req.session.views ? req.session.views++ : (req.session.views = 1);
    res.send(
      `<h1>Hey there, you have visted this page ${req.session.views}</h1>`
    );
  });
}
app.get('/user', (req, res) => {
  // console.log('req.session: ', req.session);
  // console.log('REQ: ', req);
  console.log('authed?:  ', req.isAuthenticated());
  console.log('req.user: ', req.user);
  return res.json({ user: req.user, why: 'doesnt this work' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
