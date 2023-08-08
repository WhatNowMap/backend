import express from "express";
const app: any = express();

app.listen(8080, () => {
  console.log("The server is running on 8080");
})