import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/desu1.jpg';
import { courseGroups } from '../data/education';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2>About Me</h2>
        <p className="about-subtitle">Full-Stack Developer & IoT Enthusiast</p>
      </div>
      
      <div className="about-content">
        <div className="about-card">
          <div className="about-intro">
            <h3>Summary</h3>
            <p className="about-lede">
              I am an Electrical & Computer Engineering graduate with a strong interest in programming and electronics.
              I enjoy working with both hardware and software, including electronics systems, networking, and coding.
              I am a motivated problem solver with strong analytical and communication skills, eager to apply my knowledge
              to real-world projects that make a meaningful impact.
            </p>
            <p className="about-lede">
              Currently, I work as a full-stack developer at Game Developing, contributing to a Bingo game platform,
              operational dashboards, and other remote projects with a distributed team.
            </p>
            <div className="about-chips" aria-label="Key strengths">
              <span className="about-chip">Full-stack</span>
              <span className="about-chip">React</span>
              <span className="about-chip">Node/Laravel</span>
              <span className="about-chip">Networking</span>
              <span className="about-chip">Electronics</span>
            </div>
          </div>

          <div className="about-divider" role="presentation" />

          <dl className="about-meta">
            <div className="about-meta-row">
              <dt>Location</dt>
              <dd>Addis Ababa, ET</dd>
            </div>
            <div className="about-meta-row">
              <dt>Email</dt>
              <dd><a className="icon-link" href="mailto:desu6262@gmail.com">desu6262@gmail.com</a></dd>
            </div>
            <div className="about-meta-row">
              <dt>Phone</dt>
              <dd>+251-9626-22111 | +251-5517-2057</dd>
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
              <dd><a className="icon-link" href="https://github.com/DEsu2111" target="_blank" rel="noopener noreferrer">dESALEW</a></dd>
            </div>
          </dl>
        </div>

        <div className="about-photo">
          <div className="photo-frame">
            <img src={profilePic} alt="Portrait of Desalew Aleganhe" loading="lazy" />
          </div>
        </div>

        <div className="about-cta mission-vision-cta">
          <Link to="/mission-vision" className="cta-button primary">My Mission & Vision</Link>
        </div>

        <div className="education-card" id="education">
          <div className="education-head">
            <h3>Education</h3>
            <p className="education-subhead">
              <strong>Hawassa University</strong> - B.Sc. Electrical and Computer Engineering (IoT Specialization)
              <span className="education-muted"> | October 2019 - June 2025</span>
            </p>
            <p className="education-muted">Highest Semester GPA: 3.85 | CGPA: 3.5</p>
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
