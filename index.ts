const express =  require('express');
const path = require('path');
const session = require('express-session');
const {connectToMongo} = require('./src/config/mongoose.ts');
require('./auth');
const app: any = express();
import passport from 'passport';

var expressSession = session({
  secret: 'mysecret',
  name: 'user',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
});

// Post Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
// Router
require("./src/routes")(app);
app.listen(8080, async () => {
  console.log("The server is running on 8080");
  connectToMongo();
})
