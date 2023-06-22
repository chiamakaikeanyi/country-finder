import React from "react";
import { composeClass } from "../../utils";

import type { ChangeEventHandler, ReactNode } from "react";
import styles from "./Input.module.scss";

interface IProps {
  name: string;
  testId: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  icon?: ReactNode;
  label: string;
  customClass?: string;
  autoComplete?: string;
  maxLength?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<IProps> = ({
  customClass = "",
  value,
  icon,
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
  onChange,
  autoComplete = "off",
  maxLength = 20,
  testId
}) => {
  return (
    <div className={composeClass(styles.container, customClass)}>
      <label htmlFor={name} className="visually-hidden">
        {label}
      </label>

      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        className={styles.input}
        autoComplete={autoComplete}
        maxLength={maxLength}
        data-testid={testId}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
