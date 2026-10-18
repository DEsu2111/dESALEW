import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DIRECT_CONTACTS = [
  {
    label: 'Direct Email',
    value: 'desu6262@gmail.com',
    actionText: 'Send Email',
    href: 'mailto:desu6262@gmail.com',
    copyVal: 'desu6262@gmail.com',
  },
  {
    label: 'Phone / Telegram',
    value: '+251 962 622 111',
    actionText: 'Direct Call',
    href: 'tel:+251962622111',
    copyVal: '+251962622111',
  },
  {
    label: 'Primary Location',
    value: 'Addis Ababa, Ethiopia',
    actionText: 'Timezone: UTC+3',
    href: null,
  },
  {
    label: 'Work Availability',
    value: 'Immediate Start',
    actionText: 'Global Remote & On-Site',
    href: null,
  },
];

const SERVICE_LOOKUP = {
  'remote-development': 'Remote Full-Stack Development',
  'code-consulting': 'Tech Consulting & Architecture Advisory',
  'research-support': 'R&D Support & IoT Hardware Prototyping',
  'coding-education': '1-on-1 Coding Education & Mentorship',
  'custom-delivery': 'Custom Component & Script Delivery',
  'emergency-services': 'Emergency Incident Response & Hotfixes',
};

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [inquiryContext, setInquiryContext] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  // Parse URL query parameters from Services page or external links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const scopeParam = params.get('scope');
    const stageParam = params.get('stage');

    if (serviceParam && SERVICE_LOOKUP[serviceParam]) {
      const serviceName = SERVICE_LOOKUP[serviceParam];
      setInquiryContext(serviceName);
      setFormData((prev) => ({
        ...prev,
        subject: serviceName,
        message: prev.message || `Hi Desalew,\n\nI am reaching out regarding your "${serviceName}" service.\n\nHere are our project goals and timeline:\n`,
      }));
    } else if (scopeParam) {
      const contextTitle = stageParam ? `${scopeParam} (${stageParam})` : scopeParam;
      setInquiryContext(contextTitle);
      setFormData((prev) => ({
        ...prev,
        subject: contextTitle,
        message: prev.message || `Hi Desalew,\n\nI configured a scope estimate for "${contextTitle}" on your services page and would like to discuss next steps.\n\nProject details:\n`,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (key, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', text: '' });

    // Include subject in the message payload if provided
    const payloadMessage = formData.subject
      ? `[Subject: ${formData.subject}]\n\n${formData.message}`
      : formData.message;

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          message: payloadMessage,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to send message. Please reach out directly via email.');
      }

      setStatus({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully. I will get back to you within 12 to 24 hours.',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setInquiryContext(null);
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Something went wrong. Please email directly at desu6262@gmail.com.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact contact-clean-page">
      {/* 1. Centered Hero Header */}
      <div className="section-header contact-clean-hero">
        <span className="ref-clean-eyebrow">Direct Senior Collaboration</span>
        <h2>Get In Touch</h2>
        <p className="contact-subtitle">
          Whether you are looking to hire a senior full-stack engineer, build an IoT prototype, 
          schedule technical advisory, or resolve a production emergency, let's discuss your roadmap.
        </p>
      </div>

      <div className="contact-clean-body">
        {/* 2. Direct Contacts Grid (Centered, Borderless) */}
        <div className="contact-direct-grid">
          {DIRECT_CONTACTS.map((item, idx) => (
            <div key={idx} className="contact-direct-card">
              <span className="direct-card-label">{item.label}</span>
              {item.href ? (
                <a href={item.href} className="direct-card-value">
                  {item.value}
                </a>
              ) : (
                <span className="direct-card-value">{item.value}</span>
              )}
              {item.copyVal ? (
                <button
                  type="button"
                  className="direct-card-action-btn"
                  onClick={() => handleCopy(item.label, item.copyVal)}
                >
                  {copiedKey === item.label ? 'Copied to Clipboard' : 'Copy to Clipboard'}
                </button>
              ) : (
                <span className="direct-card-meta">{item.actionText}</span>
              )}
            </div>
          ))}
        </div>

        {/* 3. Dynamic Inquiry Context Badge */}
        {inquiryContext && (
          <div className="contact-context-banner">
            <span className="context-label">Selected Inquiry Focus:</span>
            <span className="context-value">{inquiryContext}</span>
            <button
              type="button"
              className="context-clear-btn"
              onClick={() => {
                setInquiryContext(null);
                setFormData((prev) => ({ ...prev, subject: '', message: '' }));
              }}
            >
              Clear Focus
            </button>
          </div>
        )}

        {/* 4. Centered Clean Form Container */}
        <div className="contact-form-container">
          <form className="contact-clean-form" onSubmit={handleSubmit}>
            <div className="form-clean-header">
              <h3>Send a Direct Message</h3>
              <p>Direct communication with no middleman. Typical turnaround is under 12 hours.</p>
            </div>

            <div className="form-clean-grid">
              <div className="form-clean-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-clean-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-clean-grid">
              <div className="form-clean-group">
                <label htmlFor="phone">Phone / WhatsApp (Optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +1 555 0199 or +251..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-clean-group">
                <label htmlFor="subject">Inquiry Focus / Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Full-Stack Web Development, Architecture Audit..."
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-clean-group full-width">
              <label htmlFor="message">Project Scope or Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Describe your project requirements, technology stack, target deadlines, or budget expectations..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-clean-actions">
              <button
                type="submit"
                className="btn-contact-submit"
                disabled={submitting}
              >
                {submitting ? 'Transmitting Message...' : 'Send Message'}
              </button>
            </div>

            {status.text && (
              <div className={`contact-status-box ${status.type}`}>
                <p>{status.text}</p>
              </div>
            )}
          </form>
        </div>

        {/* 5. Centered Social Links & Reassurance Note */}
        <div className="contact-footer-note">
          <div className="contact-social-links-strip">
            <a
              href="https://github.com/desalew62"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-pill"
            >
              GitHub Profile
            </a>
            <a
              href="https://www.linkedin.com/in/desalew-mengistu-944208314"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-pill"
            >
              LinkedIn Profile
            </a>
            <a
              href="https://t.me/desu6262"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-pill"
            >
              Telegram Chat
            </a>
            <a
              href="mailto:desu6262@gmail.com"
              className="contact-social-pill"
            >
              Direct Email
            </a>
          </div>

          <p className="contact-guarantee-text">
            Protected by Mutual Non-Disclosure Agreement (NDA) • 100% Client Code &amp; IP Ownership Guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
