import React from 'react';
import { courseGroups } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="resume-section education-page-clean">
      <div className="resume-header">
        <h2>Education &amp; Trainings</h2>
        <p className="resume-subtitle">
          Complete academic journey from elementary and high school foundations to university engineering specialization
          and intensive short-term technical trainings.
        </p>
      </div>

      <div className="resume-grid">
        {/* Left Column: Formal Academic Education (University -> Preparatory -> High School -> Elementary) */}
        <div className="resume-column">
          <h3 className="resume-col-title">Formal Academic Education</h3>

          {/* 1. Higher Education / University */}
          <div className="resume-item">
            <h4>B.Sc. in Electrical Engineering (Computer Engineering)</h4>
            <span className="resume-date">Oct 2019 – Jun 2025 (Graduated Jun 19, 2025)</span>
            <p className="resume-italic">Hawassa University — Institute of Technology (HU-IoT), Hawassa, Ethiopia</p>
            <ul>
              <li>
                Graduated with a competitive Cumulative GPA of <strong>3.36 / 4.00 (Distinction)</strong>.
              </li>
              <li>
                Successfully passed the Ministry of Education Curriculum-Based National Exit Examination with a score of{' '}
                <strong>65 out of 100</strong> (June 2025 G.C.).
              </li>
              <li>
                B.Sc. Capstone Thesis: <strong>"Patient Management System"</strong> — earned top grade of <strong>"A+"</strong>{' '}
                under the supervision of Lecturer Musa Hayato (Computer Engineering Stream).
              </li>
              <li>
                Formally commended by Department Head Mr. Alemayehu Cheru for excellence in IoT &amp; Embedded Systems,
                circuit design, research &amp; development, and consistent engineering rigor.
              </li>
            </ul>
          </div>

          {/* 2. Preparatory Secondary Education (Grades 11 – 12) */}
          <div className="resume-item">
            <h4>Preparatory Secondary Education (Grades 11 – 12) — Natural Science Stream</h4>
            <span className="resume-date">2017 – 2019 G.C. (2010 – 2011 E.C.)</span>
            <p className="resume-italic">Chagni Preparatory &amp; General Secondary School (Chagni Pre &amp; G-S-S-S), Awi Zone, Ethiopia</p>
            <ul>
              <li>
                <strong>Ethiopian University Entrance Examination (EUEEC):</strong> Achieved an outstanding score of{' '}
                <strong>518 / 700 Total Score</strong> (NEAEA).
              </li>
              <li>
                Exceptional national scores: <strong>100 / 100 in Chemistry</strong>, <strong>100 / 100 in Biology</strong>,{' '}
                <strong>99 / 100 in Civics</strong>, and <strong>76 / 100 in Aptitude</strong>.
              </li>
              <li>
                Transcript record: <strong>89.90%</strong> yearly average in Grade 11 and <strong>87.75%</strong> in Grade 12,
                achieving <strong>Rank 1 in Class (Semester II)</strong> with Conduct Grade <strong>A</strong>.
              </li>
            </ul>
          </div>

          {/* 3. General Secondary Education / High School (Grades 9 – 10) */}
          <div className="resume-item">
            <h4>General Secondary High School Education (Grades 9 – 10)</h4>
            <span className="resume-date">2015 – 2017 G.C. (2008 – 2009 E.C.)</span>
            <p className="resume-italic">Chagni Preparatory &amp; General Secondary School (Chagni Pre &amp; G-S-S-S), Awi Zone, Ethiopia</p>
            <ul>
              <li>
                <strong>Ethiopian General Secondary Education Certificate (EGSEC):</strong> Awarded with{' '}
                <strong>"Very Great Distinction"</strong> by the NEAEA (August 2017 / 2009 E.C.).
              </li>
              <li>
                Earned <strong>6 A's</strong> (Amharic, English, Mathematics, Biology, Civics, Geography) and{' '}
                <strong>2 B's</strong> (Physics, Chemistry).
              </li>
              <li>
                High school transcript record: <strong>93.23%</strong> yearly average in Grade 9 (<strong>Rank 1 in Class</strong>)
                and <strong>88.95%</strong> in Grade 10 (<strong>Rank 1 in Class</strong>) with Conduct Grade <strong>A</strong>.
              </li>
            </ul>
          </div>

          {/* 4. Primary & Elementary School Education (Grades 1 – 8) */}
          <div className="resume-item">
            <h4>Primary &amp; Elementary School Education (Grades 1 – 8)</h4>
            <span className="resume-date">2007 – 2015 G.C. (1999 – 2007 E.C.)</span>
            <p className="resume-italic">Primary &amp; Elementary School, Guangua / Chagni Area, Awi Administrative Zone, Amhara Region</p>
            <ul>
              <li>
                Completed the foundational Ethiopian 8-year elementary curriculum from <strong>Grade 1 through Grade 8</strong>.
              </li>
              <li>
                Awarded the official <strong>Primary School Leaving Certificate (የመጀመሪያ ደረጃ ትምህርት ማጠቃለያ የምስክር ወረቀት)</strong>{' '}
                by the Amhara National Regional State Education Bureau.
              </li>
              <li>
                Achieved an average mark of <strong>74%</strong> (<strong>74.72 percentile</strong>) on the Regional Grade 8
                Leaving Examination, earning formal promotion to Grade 9 General Secondary School.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Short-Term Trainings & Professional Workshops */}
        <div className="resume-column">
          <h3 className="resume-col-title">Short-Term Trainings</h3>

          <div className="resume-item">
            <h4>Customer Service &amp; Professional Hospitality Training</h4>
            <span className="resume-date">August 12 – 13, 2024</span>
            <p className="resume-italic">Rori Hotel Hawassa — Human Resource Management &amp; General Directorate</p>
            <ul>
              <li>
                Awarded formal <strong>Training Completion Certificate</strong> for completing intensive professional customer
                service training.
              </li>
              <li>
                Mastered executive client relations, service etiquette, interpersonal communication, and conflict resolution
                standards.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Full-Stack Web Development &amp; Cloud Architecture</h4>
            <span className="resume-date">2023 – 2024 (Intensive Practical Training)</span>
            <p className="resume-italic">Professional Software Engineering Bootcamp &amp; Practical Training</p>
            <ul>
              <li>
                Hands-on training in modern full-stack development: <strong>React, Next.js, Tailwind CSS, Node.js, Nest.js,
                Django, and Laravel</strong>.
              </li>
              <li>
                Architected production-ready REST APIs, real-time web systems, and databases (<strong>PostgreSQL, MySQL,
                MongoDB</strong>).
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Embedded Systems, IoT &amp; Circuit Simulation Training</h4>
            <span className="resume-date">2022 – 2024 (Lab &amp; Workshop Training)</span>
            <p className="resume-italic">Hawassa University — IoT &amp; Embedded Systems Laboratory</p>
            <ul>
              <li>
                Practical training in programming <strong>PIC Microcontrollers, Arduino, and ESP32</strong> using C/C++ and
                Assembly.
              </li>
              <li>
                Circuit design, schematic capture, and simulation with <strong>Proteus, Multisim, and PCB design workflows</strong>.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Computer Maintenance, OS Administration &amp; LAN Networking</h4>
            <span className="resume-date">Feb 2024 – Apr 2024 (Practical Training)</span>
            <p className="resume-italic">Hawassa University — ICT &amp; Head Office Maintenance Division</p>
            <ul>
              <li>
                Completed practical training in <strong>Windows &amp; Linux OS installation</strong>, PC/printer hardware
                troubleshooting, and preventive maintenance.
              </li>
              <li>
                Configured switches, hubs, local area network (LAN) cabling, and IP routing across university departments.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>UI/UX Design, Digital Media &amp; Agile Leadership Training</h4>
            <span className="resume-date">2021 – 2024 (Continuous Training)</span>
            <p className="resume-italic">Horeb Digital Strategies &amp; Indicitous Technology (#HACH Addis / Hawassa)</p>
            <ul>
              <li>
                Trained in interface prototyping and digital media creation using <strong>Figma, Adobe Photoshop, Illustrator,
                Premiere Pro, and CapCut</strong>.
              </li>
              <li>
                Applied agile project management (<strong>Jira, ClickUp, Git/GitHub</strong>) and co-organized regional hackathons.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* University Core Engineering Coursework in the same clean timeline style */}
      <div className="education-domains-section">
        <h3 className="resume-col-title">University Core Engineering Coursework</h3>
        <div className="resume-grid">
          {courseGroups.map((group) => (
            <div key={group.title} className="resume-item">
              <h4>{group.title}</h4>
              <span className="resume-date">{group.items.length} Core University Courses</span>
              <ul>
                {group.items.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

