import express, { Express } from "express";
import passport from "passport";

const User = require("./src/models");

// twitter OAuth
import { TwitterStrategy } from "passport-twitter";
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY

// Changed type any to type Express
const app: Express = express();
const { connectToMongo } = require('./src/config/mongoose.ts')

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  // consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.listen(8080, () => {
  console.log("The server is running on 8080");
  connectToMongo();
})
