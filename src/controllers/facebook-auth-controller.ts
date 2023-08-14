const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../config/passport.js');

const User = require('../models/User.ts');

module.exports.loginSuccessCallback = async (req, res) => {
  try {
    // Successful authentication, redirect to success screen.
    res.status(300).redirect('/auth/facebook/success');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.loginSuccess = async (req, res) => {
  try {
    //   const userInfo = {
    //     id: req.session.passport.user.id,
    //     displayName: req.session.passport.user.displayName,
    //     provider: req.session.passport.user.provider,
    //   };
    res.status(200).send('Facebook login success!');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.error = async (req, res) => {
  try {
    res.status(500).send('Error logging in via Facebook..');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.signout = async (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.status(300).redirect('/');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
};

module.exports.handleFacebookAuthentication = async function (
  accessToken,
  refreshToken,
  profile,
  cb
) {
  try {
    const user = await User.findOrCreate(profile);
    // console.log('Adding new facebook user to DB..');

    // console.log(profile);
    // const user = new User({
    //   id: profile.id,
    //   userName: profile.displayName,
    //   provider: profile.provider,
    // });
    await user.save();
    // console.log(user);
    return cb(null, user);
    // } else {
    //   console.log('Facebook User already exist in DB..');
    //   // console.log(profile);
    //   return cb(null, profile);
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
