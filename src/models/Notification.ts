// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN3fm1Kz8XMvYiqYnNcd9G48lMHhQj5fY",
  authDomain: "whatnow-e471a.firebaseapp.com",
  projectId: "whatnow-e471a",
  storageBucket: "whatnow-e471a.appspot.com",
  messagingSenderId: "320190413317",
  appId: "1:320190413317:web:55170c4bc25739cc99fa6c",
  measurementId: "G-MBMFZCNHPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);