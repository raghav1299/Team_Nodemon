// import messaging from "./utils/firebaseconfig";
import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./shared/Navbar";
import Home from "./components/Home";

import { getMessaging, onMessage } from "firebase/messaging";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
  useEffect(() => {
    // console.log(messaging);
  }, []);

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("../firebase-messaging-sw.js")
  //       .then(function (registration) {
  //         console.log("Registration successful, scope is:", registration.scope);
  //       })
  //       .catch(function (err) {
  //         console.log("Service worker registration failed, error:", err);
  //       });
  //   }
  // }, []);

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
