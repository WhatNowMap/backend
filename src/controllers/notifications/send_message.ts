import { firebaseConfig } from "../../config/firebase";

const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json"); // Download from Firebase Setting
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

interface CloudMessage {
  notification: { title: string; body: string };
  token: string;
}

// Compose the message
const newEventMessage: CloudMessage = {
  notification: {
    title: "WhatNow: New Event Posted",
    body: "An event is happening around you. Check it now.",
  },
  token: "recipient-device-token", // or 'topic', 'condition', etc.
};

function sendMessage(message: CloudMessage) {
  // Send the message
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
