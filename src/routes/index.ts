module.exports = {
  eventRouter: require('./event-route'),
  reportRouter: require('./report-route'),
  faceBookAuthRouter: require('./facebookAuth-route'),
};
const router = require('express').Router();
const eventRouter = require('./event-route');
const reportRouter = require('./report-route');
// const userRouter = require("./user-route")
const authRouter = require('./auth-route');
const faceBookAuthRouter = require('./facebookAuth-route');

// Routing Control
module.exports = function (app) {
  app.use('/event', eventRouter);
  app.use('/report', reportRouter);
  // app.use('/user', userRouter)
  app.use('/auth/facebook', faceBookAuthRouter);
  app.use('/', authRouter);
};
