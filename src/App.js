import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Authenticated/Home.js";
import Loginandregister from "./pages/Guests/Loginandregister.js";
import Intro from "./pages/Guests/Intro.js";

function App() {
  return (
    <Routes>
      {/* For guests */}
      <Route path="/intro" element={<Intro />} />
      <Route path="/intro/auth" element={<Loginandregister />} />

      {/* For authenticated */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
