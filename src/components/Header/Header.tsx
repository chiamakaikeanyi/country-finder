import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { MoonIcon } from "../Icons/Moon";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <h1>Where in the world?</h1>
        </Link>
      </nav>
      <div className={styles.theme_switch__wrapper}>
        <MoonIcon />
        <span className={styles.theme_switch}>Dark mode</span>
      </div>
    </header>
  );
};

export default Header;
