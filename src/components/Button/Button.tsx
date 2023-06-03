import React, { ReactNode } from "react";
import styles from "./Button.module.scss";
import { composeClass } from "../../utils";

interface IButton {
  icon?: ReactNode;
  customClass?: string;
  label: string;
}

const Button = ({ icon, customClass = "", label }: IButton) => {
  return (
    <button className={composeClass(styles.button, customClass)}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {label}
    </button>
  );
};

export default Button;
