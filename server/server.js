const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportSetup = require('./passport.js');
const dbSetup = require('./db.js');
const User = require('./userSchema.js');

const authRouter = require('./routes/auth.js');
const buoysRouter = require('./routes/buoys.js');

// //do I need this?
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// mongo session store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 second, 1 min, 1 hour, 1 day
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/buoys', buoysRouter);

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

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
