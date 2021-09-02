import React from "react";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button
      className={styles.button}
      style={{ width: props.width, height: props.height, backgroundColor: props.backgroundColor, color: props.color }}
      onClick={props.onClick}
      type={props.type}
    >
      {props.prefixIcon} {props.name} {props.icon}
    </button>
  );
}
