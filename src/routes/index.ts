module.exports = {
  eventRouter: require("./event-route"),
  reportRouter: require("./report-route"),
  faceBookAuthRouter: require("./facebookAuth-route"),
  userRouter: require('./user-route'),
};
const router = require("express").Router();
const eventRouter = require("./event-route");
const reportRouter = require("./report-route");
const userRouter = require("./user-route")
const googleAuthRouter = require("./googleAuth-route");
const faceBookAuthRouter = require("./facebookAuth-route");
const twitterAuthRouter = require("./twitter-auth-route");
const commentRouter = require("./comment-route");

// Routing Control
module.exports = function (app) {
  app.use("/event", eventRouter);
  app.use("/report", reportRouter);
  app.use('/user', userRouter)
  app.use("/auth/facebook", faceBookAuthRouter);
  app.use("/auth/google", googleAuthRouter);
  app.use("/auth/twitter", twitterAuthRouter)
  app.use("/comment", commentRouter);
};
