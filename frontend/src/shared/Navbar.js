import React from "react";
import styles from "./Navbar.module.scss";

import Button from "../shared/Button";

export default function Navbar() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.logo}>Team Nodemon</p>
      <div className={styles.routes}>
        <Button name="Login" width="100px" backgroundColor="#ffffff" color="#F45C2C" />
      </div>
    </div>
  );
}
