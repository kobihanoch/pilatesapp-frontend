import "./Intro.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const [logoPulled, setLogoPulled] = React.useState(false);

  const handleLoginClick = () => {
    setLogoPulled(true);
    /*navigate("/intro/login"); // or wherever you want*/
  };

  const handleRegisterClick = () => {
    setLogoPulled(true);
    /*navigate("/intro/register"); // or wherever you want*/
  };

  const handleLogoClick = () => {
    setLogoPulled(!logoPulled); // clicking logo manually toggles pull
  };
  const navigate = useNavigate();
  const [animateLogo, setAnimateLogo] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    navigate("/intro/auth");
  };

  const triggerLogoAnimation = () => {
    setAnimateLogo(true);
    setTimeout(() => setAnimateLogo(false), 1200);
  };

  return (
    <div className="intro-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="left-navbar">
          <div className="left-navbar">
            <button className="auth-btn" onClick={handleLoginClick}>
              התחברות
            </button>
            <button className="auth-btn" onClick={handleRegisterClick}>
              הרשמה
            </button>
            <img
              src="/interactivelogo.png"
              alt="Interactive Logo"
              className={`interactive-logo ${logoPulled ? "pulled" : ""}`}
              onClick={handleLogoClick}
            />
          </div>
        </div>

        <div className="nav-buttons">
          <button onClick={() => scrollToSection("בית")}>בית</button>
          <button onClick={() => scrollToSection("קצת עליי")}>קצת עליי</button>
          <button onClick={() => scrollToSection("השיעורים שלי")}>
            השיעורים שלי
          </button>
          <button onClick={() => scrollToSection("?שניצור קשר")}>
            ?שניצור קשר
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="בית" className="section">
        <div className="hero">
          <div className="hero-logo">
            <img
              src="/RotemLogo.png"
              alt="Rotem Logo"
              className="hero-logo-img"
            />
          </div>
          <h1>רותם פילאטיס</h1>
          <p>description here...</p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            GET STARTED
          </button>
        </div>
      </section>

      {/* Other sections */}
      <section id="קצת עליי" className="section">
        <h2>מי אני?</h2>
        <p>About Rotem...</p>
      </section>

      <section id="השיעורים שלי" className="section">
        <h2>השיעורים שלי</h2>
        <ul>
          <li>Mat Pilates</li>
          <li>Reformer Pilates</li>
          <li>Private Sessions</li>
        </ul>
      </section>

      <section id="?שניצור קשר" className="section">
        <h2>צור קשר</h2>
        <p>Phone: 050-123-4567</p>
        <p>Address: Tel Aviv, Main Street 42</p>
      </section>
    </div>
  );
};

export default Intro;
