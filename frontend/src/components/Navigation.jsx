import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../assets/desu1.jpg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="nav-brand" onClick={closeMenu} aria-label="Go to home">
          <img className="nav-logo" src={logoImg} alt="" aria-hidden="true" />
          <span className="nav-brand-text">Desalew Alganeh</span>
        </NavLink>
        <div
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          role="button"
          tabIndex="0"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <li className="nav-item"><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li className="nav-item nav-item-about">
            <NavLink to="/about" onClick={closeMenu}>
              About
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li><NavLink to="/education" onClick={closeMenu}>🎓 Education</NavLink></li>
              <li><NavLink to="/certificates" onClick={closeMenu}>🏅 Certificates</NavLink></li>
              <li><NavLink to="/references" onClick={closeMenu}>🔗 References</NavLink></li>
            </ul>
          </li>
          <li className="nav-item nav-item-skills">
            <NavLink to="/skills" onClick={closeMenu}>
              Skills
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li><NavLink to="/experience" onClick={closeMenu}>💼 Experience</NavLink></li>
              <li><NavLink to="/references" onClick={closeMenu}>🔗 References</NavLink></li>
            </ul>
          </li>
          <li className="nav-item"><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
          <li className="nav-item nav-item-services">
            <NavLink to="/services" onClick={closeMenu}>
              Services
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li><a href="/services#remote-development" onClick={closeMenu}>💻 Remote Development</a></li>
              <li><a href="/services#coding-education" onClick={closeMenu}>📚 Coding Education</a></li>
              <li><a href="/services#tech-consulting" onClick={closeMenu}>💡 Tech Consulting</a></li>
              <li><a href="/services#research-support" onClick={closeMenu}>🔬 Research Support</a></li>
              <li><a href="/services#emergency-services" onClick={closeMenu}>🚨 Emergency Services</a></li>
            </ul>
          </li>
          <li className="nav-item"><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
