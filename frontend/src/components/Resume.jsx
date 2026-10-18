import React from 'react';

const SKILLS_PROGRESS = [
  { name: 'Frontend Development (React, Next.js, Tailwind CSS, JS)', level: 92 },
  { name: 'Backend Development (Laravel, Node.js, Nest.js, Django)', level: 88 },
  { name: 'Database & Architecture (PostgreSQL, MongoDB, MySQL)', level: 85 },
  { name: 'Embedded Systems & IoT (Microcontrollers, C/C++, Sensors)', level: 84 },
  { name: 'UI/UX & Graphic Design (Figma, Photoshop, Premiere Pro)', level: 80 },
  { name: 'Project Management & DevOps (Git, Jira, ClickUp, Linux)', level: 86 },
];

const Resume = () => {
  return (
    <section id="resume" className="resume-section">
      <div className="resume-header">
        <h2>Resume</h2>
        <p className="resume-subtitle">
          Electrical &amp; Computer Engineering graduate and Full-Stack Software Developer specializing in scalable web
          applications, real-time platforms, and intelligent IoT systems.
        </p>
        <div className="resume-download-wrap">
          <a
            href="/resume.pdf"
            download="Desalew_Alganeh_Resume.pdf"
            className="btn-download-resume-doc"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Desalew Alganeh Official Resume PDF"
          >
            <span className="btn-doc-icon">📄</span>
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>

      <div className="resume-grid">
        {/* Left Column: Summary / Contact Address, Education, Professional Skills */}
        <div className="resume-column">
          <h3 className="resume-col-title">Contact &amp; Summary</h3>
          <div className="resume-item">
            <h4>Desalew Alganeh</h4>
            <p className="resume-italic">
              Full-Stack Developer &amp; Electrical / Computer Engineer passionate about building resilient, real-time web
              platforms and hardware-integrated solutions.
            </p>
            <ul className="resume-contact-list">
              <li><strong>Address:</strong> Addis Ababa, Ethiopia</li>
              <li><strong>Phone:</strong> +251-9626-22111 | +251-5517-2057</li>
              <li><strong>Email:</strong> <a href="mailto:desu6262@gmail.com">desu6262@gmail.com</a></li>
              <li><strong>Telegram:</strong> <a href="https://t.me/desu6262" target="_blank" rel="noopener noreferrer">@desu6262</a></li>
              <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/desalew-aleganeh" target="_blank" rel="noopener noreferrer">in/desalew-aleganeh</a></li>
              <li><strong>GitHub:</strong> <a href="https://github.com/DEsu2111" target="_blank" rel="noopener noreferrer">github.com/DEsu2111</a></li>
            </ul>
          </div>

          <h3 className="resume-col-title">Education &amp; Trainings</h3>
          <div className="resume-item">
            <h4>B.Sc. in Electrical Engineering (Computer Engineering)</h4>
            <span className="resume-date">Oct 2019 – Jun 2025 (Graduated Jun 19, 2025)</span>
            <p className="resume-italic">Hawassa University — Institute of Technology (HU-IoT), Hawassa, Ethiopia</p>
            <p className="resume-desc">
              Graduated with a Cumulative GPA of <strong>3.36 / 4.00 (Distinction)</strong>. Passed the National Exit Examination
              (<strong>65 / 100</strong>). B.Sc. Capstone Project <em>"Patient Management System"</em> awarded top grade <strong>"A+"</strong>{' '}
              (Supervised by Lecturer Musa Hayato).
            </p>
          </div>

          <div className="resume-item">
            <h4>Preparatory Secondary Education (Grades 11 – 12) — Natural Science</h4>
            <span className="resume-date">2017 – 2019 G.C. (2010 – 2011 E.C.)</span>
            <p className="resume-italic">Chagni Preparatory &amp; General Secondary School (Chagni Pre &amp; G-S-S-S), Awi Zone</p>
            <p className="resume-desc">
              Achieved <strong>518 / 700 Total Score</strong> on the Ethiopian University Entrance Exam (EUEEC), with{' '}
              <strong>100 / 100 in Chemistry</strong>, <strong>100 / 100 in Biology</strong>, <strong>99 / 100 in Civics</strong>, and{' '}
              <strong>76 / 100 in Aptitude</strong>. High school transcript record of 89.90% (Grade 11) and 87.75% (Grade 12, Rank 1 Sem II).
            </p>
          </div>

          <div className="resume-item">
            <h4>General Secondary High School Education (Grades 9 – 10)</h4>
            <span className="resume-date">2015 – 2017 G.C. (2008 – 2009 E.C.)</span>
            <p className="resume-italic">Chagni Preparatory &amp; General Secondary School (Chagni Pre &amp; G-S-S-S), Awi Zone</p>
            <p className="resume-desc">
              Awarded the Ethiopian General Secondary Education Certificate (EGSEC) with <strong>"Very Great Distinction"</strong>{' '}
              (6 A's, 2 B's). Maintained top academic ranking: <strong>93.23% in Grade 9 (Rank 1)</strong> and <strong>88.95% in Grade 10 (Rank 1)</strong>.
            </p>
          </div>

          <div className="resume-item">
            <h4>Primary &amp; Elementary School Education (Grades 1 – 8)</h4>
            <span className="resume-date">2007 – 2015 G.C. (1999 – 2007 E.C.)</span>
            <p className="resume-italic">Primary &amp; Elementary School, Guangua / Chagni Area, Awi Zone, Amhara Region</p>
            <p className="resume-desc">
              Completed the foundational 8-year Ethiopian primary curriculum from Grade 1 through Grade 8. Awarded the official{' '}
              <strong>Primary School Leaving Certificate</strong> (74% mark / 74.72 percentile) and promoted to Grade 9 High School.
            </p>
          </div>

          <div className="resume-item">
            <h4>Short-Term Technical &amp; Professional Trainings</h4>
            <span className="resume-date">2021 – 2024</span>
            <p className="resume-italic">Customer Service, Full-Stack Web, Embedded IoT &amp; LAN Networking</p>
            <ul>
              <li><strong>Customer Service Excellence:</strong> Certified by Rori Hotel Hawassa (Amir Awel, HR Manager, Aug 2024).</li>
              <li><strong>Full-Stack Software Engineering:</strong> React, Next.js, Node.js, Nest.js, Django, Laravel, PostgreSQL, MongoDB.</li>
              <li><strong>Embedded Systems &amp; Circuit Simulation:</strong> PIC Microcontroller, Arduino, ESP32, Proteus, Multisim, PCB design.</li>
              <li><strong>ICT Maintenance &amp; LAN Networking:</strong> Hawassa University ICT Division (Hardware, OS, LAN routing).</li>
            </ul>
          </div>

          <h3 className="resume-col-title">Professional Skills</h3>
          <div className="resume-skills-block">
            {SKILLS_PROGRESS.map((skill) => (
              <div key={skill.name} className="resume-skill-item">
                <div className="resume-skill-label">
                  <span>{skill.name}</span>
                </div>
                <div className="resume-skill-track">
                  <div
                    className="resume-skill-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Professional Experience */}
        <div className="resume-column">
          <h3 className="resume-col-title">Professional Experience</h3>

          <div className="resume-item">
            <h4>Full-Stack Developer</h4>
            <span className="resume-date">Feb 2026 - Present</span>
            <p className="resume-italic">Game Developing — Addis Ababa, Ethiopia (Remote)</p>
            <ul>
              <li>Building a real-time Bingo game platform as a full-stack developer.</li>
              <li>Developing internal dashboards and admin tooling for game operations.</li>
              <li>Collaborating with a remote engineering team across multiple projects under NDA constraints.</li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Full-Stack Developer (Part-Time)</h4>
            <span className="resume-date">2024 - Present</span>
            <p className="resume-italic">TTM Technology Solutions — Addis Ababa, Ethiopia</p>
            <ul>
              <li>Developing and maintaining full-stack web applications using Laravel, React, and modern web technologies.</li>
              <li>Collaborating with the team to deliver high-quality software solutions and digital products.</li>
              <li>Focusing on creating responsive, user-friendly interfaces and robust backend systems.</li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Data Entry &amp; Reporting Assistant</h4>
            <span className="resume-date">Jun 2024 - Sep 2024</span>
            <p className="resume-italic">Metehara Sugar Factory – Fixed Asset Inventory &amp; ICT Office</p>
            <ul>
              <li>Performed accurate data entry and updates related to fixed assets and inventory records.</li>
              <li>Assisted in compiling and formatting reports for internal use and audits using Excel.</li>
              <li>Supported the ICT office in organizing digital files and maintaining data integrity.</li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>IT &amp; Maintenance Intern</h4>
            <span className="resume-date">Feb 2024 - Apr 2024</span>
            <p className="resume-italic">Hawassa University – Head Office, Hawassa, Ethiopia</p>
            <ul>
              <li>Gained hands-on experience in computer maintenance, Windows/Linux OS installation, and hardware troubleshooting.</li>
              <li>Participated in LAN networking activities, including configuring switches, hubs, and local area connections.</li>
              <li>Worked closely with the university IT team to support daily tech operations and equipment upkeep.</li>
            </ul>
          </div>

          <div className="resume-item">
            <h4>Team Leader &amp; Digital Media Coordinator</h4>
            <span className="resume-date">2021 - 2025</span>
            <p className="resume-italic">Horeb Digital Strategies Ministry (Volunteer Work)</p>
            <ul>
              <li>Led a team of volunteers in planning and executing digital outreach strategies over a 3-year period.</li>
              <li>Designed promotional graphics and edited video content using Photoshop, Illustrator, Premiere Pro, and CapCut.</li>
              <li>Managed and grew social media platforms (Facebook, Telegram, YouTube) and trained new team members.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
