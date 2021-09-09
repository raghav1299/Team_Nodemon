import React from "react";
import styles from "./Navbar.module.scss";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button";

export default function Navbar() {
  const history = useHistory();
  function redirectToHome() {
    history.push("/home");
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.logo} onClick={redirectToHome}>
        Team Nodemon
      </p>
      {/* <div className={styles.routes}>
        <Button name="Login" width="100px" backgroundColor="#ffffff" color="#F45C2C" />
      </div> */}
    </div>
  );
}
