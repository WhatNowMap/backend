import { adminApp } from "../../config/firebase";
import { CloudMessage, sendMessage } from "./admin-send-message";
exports.notify = async function (req, res) {
  try {
    const cloudMessage: CloudMessage = {
      notification: {
        title: "WhatNow: New Event Posted",
        body: "An event is happening around you. Check it now.",
      },
      topic: "all_user",
    };
    const admin = adminApp;
    sendMessage(cloudMessage, admin);
    res.status(200).send({ message: "Notify Successfully.", cloudMessage });

    // Receiving Test:
    // const messaging = await initializeCloudMessaging();
    // // requestPermission();
    // receiveMessage(messaging);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.receive = async function (req, res) {};
