import express, { Express } from "express";

const User = require("./src/models");

const app: Express = express();
const { connectToMongo } = require('./src/config/mongoose.ts')

app.listen(8080, () => {
  console.log("The server is running on 8080");
  connectToMongo();
})
