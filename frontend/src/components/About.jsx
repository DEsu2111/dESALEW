import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/desu1.jpg';
import { courseGroups } from '../data/education';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2>About Me</h2>
        <p className="about-subtitle">Full-Stack Engineer — iGaming & Real-Time Systems</p>
      </div>
      
      <div className="about-content">
        <div className="about-card">
          <div className="about-intro">
            <h3>Professional Summary</h3>
            <p className="about-lede">
              Electrical and Computer Engineering graduate specialized in designing, optimizing, and maintaining fully
              functioning <strong>iGaming platforms</strong>. Hands-on expertise building socket-driven web games where real-time
              synchronization, low latency, and state persistence are critical.
            </p>
            <p className="about-lede">
              Experienced in leading full-stack implementations—from high-performance backend real-time architecture to interactive
              client-side interfaces and unified multi-tenant dashboards.
            </p>
            <div className="about-chips" aria-label="Key strengths">
              <span className="about-chip">iGaming</span>
              <span className="about-chip">TypeScript</span>
              <span className="about-chip">Socket.IO</span>
              <span className="about-chip">React & Next.js</span>
              <span className="about-chip">Bun & Hono</span>
              <span className="about-chip">Redis & Postgres</span>
              <span className="about-chip">Docker</span>
            </div>
          </div>

          <div className="about-divider" role="presentation" />

          <dl className="about-meta">
            <div className="about-meta-row">
              <dt>Location</dt>
              <dd>Addis Ababa, Ethiopia</dd>
            </div>
            <div className="about-meta-row">
              <dt>Email</dt>
              <dd><a className="icon-link" href="mailto:desu6262@gmail.com">desu6262@gmail.com</a></dd>
            </div>
            <div className="about-meta-row">
              <dt>Phone</dt>
              <dd>0962622111 / 0955172057</dd>
            </div>
            <div className="about-meta-row">
              <dt>Telegram</dt>
              <dd><a className="icon-link" href="https://t.me/desu6262" target="_blank" rel="noopener noreferrer">@desu6262</a></dd>
            </div>
            <div className="about-meta-row">
              <dt>LinkedIn</dt>
              <dd><a className="icon-link" href="https://linkedin.com/in/desalew-aleganeh" target="_blank" rel="noopener noreferrer">in/desalew-aleganeh</a></dd>
            </div>
            <div className="about-meta-row">
              <dt>GitHub</dt>
              <dd><a className="icon-link" href="https://github.com/DEsu2111" target="_blank" rel="noopener noreferrer">DEsu2111</a></dd>
            </div>
          </dl>
        </div>

        <div className="about-photo">
          <div className="photo-frame">
            <img src={profilePic} alt="Portrait of Desalew Aleganh Yeneanat" loading="lazy" />
          </div>
        </div>

        <div className="about-cta mission-vision-cta">
          <Link to="/mission-vision" className="cta-button primary">My Mission & Vision</Link>
        </div>

        <div className="education-card" id="education">
          <div className="education-head">
            <h3>Education</h3>
            <p className="education-subhead">
              <strong>Hawassa University</strong> - B.Sc. in Electrical and Computer Engineering (Computer Stream)
              <span className="education-muted"> | Class of 2025</span>
            </p>
            <p className="education-muted">CGPA: 3.6 / 4.0</p>
          </div>

          <details className="education-more">
            <summary className="education-more-btn">Technical Courses</summary>
            <div className="education-body">
              <h4>Major Courses</h4>
              <div className="course-grid course-grid-compact">
                {courseGroups.map((group) => (
                  <details key={group.title} className="course-card course-toggle">
                    <summary>
                      <span>{group.title}</span>
                      <span className="course-count">{group.items.length}</span>
                    </summary>
                    <div className="course-tags" aria-label={`${group.title} courses`}>
                      {group.items.map((item) => (
                        <span key={item} className="course-tag">{item}</span>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </details>
        </div>

        <div className="about-cta">
          <Link to="/certificates" className="cta-button">Certificates</Link>
          <Link to="/resume" className="cta-button">Resume</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
