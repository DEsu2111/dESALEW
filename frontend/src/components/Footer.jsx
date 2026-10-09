import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import './Footer.css';

const Footer = ({ themeMode = 'dark', onThemeChange }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-container">
          {/* Column 1: Brand, Bio & Social Circles */}
          <div className="footer-column footer-about">
            <h3 className="footer-logo-title">Desalew</h3>
            <p className="footer-description">
              Electrical & Computer Engineering graduate and Full Stack Developer crafting 
              scalable web applications, modern architectures, and robust digital solutions.
            </p>
            <div className="footer-social-icons">
              {/* X / Twitter */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-circle" 
                aria-label="X (formerly Twitter)"
                title="X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Telegram / Facebook */}
              <a 
                href="https://t.me/desu6262" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-circle" 
                aria-label="Telegram"
                title="Telegram @desu6262"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.93-1.28 4.88-2.12 5.86-2.54 2.79-1.16 3.37-1.36 3.75-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/DEsu2111" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-circle" 
                aria-label="GitHub"
                title="GitHub @DEsu2111"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.17-3.36-1.17-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.9 0-1.08.39-1.97 1.03-2.66-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.58 1.03 2.66 0 3.81-2.33 4.65-4.55 4.89.36.31.68.92.68 1.86V21c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/desalew-aleganeh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-circle" 
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.94 0-1.7.76-1.7 1.7s.76 1.7 1.7 1.7 1.7-.76 1.7-1.7-.76-1.7-1.7-1.7Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Group: Useful Links & Our Services (Side-by-side on mobile and tablet) */}
          <div className="footer-links-group">
            {/* Column 2: Useful Links */}
            <div className="footer-column footer-links-col">
              <h4>Useful Links</h4>
              <ul className="footer-nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/resume">Resume</Link></li>
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="footer-column footer-services-col">
              <h4>Our Services</h4>
              <ul className="footer-nav-list">
                <li><Link to="/services#remote-development">Web Development</Link></li>
                <li><Link to="/services#remote-development">Full-Stack Architecture</Link></li>
                <li><Link to="/services#code-consulting">Tech Consulting</Link></li>
                <li><Link to="/services#research-support">Research Support</Link></li>
                <li><Link to="/services#coding-education">Coding Education</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Us & Theme Switcher */}
          <div className="footer-column footer-contact">
            <h4>Contact Us</h4>
            <div className="footer-contact-body">
              <div className="footer-contact-info">
                <p className="contact-item">
                  Addis Ababa, Ethiopia
                </p>
                <p className="contact-item">
                  <strong>Phone:</strong> <a href="tel:+251962622111">+251 962 622 111</a>
                </p>
                <p className="contact-item">
                  <strong>Email:</strong> <a href="mailto:desu6262@gmail.com">desu6262@gmail.com</a>
                </p>
              </div>

              <div className="footer-theme-box">
                <span className="footer-theme-label">Theme</span>
                <ThemeSwitcher themeMode={themeMode} onThemeChange={onThemeChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright-text">
            &copy; Copyright <strong>Desalew</strong> All Rights Reserved
          </p>
          <p className="credits-text">
            Designed by <span className="highlight-author">Desalew Alganeh</span>
          </p>
        </div>
      </div>

      {/* Floating Red Back to Top Button */}
      <button 
        type="button"
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
