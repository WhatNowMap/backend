const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const User = require('../models/index')

// const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.TWITTER_CONSUMER_API_SECRET_KEY

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_API_KEY,
    consumerSecret: TWITTER_CONSUMER_API_SECRET_KEY,
    callbackURL: "http://localhost:8080/auth/twitter/callback",
    passReqToCallback: true
},
    async function (token, tokenSecret, profile, done) {
        await User.findOrCreate({ twitterId: profile.id },
            function (err, user) {
                return done(err, user);
            });
    }
));

passport.serializeUser(function (user, done) {
    console.log('serializeUser', user)
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('deserializeUser', user)
    done(null, user);
});