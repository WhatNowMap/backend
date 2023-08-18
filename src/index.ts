import express from 'express';
const app: any = express();
require('dotenv').config();
const { connectToMongo } = require('./src/config/mongoos.ts');
const session = require('express-session');
const cors = require("cors");
// const passport = require('./src/controllers/facebook-auth-controller');

const path = require('path');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy
const { facebookAuthController, twitterAuthController, googleAuthController } =
  require('./src/controllers');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { facebookConfig, googleConfig, twitterConfig } = require('./src/config/passport');

// Passport OAuth
passport.use(
  new FacebookStrategy(
    facebookConfig,
    facebookAuthController.handleFacebookAuthentication
  )
);

// Twitter OAuth
// passport.use(new TwitterStrategy(
//   twitterConfig,
//   twitterAuthController.handleTwitterAuthentication
// ));

passport.use(
  new GoogleStrategy(
    googleConfig,
    googleAuthController.handleAuthentication
  )
);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Post Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

// Routing Control
// app.get('/', (req, res) => {
//   res.send('Welcome!');
// });

const expressSession = session({
  secret: process.env.SESSION_SECRET,
  name: 'user',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: false },
});

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;

require('./src/routes')(app);
app.listen(port, async () => {
  console.log('The server is running on ' + port);
  connectToMongo();
});

//  For Test
// const { User } = require('./src/models');

// const updateDB = async () => {
//   const user = await User.create({
//     userId: 1,
//     nameName: '8798789',
//     password: '3',
//     email: '4',
//     fixedLocation: '5',
//     tag: ['A', 'B'],
//     provider: 'facebook',
//   });

//   console.log(user);
// };

// app.listen(8080, async () => {
//   console.log('The server is running on 8080');
//   connectToMongo();
//   await updateDB();
// });
