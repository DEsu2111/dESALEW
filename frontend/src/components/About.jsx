import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/desu1.jpg';
import { courseGroups } from '../data/education';

const DOMAIN_ICONS = {
  'Programming & Software': '💻',
  'Data & Systems': '🗄️',
  'Architecture & Embedded': '🔧',
  'Electronics & Signals': '📡',
  'Electrical Engineering': '⚡'
};

const About = () => {
  const totalCourses = courseGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2>About Me</h2>
        <p className="about-subtitle">Full-Stack Developer • Software Architect • IoT & Embedded Engineer</p>
      </div>
      
      <div className="about-content">
        <div className="about-card">
          <div className="about-intro">
            <div className="about-badge-row">
              <span className="about-role-badge">⚡ Available for Full-Stack & Architecture Roles</span>
            </div>
            <h3>Executive Summary</h3>
            <p className="about-lede">
              I am an <strong>Electrical & Computer Engineering</strong> graduate specializing in the intersection of
              scalable software architecture, full-stack web applications, and intelligent hardware systems.
              I combine rigorous engineering fundamentals with modern frameworks to build resilient, real-time products.
            </p>
            <p className="about-lede">
              Currently, I work as a <strong>Full-Stack Developer</strong> contributing to real-time gaming platforms,
              enterprise operational dashboards, and cloud-deployed SaaS systems with distributed engineering teams.
            </p>
            <div className="about-chips" aria-label="Key strengths">
              <span className="about-chip">Full-Stack Development</span>
              <span className="about-chip">React & Next.js</span>
              <span className="about-chip">Node.js & Laravel</span>
              <span className="about-chip">System Architecture</span>
              <span className="about-chip">IoT & Embedded Systems</span>
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
              <dd><a className="icon-link" href="https://github.com/DEsu2111" target="_blank" rel="noopener noreferrer">github.com/DEsu2111</a></dd>
            </div>
          </dl>

          <div className="about-quick-actions">
            <Link to="/mission-vision" className="cta-button primary">My Mission &amp; Vision</Link>
            <Link to="/education" className="cta-button secondary-outline">Education</Link>
            <Link to="/certificates" className="cta-button secondary-outline">Certificates</Link>
            <Link to="/resume" className="cta-button secondary-outline">Resume</Link>
          </div>
        </div>

        <div className="about-photo">
          <div className="photo-frame">
            <img src={profilePic} alt="Portrait of Desalew Alganeh" loading="lazy" />
            <div className="about-photo-caption">
              <strong>Desalew Alganeh</strong>
              <span>B.Sc. Electrical &amp; Computer Engineering</span>
            </div>
          </div>
        </div>

        <div className="education-card" id="education">
          <div className="resume-grid about-edu-timeline">
            {/* Left Column: Formal Academic Education (University -> Preparatory -> High School -> Elementary) */}
            <div className="resume-column">
              <h3 className="resume-col-title">Formal Academic Education</h3>

              <div className="resume-item">
                <h4>B.Sc. in Electrical &amp; Computer Engineering</h4>
                <span className="resume-date">Oct 2019 - Jun 2025</span>
                <p className="resume-italic">Hawassa University — Institute of Technology, Hawassa, Ethiopia</p>
                <ul>
                  <li>
                    Specialized in <strong>Internet of Things (IoT)</strong>, <strong>Embedded Systems</strong>,
                    Computer Architecture, and Full-Stack Software Engineering.
                  </li>
                  <li>
                    Graduated with a <strong>Cumulative GPA of 3.50 / 4.0</strong> and achieved a{' '}
                    <strong>Peak Semester GPA of 3.85 / 4.0</strong>.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Preparatory School Certificate (Grades 11 – 12)</h4>
                <span className="resume-date">2017 - 2019</span>
                <p className="resume-italic">Preparatory &amp; Senior Secondary School — Natural Science Stream</p>
                <ul>
                  <li>
                    Completed advanced preparatory studies in Mathematics, Physics, Chemistry, Technical Drawing, and ICT.
                  </li>
                  <li>
                    Passed the Ethiopian University Entrance Examination (EUEE) with high distinction.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>General Secondary / High School Certificate (Grades 9 – 10)</h4>
                <span className="resume-date">2015 - 2017</span>
                <p className="resume-italic">General Secondary High School, Ethiopia</p>
                <ul>
                  <li>
                    Strong foundation in core natural sciences, mathematics, English, and foundational computing.
                  </li>
                  <li>
                    Awarded the Ethiopian General Secondary Education Certificate (EGSECE) with honors.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Primary &amp; Elementary School Education (Grades 1 – 8)</h4>
                <span className="resume-date">2007 - 2015</span>
                <p className="resume-italic">Primary &amp; Elementary School, Ethiopia</p>
                <ul>
                  <li>
                    Completed primary and upper-elementary education with distinction and active involvement in school
                    science and innovation clubs.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Short-Term Trainings */}
            <div className="resume-column">
              <h3 className="resume-col-title">Short-Term Trainings</h3>

              <div className="resume-item">
                <h4>Full-Stack Web Development &amp; Cloud Architecture</h4>
                <span className="resume-date">2023 - 2024</span>
                <p className="resume-italic">Professional Software Engineering Bootcamp &amp; Practical Training</p>
                <ul>
                  <li>
                    Intensive hands-on training in <strong>React, Next.js, Tailwind CSS, Node.js, Nest.js, Django, and
                    Laravel</strong>.
                  </li>
                  <li>
                    RESTful APIs, real-time web systems, and database architecture with <strong>PostgreSQL, MySQL, and
                    MongoDB</strong>.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Embedded Systems, IoT &amp; Circuit Simulation Training</h4>
                <span className="resume-date">2022 - 2024</span>
                <p className="resume-italic">Hawassa University — IoT &amp; Embedded Systems Laboratory</p>
                <ul>
                  <li>
                    Practical training on <strong>PIC Microcontrollers, Arduino, and ESP32</strong> programming in C/C++
                    and Assembly.
                  </li>
                  <li>
                    Circuit simulation and PCB design using <strong>Proteus and Multisim</strong>.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Computer Maintenance, OS Administration &amp; LAN Networking</h4>
                <span className="resume-date">Feb 2024 - Apr 2024</span>
                <p className="resume-italic">Hawassa University — ICT &amp; Head Office Maintenance Division</p>
                <ul>
                  <li>
                    Practical training in <strong>Windows &amp; Linux OS installation</strong>, PC/printer hardware
                    repair, and LAN switch/router networking.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>UI/UX Design, Digital Media &amp; Agile Leadership Training</h4>
                <span className="resume-date">2021 - 2024</span>
                <p className="resume-italic">Horeb Digital Strategies &amp; Indicitous Technology (#HACH)</p>
                <ul>
                  <li>
                    UI/UX prototyping and digital media creation with <strong>Figma, Photoshop, Illustrator, Premiere
                    Pro, and CapCut</strong>, plus agile project coordination (<strong>Jira, ClickUp</strong>).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <details className="education-more" open>
            <summary className="education-more-btn">
              <span>University Core Engineering Coursework</span>
              <span className="education-total-pill">{totalCourses} Core Courses</span>
            </summary>
            <div className="education-body">
              <div className="education-body-header">
                <h4>Major Engineering &amp; Computing Domains</h4>
                <p>Comprehensive academic training across software engineering, algorithms, embedded hardware, and signal systems.</p>
              </div>
              <div className="course-grid">
                {courseGroups.map((group) => (
                  <details key={group.title} className="course-card course-toggle" open>
                    <summary>
                      <span className="course-group-title-wrap">
                        <span className="course-domain-icon" aria-hidden="true">
                          {DOMAIN_ICONS[group.title] || '📘'}
                        </span>
                        <span>{group.title}</span>
                      </span>
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
      </div>
    </section>
  );
};

export default About;
