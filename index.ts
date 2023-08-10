import express from "express";
const app: any = express();
const { connectToMongo } = require('./src/config/mongoose.ts')

// Router
const { eventRouter, reportRouter } = require("./src/routes");

// Post Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routing Control
app.use("/event", eventRouter);
app.use("/report", reportRouter);

app.listen(8080, () => {
  console.log("The server is running on 8080");
  connectToMongo();
})
