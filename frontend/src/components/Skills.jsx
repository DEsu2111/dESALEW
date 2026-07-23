import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Skills = () => {
  const [openId, setOpenId] = useState('Web Programming');

  const toggleOpen = (title) => {
    setOpenId((current) => (current === title ? '' : title));
  };
  const skillGroups = [
    {
      title: 'Real-Time & High-Performance Stack',
      items: [
        'TypeScript, React, Socket.IO, Bun, Hono, Node.js',
        'WebSocket protocol optimization & real-time state synchronization',
        'Low latency, high-concurrency game loop architecture',
      ],
    },
    {
      title: 'Database & Caching',
      items: [
        'PostgreSQL, Redis (Sentinel / Cluster), SQL, MongoDB',
        'In-memory state tracking & high-speed session storage',
      ],
    },
    {
      title: 'Frontend & UI Engineering',
      items: [
        'Next.js, Vite, Tailwind CSS, HTML5, CSS3, Canvas API',
        'Custom 2D rendering & crash curve math engine development',
      ],
    },
    {
      title: 'DevOps & Tools',
      items: [
        'Docker, Git / GitHub, REST APIs',
        'Linux System Configuration & Environment Customization',
      ],
    },
    {
      title: 'Financial & Multi-Tenant Integrations',
      items: [
        'Telebirr, M-PESA payment integration for balance updates',
        'Multi-tenant operator dashboards & permission hierarchies',
      ],
    },
    {
      title: 'Embedded Systems & Hardware',
      items: [
        'Circuit simulation (Multisim, Breadboard), Proteus & PIC microcontrollers',
        'Analog & Digital Electronics, IoT protocol basics',
      ],
    },
  ];

  return (
    <section id="skills" className="about">
      <h2>Skills & Expertise</h2>
      <div className="about-content">
        <div className="skills-grid">
          {skillGroups.map((group) => {
            const isOpen = openId === group.title;
            return (
              <div key={group.title} className={`skills-card ${isOpen ? 'skills-card-open' : ''}`}>
                <button
                  type="button"
                  className="skills-summary"
                  onClick={() => toggleOpen(group.title)}
                  aria-expanded={isOpen}
                >
                  <span>{group.title}</span>
                  <span className="skills-count">{group.items.length}</span>
                  <span className="skills-chevron" aria-hidden="true" />
                </button>
                {isOpen && (
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="skills-card">
          <h3>Language Proficiency</h3>
          <ul>
            <li><strong>Amharic</strong> — Native</li>
            <li><strong>English</strong> — Professional</li>
            <li><strong>Agewagna</strong> — Native</li>
            <li><strong>Japanese</strong> — Basic</li>
          </ul>
        </div>

        <div className="skills-cta">
          <Link to="/experience" className="cta-button">Experience</Link>
          <Link to="/references" className="cta-button">References</Link>
        </div>
      </div>
    </section>
  );
};

export default Skills;
