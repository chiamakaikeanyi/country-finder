import React from "react";
import type { ChangeEventHandler } from "react";

import styles from "./Select.module.scss";

interface IProps {
  customClass?: string;
  placeholder: string;
  options: string[];
  name: string;
  testId: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<IProps> = ({
  placeholder,
  options,
  name,
  testId,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className="visually-hidden">
        Select region
      </label>
      <select
        onChange={onChange}
        className={styles.select}
        id={name}
        data-testid={testId}
      >
        <option value="">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
