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
  const [openId, setOpenId] = useState(null);

  return (
    <section id="services" className="services-interactive">
      <div className="section-header">
        <h2>My Professional Services</h2>
        <p className="services-subtitle">A step-by-step roadmap to your technical success</p>
      </div>

      <div className="services-path-container">
        {/* Start Marker */}
        <div className="path-marker start">
          <div className="marker-dot"></div>
          <span>START</span>
        </div>

        {/* The Dotted Straight Line Container */}
        <div className="zigzag-line-v"></div>
        
        {serviceGroups.map((service, index) => {
          const isEven = index % 2 === 0;
          const isOpen = openId === service.id;

          return (
            <div 
              key={service.id} 
              className={`service-path-item ${isEven ? 'left' : 'right'} ${isOpen ? 'active' : ''}`}
            >
              {/* Step Number on the Path */}
              <div className="service-step-number">{index + 1}</div>

              {/* The Indicator Arrow */}
              <div className="service-arrow">
                <span className="arrow-head"></span>
              </div>
              
              <div 
                className={`service-path-card ${service.id}`} 
                onClick={() => setOpenId(isOpen ? null : service.id)}
              >
                <div className="card-header">
                  <span className="card-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                </div>
                <p className="card-desc">{service.description}</p>
                
                {isOpen && (
                  <div className="card-expanded-content">
                    <ul className="service-checklist">
                      {service.items.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="card-footer">
                  <span className="expand-hint">{isOpen ? 'Click to close' : 'Click to explore details'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* End Marker */}
        <div className="path-marker end">
          <div className="marker-arrow"></div>
          <span>HIRE ME</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
