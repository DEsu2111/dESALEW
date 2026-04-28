import React from 'react';
import { courseGroups } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-header">
        <h2>Educational Journey</h2>
        <p>A timeline of my academic background and specializations</p>
      </div>

      <div className="education-timeline-wrapper">
        <div className="timeline-line"></div>
        
        {/* Degree Item */}
        <div className="timeline-item">
          <div className="timeline-dot pulsing"></div>
          <div className="timeline-date">Oct 2019 - Jun 2025</div>
          <div className="timeline-content-card education-pro-card">
            <div className="card-accent-top"></div>
            <h3>B.Sc. Electrical and Computer Engineering</h3>
            
            <div className="institution-pro">
              <div className="inst-main">
                <span className="school-icon">🏛️</span>
                <span className="school-name">Hawassa University</span>
              </div>
              <div className="inst-spec">
                <span className="spec-badge">IoT Specialization</span>
              </div>
            </div>

            <div className="education-description">
              <p>
                Specializing in the intersection of high-performance hardware and modern software architectures. 
                My academic path is centered on <strong>Internet of Things (IoT)</strong>, <strong>Embedded Systems</strong>, and <strong>Advanced Computing</strong>, 
                where I've developed a deep understanding of designing scalable, intelligent, and interconnected systems.
              </p>
              <p className="academic-highlight">
                Maintained a consistent record of excellence, achieving a <strong>Peak Semester GPA of 3.85</strong> 
                and a final <strong>CGPA of 3.5</strong>, demonstrating strong technical mastery and dedication.
              </p>
            </div>

            <div className="achievements-pro">
              <div className="achieve-pill">
                <span className="icon">🏆</span>
                <span>Dean's List Candidate</span>
              </div>
              <div className="achieve-pill">
                <span className="icon">📡</span>
                <span>IoT Research Lead</span>
              </div>
              <div className="achieve-pill">
                <span className="icon">💻</span>
                <span>Embedded Sys. Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Courses Item */}
        <div className="timeline-item major-courses">
          <div className="timeline-dot"></div>
          <div className="timeline-date">Core Expertise</div>
          <div className="timeline-content-card">
            <h3>Specialized Coursework</h3>
            <p className="course-intro">Deep-dive technical training in engineering and computing. Click to expand.</p>
            
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
