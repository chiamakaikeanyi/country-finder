import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { MoonIcon, SunIcon } from "../Icons";

const Header: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, handleThemeChange } = themeContext;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <h1>Where in the world?</h1>
        </Link>
      </nav>
      <Button
        label=""
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
        icon={theme === "dark" ? <SunIcon color="#fff" /> : <MoonIcon />}
        customClass={styles.theme_switch}
        onClick={handleThemeChange}
      />
    </header>
  );
};

export default Header;
