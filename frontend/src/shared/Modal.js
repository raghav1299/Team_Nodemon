import React from "react";
import style from "./Modal.module.scss";

import { X } from "react-feather";

const Modal = (props) => {
  return (
    <>
      {props.isOpen ? (
        <div className={style.backdrop}>
          <div className={style.content}>
            <div className={style.modalController}>
              <p>{props.title}</p>
              {!props.allowClose ? null : (
                <button onClick={props.onClose}>
                  <X />
                </button>
              )}
            </div>
            <div className={style.child}>{props.children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
