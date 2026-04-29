import React, { useState } from 'react';

const serviceGroups = [
  {
    id: 'remote-development',
    title: 'Remote Development',
    icon: '💻',
    valueBadge: 'High Impact',
    outcome: 'Accelerate your product roadmap with elite engineering.',
    description: 'Architecting and building high-performance, scalable web applications, or seamlessly integrating with your remote team to accelerate feature delivery.',
    items: [
      'End-to-end custom web application architecture and development',
      'Scalable RESTful & GraphQL API design and seamless third-party integrations',
      'Legacy codebase modernization, refactoring, and deep code optimization',
      'Responsive, pixel-perfect frontend implementation (React, modern CSS)',
      'Agile workflow integration (GitHub, Jira, Slack) for seamless remote collaboration',
    ],
  },
  {
    id: 'code-consulting',
    title: 'Tech Consulting & Advisory',
    icon: '💡',
    valueBadge: 'Strategic',
    outcome: 'Minimize technical debt and maximize ROI.',
    description: 'Strategic technical guidance to ensure your project is built on the right foundation. Avoid costly mistakes by planning the optimal tech stack and architecture first.',
    items: [
      'Comprehensive project feasibility analysis and technical risk assessment',
      'Strategic technology stack recommendations tailored to your business goals',
      'Scalable system architecture and robust database design planning',
      'Accurate cost estimation and realistic development timeline projection',
      'In-depth code reviews, performance profiling, and security audits',
    ],
  },
  {
    id: 'research-support',
    title: 'Research & Development Support',
    icon: '🔬',
    valueBadge: 'Innovation',
    outcome: 'Turn complex theoretical ideas into functional prototypes.',
    description: 'Transforming theoretical concepts into functional realities. Specialized engineering support for complex algorithms, academic projects, and cutting-edge prototypes.',
    items: [
      'Technical research assistance and feasibility studies for novel ideas',
      'Rapid proof-of-concept (PoC) and Minimum Viable Product (MVP) development',
      'Complex algorithm design, implementation, and performance optimization',
      'Engineering guidance and practical implementation support for academic research',
      'Hardware-software integration and IoT system prototyping',
    ],
  },
  {
    id: 'coding-education',
    title: 'Coding Education',
    icon: '📚',
    valueBadge: 'Empowering',
    outcome: 'Go from zero to building full-stack applications.',
    description: 'Empowering the next generation of developers through personalized, 1-on-1 mentorship. A practical, project-based curriculum designed to take you from beginner to job-ready.',
    items: [
      'Highly personalized 1-on-1 coding lessons adapted to your learning pace',
      'Custom-tailored curriculum focusing on modern, in-demand tech stacks',
      'Hands-on, project-based learning to build a real-world, impressive portfolio',
      'Career guidance, technical interview preparation, and resume review',
      'Flexible scheduling with interactive live online sessions and screen sharing',
    ],
  },
  {
    id: 'custom-delivery',
    title: 'Custom Code Delivery',
    icon: '⚡',
    valueBadge: 'On-Demand',
    outcome: 'Get specific, high-quality components delivered instantly.',
    description: 'Delivering tailored, ready-to-deploy software components. Whether you need an automation script, a complex database query, or a complete UI component, I provide drop-in solutions.',
    items: [
      'Automated scripting for data processing and business workflow optimization',
      'Bespoke website templates, landing pages, and reusable UI/UX components',
      'Complex database schema design and highly optimized SQL/NoSQL queries',
      'Mobile-first, highly responsive, and accessible design implementation',
      'Performance bottleneck identification and rapid system optimization',
    ],
  },
  {
    id: 'emergency-services',
    title: 'Emergency Services',
    icon: '🚨',
    valueBadge: 'Critical',
    outcome: 'Restore operations and minimize downtime in hours, not days.',
    description: 'Immediate, high-priority intervention when production systems fail. Rapid debugging, hotfixes, and critical incident response to minimize downtime and restore operations.',
    items: [
      'Immediate, priority response for critical production outages and system failures',
      'Rapid root-cause analysis and deployment of secure, stable emergency hotfixes',
      'Unblocking development pipelines and resolving critical deployment/build errors',
      'Data recovery assistance and database state correction interventions',
      'Detailed post-mortem analysis and system hardening to prevent future recurrence',
    ],
  },
];

const Services = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="services" className="services-interactive">
      <div className="section-header">
        <h2>Expert Solutions</h2>
        <p className="services-subtitle">A high-performance roadmap to technical excellence</p>
      </div>

      <div className="services-path-container">
        <div className="path-marker start">
          <div className="marker-dot"></div>
          <span>INITIATE</span>
        </div>

        <div className="zigzag-line-v"></div>
        
        {serviceGroups.map((service, index) => {
          const isEven = index % 2 === 0;
          const isOpen = openId === service.id;

          return (
            <div 
              key={service.id} 
              className={`service-path-item ${isEven ? 'left' : 'right'} ${isOpen ? 'active' : ''}`}
            >
              <div className="service-step-number">{index + 1}</div>

              <div className="service-arrow">
                <span className="arrow-head"></span>
              </div>
              
              <div 
                className={`service-path-card ${service.id}`} 
                onClick={() => setOpenId(isOpen ? null : service.id)}
              >
                <div className="card-badge-row">
                  <span className="service-value-badge">{service.valueBadge}</span>
                </div>
                
                <div className="card-header">
                  <span className="card-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                </div>
                
                <p className="card-outcome"><strong>Outcome:</strong> {service.outcome}</p>
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
                  <span className="expand-hint">{isOpen ? 'Click to minimize' : 'Click for technical details'}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="path-marker end">
          <div className="marker-arrow"></div>
          <span>EXECUTE</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
