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
import Services from './components/Services';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import MissionVision from './components/MissionVision';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'dark';
  });

  useEffect(() => {
    const applyTheme = (mode) => {
      let resolved = mode;
      if (mode === 'system') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolved = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.setAttribute('data-theme-mode', mode);
      localStorage.setItem('theme', resolved);
      localStorage.setItem('themeMode', mode);
    };

    applyTheme(themeMode);

    if (themeMode === 'system' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system';
    setThemeMode(next);
  };

  const isDashboard = location.pathname.toLowerCase().startsWith('/dash');

  return (
    <div className={`App ${isDashboard ? 'dashboard-layout-mode' : ''}`}>
      {!isDashboard && <Navigation />}
      {!isDashboard && <RotatingName />}

      <main className={isDashboard ? 'dashboard-main-area' : ''}>
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
          <Route path="/dashboard" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashboard/*" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashbored" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashbored/*" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashbore" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashbore/*" element={<AdminDashboard themeMode={themeMode} onThemeChange={setThemeMode} onToggleTheme={toggleTheme} />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer themeMode={themeMode} onThemeChange={setThemeMode} />
    </div>
  );
}

export default App;
