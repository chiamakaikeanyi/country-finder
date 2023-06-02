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
        <Header />
        <main className="main">
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
