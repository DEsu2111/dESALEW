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
        <div className="social-links resume-download-wrap">
          <a
            href="/resume.pdf"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume (PDF)
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
            <h4>B.Sc. in Electrical &amp; Computer Engineering</h4>
            <span className="resume-date">2019 - 2025</span>
            <p className="resume-italic">Hawassa University, Hawassa, Ethiopia (IoT Specialization)</p>
            <p className="resume-desc">
              Specialized in Internet of Things (IoT), Embedded Systems, and Software Engineering. Graduated with a
              <strong> Cumulative GPA of 3.50 / 4.0</strong> and a <strong>Peak Semester GPA of 3.85 / 4.0</strong>.
            </p>
          </div>

          <div className="resume-item">
            <h4>Preparatory &amp; High School Education (Grades 9 – 12)</h4>
            <span className="resume-date">2015 - 2019</span>
            <p className="resume-italic">Preparatory &amp; General Secondary High School — Natural Science Stream</p>
            <p className="resume-desc">
              Completed General Secondary (Grades 9–10) and Preparatory Natural Science (Grades 11–12) with high
              distinction on national examinations (EGSECE &amp; EUEE).
            </p>
          </div>

          <div className="resume-item">
            <h4>Primary &amp; Elementary School Education (Grades 1 – 8)</h4>
            <span className="resume-date">2007 - 2015</span>
            <p className="resume-italic">Primary &amp; Elementary School, Ethiopia</p>
            <p className="resume-desc">
              Completed elementary education with distinction and active participation in academic science clubs.
            </p>
          </div>

          <div className="resume-item">
            <h4>Short-Term Technical Trainings</h4>
            <span className="resume-date">2021 - 2024</span>
            <p className="resume-italic">Full-Stack Web, Embedded IoT, Computer Maintenance &amp; Digital Media</p>
            <ul>
              <li>Full-Stack Web Development (React, Next.js, Node.js, Nest.js, Laravel, Django).</li>
              <li>Embedded Systems &amp; Circuit Simulation (PIC, Arduino, Proteus, Multisim).</li>
              <li>Computer Maintenance, OS Administration &amp; LAN Networking (Hawassa University ICT).</li>
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
