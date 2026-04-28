import React from 'react';

const Icon = ({ children }) => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const icons = {
  email: (
    <Icon>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </Icon>
  ),
  github: (
    <Icon>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.17-3.36-1.17-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.9 0-1.08.39-1.97 1.03-2.66-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.58 1.03 2.66 0 3.81-2.33 4.65-4.55 4.89.36.31.68.92.68 1.86V21c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </Icon>
  ),
  linkedin: (
    <Icon>
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.05V23h-4v-7.75c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.02-2.98 4.1V23h-4V8Z"
      />
    </Icon>
  ),
  telegram: (
    <Icon>
      <path
        fill="currentColor"
        d="M21.9 4.6c.2-1-.8-1.7-1.7-1.3L2.9 10.1c-1.2.5-1.1 2.2.1 2.6l4.7 1.5 1.8 5.7c.4 1.2 2 1.3 2.6.3l2.6-4.1 4.9 3.6c.9.7 2.2.2 2.4-.9L21.9 4.6ZM8.4 13.6l9.6-6c.2-.1.4.2.2.3l-8.1 7.3-.3 3.7-1.8-5.3c-.1-.2 0-.4.2-.5Z"
      />
    </Icon>
  ),
};

const SocialLinks = ({ className = '', links = [], showLabels = true }) => {
  return (
    <div className={`social-icon-links ${className}`.trim()}>
      {links.map((link) => (
        <a
          key={link.key}
          className="social-icon-link"
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          aria-label={link.ariaLabel || link.label}
        >
          {icons[link.key]}
          {showLabels && <span>{link.label}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

