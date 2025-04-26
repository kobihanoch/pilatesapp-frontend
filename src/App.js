import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Loginandregister from "./pages/Loginandregister.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Loginandregister />} />
    </Routes>
  );
}

export default App;
