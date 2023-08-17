import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "../../config/firebase";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";
import "dotenv/config";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
async function initializeCloudMessaging() {
  if (!process.env.FIREBASE_VAPID_PUBLIC_KEY) {
    throw new Error("ERR_MGT_0_S: Incomplete Env: No Vapid Public Key.");
  }
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  return messaging;
}

/**
 * Access the registration token:
 */
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

/**
 * Web Credential Cofig.
 * Allows FCM to use the VAPID key credential when sending message requests to different push services.
 * @param messaging
 */
async function requestToken(messaging) {
  getToken(messaging, { vapidKey: process.env.FIREBASE_VAPID_PUBLIC_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // ? Send the token to your server and update the UI if necessary
        console.log("Current Token: ", currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}

/**
 * Foreground - Receive Cloud Messages:
 * @param messaging
 */
async function receiveMessage(messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
}

export {
  initializeCloudMessaging,
  requestPermission,
  requestToken,
  receiveMessage,
};
