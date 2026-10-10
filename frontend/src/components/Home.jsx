import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const phrases = [
  'Backend & API Development',
  'Real-Time Systems',
  'Software Architecture',
  'Full-Stack Developer',
  'VPS Customization',
  'Computer Engineer'
];

const heroSkillSquares = [
  { id: 'sq-1', name: 'React', tag: 'UI', variant: 'cyan', icon: '⚛' },
  { id: 'sq-2', name: 'Laravel', tag: 'PHP', variant: 'brand', icon: '❖' },
  { id: 'sq-3', name: 'Node.js', tag: 'API', variant: 'emerald', icon: '⬢' },
  { id: 'sq-4', name: 'Next.js', tag: 'SSR', variant: 'slate', icon: '▲' },
  { id: 'sq-5', name: 'Nest.js', tag: 'TS', variant: 'brand', icon: '🛡️' },
  { id: 'sq-6', name: 'PostgreSQL', tag: 'SQL', variant: 'cyan', icon: '🗄️' },
  { id: 'sq-7', name: 'MongoDB', tag: 'NoSQL', variant: 'emerald', icon: '🍃' },
  { id: 'sq-8', name: 'Python', tag: 'Backend', variant: 'cyan', icon: '🐍' },
  { id: 'sq-9', name: 'Django', tag: 'Web', variant: 'emerald', icon: '⚡' },
  { id: 'sq-10', name: 'Tailwind', tag: 'CSS', variant: 'cyan', icon: '✦' },
  { id: 'sq-11', name: 'Linux VPS', tag: 'DevOps', variant: 'slate', icon: '🖥️' },
  { id: 'sq-12', name: 'TypeScript', tag: 'Typed', variant: 'brand', icon: 'TS' }
];

const Home = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      // Pause 2 seconds after full text is typed before deleting
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, 40);
        return () => clearTimeout(deleteTimer);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (displayText.length < currentPhrase.length) {
        const typeTimer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 90);
        return () => clearTimeout(typeTimer);
      } else {
        setIsPaused(true);
      }
    }
  }, [displayText, isDeleting, isPaused, phraseIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-squares" aria-hidden="true">
        <div className="hero-grid-pattern" />
        <div className="hero-glow-orb hero-glow-orb-1" />
        <div className="hero-glow-orb hero-glow-orb-2" />
        {heroSkillSquares.map((sq) => (
          <div key={sq.id} className={`hero-sq ${sq.id} sq-variant-${sq.variant}`}>
            <span className="hero-sq-icon">{sq.icon}</span>
            <span className="hero-sq-name">{sq.name}</span>
            <span className="hero-sq-tag">{sq.tag}</span>
          </div>
        ))}
      </div>

      <div className="hero-content">
        <h1>Hello, I'm <span className="highlight">Desalew Alganeh</span></h1>
        <p className="hero-subheading">Full-Stack Developer | Real-Time Systems | Software Architecture</p>
        
        <div className="hero-typewriter">
          <span className="typewriter-prefix">I'm a </span>
          <span className="typewriter-dynamic-wrap">
            <span className="typewriter-text">{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </span>
        </div>

        <p className="hero-location">Addis Ababa, Ethiopia</p>
        <Link to="/about" className="cta-button">
          View About Me
        </Link>
      </div>
    </section>
  );
};

export default Home;

