import React from "react";

import styles from "./Select.module.scss";

import type { ChangeEventHandler } from "react";

interface IProps {
  customClass?: string;
  placeholder: string;
  options: string[];
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<IProps> = ({ placeholder, options, name, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className="visually-hidden">
        Select region
      </label>
      <select onChange={onChange} className={styles.select} id={name}>
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