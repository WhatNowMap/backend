const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../config/passport');

const User = require('../models/User');

module.exports.loginSuccessCallback = async (req, res) => {
  try {
    // Successful authentication, redirect to success screen.
    res.status(300).redirect('https://whatnowmap.onrender.com/list');
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
    return cb(null, user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
