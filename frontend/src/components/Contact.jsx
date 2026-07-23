import React, { useState } from 'react';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success'); // 'success' or 'error'
  const [submitting, setSubmitting] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to send message');
      }

      setStatusType('success');
      setStatus('Message sent!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatusType('error');
      setStatus(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-hero">
        <div>
          <p className="contact-pill">Let’s build something great</p>
          <h2>Contact Me</h2>
          <p className="contact-subtitle">
            Send a message or reach me directly. I’m open to remote and on‑site work.
          </p>
        </div>
      </div>

      <div className="contact-content contact-layout">
        <form className="contact-info contact-card" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="+251..."
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button submit-button-compact" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {status && (
            <div className={`status-banner ${statusType}`}>
              {statusType === 'success' ? (
                <div className="status-success-content">
                  <span className="status-icon">✓</span>
                  <div>
                    <strong className="status-title">Message Sent!</strong>
                    <p className="status-subtitle">Thank you! I will get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <div className="status-error-content">
                  <span className="status-icon">⚠️</span>
                  <span>{status}</span>
                </div>
              )}
            </div>
          )}
        </form>

        <aside className="contact-card contact-aside">
          <h3>Direct Contact</h3>
          <div className="contact-quick">
            <div>
              <span className="contact-label">Phone</span>
              <a href="tel:+251962622111" className="contact-value">+251 962 622 111</a>
            </div>
            <div>
              <span className="contact-label">Email</span>
              <a href="mailto:desu6262@gmail.com" className="contact-value">desu6262@gmail.com</a>
            </div>
            <div>
              <span className="contact-label">Location</span>
              <span className="contact-value">Addis Ababa, Ethiopia</span>
            </div>
          </div>

        </aside>
      </div>
    </section>
  );
};

export default Contact;
