import { firebaseConfig } from "../../config/firebase";

interface CloudMessage {
  notification: { title: string; body: string };
  // token: string;
  topic: string;
}

function sendMessage(message: CloudMessage) {
  // Send the cloud message through FCM
  const admin = require("firebase-admin");
  const serviceAccount = require("../../config/firebase-accountkey.json"); // Download from Firebase Setting
  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...firebaseConfig,
  });

  // Compose the message
  const newEventMessage: CloudMessage = {
    notification: {
      title: "WhatNow: New Event Posted",
      body: "An event is happening around you. Check it now.",
    },
    topic: "all_user",
    // token: "recipient-device-token", // Token: A Registration Token belongs to A certain User
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

export { sendMessage, CloudMessage };
