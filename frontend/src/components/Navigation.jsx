import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/desu1.jpg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToAboutSection = (sectionId) => {
    closeMenu();
    if (location.pathname === '/about') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/about#${sectionId}`);
      }
    } else {
      navigate(`/about#${sectionId}`);
    }
  };

  const handleAboutClick = (e) => {
    closeMenu();
    if (location.pathname === '/about') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/about');
    }
  };

  const navigateToSkillsSection = (sectionId) => {
    closeMenu();
    if (location.pathname === '/skills') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/skills#${sectionId}`);
      }
    } else {
      navigate(`/skills#${sectionId}`);
    }
  };

  const handleSkillsClick = (e) => {
    closeMenu();
    if (location.pathname === '/skills') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/skills');
    }
  };

  const navigateToServicesSection = (sectionId) => {
    closeMenu();
    if (location.pathname === '/services') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/services#${sectionId}`);
      }
    } else {
      navigate(`/services#${sectionId}`);
    }
  };

  const handleServicesClick = (e) => {
    closeMenu();
    if (location.pathname === '/services') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/services');
    }
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
            <NavLink to="/about" onClick={handleAboutClick}>
              About
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li>
                <a
                  href="/about#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAboutSection('skills');
                  }}
                >
                  ⚡ Skills &amp; Tech
                </a>
              </li>
              <li>
                <a
                  href="/about#education"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAboutSection('education');
                  }}
                >
                  🎓 Education
                </a>
              </li>
              <li>
                <a
                  href="/about#certificates"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAboutSection('certificates');
                  }}
                >
                  🏅 Certificates
                </a>
              </li>
              <li>
                <a
                  href="/about#resume"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAboutSection('resume');
                  }}
                >
                  💼 Experience
                </a>
              </li>
              <li>
                <a
                  href="/about#mission"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToAboutSection('mission');
                  }}
                >
                  🎯 Mission &amp; Vision
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item nav-item-skills">
            <NavLink to="/skills" onClick={handleSkillsClick}>
              Skills
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li>
                <a
                  href="/skills#proficiencies"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSkillsSection('proficiencies');
                  }}
                >
                  ⚡ Core Proficiencies
                </a>
              </li>
              <li>
                <a
                  href="/skills#domains"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSkillsSection('domains');
                  }}
                >
                  🗂️ Tech Domains
                </a>
              </li>
              <li>
                <a
                  href="/skills#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSkillsSection('experience');
                  }}
                >
                  💼 Applied Experience
                </a>
              </li>
              <li>
                <a
                  href="/skills#languages"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSkillsSection('languages');
                  }}
                >
                  🌐 Languages
                </a>
              </li>
              <li>
                <a
                  href="/skills#references"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSkillsSection('references');
                  }}
                >
                  🔗 References
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item"><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
          <li className="nav-item nav-item-services">
            <NavLink to="/services" onClick={handleServicesClick}>
              Services
              <span className="nav-dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3.5l4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </NavLink>
            <ul className="nav-submenu">
              <li>
                <a
                  href="/services#remote-development"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('remote-development');
                  }}
                >
                  💻 Remote Development
                </a>
              </li>
              <li>
                <a
                  href="/services#code-consulting"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('code-consulting');
                  }}
                >
                  💡 Tech Consulting
                </a>
              </li>
              <li>
                <a
                  href="/services#research-support"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('research-support');
                  }}
                >
                  🔬 Research Support
                </a>
              </li>
              <li>
                <a
                  href="/services#coding-education"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('coding-education');
                  }}
                >
                  📚 Coding Education
                </a>
              </li>
              <li>
                <a
                  href="/services#custom-delivery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('custom-delivery');
                  }}
                >
                  ⚡ Custom Delivery
                </a>
              </li>
              <li>
                <a
                  href="/services#emergency-services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServicesSection('emergency-services');
                  }}
                >
                  🚨 Emergency Services
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item"><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
