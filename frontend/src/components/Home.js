import React from "react";
import styles from "./Home.module.scss";

import Button from "../shared/Button";
import Modal from "../shared/Modal";
import Stepper from "../shared/Stepper";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import lottie from "../assets/lottie.json";

export default function Home() {
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
          <Button name="Get Started" backgroundColor="#F45C2C" color="#ffffff" width="120px" />
        </div>
      </div>

      <Modal isOpen={true} title="Sign Up" allowClose>
        <div className={styles.signupForm}>
          <Stepper steps={["1", "2", "3"]} activeStep={1} />
        </div>
      </Modal>
    </div>
  );
}
