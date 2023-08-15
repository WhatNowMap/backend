const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./src/models/User')
require("dotenv").config()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    const user = await User.findOrCreate(profile);
    return done(null, user)
  }
));

passport.serializeUser((user, done) => {
  console.log('serializeUser', user)
  done(null, user);
})

passport.deserializeUser((user, done) => {
  console.log('deserializeUser', user)
  done(null, user)
})

