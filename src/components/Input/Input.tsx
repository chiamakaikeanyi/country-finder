import React from "react";
import { composeClass } from "../../utils";

import type { ChangeEventHandler, ReactNode } from "react";
import styles from "./Input.module.scss";

interface IProps {
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  icon?: ReactNode;
  label?: string;
  customClass?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<IProps> = ({
  customClass = "",
  value,
  icon,
  name,
  placeholder,
  defaultValue,
  type = "text",
  onChange,
}) => {
  return (
    <div className={composeClass(styles.container, customClass)}>
      <label htmlFor={name} className="visually-hidden">
        Search
      </label>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
