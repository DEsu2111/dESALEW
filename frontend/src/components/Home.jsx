import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hello, I'm <span className="highlight">Desalew Alganeh</span></h1>
        <p>Full Stack Developer & Computer Engineer </p>
        <p>Addis Ababa, Ethiopa</p>
        <Link to="/about" className="cta-button">
          View About Me
        </Link>
      </div>
    </section>
  );
};

export default Home;
