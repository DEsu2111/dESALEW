import React from 'react';
import { courseGroups } from '../data/education';

const fullStackSpecialization = [
  {
    category: "Full-Stack Web Architecture",
    icon: "💻",
    skills: [
      "Responsive Frontend Development (React, Next.js, Vite, Tailwind CSS)",
      "Backend API Development (Node.js, Bun, Hono, Express.js)",
      "RESTful API Design & Integration",
      "Web Application Architecture & Microservices",
      "System Architecture & Scalability"
    ]
  },
  {
    category: "Real-Time Systems & Data Stack",
    icon: "⚡",
    skills: [
      "Real-Time Applications (Socket.IO, WebSockets)",
      "Real-Time Gaming Platform Engines (Bingo, Keno, Aviator, Chicken Road)",
      "Database Design & Management (PostgreSQL, SQL)",
      "Redis Caching & Queue Management (Sentinel Cluster, BullMQ)"
    ]
  },
  {
    category: "Dashboards & Payment Gateway Integrations",
    icon: "💳",
    skills: [
      "Multi-Tenant Operator & Admin Dashboard Development",
      "Payment Gateway Integration (Telebirr, M-PESA, Chapa)",
      "Third-Party API Integration & Webhooks"
    ]
  },
  {
    category: "Security, Cloud & DevOps",
    icon: "🔐",
    skills: [
      "Authentication & Authorization (JWT, OAuth, RBAC)",
      "Cloud Deployment & VPS Management (Docker, Vercel, Linux)",
      "CI/CD Pipeline Setup & Containerization",
      "Performance Optimization & Security Best Practices"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-header">
        <h2>Engineering Expertise & Educational Background</h2>
        <p>Production full-stack specializations, real-time gaming engines & academic foundation</p>
      </div>

      <div className="education-timeline-wrapper">
        <div className="timeline-line"></div>
        
        {/* Degree Item */}
        <div className="timeline-item">
          <div className="timeline-dot pulsing"></div>
          <div className="timeline-date">Oct 2019 - Jun 2025</div>
          <div className="timeline-content-card education-pro-card">
            <div className="card-accent-top"></div>
            <h3>B.Sc. in Electrical & Computer Engineering</h3>
            
            <div className="institution-pro">
              <div className="inst-main">
                <span className="school-icon">🏛️</span>
                <span className="school-name">Hawassa University</span>
              </div>
              <div className="inst-spec">
                <span className="spec-badge">IoT & Software Systems Specialization</span>
              </div>
            </div>

            <div className="education-description">
              <p>
                Graduated with a strong engineering foundation spanning IoT, Embedded Systems, Computer Networks, and Software Engineering. My education equipped me with the ability to design reliable, scalable, and intelligent systems by integrating hardware principles with modern software architectures. This background directly supports my work as a Full-Stack Developer building secure, high-performance web applications and real-time distributed systems.
              </p>
              
              {/* Academic Achievements Box */}
              <div className="academic-gpa-box">
                <div className="gpa-badge-item">
                  <span className="gpa-label">Peak Semester GPA</span>
                  <span className="gpa-value">3.85</span>
                </div>
                <div className="gpa-divider"></div>
                <div className="gpa-badge-item">
                  <span className="gpa-label">Final CGPA</span>
                  <span className="gpa-value">3.50 / 4.0</span>
                </div>
              </div>
            </div>

            {/* Core Academic & Technical Areas */}
            <div className="core-areas-section">
              <h4 className="core-areas-title">Core Academic & Technical Areas</h4>
              <div className="core-areas-grid">
                <div className="area-pill"><span className="area-icon">🌐</span> Software Engineering</div>
                <div className="area-pill"><span className="area-icon">💻</span> Embedded Systems</div>
                <div className="area-pill"><span className="area-icon">📡</span> Internet of Things (IoT)</div>
                <div className="area-pill"><span className="area-icon">🖥️</span> Computer Networks</div>
                <div className="area-pill"><span className="area-icon">🏗️</span> System Architecture</div>
                <div className="area-pill"><span className="area-icon">⚡</span> Performance & Optimization</div>
                <div className="area-pill"><span className="area-icon">🔒</span> Secure System Design</div>
                <div className="area-pill"><span className="area-icon">🚀</span> Scalable Application Development</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Stack Specialization Item (On Top of Coursework) */}
        <div className="timeline-item fullstack-specialization-item">
          <div className="timeline-dot pulsing-brand"></div>
          <div className="timeline-date">Core Expertise (Production)</div>
          <div className="timeline-content-card education-pro-card fullstack-card">
            <div className="institution-pro">
              <div className="inst-main">
                <span className="school-icon">⚡</span>
                <span className="school-name">Full-Stack Development Specialization</span>
              </div>
              <div className="inst-spec">
                <span className="spec-badge live-work-badge">🟢 Active Production Work</span>
              </div>
            </div>
            <p className="course-intro">
              Practical production engineering and development work implemented in high-performance web applications & real-time gaming engines:
            </p>

            <div className="fullstack-spec-grid">
              {fullStackSpecialization.map((spec) => (
                <div key={spec.category} className="fullstack-spec-group">
                  <h4><span className="group-icon">{spec.icon}</span> {spec.category}</h4>
                  <ul className="spec-skills-list">
                    {spec.skills.map((skill) => (
                      <li key={skill}>
                        <span className="bullet-dot">✓</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialized Courses Item */}
        <div className="timeline-item major-courses">
          <div className="timeline-dot"></div>
          <div className="timeline-date">Academic Training</div>
          <div className="timeline-content-card">
            <h3>Specialized Coursework</h3>
            <p className="course-intro">Deep-dive technical training in university engineering and computing subjects. Click to expand.</p>
            
            <div className="course-accordion">
              {courseGroups.map((group, index) => (
                <details key={group.title} className="edu-details" open={index === 0}>
                  <summary className="edu-summary">
                    <span className="group-title">{group.title}</span>
                    <span className="group-count">{group.items.length} Courses</span>
                  </summary>
                  <div className="edu-tech-tags">
                    {group.items.map(item => (
                      <span key={item} className="tech-tag">{item}</span>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
