import React from "react";
import styles from "./Button.module.scss";
import { composeClass } from "../../utils";

import type { ReactNode, MouseEventHandler } from "react";

interface IButton {
  label: string;
  icon?: ReactNode;
  customClass?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const Button = ({ icon, customClass = "", label, onClick }: IButton) => {
  return (
    <button
      className={composeClass(styles.button, customClass)}
      onClick={onClick}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {label}
    </button>
  );
};

export default Button;
