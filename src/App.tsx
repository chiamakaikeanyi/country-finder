import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/:countryCode" element={<p>Details</p>} />
        <Route path="*" element={<p>Error</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
