// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCvQgrWymtHJRCWxnQN7GSeYhwsk4vCAu8",
  authDomain: "team-nodemon.firebaseapp.com",
  projectId: "team-nodemon",
  storageBucket: "team-nodemon.appspot.com",
  messagingSenderId: "120436997477",
  appId: "1:120436997477:web:3d113252ee316eda4e358c",
  measurementId: "G-FD2LB0M4PK",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
