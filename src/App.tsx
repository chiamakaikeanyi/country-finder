import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <a href="#main" className="skip-to-main-content">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:countryCode" element={<Details />} />
            <Route path="*" element={<p>Error</p>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
