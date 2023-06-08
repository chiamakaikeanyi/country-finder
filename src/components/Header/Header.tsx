import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { MoonIcon } from "../Icons";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <h1>Where in the world?</h1>
        </Link>
      </nav>

      <Button
        label="Dark mode"
        icon={<MoonIcon />}
        customClass={styles.theme_switch}
      />
    </header>
  );
};

export default Header;
