import React, { useState, useEffect, useRef } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ themeMode = 'dark', onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (mode) => {
    if (onThemeChange) {
      onThemeChange(mode);
    }
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher-container" ref={dropdownRef}>
      {/* 3-Option Segmented Pill matching user reference image */}
      <div className="theme-pill" role="radiogroup" aria-label="Theme selection">
        {/* System / Default */}
        <button
          type="button"
          className={`theme-pill-btn ${themeMode === 'system' ? 'active' : ''}`}
          onClick={() => handleSelect('system')}
          aria-label="System default theme"
          aria-checked={themeMode === 'system'}
          role="radio"
          title="System default"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </button>

        {/* Light */}
        <button
          type="button"
          className={`theme-pill-btn ${themeMode === 'light' ? 'active' : ''}`}
          onClick={() => handleSelect('light')}
          aria-label="Light mode"
          aria-checked={themeMode === 'light'}
          role="radio"
          title="Light mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        </button>

        {/* Dark */}
        <button
          type="button"
          className={`theme-pill-btn ${themeMode === 'dark' ? 'active' : ''}`}
          onClick={() => handleSelect('dark')}
          aria-label="Dark mode"
          aria-checked={themeMode === 'dark'}
          role="radio"
          title="Dark mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Small dropdown caret trigger */}
        <button
          type="button"
          className={`theme-caret-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle theme dropdown menu"
          aria-expanded={isOpen}
          title="More options"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Small Dropdown Menu Popup */}
      {isOpen && (
        <div className="theme-dropdown-menu" role="menu">
          <div className="theme-dropdown-header">Appearance</div>
          <button
            type="button"
            className={`theme-dropdown-item ${themeMode === 'system' ? 'selected' : ''}`}
            onClick={() => handleSelect('system')}
            role="menuitem"
          >
            <span className="dropdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <span className="dropdown-label">System default</span>
            {themeMode === 'system' && <span className="dropdown-check">✓</span>}
          </button>

          <button
            type="button"
            className={`theme-dropdown-item ${themeMode === 'light' ? 'selected' : ''}`}
            onClick={() => handleSelect('light')}
            role="menuitem"
          >
            <span className="dropdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </svg>
            </span>
            <span className="dropdown-label">Light mode</span>
            {themeMode === 'light' && <span className="dropdown-check">✓</span>}
          </button>

          <button
            type="button"
            className={`theme-dropdown-item ${themeMode === 'dark' ? 'selected' : ''}`}
            onClick={() => handleSelect('dark')}
            role="menuitem"
          >
            <span className="dropdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span className="dropdown-label">Dark mode</span>
            {themeMode === 'dark' && <span className="dropdown-check">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
