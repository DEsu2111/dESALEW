import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profilePic from '../assets/desu1.jpg';
import { courseGroups } from '../data/education';
import { DEFAULT_SKILL_GROUPS } from '../data/skills';

const API_BASE = import.meta.env.VITE_API_URL || '';

const DOMAIN_ICONS = {
  'Programming & Software': '💻',
  'Data & Systems': '🗄️',
  'Architecture & Embedded': '🔧',
  'Electronics & Signals': '📡',
  'Electrical Engineering': '⚡'
};

const SKILLS_PROGRESS = [
  { name: 'Frontend Development (React, Next.js, Tailwind CSS, JS)', level: 92 },
  { name: 'Backend Development (Laravel, Node.js, Nest.js, Django)', level: 88 },
  { name: 'Database & Architecture (PostgreSQL, MongoDB, MySQL)', level: 85 },
  { name: 'Embedded Systems & IoT (Microcontrollers, C/C++, Sensors)', level: 84 },
  { name: 'UI/UX & Graphic Design (Figma, Photoshop, Premiere Pro)', level: 80 },
  { name: 'Project Management & DevOps (Git, Jira, ClickUp, Linux)', level: 86 },
];

const defaultCertificates = [
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    description: 'Contribution to organizing the prestigious technology event in Addis Ababa.',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    icon: '🏆',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    description: 'Served as Team Leader for over three years, managing digital initiatives and strategic leadership.',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    icon: '⚔️',
    type: 'Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Volunteer Teacher Recognition',
    issuer: 'Community Education Program',
    description: 'Certificate of recognition for volunteering as a make-up teacher for students.',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    icon: '📚',
    type: 'Volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    description: 'Successful contribution to organizing the technology hackathon event in Hawassa city.',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    icon: '🏅',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Digital Strategies Missionary',
    issuer: 'Great Commission Ministry',
    description: 'Over three years of dedicated service in the digital strategies missionary program.',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    icon: '🌐',
    type: 'Service',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Customer Service Training Completion Certificate',
    issuer: 'Rori Hotel Hawassa',
    description: 'Successful completion of 4 hrs intensive professional customer service and hospitality training.',
    link: '#',
    icon: '🏨',
    type: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  }
];

const About = () => {
  const totalCourses = courseGroups.reduce((acc, g) => acc + g.items.length, 0);

  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('adminCertsList');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return defaultCertificates;
  });

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/certificates`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCertificates(data);
            try { localStorage.setItem('adminCertsList', JSON.stringify(data)); } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Using local certificates cache:', err);
      }
    };
    fetchCerts();
  }, []);

  const [skillGroups, setSkillGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('adminSkillsList');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_SKILL_GROUPS;
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/skills`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSkillGroups(data);
          try { localStorage.setItem('adminSkillsList', JSON.stringify(data)); } catch (e) {}
        }
      })
      .catch(() => {});
  }, []);

  const location = useLocation();

  // Handle URL hash on initial load and when hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = location.hash || window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [location.hash, location.pathname]);

  // In-page smooth scroll without opening any new page or reloading
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section id="about" className="about">
      {/* Persistent Floating Download Button: Always Displayed on Top When Scrolling (Image 1 Style) */}
      <div className="persistent-top-download" aria-label="Always accessible resume download">
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

      {/* 1. Header & Overview */}
      <div className="section-header about-top-header">
        <div className="about-title-block">
          <h2>About Me</h2>
          <p className="about-subtitle">Full-Stack Developer • Software Architect • IoT & Embedded Engineer</p>
        </div>
      </div>

      <div className="about-content">
        {/* Executive Summary Card */}
        <div className="about-card">
          <div className="about-intro">
            <div className="about-badge-row">
              <span className="about-role-badge">⚡ Available for Full-Stack &amp; Architecture Roles</span>
            </div>
            <h3>Executive Summary</h3>
            <p className="about-lede">
              I am an <strong>Electrical &amp; Computer Engineering</strong> graduate specializing in the intersection of
              scalable software architecture, full-stack web applications, and intelligent hardware systems.
              I combine rigorous engineering fundamentals with modern frameworks to build resilient, real-time products.
            </p>
            <p className="about-lede">
              Currently, I work as a <strong>Full-Stack Developer</strong> contributing to real-time gaming platforms,
              enterprise operational dashboards, and cloud-deployed SaaS systems with distributed engineering teams.
            </p>
            <div className="about-chips" aria-label="Key strengths">
              <span className="about-chip">Full-Stack Development</span>
              <span className="about-chip">React &amp; Next.js</span>
              <span className="about-chip">Node.js &amp; Laravel</span>
              <span className="about-chip">System Architecture</span>
              <span className="about-chip">IoT &amp; Embedded Systems</span>
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

          {/* Quick-Jump Smooth Scroll Anchor Buttons (All on Single Page) */}
          <div className="about-quick-actions">
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className="cta-button secondary-outline"
            >
              ⚡ Skills &amp; Tech
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('education')}
              className="cta-button secondary-outline"
            >
              🎓 Education &amp; Trainings
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('certificates')}
              className="cta-button secondary-outline"
            >
              🏅 Certificates &amp; Honors
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('resume')}
              className="cta-button secondary-outline"
            >
              💼 Work Experience
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mission')}
              className="cta-button secondary-outline"
            >
              🎯 Mission &amp; Vision
            </button>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="about-photo">
          <div className="photo-frame">
            <img src={profilePic} alt="Portrait of Desalew Alganeh" loading="lazy" />
            <div className="about-photo-caption">
              <strong>Desalew Alganeh</strong>
              <span>B.Sc. Electrical &amp; Computer Engineering</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: TECHNICAL SKILLS & EXPERTISE                                   */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="skills">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Technical Competencies</span>
            <h2>Skills &amp; Technical Expertise</h2>
            <p className="about-subtitle">Full-stack software engineering, embedded IoT systems, system architecture, and modern developer tooling</p>
          </div>

          <div className="about-skills-layout">
            {/* 1. Core Engineering Proficiency Progress Bars (Image 1 Style) */}
            <div className="skills-bars-card">
              <h3 className="resume-col-title" style={{ marginTop: 0 }}>Core Engineering Proficiencies</h3>
              <div className="resume-skills-block">
                {SKILLS_PROGRESS.map((skill) => (
                  <div key={skill.name} className="resume-skill-item">
                    <div className="resume-skill-label">
                      <span>{skill.name}</span>
                      <span className="skill-percent-tag">{skill.level}%</span>
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

            {/* 2. Categorized Technical Domains */}
            <div className="skills-catalog-section">
              <h3 className="resume-col-title" style={{ marginTop: '2.5rem' }}>Categorized Technical Domains</h3>
              <div className="skills-domains-grid">
                {skillGroups.map((group) => (
                  <div key={group.title} className="skills-domain-card">
                    <div className="skills-domain-header">
                      <span className="skills-domain-icon">{group.icon || '⚡'}</span>
                      <strong className="skills-domain-title">{group.title}</strong>
                      <span className="skills-count-pill">{group.items.length}</span>
                    </div>
                    <ul className="skills-domain-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="skills-domain-card">
                  <div className="skills-domain-header">
                    <span className="skills-domain-icon">🗣️</span>
                    <strong className="skills-domain-title">Language Proficiency</strong>
                    <span className="skills-count-pill">3</span>
                  </div>
                  <ul className="skills-domain-list">
                    <li><strong>English:</strong> Professional Working &amp; Technical Proficiency</li>
                    <li><strong>Amharic:</strong> Native / Mother Tongue</li>
                    <li><strong>Agewagna:</strong> Native / Mother Tongue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: FORMAL EDUCATION & TRAININGS (Ethiopian Milestones)            */}
        {/* ========================================================================= */}
        <div className="education-card about-scroll-section" id="education">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Academic Journey</span>
            <h2>Education &amp; Technical Trainings</h2>
            <p className="about-subtitle">
              Verified Ethiopian academic progression from elementary and secondary excellence to university engineering specialization
            </p>
          </div>

          <div className="resume-grid about-edu-timeline">
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
                    Passed Ministry of Education Curriculum-Based National Exit Examination with <strong>65 out of 100</strong> (Jun 2025).
                  </li>
                  <li>
                    B.Sc. Thesis Project: <strong>"Patient Management System"</strong> — awarded highest grade <strong>"A+"</strong>{' '}
                    (Supervised by Musa Hayato, Computer Engineering Stream).
                  </li>
                  <li>
                    Recommended by Department Head Mr. Alemayehu Cheru for exceptional engineering discipline and IoT/embedded systems capabilities.
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
                    <strong>Ethiopian University Entrance Examination (EUEEC):</strong> Scored an outstanding <strong>518 / 700 Total Score</strong>.
                  </li>
                  <li>
                    Perfect national scores: <strong>100 / 100 in Chemistry</strong>, <strong>100 / 100 in Biology</strong>, <strong>99 / 100 in Civics</strong>, and <strong>76 / 100 in Aptitude</strong>.
                  </li>
                  <li>
                    Transcript record: <strong>89.90%</strong> (Grade 11) and <strong>87.75%</strong> (Grade 12), achieving <strong>Rank 1 in Class (Semester II)</strong> with Conduct Grade <strong>A</strong>.
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
                    <strong>Ethiopian General Secondary Education Certificate (EGSEC):</strong> Awarded with <strong>"Very Great Distinction"</strong> by the NEAEA (6 A's, 2 B's).
                  </li>
                  <li>
                    Transcript performance: <strong>93.23%</strong> average in Grade 9 (<strong>Rank 1 in Class</strong>) and <strong>88.95%</strong> in Grade 10 (<strong>Rank 1 in Class</strong>) with Conduct <strong>A</strong>.
                  </li>
                </ul>
              </div>

              {/* 4. Primary & Elementary School Education (Grades 1 – 8) */}
              <div className="resume-item">
                <h4>Primary &amp; Elementary School Education (Grades 1 – 8)</h4>
                <span className="resume-date">2007 – 2015 G.C. (1999 – 2007 E.C.)</span>
                <p className="resume-italic">Primary &amp; Elementary School, Guangua / Chagni Area, Awi Zone, Amhara Region</p>
                <ul>
                  <li>
                    Completed the standard 8-year Ethiopian elementary curriculum (<strong>Grade 1 through Grade 8</strong>).
                  </li>
                  <li>
                    Awarded the official <strong>Primary School Leaving Certificate (የመጀመሪያ ደረጃ ትምህርት ማጠቃለያ የምስክር ወረቀት)</strong> by the Amhara Region Education Bureau.
                  </li>
                  <li>
                    Scored <strong>74% mark (74.72 percentile)</strong> on the Regional Grade 8 Leaving Examination, earning promotion to Grade 9 High School.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Short-Term Trainings */}
            <div className="resume-column">
              <h3 className="resume-col-title">Short-Term Trainings</h3>

              <div className="resume-item">
                <h4>Customer Service &amp; Professional Hospitality Training</h4>
                <span className="resume-date">August 12 – 13, 2024</span>
                <p className="resume-italic">Rori Hotel Hawassa — Human Resource Management</p>
                <ul>
                  <li>
                    Awarded formal <strong>Training Completion Certificate</strong> for completing intensive customer service excellence, professional communication, and client experience training.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Full-Stack Web Development &amp; Cloud Architecture</h4>
                <span className="resume-date">2023 – 2024</span>
                <p className="resume-italic">Professional Software Engineering Bootcamp &amp; Practical Training</p>
                <ul>
                  <li>
                    Intensive hands-on training in <strong>React, Next.js, Tailwind CSS, Node.js, Nest.js, Django, and Laravel</strong>.
                  </li>
                  <li>
                    RESTful APIs, real-time web systems, and database architecture with <strong>PostgreSQL, MySQL, and MongoDB</strong>.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Embedded Systems, IoT &amp; Circuit Simulation Training</h4>
                <span className="resume-date">2022 – 2024</span>
                <p className="resume-italic">Hawassa University — IoT &amp; Embedded Systems Laboratory</p>
                <ul>
                  <li>
                    Practical training on <strong>PIC Microcontrollers, Arduino, and ESP32</strong> programming in C/C++ and Assembly.
                  </li>
                  <li>
                    Circuit simulation and PCB design using <strong>Proteus and Multisim</strong>.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Computer Maintenance, OS Administration &amp; LAN Networking</h4>
                <span className="resume-date">Feb 2024 – Apr 2024</span>
                <p className="resume-italic">Hawassa University — ICT &amp; Head Office Maintenance Division</p>
                <ul>
                  <li>
                    Practical training in <strong>Windows &amp; Linux OS installation</strong>, PC/printer hardware repair, and LAN switch/router networking.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>UI/UX Design, Digital Media &amp; Agile Leadership Training</h4>
                <span className="resume-date">2021 – 2024</span>
                <p className="resume-italic">Horeb Digital Strategies &amp; Indicitous Technology (#HACH)</p>
                <ul>
                  <li>
                    UI/UX prototyping and digital media creation with <strong>Figma, Photoshop, Illustrator, Premiere Pro, and CapCut</strong>, plus agile project coordination (<strong>Jira, ClickUp</strong>).
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

        {/* ========================================================================= */}
        {/* SECTION 2: CERTIFICATES & HONORS (Continuous Gallery)                     */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="certificates">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Verified Credentials</span>
            <h2>Certificates &amp; Honors</h2>
            <p className="about-subtitle">Validating excellence through formal recognition, technology hackathons, and leadership service</p>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert, index) => {
              const certImg = cert.imageUrl || cert.image;
              return (
                <div key={index} className={`cert-card ${certImg ? 'has-image' : ''}`}>
                  {certImg && (
                    <div className="cert-image-wrap">
                      <img 
                        src={certImg} 
                        alt={cert.title} 
                        className="cert-preview-img"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="cert-content">
                    <div className="cert-card-top-row">
                      <div className="cert-icon-box">{cert.icon || '🏅'}</div>
                      <span className="cert-type-badge">{cert.type || 'Recognition'}</span>
                    </div>
                    <h3>{cert.title}</h3>
                    <p className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></p>
                    <p className="cert-desc">{cert.description || cert.desc}</p>
                    {cert.link && cert.link !== '#' && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cert-link-btn"
                      >
                        View Credential <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: RESUME & PROFESSIONAL EXPERIENCE (Continuous View)             */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="resume">
          <div className="resume-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="ref-clean-eyebrow">Professional Track Record</span>
            <h2>Resume &amp; Experience</h2>
            <p className="resume-subtitle">
              Summary of technical competencies, commercial engineering roles, and downloadable executive resume
            </p>
            <div className="resume-download-wrap" style={{ marginTop: '1rem' }}>
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
            {/* Left Column: Contact Summary & Skills */}
            <div className="resume-column">
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
              <h3 className="resume-col-title">Work Experience</h3>

              <div className="resume-item">
                <h4>Full-Stack Developer</h4>
                <span className="resume-date">Feb 2026 – Present</span>
                <p className="resume-italic">Game Developing — Addis Ababa, Ethiopia (Remote)</p>
                <ul>
                  <li>Building a real-time Bingo game platform as a full-stack developer.</li>
                  <li>Developing internal dashboards and admin tooling for game operations.</li>
                  <li>Collaborating with a remote engineering team across multiple projects under NDA constraints.</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Full-Stack Developer (Part-Time)</h4>
                <span className="resume-date">2024 – Present</span>
                <p className="resume-italic">TTM Technology Solutions — Addis Ababa, Ethiopia</p>
                <ul>
                  <li>Developing and maintaining full-stack web applications using Laravel, React, and modern web technologies.</li>
                  <li>Collaborating with the team to deliver high-quality software solutions and digital products.</li>
                  <li>Focusing on creating responsive, user-friendly interfaces and robust backend systems.</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Data Entry &amp; Reporting Assistant</h4>
                <span className="resume-date">Jun 2024 – Sep 2024</span>
                <p className="resume-italic">Metehara Sugar Factory – Fixed Asset Inventory &amp; ICT Office</p>
                <ul>
                  <li>Performed accurate data entry and updates related to fixed assets and inventory records.</li>
                  <li>Assisted in compiling and formatting reports for internal use and audits using Excel.</li>
                  <li>Supported the ICT office in organizing digital files and maintaining data integrity.</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>IT &amp; Maintenance Intern</h4>
                <span className="resume-date">Feb 2024 – Apr 2024</span>
                <p className="resume-italic">Hawassa University – Head Office, Hawassa, Ethiopia</p>
                <ul>
                  <li>Gained hands-on experience in computer maintenance, Windows/Linux OS installation, and hardware troubleshooting.</li>
                  <li>Participated in LAN networking activities, including configuring switches, hubs, and local area connections.</li>
                  <li>Worked closely with the university IT team to support daily tech operations and equipment upkeep.</li>
                </ul>
              </div>

              <div className="resume-item">
                <h4>Team Leader &amp; Digital Media Coordinator</h4>
                <span className="resume-date">2021 – 2025</span>
                <p className="resume-italic">Horeb Digital Strategies Ministry (Volunteer Work)</p>
                <ul>
                  <li>Led a team of volunteers in planning and executing digital outreach strategies over a 3-year period.</li>
                  <li>Designed promotional graphics and edited video content using Photoshop, Illustrator, Premiere Pro, and CapCut.</li>
                  <li>Managed and grew social media platforms (Facebook, Telegram, YouTube) and trained new team members.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4 (AT THE END): MY MISSION & VISION                               */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="mission">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Strategic Purpose</span>
            <h2>My Mission &amp; Vision</h2>
            <p className="about-subtitle">The core philosophy driving my engineering journey and technical leadership</p>
          </div>

          <div className="mission-vision-container full-page-layout">
            <div className="mission-box philosophy-card-large">
              <div className="card-icon">🎯</div>
              <h3>The Mission</h3>
              <p>
                To deliver innovative, high-performance technical solutions that bridge the gap between 
                complex hardware and intuitive software. I am dedicated to empowering businesses and 
                individuals through seamless digital experiences, optimized system architectures, 
                and reliable engineering practices.
              </p>
              <div className="value-pills">
                <span>Innovation</span>
                <span>Reliability</span>
                <span>Excellence</span>
              </div>
            </div>

            <div className="vision-box philosophy-card-large">
              <div className="card-icon">🚀</div>
              <h3>The Vision</h3>
              <p>
                To become a leading global engineer and full-stack developer recognized for 
                technical excellence in IoT and complex system integration. My vision is to drive 
                positive global impact through scalable software engineering that solves real-world 
                problems and sets new standards for technical quality.
              </p>
              <div className="value-pills">
                <span>Leadership</span>
                <span>Impact</span>
                <span>Scalability</span>
              </div>
            </div>
          </div>

          <div className="mission-footer-cta" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/contact" className="cta-button primary">Let's Work Together →</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
