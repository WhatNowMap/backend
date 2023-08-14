import { getMessaging, getToken } from "firebase/messaging";
import "dotenv/config";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

if (!process.env.firebase_vapidkey_public) {
  throw new Error("ERR_MGT_0_S: Incomplete Env: No Vapid Public Key.");
}

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

getToken(messaging, { vapidKey: process.env.firebase_vapidkey_public })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        "ERR_MGT_1: No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("ERR_MGT_2: An error occurred while retrieving token. ", err);
    // ...
  });
