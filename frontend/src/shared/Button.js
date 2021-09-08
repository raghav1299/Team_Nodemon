import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export default function Button(props) {
  return (
    <button
      className={clsx(styles.button, props.className)}
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        color: props.color,
      }}
      onClick={props.onClick}
      type={props.type}
    >
      {props.prefixIcon} {props.name} {props.icon}
    </button>
  );
}
