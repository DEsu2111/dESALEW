import React from 'react';
import { courseGroups } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="about">
      <h2>Education</h2>
      <div className="about-content">
        <div className="about-text">
          <h3>B.Sc. Electrical and Computer Engineering</h3>
          <p>
            <strong>Hawassa University</strong><br />
            October 2019 - June 2025<br />
            College of Electrical and Computer Engineering - IoT Specialization<br />
            Highest Semester GPA: 3.85 | CGPA: 3.5
          </p>

          <h3>Major Courses</h3>
          <div className="course-grid">
            {courseGroups.map((group, index) => (
              <details key={group.title} className="course-card course-toggle" open={index === 0}>
                <summary>
                  <span>{group.title}</span>
                  <span className="course-count">{group.items.length}</span>
                </summary>
                <ul>
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
