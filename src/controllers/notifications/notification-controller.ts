import { CloudMessage, sendMessage } from "./admin-send-message";

exports.notify = async function (req, res) {
  try {
    const message: CloudMessage = {
      notification: {
        title: "WhatNow: New Event Posted",
        body: "An event is happening around you. Check it now.",
      },
      topic: "all_user",
    };
    sendMessage(message);
    res.status(200).send({ message: "Notify Successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
