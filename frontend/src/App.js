import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./shared/Navbar";
import Home from "./components/Home";
import firebase from "firebase/compat/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCvQgrWymtHJRCWxnQN7GSeYhwsk4vCAu8",
    authDomain: "team-nodemon.firebaseapp.com",
    projectId: "team-nodemon",
    storageBucket: "team-nodemon.appspot.com",
    messagingSenderId: "120436997477",
    appId: "1:120436997477:web:3d113252ee316eda4e358c",
    measurementId: "G-FD2LB0M4PK",
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = getMessaging();

  useEffect(() => {
    console.log(messaging);
    getToken(messaging, {
      vapidKey:
        "BHPse1ZJGNtKrAUf9b9ezL-UOicINmtjGAd_-gZ65ClhSd_tZH-b1-yT-iy4XCrZD8fV-eZpqgcA4yhS7K656vk",
    })
      .then((currentToken) => {
        console.log("DEOMOOO", currentToken);
        if (currentToken) {
        } else {
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
