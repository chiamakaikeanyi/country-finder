import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="/:countryCode" element={<p>Details</p>} />
            <Route path="*" element={<p>Error</p>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
