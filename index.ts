import express from 'express';
const app: any = express();
require('dotenv').config();
const { connectToMongo } = require('./src/config/mongoose.ts');
const session = require('express-session');
// const passport = require('./src/controllers/facebook-auth-controller');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('./src/config/passport.js');
const facebookAuthController =
  require('./src/controllers').facebookAuthController;

// Passport OAuth
passport.use(
  new FacebookStrategy(
    facebookConfig,
    facebookAuthController.handleFacebookAuthentication
  )
);

// Router
const {
  eventRouter,
  reportRouter,
  faceBookAuthRouter,
} = require('./src/routes');

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Post Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routing Control
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/event', eventRouter);
app.use('/report', reportRouter);
app.use('/auth/facebook', faceBookAuthRouter);

const port = process.env.PORT || 8080;

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
