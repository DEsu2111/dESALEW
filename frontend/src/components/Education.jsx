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

          <div className="resume-item">
            <h4>B.Sc. in Electrical &amp; Computer Engineering</h4>
            <span className="resume-date">Oct 2019 - Jun 2025</span>
            <p className="resume-italic">Hawassa University — Institute of Technology, Hawassa, Ethiopia</p>
            <ul>
              <li>
                Specialized in <strong>Internet of Things (IoT)</strong>, <strong>Embedded Systems</strong>, Computer
                Architecture, and Full-Stack Software Engineering.
              </li>
              <li>
                Graduated with a <strong>Cumulative GPA of 3.50 / 4.0</strong> and achieved a{' '}
                <strong>Peak Semester GPA of 3.85 / 4.0</strong>.
              </li>
              <li>
                Designed and implemented hardware-software integrated capstone projects using microcontrollers, sensor
                networks, and modern web dashboards.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Preparatory School Certificate (Grades 11 – 12)</h4>
            <span className="resume-date">2017 - 2019</span>
            <p className="resume-italic">Preparatory &amp; Senior Secondary School — Natural Science Stream, Ethiopia</p>
            <ul>
              <li>
                Focused on advanced <strong>Mathematics, Physics, Chemistry, Technical Drawing, and ICT</strong>.
              </li>
              <li>
                Passed the Ethiopian University Entrance Examination (EUEE) with high distinction to pursue Electrical
                &amp; Computer Engineering.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>General Secondary / High School Certificate (Grades 9 – 10)</h4>
            <span className="resume-date">2015 - 2017</span>
            <p className="resume-italic">General Secondary High School, Ethiopia</p>
            <ul>
              <li>
                Built strong analytical foundations in natural sciences, mathematics, English communication, and
                foundational computing.
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
                Completed primary and upper-elementary education with top academic standing and active participation in
                school science and creativity clubs.
              </li>
              <li>
                Earned the Regional Primary School Leaving Certificate with distinction.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Short-Term Trainings & Professional Workshops */}
        <div className="resume-column">
          <h3 className="resume-col-title">Short-Term Trainings</h3>

          <div className="resume-item">
            <h4>Full-Stack Web Development &amp; Cloud Architecture</h4>
            <span className="resume-date">2023 - 2024 (Short-Term Intensive)</span>
            <p className="resume-italic">Professional Software Engineering Bootcamp &amp; Practical Training</p>
            <ul>
              <li>
                Hands-on training in modern frontend and backend stacks: <strong>React, Next.js, Tailwind CSS, Node.js,
                Nest.js, Django, and Laravel</strong>.
              </li>
              <li>
                Built production-ready REST APIs, real-time web applications, and relational/NoSQL databases
                (<strong>PostgreSQL, MySQL, MongoDB</strong>).
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Embedded Systems, IoT &amp; Circuit Simulation Training</h4>
            <span className="resume-date">2022 - 2024 (Lab &amp; Workshop Training)</span>
            <p className="resume-italic">Hawassa University — IoT &amp; Embedded Systems Laboratory</p>
            <ul>
              <li>
                Practical training in programming <strong>PIC Microcontrollers, Arduino, and ESP32</strong> using C/C++
                and Assembly.
              </li>
              <li>
                Circuit design, schematic capture, and simulation with <strong>Proteus, Multisim, and PCB design
                workflows</strong>.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Computer Maintenance, OS Administration &amp; LAN Networking</h4>
            <span className="resume-date">Feb 2024 - Apr 2024 (Practical Training)</span>
            <p className="resume-italic">Hawassa University — ICT &amp; Head Office Maintenance Division</p>
            <ul>
              <li>
                Completed intensive practical training in <strong>Windows &amp; Linux OS installation</strong>, PC/printer
                hardware troubleshooting, and preventive system maintenance.
              </li>
              <li>
                Configured switches, hubs, local area network (LAN) cabling, and IP routing across university
                departments.
              </li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>UI/UX Design, Digital Media &amp; Agile Leadership Training</h4>
            <span className="resume-date">2021 - 2024 (Continuous Training)</span>
            <p className="resume-italic">Horeb Digital Strategies &amp; Indicitous Technology (#HACH Addis / Hawassa)</p>
            <ul>
              <li>
                Trained in interface prototyping and digital media creation using <strong>Figma, Balsamiq, Adobe
                Photoshop, Illustrator, Premiere Pro, and CapCut</strong>.
              </li>
              <li>
                Applied agile project management (<strong>Jira, ClickUp, Git/GitHub</strong>) and organized major
                regional hackathons.
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

