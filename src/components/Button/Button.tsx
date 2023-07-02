import React from "react";
import type { MouseEventHandler, ReactNode } from "react";

import styles from "./Button.module.scss";
import { composeClass } from "../../utils";

interface IProps {
  customClass?: string;
  icon?: ReactNode;
  iconPosition?: string;
  label: string;
  testId?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const Button: React.FC<IProps> = ({
  customClass = "",
  icon,
  iconPosition = "left",
  label,
  testId,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={composeClass(styles.button, customClass)}
      onClick={onClick}
      data-testid={testId}
      {...rest}
    >
      {icon && iconPosition === "left" ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      {label}
      {icon && iconPosition === "right" ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
    </button>
  );
};

export default Button;
