import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const serviceGroups = [
  {
    id: 'igaming-development',
    title: 'Real-Time iGaming & Web Game Engines',
    icon: '🎰',
    valueBadge: 'Core Specialty',
    outcome: 'Ultra-low latency, server-authoritative multiplayer web games.',
    description: 'Specialized architecture and development of socket-driven web games including Bingo, Keno, Aviator crash games, and Chicken Road mechanics with continuous game loops.',
    items: [
      'WebSocket & Socket.IO real-time state synchronization optimized for minimal network payload',
      'Server-authoritative game logic ensuring strict security and anti-cheat validation',
      'Redis Sentinel/Cluster in-memory state tracking & high-speed session management',
      'Custom HTML5 Canvas 2D rendering engines and mathematical crash curve generation',
      'Dynamic risk assessment mechanics and high-concurrency tick loop execution',
    ],
  },
  {
    id: 'multi-tenant-dashboards',
    title: 'Multi-Tenant Operator Dashboards',
    icon: '📊',
    valueBadge: 'Enterprise',
    outcome: 'Unified control panels for multi-operator platform management.',
    description: 'Building robust, isolated multi-tenant management portals for platform owners and third-party operators to track real-time analytics and configure game rules.',
    items: [
      'Multi-tenant database architecture with isolated game data per operator',
      'Real-time financial reporting, transaction logging, and player analytics',
      'Granular platform permission hierarchies and Role-Based Access Control (RBAC)',
      'Remote game rule configuration, RTP settings, and payout controls',
      'Interactive React & Node.js/PostgreSQL administrative interfaces',
    ],
  },
  {
    id: 'financial-integrations',
    title: 'Payment Gateway & Wallet Integrations',
    icon: '💳',
    valueBadge: 'Financial Grade',
    outcome: 'Instant balance updates, automated bet validation, and secure payouts.',
    description: 'Integrating resilient financial flows and local payment services for seamless instant deposits, bet validation, and wallet balance updates.',
    items: [
      'Direct integration with Telebirr, M-PESA, and local mobile money gateways',
      'Double-entry transaction logging to ensure 100% financial data integrity',
      'Automated webhook handlers with signature verification and replay attack prevention',
      'Real-time wallet balance synchronization over WebSockets',
      'Resilient retry mechanisms for high-volume transaction processing',
    ],
  },
  {
    id: 'fullstack-development',
    title: 'Full-Stack Web Architecture',
    icon: '💻',
    valueBadge: 'High Impact',
    outcome: 'Accelerate your product roadmap with modern full-stack engineering.',
    description: 'Designing and building high-performance scalable web applications using TypeScript, React, Next.js, Bun, Hono, Node.js, and Laravel.',
    items: [
      'End-to-end custom web application architecture and API development',
      'High-performance backend API design (RESTful, GraphQL, WebSocket)',
      'Database schema design, indexing, and query optimization (PostgreSQL, MySQL, MongoDB)',
      'Modern, responsive, pixel-perfect glassmorphism UI/UX implementation',
      'Docker containerization and production deployment configuration',
    ],
  },
  {
    id: 'performance-optimization',
    title: 'Latency & Performance Optimization',
    icon: '⚡',
    valueBadge: 'Optimization',
    outcome: 'Eliminate network bottlenecks and reduce server response times.',
    description: 'In-depth code profiling, network packet size reduction, and caching strategies to ensure your app handles high concurrent traffic smoothly.',
    items: [
      'Socket packet minimization and binary protocol optimization',
      'Redis caching strategy implementation to remove database bottlenecks',
      'Frontend rendering performance optimization (Canvas API, React re-renders)',
      'Code audit, security vulnerability assessment, and refactoring',
      'System hardening for high-concurrency event loops',
    ],
  },
  {
    id: 'code-consulting',
    title: 'Tech Consulting & Architecture Advisory',
    icon: '💡',
    valueBadge: 'Strategic',
    outcome: 'Minimize technical debt and choose the right tech stack from day one.',
    description: 'Strategic technical guidance for iGaming startups, SaaS platforms, and enterprise projects to ensure optimal architecture and scalability.',
    items: [
      'Comprehensive project feasibility analysis and real-time architecture design',
      'Tech stack evaluation (TypeScript vs Go/Bun, Redis clustering, PostgreSQL design)',
      'Development timeline estimation and milestone planning',
      'Technical mentorship and code review for engineering teams',
    ],
  },
];

const Services = () => {
  const [openId, setOpenId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const matched = serviceGroups.find((s) => s.id === targetId);
      if (matched) {
        setOpenId(targetId);
        setHighlightId(targetId);

        // Smooth scroll after state update
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 120);

        // Remove glow highlight after 2.5 seconds
        const timer = setTimeout(() => {
          setHighlightId(null);
        }, 2500);

        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

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
          const isHighlighted = highlightId === service.id;

          return (
            <div 
              key={service.id} 
              id={service.id}
              className={`service-path-item ${isEven ? 'left' : 'right'} ${isOpen ? 'active' : ''}`}
            >
              <div className="service-step-number">{index + 1}</div>

              <div className="service-arrow">
                <span className="arrow-head"></span>
              </div>
              
              <div 
                className={`service-path-card ${service.id} ${isHighlighted ? 'service-card-pulse' : ''}`} 
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
