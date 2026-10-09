import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_SKILL_GROUPS = [
  {
    title: 'Advanced Computer Skills',
      items: [
        'Microsoft Office Suite (Word, Excel, PowerPoint & Outlook)',
        'Google Workspace (Docs, Sheets, Slides, Forms, Drive)',
        'ChatGPT and other AI productivity tools',
        'Git, GitHub (Version control and collaboration)',
        'VS Code (Development environments)',
      ],
    },
    {
      title: 'Computer Maintenance Skills',
      items: [
        'Installing and configuring Windows & Linux operating systems',
        'Troubleshooting hardware and software issues (desktop, pc & network)',
        'Virus removal and PC performance optimization',
        'Installation of drivers, office programs & common utilities',
        'Preventive maintenance and system backup techniques',
      ],
    },
    {
      title: 'Web Programming',
      items: [
        'Frontend: Blade, JavaScript, Vanilla JS, Tailwind CSS, React, Next.js',
        'Backend: PHP, Laravel, Node.js, Nest.js, Django',
        'Database: MySQL, MongoDB, PostgreSQL',
        'Building and maintaining dynamic websites and forms',
        'Responsive design principles for mobile-friendly development',
        'Understanding of web hosting and local server environments',
      ],
    },
    {
      title: 'Project Management Tools',
      items: ['Jira, ClickUp'],
    },
    {
      title: 'Circuit Design & Analysis',
      items: ['Analog & Digital Electronics', 'Circuit simulation using Multisim and Breadboard'],
    },
    {
      title: 'Embedded System & Microcontrollers',
      items: ['Portus and PIC microcontroller', 'Interfacing sensors, actuators, and displays'],
    },
    {
      title: 'Network & Communication System',
      items: [
        'Network fundamentals (IP addressing, routing)',
        'Wireless communication basics (modulation, transmission)',
        'IOT protocols and sensor networks',
      ],
    },
    {
      title: 'Project Development & Documentation',
      items: ['Schematic and PCB design', 'Technical documentation and reporting', 'Team collaboration using Git/GitHub'],
    },
    {
      title: 'Computer Programming',
      items: ['Familiar with C, C++ and Python'],
    },
    {
      title: 'Design',
      items: ['Figma, Balasmiq, Adobe Photoshop/Illustrator'],
    },
    {
      title: 'Software Development',
      items: [
        'UI Design and evaluation',
        'Software design specification with UML',
        'Software design lifecycle',
        'Design patterns',
      ],
    },
    {
      title: 'Operating Systems',
      items: ['Windows, Mac, Linux'],
    },
  ];

const Skills = () => {
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

  const [openId, setOpenId] = useState(() => {
    return skillGroups.length > 0 ? skillGroups[0].title : '';
  });

  const toggleOpen = (title) => {
    setOpenId((current) => (current === title ? '' : title));
  };

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
            <li>English - Excellent communication and writing skills</li>
            <li>Amharic - Mother tongue</li>
            <li>Agewagna - Mother tongue</li>
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
