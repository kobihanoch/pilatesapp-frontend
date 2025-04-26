import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Authenticated/Home.js";
import Loginandregister from "./pages/Guests/Loginandregister.js";
import Intro from "./pages/Guests/Intro.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* For guests */}
        <Route path="/" element={<Intro />} />
        <Route path="/intro/auth" element={<Loginandregister />} />

        {/* For authenticated */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
