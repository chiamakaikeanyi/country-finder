import React from "react";
import styles from "./Button.module.scss";
import { composeClass } from "../../utils";

import type { ReactNode, MouseEventHandler } from "react";

interface IProps {
  customClass?: string;
  icon?: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const Button: React.FC<IProps> = ({
  customClass = "",
  icon,
  label,
  onClick,
}) => {
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
