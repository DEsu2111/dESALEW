import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hello, I'm <span className="highlight">Desalew Aleganh Yeneabat</span></h1>
        <p>Full-Stack Engineer — iGaming & Real-Time Systems</p>
        <p>📍 Addis Ababa, Ethiopia</p>
        <Link to="/about" className="cta-button">
          View About Me
        </Link>
      </div>
    </section>
  );
};

export default Home;
