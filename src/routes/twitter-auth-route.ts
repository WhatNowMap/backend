const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const oauth = require('oauth')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const User = require('../models/index')

const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.TWITTER_CONSUMER_API_KEY
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.TWITTER_CONSUMER_API_SECRET_KEY

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_API_KEY,
    consumerSecret: TWITTER_CONSUMER_API_SECRET_KEY,
    callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));