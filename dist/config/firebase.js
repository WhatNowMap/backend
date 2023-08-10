"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = exports.storage = exports.app = exports.firebaseConfig = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const storage_1 = require("firebase/storage");
require("dotenv").config();
console.log(process.env);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.firebase_apikey,
    authDomain: process.env.firebase_authDomain,
    projectId: process.env.firebase_projectId,
    storageBucket: process.env.firebase_storageBucket,
    messagingSenderId: process.env.firebase_messagingSenderId,
    appId: process.env.firebase_appId,
    measurementId: process.env.firebase_measurementId,
};
exports.firebaseConfig = firebaseConfig;
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
const analytics = (0, analytics_1.getAnalytics)(app);
exports.analytics = analytics;
console.log(firebaseConfig);
//# sourceMappingURL=firebase.js.map