import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const config = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

const app = initializeApp(config);
const messaging = getMessaging(config);

export default messaging;
