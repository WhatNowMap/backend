const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const twitterConfig = require('../config/passport.js');

const User = require('../models/User.ts');

module.exports.loginSuccessCallback = async (req, res) => {
    try {
        // Successful authentication, redirect to success screen.
        res.status(300).redirect('http://localtest.me/');
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
        res.status(200).send('twitter login success!');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.error = async (req, res) => {
    try {
        res.status(500).send('Error logging in via twitter..');
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

module.exports.handleTwitterAuthentication = async function (
    accessToken,
    refreshToken,
    profile,
    cb
) {
    try {
        const user = await User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
        console.log('Adding new twitter user to DB..');

        // console.log(profile);
        // const user = new User({
        //   id: profile.id,
        //   userName: profile.displayName,
        //   provider: profile.provider,
        // });
        // console.log(user);
        user
        // } else {
        //   console.log('Twitter User already exist in DB..');
        // console.log(profile);
        //   return cb(null, profile);
        // }
    } catch (err) {
        console.log(err);
        throw err;
    }
};
