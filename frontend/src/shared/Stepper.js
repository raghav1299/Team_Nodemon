import React, { useState, useEffect } from "react";
import style from "./Stepper.module.scss";

import clsx from "clsx";

export default function Stepper(props) {
  return (
    <div className={style.wrapper}>
      <div className={style.steps}>
        <div className={style.line}></div>
        {props.steps.map((step, index) => (
          <div
            className={clsx(style.step, props.activeStep === index + 1 ? style.activeStep : null)}
          >
            <p>{step}</p>
            <p>{index + 1}</p>
          </div>
        ))}
      </div>
      <div className={style.content}>{props.children}</div>
    </div>
  );
}
