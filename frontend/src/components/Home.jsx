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

