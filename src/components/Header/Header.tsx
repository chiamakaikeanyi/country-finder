import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <h1>Where in the world</h1>
      </Link>
    </nav>
  );
};

export default Header;
