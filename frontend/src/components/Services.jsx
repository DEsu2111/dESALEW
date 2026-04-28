import React, { useState } from 'react';

const serviceGroups = [
  {
    id: 'remote-development',
    title: 'Remote Development',
    icon: '💻',
    description: 'Build, fix, and ship features for remote teams.',
    items: [
      'Custom web application development',
      'API integration and development',
      'Bug fixes and code optimization',
      'Feature additions to existing projects',
      'Project management via GitHub/Teams/Slack',
    ],
  },
  {
    id: 'code-consulting',
    title: 'Code Consulting & Advisory',
    icon: '💡',
    description: 'Plan the right stack and architecture before you build.',
    items: [
      'Project feasibility analysis',
      'Technology stack recommendations',
      'Architecture planning',
      'Cost and timeline estimation',
      'Code review for existing projects',
    ],
  },
  {
    id: 'research-support',
    title: 'Research & Development Support',
    icon: '🔬',
    description: 'Support for prototypes, algorithms, and academic projects.',
    items: [
      'Technical research assistance',
      'Proof of concept development',
      'Algorithm design and optimization',
      'Academic project guidance',
      'Prototype development',
    ],
  },
  {
    id: 'coding-education',
    title: 'Coding Education (Home/Online)',
    icon: '📚',
    description: '1-on-1 lessons with a clear, practical roadmap.',
    items: [
      'Personalized 1-on-1 coding lessons',
      'Flexible scheduling (evenings/weekends)',
      'Curriculum tailored to student goals',
      'Project-based learning approach',
      'All ages welcome (kids to professionals)',
      'Live online sessions + screen sharing',
    ],
  },
  {
    id: 'custom-delivery',
    title: 'Custom Code Delivery',
    icon: '⚡',
    description: 'Ready-to-use scripts, templates, and components.',
    items: [
      'Custom scripts and automation',
      'Website templates and components',
      'Database design and queries',
      'Mobile-responsive designs',
      'Debugging and optimization',
    ],
  },
  {
    id: 'emergency-services',
    title: 'Emergency Services',
    icon: '🚨',
    description: 'Rapid fixes when something breaks in production.',
    items: [
      'Production hotfixes',
      'Emergency bug fixes',
      'Rapid debugging and unblocking',
      'Critical incident response',
    ],
  },
];

const Services = () => {
  const [openId, setOpenId] = useState('remote-development');

  const toggleOpen = (id) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section id="services" className="services">
      <h2>Services</h2>
      <p className="services-subtitle">
        Full Stack Solutions: Development, Training & Consulting
      </p>
      <p className="services-tagline">
        I bridge the gap between idea and execution. Build, teach, and advise—end to end.
      </p>
      <div className="services-grid">
        {serviceGroups.map((service) => {
          const isOpen = openId === service.id;
          return (
            <div
              key={service.id}
              className={`service-card ${isOpen ? 'service-card-open' : ''}`}
              id={service.id}
            >
              <button
                type="button"
                className="service-summary"
                onClick={() => toggleOpen(service.id)}
                aria-expanded={isOpen}
              >
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-title">{service.title}</span>
                <span className="service-count">{service.items.length}</span>
                <span className="service-chevron" aria-hidden="true" />
              </button>
              <p className="service-desc">{service.description}</p>
              <button
                type="button"
                className="service-more"
                onClick={() => toggleOpen(service.id)}
                aria-controls={`service-${service.id}`}
              >
                {isOpen ? 'See less' : 'See more'}
              </button>
              {isOpen && (
                <ul id={`service-${service.id}`}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
