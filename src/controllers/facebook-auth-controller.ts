const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const facebookConfig = require('../config/passport.js');

const User = require('../models/User.ts');

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

async function handleFacebookAuthentication(
  accessToken,
  refreshToken,
  profile,
  cb
) {
  // const user = await User.findOne({
  //   accountId: profile.id,
  //   provider: 'facebook',
  // });
  // if (!user) {
  console.log('Adding new facebook user to DB..');

  console.log(profile);
  const user = new User({
    id: profile.id,
    userName: profile.displayName,
    provider: profile.provider,
  });
  await user.save();
  // console.log(user);
  return cb(null, profile);
  // } else {
  //   console.log('Facebook User already exist in DB..');
  //   // console.log(profile);
  //   return cb(null, profile);
  // }
}

passport.use(
  new FacebookStrategy(facebookConfig, handleFacebookAuthentication)
);

module.exports = passport;
