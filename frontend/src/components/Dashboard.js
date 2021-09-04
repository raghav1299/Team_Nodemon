import React, { useEffect } from "react";
import styles from "./Dashboard.module.scss";

import { getRequest } from "../utils/api";

export default function Dashboard() {
  useEffect(() => {
    getRequest("/get_all_products")
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>Welcome to your shop! 😃</p>
      </div>
    </div>
  );
}
