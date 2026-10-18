import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_SKILL_GROUPS } from '../data/skills';

const API_BASE = import.meta.env.VITE_API_URL || '';

const SKILLS_PROGRESS = [
  { name: 'Frontend Development (React, Next.js, Tailwind CSS, JS)', level: 92, category: 'web' },
  { name: 'Backend Development (Laravel, Node.js, Nest.js, Django)', level: 88, category: 'web' },
  { name: 'Database & Architecture (PostgreSQL, MongoDB, MySQL)', level: 85, category: 'systems' },
  { name: 'Embedded Systems & IoT (Microcontrollers, C/C++, Sensors)', level: 84, category: 'embedded' },
  { name: 'UI/UX & Graphic Design (Figma, Photoshop, Premiere Pro)', level: 80, category: 'design' },
  { name: 'Project Management & DevOps (Git, Jira, ClickUp, Linux)', level: 86, category: 'tools' },
];

const FILTER_CATEGORIES = [
  { id: 'all', label: 'All Tech' },
  { id: 'web', label: '🌐 Web & Full-Stack' },
  { id: 'embedded', label: '🤖 Embedded & IoT' },
  { id: 'systems', label: '🏗️ Systems & Data' },
  { id: 'tools', label: '🛠️ DevOps & Tools' },
  { id: 'design', label: '🎨 Design & UI/UX' },
];

const DOMAIN_CATEGORY_MAP = {
  'Web Programming & Full-Stack': 'web',
  'Software Development & Architecture': 'systems',
  'Embedded System & Microcontrollers': 'embedded',
  'Circuit Design & Analysis': 'embedded',
  'Network & Communication System': 'embedded',
  'Computer Programming': 'web',
  'Advanced Computer Skills': 'tools',
  'Computer Maintenance Skills': 'tools',
  'Project Management Tools': 'tools',
  'Project Development & Documentation': 'tools',
  'Operating Systems': 'systems',
  'Design & UI/UX': 'design',
};

const EXPERIENCE_ITEMS = [
  {
    role: 'Full-Stack Developer',
    company: 'Game Developing',
    location: 'Addis Ababa, Ethiopia (Remote)',
    period: 'Feb 2026 – Present',
    badge: 'Current Commercial Role',
    tasks: [
      'Architecting and building a real-time multiplayer Bingo gaming platform as a full-stack engineer.',
      'Developing internal analytics dashboards and admin management tooling for live game operations.',
      'Collaborating across distributed remote engineering teams under strict NDA production constraints.',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'WebSockets', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    role: 'Full-Stack Developer (Part-Time)',
    company: 'TTM Technology Solutions',
    location: 'Addis Ababa, Ethiopia',
    period: '2024 – Present',
    badge: 'Client SaaS & Enterprise',
    tasks: [
      'Developing and maintaining full-stack web applications using Laravel, React, and RESTful APIs.',
      'Collaborating with design and product teams to deliver robust software solutions and digital products.',
      'Engineering responsive, high-performance user interfaces and resilient backend business logic.',
    ],
    tech: ['Laravel', 'PHP', 'React', 'MySQL', 'REST APIs', 'Git'],
  },
  {
    role: 'Data Entry & Reporting Assistant',
    company: 'Metehara Sugar Factory – Fixed Asset Inventory & ICT Office',
    location: 'Metehara, Ethiopia',
    period: 'Jun 2024 – Sep 2024',
    badge: 'Enterprise Asset Audit',
    tasks: [
      'Performed accurate data entry and real-time updates for fixed assets and physical inventory records.',
      'Assisted in compiling, formatting, and presenting statistical reports for internal audits using Excel.',
      'Supported the ICT office in organizing digital databases, file repositories, and maintaining data integrity.',
    ],
    tech: ['Excel Data Analytics', 'Inventory Systems', 'Database Integrity', 'Audit Reporting'],
  },
  {
    role: 'IT & Maintenance Intern',
    company: 'Hawassa University – Head Office',
    location: 'Hawassa, Ethiopia',
    period: 'Feb 2024 – Apr 2024',
    badge: 'Hardware & Infrastructure',
    tasks: [
      'Gained intensive hands-on experience in computer maintenance, hardware diagnostics, and Linux/Windows OS deployment.',
      'Assisted in identifying and resolving software, firmware, and hardware faults across university departments.',
      'Configured local area network (LAN) infrastructure, including physical switches, hubs, and IP routing.',
    ],
    tech: ['Linux', 'Windows OS', 'LAN Networking', 'Hardware Diagnostics', 'System Maintenance'],
  },
  {
    role: 'Team Leader & Digital Media Coordinator',
    company: 'Horeb Digital Strategies Ministry',
    location: 'Volunteer Leadership',
    period: '2021 – 2025',
    badge: '3+ Years Leadership',
    tasks: [
      'Led an active team of technical volunteers in planning and delivering digital outreach strategies over a 3-year term.',
      'Designed promotional branding and edited high-definition video content using Photoshop, Illustrator, Premiere Pro, and CapCut.',
      'Managed and scaled digital platforms (Telegram, YouTube, Facebook), driving audience engagement and mentoring new team members.',
    ],
    tech: ['Team Leadership', 'Photoshop', 'Premiere Pro', 'Digital Strategy', 'Graphic Design'],
  },
];

const LANGUAGES_DATA = [
  {
    language: 'English',
    level: 'Professional & Technical Working Proficiency',
    percentage: 95,
    tag: 'Professional / Technical',
    description: 'Fluent in technical documentation, software architecture, code reviews, and cross-functional team collaboration.',
  },
  {
    language: 'Amharic',
    level: 'Native / Mother Tongue',
    percentage: 100,
    tag: 'Native Fluency',
    description: 'Complete native mastery across written, oral, professional, and formal communications.',
  },
  {
    language: 'Agewagna',
    level: 'Native / Mother Tongue',
    percentage: 100,
    tag: 'Native Fluency',
    description: 'Complete native fluency and cultural heritage linguistic competence.',
  },
];

const REFERENCES_DATA = [
  {
    name: 'Mr. Alemayehu Cheru',
    position: 'Head of Electrical & Computer Engineering Department',
    organization: 'Hawassa University — Institute of Technology',
    location: 'Hawassa, Ethiopia',
    phone: '+251 913 96 1344',
    email: 'alemayehu.cheru0236@gmail.com',
    tag: 'Academic Reference',
    relationship: 'Department Head & Senior Academic Advisor (2020 – 2025)',
    note: 'Can attest to my academic performance (3.36 CGPA with Distinction), engineering rigor in IoT and Embedded Systems, laboratory research, and hardware-software system design.',
    areas: ['Electrical & Computer Eng.', 'IoT & Embedded Systems', 'Academic Excellence', 'System R&D'],
  },
  {
    name: 'Mr. Musa Hayato',
    position: 'Lecturer, Computer Engineering Stream',
    organization: 'Hawassa University — Institute of Technology',
    location: 'Hawassa, Ethiopia',
    phone: '+251 920 715 314',
    email: 'musahayato@gmail.com',
    tag: 'Academic & Capstone Advisor',
    relationship: 'Course Instructor (Data Structures & Algorithms) & B.Sc. Thesis Supervisor (2020 – 2025)',
    note: "Supervised Desalew's B.Sc. capstone project 'Patient Management System' (Grade A+) and taught Data Structures and Algorithms, commending his dedication, academic potential, and conscientiousness.",
    areas: ['Data Structures & Algorithms', 'B.Sc. Thesis Project', 'Software Architecture', 'Academic Rigor'],
  },
  {
    name: 'Mr. Samson Usmael',
    position: 'Digital Strategy Director (GCME)',
    organization: 'Great Commission Ministry Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 900 50 7050',
    email: 'contact@gcmethiopia.org',
    tag: 'Professional & Leadership Reference',
    relationship: 'Executive Supervisor — Digital Strategies & Media (2021 – 2025)',
    note: 'Can vouch for my 3+ years of team leadership, digital strategy execution, full-stack technical coordination, multimedia production, and mentoring of technical volunteers.',
    areas: ['Team Leadership', 'Digital Strategy', 'Project Delivery', 'Technical Mentorship'],
  },
];

const Skills = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const [references, setReferences] = useState(() => {
    try {
      const saved = localStorage.getItem('adminReviewsList');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return REFERENCES_DATA;
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/skills`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkillGroups(data);
          try {
            localStorage.setItem('adminSkillsList', JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/api/references`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReferences(data);
          try {
            localStorage.setItem('adminReviewsList', JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  // Smart Filter: Filter domains by search keyword and category tab
  const filteredDomains = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return skillGroups
      .map((group) => {
        const category = DOMAIN_CATEGORY_MAP[group.title] || 'tools';
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

        if (!matchesCategory) return null;

        if (!query) {
          return group;
        }

        const titleMatches = group.title.toLowerCase().includes(query);
        const matchingItems = (group.items || []).filter((item) =>
          item.toLowerCase().includes(query)
        );

        if (titleMatches || matchingItems.length > 0) {
          return {
            ...group,
            items: titleMatches ? group.items : matchingItems,
            isFiltered: !titleMatches,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [skillGroups, searchTerm, selectedCategory]);

  const totalFilteredSkillsCount = useMemo(() => {
    return filteredDomains.reduce((acc, curr) => acc + (curr.items ? curr.items.length : 0), 0);
  }, [filteredDomains]);

  return (
    <section id="skills-page" className="about skills-single-page">
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

      {/* 1. Header & Overview with Stats and Quick Jump Bar */}
      <div className="section-header skills-hero-header">
        <span className="ref-clean-eyebrow">Technical Architecture &amp; Engineering Arsenal</span>
        <h2>Skills &amp; Technical Capabilities</h2>
        <p className="about-subtitle">
          Comprehensive single-page overview of full-stack engineering, embedded IoT systems, 
          real-world production experience, and verified academic &amp; industry references.
        </p>

        {/* Smart Engineering Metric Cards */}
        <div className="skills-stats-grid">
          <div className="skills-stat-card">
            <span className="skills-stat-num">80+</span>
            <span className="skills-stat-label">Technologies &amp; Tools</span>
          </div>
          <div className="skills-stat-card">
            <span className="skills-stat-num">12</span>
            <span className="skills-stat-label">Technical Domains</span>
          </div>
          <div className="skills-stat-card">
            <span className="skills-stat-num">4+</span>
            <span className="skills-stat-label">Years R&amp;D &amp; Building</span>
          </div>
          <div className="skills-stat-card">
            <span className="skills-stat-num">100%</span>
            <span className="skills-stat-label">Production Delivery</span>
          </div>
        </div>

        {/* Quick-Jump Smooth Scroll Anchor Buttons */}
        <div className="about-quick-actions" style={{ marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => scrollToSection('proficiencies')}
            className="cta-button secondary-outline"
          >
            ⚡ Core Proficiencies
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('domains')}
            className="cta-button secondary-outline"
          >
            🗂️ Tech Domains
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('experience')}
            className="cta-button secondary-outline"
          >
            💼 Applied Experience
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('languages')}
            className="cta-button secondary-outline"
          >
            🌐 Languages
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('references')}
            className="cta-button secondary-outline"
          >
            🔗 Verified References
          </button>
        </div>
      </div>

      <div className="about-content">
        {/* ========================================================================= */}
        {/* SECTION 1: CORE ENGINEERING PROFICIENCIES (GLOWING TUBES)                */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="proficiencies">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Quantified Mastery</span>
            <h2>Core Engineering Proficiencies</h2>
            <p className="about-subtitle">
              Calibrated competency benchmarks derived from enterprise SaaS delivery, real-time gaming, and embedded hardware deployments.
            </p>
          </div>

          <div className="skills-bars-card">
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
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: SMART SEARCHABLE & CATEGORIZED TECHNICAL DOMAINS              */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="domains">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <span className="ref-clean-eyebrow">Interactive Tech Explorer</span>
            <h2>Categorized Technical Domains</h2>
            <p className="about-subtitle">
              Search any framework, library, programming language, database, or tool across all 12 engineering domains.
            </p>
          </div>

          {/* Smart Interactive Search & Filter Controls */}
          <div className="skills-smart-controls">
            <div className="skills-search-wrapper">
              <span className="skills-search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="skills-search-input"
                placeholder="Search any skill, framework, or tool (e.g. React, C++, Laravel, IoT, Python)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search skills"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="skills-clear-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="skills-filter-pills" role="tablist" aria-label="Skill categories">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`skills-filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Results Counter Badge */}
            <div className="skills-result-badge-row">
              <span className="skills-result-badge">
                Showing {filteredDomains.length} of {skillGroups.length} Domains • {totalFilteredSkillsCount} Technologies
              </span>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  type="button"
                  className="skills-reset-all-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Reset Filters ↺
                </button>
              )}
            </div>
          </div>

          {/* Domains Grid */}
          {filteredDomains.length > 0 ? (
            <div className="skills-domains-grid" style={{ marginTop: '1.5rem' }}>
              {filteredDomains.map((group) => (
                <div key={group.title} className="skills-domain-card">
                  <div className="skills-domain-header">
                    <span className="domain-card-icon">{group.icon || '⚡'}</span>
                    <h4 className="domain-card-title">{group.title}</h4>
                    <span className="domain-card-count">{group.items?.length || 0}</span>
                  </div>
                  <div className="skills-chips-wrapper">
                    {group.items?.map((item) => (
                      <span
                        key={item}
                        className={`skills-item-chip ${
                          searchTerm && item.toLowerCase().includes(searchTerm.toLowerCase().trim())
                            ? 'highlighted-chip'
                            : ''
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skills-empty-state">
              <span className="empty-icon">🔎</span>
              <h4>No technologies found matching "{searchTerm}"</h4>
              <p>Try searching for terms like React, Next.js, Laravel, C++, Python, Linux, or IoT.</p>
              <button
                type="button"
                className="cta-button secondary-outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Search &amp; Show All Tech
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: APPLIED PROFESSIONAL EXPERIENCE                               */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="experience">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span className="ref-clean-eyebrow">Production Track Record</span>
            <h2>Applied Professional Experience</h2>
            <p className="about-subtitle">
              Commercial projects, remote software development, enterprise asset tracking, and IT infrastructure delivery.
            </p>
          </div>

          <div className="experience-timeline-container">
            {EXPERIENCE_ITEMS.map((exp, idx) => (
              <div key={idx} className="experience-timeline-card">
                <div className="exp-timeline-header">
                  <div className="exp-timeline-title-wrap">
                    <div className="exp-badge-row">
                      <span className="exp-role-badge">{exp.badge}</span>
                      <span className="exp-period-badge">📅 {exp.period}</span>
                    </div>
                    <h3 className="exp-role-title">{exp.role}</h3>
                    <p className="exp-company-sub">
                      <strong>{exp.company}</strong> • <span>{exp.location}</span>
                    </p>
                  </div>
                </div>

                <ul className="exp-tasks-list">
                  {exp.tasks.map((task, tIdx) => (
                    <li key={tIdx}>{task}</li>
                  ))}
                </ul>

                <div className="exp-tech-tags">
                  <span className="exp-tech-label">Applied Technologies:</span>
                  <div className="exp-chips-wrap">
                    {exp.tech.map((t) => (
                      <span key={t} className="exp-tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: LANGUAGE PROFICIENCY                                          */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="languages">
          <div className="section-header" style={{ marginBottom: '1.75rem' }}>
            <span className="ref-clean-eyebrow">Multilingual Communication</span>
            <h2>Language Proficiency</h2>
            <p className="about-subtitle">
              Professional cross-border collaboration, technical writing, and multilingual teamwork.
            </p>
          </div>

          <div className="languages-grid">
            {LANGUAGES_DATA.map((lang) => (
              <div key={lang.language} className="language-card">
                <div className="lang-header">
                  <div>
                    <h4 className="lang-name">{lang.language}</h4>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                  <span className="lang-percent-badge">{lang.percentage}%</span>
                </div>
                <div className="resume-skill-track lang-track">
                  <div
                    className="resume-skill-fill lang-fill"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <p className="lang-desc">{lang.description}</p>
                <div className="lang-badge-tag">
                  <span>✓ {lang.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: VERIFIED ACADEMIC & PROFESSIONAL REFERENCES                   */}
        {/* ========================================================================= */}
        <div className="about-scroll-section full-width-section" id="references">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span className="ref-clean-eyebrow">Verified Endorsements</span>
            <h2>Professional &amp; Academic References</h2>
            <p className="about-subtitle">
              Senior engineering educators and executive leaders who have directly supervised my technical projects and system engineering.
            </p>
          </div>

          <div className="ref-directory-list">
            {references.map((ref, index) => {
              const indexNum = String(index + 1).padStart(2, '0');
              const areas =
                Array.isArray(ref.areas) && ref.areas.length > 0
                  ? ref.areas
                  : ['Technical Competence', 'Software Engineering', 'System Reliability'];

              return (
                <article key={index} className="ref-directory-row">
                  {/* Column 1: Index & Category Badge */}
                  <div className="ref-dir-index-col">
                    <span className="ref-dir-number">{indexNum}</span>
                    <div className="ref-dir-badges">
                      <span className="ref-dir-tag">{ref.tag || 'Verified Reference'}</span>
                      <span className="ref-dir-verified">✓ Verified Referee</span>
                    </div>
                  </div>

                  {/* Column 2: Main Profile, Relationship & Note */}
                  <div className="ref-dir-main-col">
                    <h3 className="ref-dir-name">{ref.name}</h3>
                    <p className="ref-dir-role">
                      <strong>{ref.position}</strong>
                      <span className="ref-dir-sep"> • </span>
                      <span>{ref.organization}</span>
                      {ref.location && <span className="ref-dir-loc"> ({ref.location})</span>}
                    </p>

                    <p className="ref-dir-relation">
                      <span>Relationship: </span>
                      {ref.relationship || 'Academic / Professional Supervisor'}
                    </p>

                    {ref.note && (
                      <blockquote className="ref-dir-quote">
                        "{ref.note}"
                      </blockquote>
                    )}

                    <div className="ref-dir-areas">
                      {areas.map((area, aIdx) => (
                        <span key={aIdx} className="ref-dir-area-pill">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Direct Contact Channels */}
                  <div className="ref-dir-contact-col">
                    {ref.phone && (
                      <div className="ref-dir-contact-item">
                        <span className="ref-dir-contact-label">Direct Phone</span>
                        <a href={`tel:${ref.phone.replace(/\s+/g, '')}`} className="ref-dir-contact-val">
                          {ref.phone}
                        </a>
                      </div>
                    )}
                    {ref.email && (
                      <div className="ref-dir-contact-item">
                        <span className="ref-dir-contact-label">Official Email</span>
                        <a href={`mailto:${ref.email}`} className="ref-dir-contact-val">
                          {ref.email}
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 6: CALL TO ACTION FOOTER                                         */}
        {/* ========================================================================= */}
        <div className="skills-cta-footer">
          <h3>Ready to build something robust and impactful?</h3>
          <p>
            Whether you need high-performance full-stack web applications, IoT firmware integration, or system architecture,
            I bring rigorous engineering fundamentals and full production commitment.
          </p>
          <div className="skills-footer-btns">
            <Link to="/contact" className="cta-button primary">
              Get in Touch →
            </Link>
            <Link to="/projects" className="cta-button secondary-outline">
              Explore Featured Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
