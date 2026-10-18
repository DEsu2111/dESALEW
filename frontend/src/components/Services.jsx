import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SERVICE_GROUPS = [
  {
    id: 'remote-development',
    track: '01',
    category: 'dev',
    title: 'Remote Full-Stack Development',
    valueBadge: 'High Impact',
    turnaround: 'Sprint / Full-Time Contract',
    outcome: 'Accelerate your product roadmap with clean code, scalable architecture, and zero technical debt.',
    description:
      'Architecting and building high-performance, resilient web applications from scratch, or seamlessly integrating into your remote team to accelerate production feature delivery.',
    items: [
      'End-to-end custom web application architecture (React, Next.js, Node.js, Laravel)',
      'Scalable RESTful & GraphQL API design with secure third-party integrations',
      'Legacy codebase modernization, refactoring, and deep runtime optimization',
      'Pixel-perfect, accessible, mobile-first responsive frontend engineering',
      'Agile CI/CD workflow integration (Git, GitHub, Jira, Docker) for seamless remote teamwork',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Laravel', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git'],
  },
  {
    id: 'code-consulting',
    track: '02',
    aliasId: 'tech-consulting',
    category: 'consulting',
    title: 'Tech Consulting & Architecture Advisory',
    valueBadge: 'Strategic',
    turnaround: 'Advisory / Milestone-based',
    outcome: 'Minimize technical debt, harden system security, and maximize infrastructure ROI.',
    description:
      'Senior-level technical guidance to ensure your software is engineered on a resilient foundation. Avoid costly mistakes by selecting the optimal tech stack and architecture first.',
    items: [
      'Comprehensive project feasibility analysis and technical risk assessment',
      'Strategic tech stack recommendations tailored to your scale and timeline',
      'Scalable system architecture, microservices, and robust database design modeling',
      'In-depth code reviews, performance profiling, and security vulnerability audits',
      'Accurate cost estimation and realistic development roadmap projections',
    ],
    tech: ['System Architecture', 'Database Modeling', 'Security Audits', 'UML', 'Cloud Scaling'],
  },
  {
    id: 'research-support',
    track: '03',
    category: 'research',
    title: 'R&D Support & IoT Hardware Prototyping',
    valueBadge: 'Innovation',
    turnaround: 'Project-based / Prototype Sprint',
    outcome: 'Turn complex theoretical ideas and hardware designs into deployable, functional prototypes.',
    description:
      'Transforming theoretical concepts, mathematical models, and embedded designs into functional realities. Specialized engineering support for IoT, embedded systems, and scientific prototypes.',
    items: [
      'Rapid Proof-of-Concept (PoC) and Minimum Viable Product (MVP) hardware-software prototyping',
      'Embedded microcontroller firmware development (C/C++, PIC, ESP32, Arduino)',
      'Interfacing sensors, actuators, LCD displays, and wireless IoT telemetry',
      'Circuit design, simulation (Multisim), schematic modeling, and breadboard testing',
      'Engineering guidance and validation support for academic capstones and technical research',
    ],
    tech: ['Embedded C/C++', 'Microcontrollers', 'IoT Sensors', 'Multisim', 'MATLAB', 'Python'],
  },
  {
    id: 'coding-education',
    track: '04',
    category: 'education',
    title: '1-on-1 Coding Education & Mentorship',
    valueBadge: 'Empowering',
    turnaround: 'Flexible Weekly Sessions',
    outcome: 'Go from fundamentals to building and deploying production-ready full-stack applications.',
    description:
      'Empowering the next generation of engineers through personalized, project-based 1-on-1 mentorship. A practical curriculum designed to take you from beginner to job-ready competence.',
    items: [
      'Highly personalized 1-on-1 coding sessions adapted to your specific learning pace',
      'Custom-tailored curriculum focusing on modern, in-demand web stacks (React, Node, Laravel)',
      'Hands-on, project-based learning to build a real-world, impressive production portfolio',
      'Technical interview preparation, data structures & algorithms coaching',
      'Career acceleration, code review sessions, and resume/portfolio optimization',
    ],
    tech: ['Web Development', 'Data Structures', 'Algorithms', 'Git/GitHub', 'Portfolio Building'],
  },
  {
    id: 'custom-delivery',
    track: '05',
    category: 'dev',
    title: 'Custom Component & Script Delivery',
    valueBadge: 'On-Demand',
    turnaround: '24 – 72 Hours On-Demand',
    outcome: 'Instant plug-and-play software components delivered with complete tests and documentation.',
    description:
      'Delivering tailored, ready-to-deploy software components. Whether you need an automation script, a complex database query, or an interactive UI component, I provide drop-in solutions.',
    items: [
      'Automated scripting for data extraction, processing, and business workflow optimization',
      'Bespoke website templates, high-conversion landing pages, and reusable UI components',
      'Complex database schema migrations and highly optimized SQL/NoSQL query tuning',
      'Third-party webhook handlers, payment gateway integrations, and API wrappers',
      'Frontend performance bottleneck identification and CSS/JS payload minimization',
    ],
    tech: ['Automation', 'Custom Scripts', 'API Integrations', 'UI Components', 'SQL Optimization'],
  },
  {
    id: 'emergency-services',
    track: '06',
    category: 'emergency',
    title: 'Emergency Incident Response & Hotfixes',
    valueBadge: 'Critical 24/7',
    turnaround: 'Immediate Priority Dispatch',
    outcome: 'Restore production uptime and resolve critical outages in hours, not days.',
    description:
      'Immediate, high-priority emergency intervention when production systems fail. Rapid root-cause analysis, secure hotfixes, and critical recovery to minimize downtime and preserve data.',
    items: [
      'Immediate priority response for critical production outages and system failures',
      'Rapid root-cause analysis and deployment of tested emergency hotfixes',
      'Unblocking broken CI/CD pipelines, Docker containers, and fatal build errors',
      'Data recovery assistance and database state correction interventions',
      'Transparent post-mortem documentation and system hardening to prevent recurrence',
    ],
    tech: ['Incident Response', 'Hotfixes', 'Server Diagnostics', 'CI/CD Repair', 'Data Recovery'],
  },
];

const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services (6)' },
  { id: 'dev', label: 'Development & Delivery' },
  { id: 'consulting', label: 'Tech Consulting' },
  { id: 'research', label: 'R&D & IoT' },
  { id: 'education', label: 'Education & Mentorship' },
  { id: 'emergency', label: 'Emergency Response' },
];

const ENGAGEMENT_MODELS = [
  {
    type: 'Dedicated Sprint Contract',
    badge: 'Most Popular',
    cadence: '40 Hours / Week or Full-Time Sprint',
    description: 'Deep integration into your remote engineering team with daily standups, Jira/Linear velocity, and continuous staging releases.',
    points: [
      'Full participation in daily agile rituals and sprint planning',
      'Seamless code reviews, PRs, and collaborative Git workflow',
      'Direct communication via Slack, Discord, or Teams',
      '100% IP transfer on every merged sprint milestone',
    ],
  },
  {
    type: 'Fixed-Milestone Delivery',
    badge: 'Scope Guaranteed',
    cadence: 'Milestone-Based Delivery',
    description: 'Ideal for clearly scoped MVPs, standalone web platforms, custom hardware prototypes, or automated business scripts.',
    points: [
      'Transparent upfront technical scope and architectural plan',
      'Guaranteed delivery deadlines with sprint demonstrations',
      'Comprehensive automated tests and technical documentation',
      'Milestone payment structure tied to verified deliverables',
    ],
  },
  {
    type: 'Architecture & Advisory Retainer',
    badge: 'Executive Level',
    cadence: 'Flexible Monthly Hours',
    description: 'Senior-level advisory for founders and engineering leads needing tech stack strategy, security hardening, or code reviews.',
    points: [
      'Database schema, microservices, and system scalability modeling',
      'Vulnerability audits and production bottleneck profiling',
      'Tech stack roadmap validation before capital deployment',
      'On-demand technical feasibility reviews for new initiatives',
    ],
  },
  {
    type: '24/7 Priority Emergency Hotline',
    badge: 'Immediate SLA',
    cadence: 'Under 24h Priority Dispatch',
    description: 'Rapid on-call emergency response when production systems face downtime, broken builds, or critical data corruption.',
    points: [
      'Urgent root-cause triage within hours of notification',
      'Tested emergency hotfix deployment directly to production',
      'Unblocking failing Docker containers and CI/CD pipelines',
      'Transparent post-mortem report and prevention hardening',
    ],
  },
];

const ESTIMATOR_TYPES = [
  {
    id: 'web',
    name: 'Full-Stack Web App',
    baseDays: 14,
    stack: 'React, Node.js / Laravel, PostgreSQL, Docker',
    summary: 'Custom responsive web application built with clean architecture, APIs, and scalable database design.',
  },
  {
    id: 'consulting',
    name: 'Architecture & Code Audit',
    baseDays: 5,
    stack: 'System Modeling, Profiling, Security Audits',
    summary: 'In-depth codebase profiling, security risk assessment, and high-performance architectural roadmap.',
  },
  {
    id: 'iot',
    name: 'IoT Hardware Prototype',
    baseDays: 12,
    stack: 'Embedded C/C++, ESP32/PIC, Multisim, Sensors',
    summary: 'End-to-end hardware-software integration with microcontroller firmware and sensor telemetry.',
  },
  {
    id: 'emergency',
    name: 'Emergency Hotfix',
    baseDays: 1,
    stack: 'Direct Diagnostics, CI/CD Repair, Database State',
    summary: 'Priority intervention to resolve critical production downtime and restore system uptime immediately.',
  },
];

const ESTIMATOR_STAGES = [
  { id: 'mvp', name: 'Prototype / MVP', multiplier: 1, note: 'Core validation workflows' },
  { id: 'production', name: 'Production Scaling', multiplier: 1.6, note: 'Hardened, tested, production-ready' },
  { id: 'enterprise', name: 'Multi-System Integration', multiplier: 2.2, note: 'Complex architectures & high concurrency' },
];

const ESTIMATOR_ADDONS = [
  { id: 'cicd', label: 'Automated CI/CD & Dockerization', days: 2 },
  { id: 'tests', label: 'Automated Unit & Integration Test Suite', days: 3 },
  { id: 'docs', label: 'Comprehensive Architecture & API Documentation', days: 1 },
  { id: 'warranty', label: '30-Day Post-Launch SLA Warranty', days: 0 },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Discovery & Scope',
    desc: 'Deep-dive technical assessment into your project goals, architectural constraints, and feasibility requirements.',
  },
  {
    step: '02',
    title: 'Architecture & Roadmap',
    desc: 'Designing clean data models, resilient API contracts, and a transparent sprint-based milestone delivery plan.',
  },
  {
    step: '03',
    title: 'Agile Build & Testing',
    desc: 'Writing clean, self-documenting code with automated tests, continuous integration, and frequent sprint reviews.',
  },
  {
    step: '04',
    title: 'Deployment & SLA Support',
    desc: 'Zero-downtime production launch, complete technical handover documentation, and ongoing reliability support.',
  },
];

const FAQS = [
  {
    q: 'How do we kick off a new engagement or project?',
    a: 'We begin with a brief technical discovery discussion where we review your requirements, target deadlines, and architecture. I then provide a clear proposal detailing milestones, scope, and deliverables before coding begins.',
  },
  {
    q: 'Can you integrate into our existing remote engineering team?',
    a: 'Absolutely. I integrate seamlessly into existing Agile workflows using GitHub, GitLab, Jira, Slack, Linear, and Docker, participating in standups and adhering strictly to your internal code standards.',
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs) and transfer full IP?',
    a: 'Yes. All client engagements are protected by mutual NDAs, and 100% of the code, assets, and intellectual property produced are transferred directly to you upon milestone delivery.',
  },
  {
    q: 'How rapidly can emergency hotfixes and urgent deliverables be handled?',
    a: 'Emergency services are treated with priority dispatch. In critical outage scenarios, initial triage begins within hours, aiming for rapid root-cause isolation and deployment of stable hotfixes.',
  },
];

const Services = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Interactive Scope Estimator State
  const [estimatorType, setEstimatorType] = useState('web');
  const [estimatorStage, setEstimatorStage] = useState('mvp');
  const [selectedAddons, setSelectedAddons] = useState(['cicd', 'tests', 'docs', 'warranty']);

  // Smooth scroll support for hash anchors
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

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return SERVICE_GROUPS.filter((service) => {
      const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
      if (!matchesCat) return false;

      if (!query) return true;

      const titleMatches = service.title.toLowerCase().includes(query);
      const descMatches = service.description.toLowerCase().includes(query);
      const outcomeMatches = service.outcome.toLowerCase().includes(query);
      const techMatches = service.tech.some((t) => t.toLowerCase().includes(query));
      const itemsMatches = service.items.some((item) => item.toLowerCase().includes(query));

      return titleMatches || descMatches || outcomeMatches || techMatches || itemsMatches;
    });
  }, [selectedCategory, searchTerm]);

  // Computed Scope Estimator Output
  const estimateResult = useMemo(() => {
    const currentType = ESTIMATOR_TYPES.find((t) => t.id === estimatorType) || ESTIMATOR_TYPES[0];
    const currentStage = ESTIMATOR_STAGES.find((s) => s.id === estimatorStage) || ESTIMATOR_STAGES[0];

    const addonDays = selectedAddons.reduce((sum, addonId) => {
      const addon = ESTIMATOR_ADDONS.find((a) => a.id === addonId);
      return sum + (addon ? addon.days : 0);
    }, 0);

    const totalDays = Math.round(currentType.baseDays * currentStage.multiplier + addonDays);

    let timeframe = '';
    if (currentType.id === 'emergency') {
      timeframe = 'Under 24 to 48 Hours (Priority Intervention)';
    } else if (totalDays <= 7) {
      timeframe = '1 Week Sprint';
    } else if (totalDays <= 16) {
      timeframe = '2 to 3 Weeks (1 Agile Sprint Cycle)';
    } else if (totalDays <= 28) {
      timeframe = '4 to 5 Weeks (Multi-Sprint Milestone)';
    } else {
      timeframe = '6 to 8 Weeks (Comprehensive Engagement)';
    }

    return {
      type: currentType,
      stage: currentStage,
      timeframe,
      totalDays,
    };
  }, [estimatorType, estimatorStage, selectedAddons]);

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  return (
    <section id="services-page" className="about services-clean-page">
      {/* 1. Hero Header */}
      <div className="section-header services-clean-hero">
        <span className="ref-clean-eyebrow">Production-Grade Engineering Offerings</span>
        <h2>Specialized Technical Services</h2>
        <p className="about-subtitle">
          From full-stack web applications and scalable system architectures to embedded IoT prototyping, 
          technical advisory, and 24/7 emergency incident recovery.
        </p>

        {/* High-Impact Service Metrics */}
        <div className="services-metrics-grid">
          <div className="services-metric-card">
            <span className="services-metric-num">06</span>
            <span className="services-metric-label">Dedicated Tracks</span>
          </div>
          <div className="services-metric-card">
            <span className="services-metric-num">100%</span>
            <span className="services-metric-label">Clean Code &amp; Tests</span>
          </div>
          <div className="services-metric-card">
            <span className="services-metric-num">&lt;24h</span>
            <span className="services-metric-label">Priority Emergency</span>
          </div>
          <div className="services-metric-card">
            <span className="services-metric-num">Direct</span>
            <span className="services-metric-label">Senior Full-Stack Eng.</span>
          </div>
        </div>

        {/* Smart Interactive Search & Filter Controls */}
        <div className="services-filter-controls">
          <div className="services-search-wrapper">
            <input
              type="text"
              className="services-search-input"
              placeholder="Search technical services (React, Laravel, IoT, Emergency, Architecture)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search services"
            />
            {searchTerm && (
              <button
                type="button"
                className="services-clear-btn"
                onClick={() => setSearchTerm('')}
                title="Clear search"
                aria-label="Clear search input"
              >
                Clear
              </button>
            )}
          </div>

          <div className="services-category-pills" role="tablist" aria-label="Service categories">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`services-category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                role="tab"
                aria-selected={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="services-results-row">
            <span className="services-results-counter">
              Showing {filteredServices.length} of {SERVICE_GROUPS.length} Technical Services
            </span>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                type="button"
                className="services-reset-link"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="services-page-content">
        {/* ========================================================================= */}
        {/* SECTION 1: MODERN BENTO SERVICES GRID (BORDERLESS & ICON-FREE)           */}
        {/* ========================================================================= */}
        <div className="services-bento-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className={`service-card-clean ${service.category}`}
            >
              {service.aliasId && <div id={service.aliasId} className="anchor-alias" />}

              {/* Card Header & Badges */}
              <div className="service-card-top">
                <span className="service-track-badge">Track {service.track}</span>
                <div className="service-badge-cluster">
                  <span className="service-badge-value">{service.valueBadge}</span>
                  <span className="service-badge-turnaround">{service.turnaround}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>

              {/* Highlighted Outcome Box */}
              <div className="service-outcome-box">
                <p>
                  <strong>Core Outcome: </strong>
                  {service.outcome}
                </p>
              </div>

              {/* Key Deliverables Checklist */}
              <div className="service-deliverables-wrap">
                <h4 className="deliverables-title">Key Capabilities &amp; Deliverables:</h4>
                <ul className="service-check-list">
                  {service.items.map((item, idx) => (
                    <li key={idx}>
                      <span className="check-index">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              <div className="service-tech-strip">
                <span className="tech-strip-label">Applied Tools:</span>
                <div className="tech-chips-flow">
                  {service.tech.map((t) => (
                    <span key={t} className="tech-tag-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="service-card-action">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.id)}`}
                  className="btn-service-inquire"
                  title={`Inquire about ${service.title}`}
                >
                  <span>Inquire About This Service</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="services-empty-state">
            <h4>No services matched "{searchTerm}"</h4>
            <p>Try searching for React, Laravel, IoT, Emergency, Architecture, or API.</p>
            <button
              type="button"
              className="cta-button secondary-outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters &amp; View All Services
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: SOMETHING DIFFERENT — LIVE PROJECT SCOPE & TIMELINE ESTIMATOR */}
        {/* ========================================================================= */}
        <div className="services-estimator-section">
          <div className="section-header">
            <span className="ref-clean-eyebrow">Interactive Scope Configurator</span>
            <h2>Project Scope &amp; Timeline Estimator</h2>
            <p className="about-subtitle">
              Select your target engagement profile, development stage, and architectural requirements 
              to see an instant delivery timeframe and recommended stack.
            </p>
          </div>

          <div className="estimator-config-card">
            {/* Step 1: Project Type Selection */}
            <div className="estimator-row">
              <span className="estimator-row-label">Step 1: Select Project Type</span>
              <div className="estimator-options-grid">
                {ESTIMATOR_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`estimator-pill-btn ${estimatorType === t.id ? 'active' : ''}`}
                    onClick={() => setEstimatorType(t.id)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Project Stage Selection */}
            <div className="estimator-row">
              <span className="estimator-row-label">Step 2: Development Stage &amp; Complexity</span>
              <div className="estimator-options-grid">
                {ESTIMATOR_STAGES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`estimator-pill-btn ${estimatorStage === s.id ? 'active' : ''}`}
                    onClick={() => setEstimatorStage(s.id)}
                  >
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Deliverables Checkboxes */}
            <div className="estimator-row">
              <span className="estimator-row-label">Step 3: Included Deliverables &amp; Guarantees</span>
              <div className="estimator-addons-grid">
                {ESTIMATOR_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      className={`estimator-addon-chip ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <span className="addon-check-marker">{isChecked ? '[x]' : '[ ]'}</span>
                      <span>{addon.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Computed Estimate Output Panel */}
            <div className="estimator-output-panel">
              <div className="estimator-result-col">
                <span className="result-metric-label">Estimated Delivery Turnaround</span>
                <span className="result-metric-val">{estimateResult.timeframe}</span>
              </div>
              <div className="estimator-result-col">
                <span className="result-metric-label">Recommended Architecture</span>
                <span className="result-metric-sub">{estimateResult.type.stack}</span>
              </div>
              <div className="estimator-result-col">
                <span className="result-metric-label">Delivery Scope</span>
                <span className="result-metric-sub">{estimateResult.type.summary}</span>
              </div>
              <div className="estimator-action-col">
                <Link
                  to={`/contact?scope=${encodeURIComponent(estimateResult.type.name)}&stage=${encodeURIComponent(estimateResult.stage.name)}`}
                  className="cta-button primary"
                >
                  Request This Custom Scope
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: TRANSPARENT ENGAGEMENT MODELS COMPARISON                      */}
        {/* ========================================================================= */}
        <div className="services-engagement-section">
          <div className="section-header">
            <span className="ref-clean-eyebrow">Collaboration Framework</span>
            <h2>Flexible Engagement Models</h2>
            <p className="about-subtitle">
              Transparent, client-centric ways to collaborate based on your product velocity, budget, and deadlines.
            </p>
          </div>

          <div className="engagement-models-grid">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div key={idx} className="engagement-card">
                <div className="engagement-header">
                  <span className="engagement-badge">{model.badge}</span>
                  <h3 className="engagement-title">{model.type}</h3>
                  <span className="engagement-cadence">{model.cadence}</span>
                </div>
                <p className="engagement-desc">{model.description}</p>
                <ul className="engagement-points-list">
                  {model.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="point-marker">-</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: 4-STEP ENGINEERING PIPELINE                                   */}
        {/* ========================================================================= */}
        <div className="services-workflow-section">
          <div className="section-header">
            <span className="ref-clean-eyebrow">Engineering Methodology</span>
            <h2>How We Deliver Results</h2>
            <p className="about-subtitle">
              A structured, transparent engineering pipeline that ensures predictable delivery, high code quality, and zero surprises.
            </p>
          </div>

          <div className="workflow-steps-grid">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className="workflow-step-card">
                <span className="workflow-step-num">{step.step}</span>
                <h4 className="workflow-step-title">{step.title}</h4>
                <p className="workflow-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ)                              */}
        {/* ========================================================================= */}
        <div className="services-faq-section">
          <div className="section-header">
            <span className="ref-clean-eyebrow">Client Inquiries</span>
            <h2>Frequently Asked Questions</h2>
            <p className="about-subtitle">
              Key details regarding technical collaboration, communication channels, code ownership, and turnaround times.
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-state">
                      {isOpen ? 'Close' : 'Details'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 6: CENTERED CALL TO ACTION FOOTER                                */}
        {/* ========================================================================= */}
        <div className="skills-cta-footer services-bottom-cta">
          <h3>Ready to elevate your software or hardware systems?</h3>
          <p>
            Whether you need dedicated full-stack feature delivery, complex IoT hardware integration, 
            or an urgent production hotfix, I provide senior-level execution.
          </p>
          <div className="skills-footer-btns">
            <Link to="/contact" className="cta-button primary">
              Schedule a Technical Consultation
            </Link>
            <Link to="/projects" className="cta-button secondary-outline">
              Explore Past Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
