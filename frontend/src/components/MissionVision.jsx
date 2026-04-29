import React from 'react';
import { Link } from 'react-router-dom';

const MissionVision = () => {
  return (
    <section className="mission-vision-page">
      <div className="section-header">
        <h2>My Mission & Vision</h2>
        <p className="about-subtitle">The core philosophy driving my engineering journey</p>
      </div>

      <div className="mission-vision-container full-page-layout">
        <div className="mission-box philosophy-card-large">
          <div className="card-icon">🎯</div>
          <h3>The Mission</h3>
          <p>
            To deliver innovative, high-performance technical solutions that bridge the gap between 
            complex hardware and intuitive software. I am dedicated to empowering businesses and 
            individuals through seamless digital experiences, optimized system architectures, 
            and reliable engineering practices.
          </p>
          <div className="value-pills">
            <span>Innovation</span>
            <span>Reliability</span>
            <span>Excellence</span>
          </div>
        </div>

        <div className="vision-box philosophy-card-large">
          <div className="card-icon">🚀</div>
          <h3>The Vision</h3>
          <p>
            To become a leading global engineer and full-stack developer recognized for 
            technical excellence in IoT and complex system integration. My vision is to drive 
            positive global impact through scalable software engineering that solves real-world 
            problems and sets new standards for technical quality.
          </p>
          <div className="value-pills">
            <span>Leadership</span>
            <span>Impact</span>
            <span>Scalability</span>
          </div>
        </div>
      </div>

      <div className="mission-footer-cta">
        <Link to="/about" className="back-link">← Back to About Me</Link>
        <Link to="/contact" className="cta-button primary">Let's Work Together</Link>
      </div>
    </section>
  );
};

export default MissionVision;
