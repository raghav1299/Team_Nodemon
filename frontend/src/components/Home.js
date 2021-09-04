import React, { useState } from "react";
import styles from "./Home.module.scss";

import Button from "../shared/Button";
import Modal from "../shared/Modal";
import Stepper from "../shared/Stepper";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import lottie from "../assets/lottie.json";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [location, setLocation] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  function toggleSignupModal() {
    setIsSignupModalOpen((prev) => !prev);
  }

  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  function handleForm() {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log(formdata);
    }
  }

  function handleFormChange(e) {
    let data = { ...formdata };
    data[e.target.name] = e.target.value;
    setFormdata(data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.lottie}>
          <Player autoplay loop src={lottie} style={{ height: "100%", width: "100%" }}></Player>
        </div>
        <div className={styles.heroText}>
          <p>
            Here to bring your <br /> customers closer!
          </p>
          <Button
            name="Get Started"
            backgroundColor="#F45C2C"
            color="#ffffff"
            width="120px"
            onClick={toggleSignupModal}
          />
        </div>
      </div>

      <Modal isOpen={isSignupModalOpen} title="Sign Up" onClose={toggleSignupModal} allowClose>
        <div className={styles.signupForm}>
          <Stepper steps={["Owner Info", "Contact", "Address"]} activeStep={activeStep}>
            <form id="shopkeeperForm" onChange={handleFormChange}>
              {activeStep === 1 ? (
                <div className={styles.form}>
                  <label>First Name</label>
                  <input type="text" name="fname" />
                  <label>Last Name</label>
                  <input type="text" name="lname" />
                  <label>Username</label>
                  <input type="text" name="username" />
                </div>
              ) : null}
              {activeStep === 2 ? (
                <div className={styles.form}>
                  <label>Email</label>
                  <input type="email" name="email" />
                  <label>Phone</label>
                  <input type="number" name="phone" />
                  <label>Password</label>
                  <input type="password" name="password" />
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" />
                </div>
              ) : null}
              {activeStep === 3 ? (
                <div className={styles.form}>
                  <div className={styles.address}>
                    <p>Latitude : {location && location.lat} </p>
                    <p>Longitude : {location && location.long} </p>
                    <Button
                      type="button"
                      name="Get Location"
                      backgroundColor="#F45C2C"
                      color="#ffffff"
                      width="120px"
                      onClick={getGeoLocation}
                    />
                  </div>
                </div>
              ) : null}
            </form>
            <div className={styles.controller}>
              <Button
                type={activeStep === 3 ? "submit" : "button"}
                form="shopkeeperForm"
                name={activeStep === 3 ? "Submit" : "Next"}
                backgroundColor="#F45C2C"
                color="#ffffff"
                width="120px"
                onClick={handleForm}
              />
            </div>
          </Stepper>
        </div>
      </Modal>
    </div>
  );
}
