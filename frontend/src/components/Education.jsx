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
          <div className="timeline-dot"></div>
          <div className="timeline-date">2019 - 2025</div>
          <div className="timeline-content-card">
            <h3>B.Sc. Electrical and Computer Engineering</h3>
            <div className="institution">
              <span className="school-name">Hawassa University</span>
              <span className="location">IoT Specialization</span>
            </div>
            <p className="description">
              Focused on Internet of Things (IoT), Embedded Systems, and Advanced Computing. 
              Maintained high academic standing with a **CGPA of 3.5** and a **Peak Semester GPA of 3.85**.
            </p>
            <div className="achievements">
              <span>🏆 Dean's List Candidate</span>
              <span>🛠️ IoT Project Lead</span>
            </div>
          </div>
        </div>

        {/* Specialized Courses Item - Now Collapsible */}
        <div className="timeline-item major-courses">
          <div className="timeline-dot"></div>
          <div className="timeline-date">Core Expertise</div>
          <div className="timeline-content-card">
            <h3>Specialized Coursework</h3>
            <p className="course-intro">Technical training in modern engineering systems. Click a category to expand.</p>
            
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
