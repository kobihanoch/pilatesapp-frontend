import "./Intro.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    // Future: navigate("/intro/login");
  };

  const handleRegisterClick = () => {
    // Future: navigate("/intro/register");
  };

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
        {/* Navigation buttons */}
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

      {/* Authentication buttons */}
      <div className="auth-buttons">
        <button className="auth-btn" onClick={handleLoginClick}>
          התחברות
        </button>
        <button className="auth-btn" onClick={handleRegisterClick}>
          הרשמה
        </button>
        {/* <img src="/interactivelogo.png" alt="Logo" className="logo-navbar" /> */}
      </div>

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

      <section id="קצת עליי" className="aboutme-section">
        {/* Block 1 */}
        <div className="aboutme-block left">
          <div className="bubble">
            <img src="/aboutme1.png" alt="Rotem 1" />
          </div>
          <div className="bubble-text">
            אני רותם, מורה מוסמכת לפילאטיס, יוגה, הילינג ומנחת ריטריטים ואני
            עובדת מתוך אהבה עמוקה לעולם התנועה והריפוי.
          </div>
        </div>

        {/* Block 2 */}
        <div className="aboutme-block right">
          <div className="bubble">
            <img src="/aboutme2.jpg" alt="Rotem 2" />
          </div>
          <div className="bubble-text">
            בעיניי תנועה היא שפה המבטאת חיבור בין גוף ונפש, וכך אני גם מעבירה את
            האימונים שלי. אני משלבת גישות שמזמינות כל אחד להתחבר לעצמו, להתחזק
            ולהתמלא באנרגיה מחודשת.
          </div>
        </div>

        {/* Block 3 */}
        <div className="aboutme-block left">
          <div className="bubble">
            <img
              src="/aboutme3.jpg"
              alt="Rotem 3"
              className="bubble-image third"
            />
          </div>
          <div className="bubble-text">
            אני מאמינה בהתמדה, הקשבה פנימית, באיזון בין עבודה פיזית עמוקה להקשבה
            פנימית עדינה, המאפשרים תהליך של שינוי, ריפוי והתחדשות.
          </div>
        </div>
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

        {/* WhatssUP Button*/}
        <a
          href="https://wa.me/972504671935"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <img
            src="contactMeLogo.png"
            alt="Phone Icon"
            className="whatsapp-icon"
          />
          דברו איתי בוואטסאפ
        </a>
      </section>
    </div>
  );
};

export default Intro;
