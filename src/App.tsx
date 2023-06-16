import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useNetworkStatus from "./hooks/useNetworkStatus";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import EmptyState from "./components/EmptyState/EmptyState";
import "./App.scss";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const { isOnline } = useNetworkStatus();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="container">
          <a href="#main" className="skip-to-main-content">
            Skip to main content
          </a>
          <Header />
          <main id="main" className="main-content">
            {isOnline ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:countryCode" element={<Details />} />
                <Route path="*" element={<p>Error</p>} />
              </Routes>
            ) : (
              <EmptyState message="No internet connection" />
            )}
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
