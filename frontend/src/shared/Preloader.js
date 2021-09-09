import React from "react";
import styles from "./Preloader.module.scss";

import SyncLoader from "react-spinners/SyncLoader";

export default function Preloader() {
  return (
    <div className={styles.wrapper}>
      <SyncLoader color="#F45C2C" loading={true} size={20} />
    </div>
  );
}
