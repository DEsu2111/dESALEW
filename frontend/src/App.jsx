import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import References from './components/References';
import Resume from './components/Resume';
import Contact from './components/Contact';
import RotatingName from './components/RotatingName';
import SocialLinks from './components/SocialLinks';
import Services from './components/Services';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <div className="App">
      <Navigation />
      <RotatingName />
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle-icon" aria-hidden="true">☼</span>
      </button>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/services" element={<Services />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/references" element={<References />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">DA</span>
            <div>
              <p className="footer-name">Desalew Alganeh</p>
              <p className="footer-tagline">Full Stack Developer</p>
            </div>
          </div>
          <SocialLinks
            className="footer-links"
            links={[
              { key: 'email', label: 'Email', href: 'mailto:desu6262@gmail.com' },
              { key: 'telegram', label: 'Telegram', href: 'https://t.me/desu6262', external: true, ariaLabel: 'Telegram @desu6262' },
              { key: 'github', label: 'GitHub', href: 'https://github.com/DEsu2111', external: true },
              { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/desalew-aleganeh', external: true },
            ]}
          />
          <p className="footer-copy">&copy; 2026 Desalew Alganeh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
