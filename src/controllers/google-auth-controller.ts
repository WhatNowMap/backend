const passport = require('passport');
const User = require('../models/User.ts');

module.exports.loginSuccessCallback = async (req, res) => {
  try {
    // Successful authentication, redirect to success screen.
    res.status(300).redirect('/auth/google/success');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.success = async (req, res) => {
  try {
    res.status(200).send('Google login success!');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.failure = async (req, res) => {
  try {
    res.status(500).send('Error logging in via Google..');
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

module.exports.handleAuthentication = async function (
  request,
  accessToken,
  refreshToken,
  profile,
  cb
) {
  console.log('handleAuthentication');
  try {
    const user = await User.findOrCreate(profile);
    return cb(null, user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
