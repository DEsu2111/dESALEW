import React, { useState, useEffect, useMemo, useRef } from 'react';
import Pagination from './Pagination';

export const PROJECT_CATEGORIES = [
  'SaaS & Cloud',
  'Web Applications',
  'Enterprise Systems',
  'Real-Time Applications',
  'Games',
  'Mobile Apps',
  'Telegram Mini Apps',
  'Admin Dashboards',
  'AI Applications',
  'Healthcare Systems',
  'Education Platforms',
  'E-Commerce',
  'Business Systems',
  'API & Backend Systems'
];

const FALLBACK_PROJECTS = [
  {
    _id: "1",
    title: "Fellowship Management System (Saas)",
    category: "SaaS & Cloud",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/"
  },
  {
    _id: "2",
    title: "Hawassa Fellowship Management System",
    category: "Web Applications",
    description: "Test Level system for Hawassa University fellowship activities and member tracking.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://hufellow.ct.ws/"
  },
  {
    _id: "3",
    title: "Tudo Novo Industrial Packaging System",
    category: "Enterprise Systems",
    description: "Factory management system for industrial packaging production and inventory (Sold project).",
    technologies: ["Nest.js", "Next.js", "PostgreSQL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://tudo-novo.ct.ws/public/"
  },
  {
    _id: "4",
    title: "TTM Technology Solution",
    category: "Business Systems",
    description: "Official web application for TTM Technology Solution services and company profile.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/"
  },
  {
    _id: "5",
    title: "Maraki Digital Invitation",
    category: "E-Commerce",
    description: "Web application for creating and managing digital invitations with premium designs.",
    technologies: ["Tailwind CSS", "Blade", "Laravel", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/maraki-invitations/"
  },
  {
    _id: "6",
    title: "School Management System",
    category: "Education Platforms",
    description: "B.Sc. Thesis project: A comprehensive system for schools including student, teacher, and grade management.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://school-systems.ct.ws/"
  },
  {
    _id: "7",
    title: "Hospital Management System",
    category: "Healthcare Systems",
    description: "Internship project: Managed patient records, doctor schedules, and billing information.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/hms"
  },
  {
    _id: "8",
    title: "Ketero Appointment Scheduling",
    category: "Real-Time Applications",
    description: "Semester project: Web-based platform to streamline scheduling between clients and service providers.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/appointment"
  },
  {
    _id: "9",
    title: "Asgard Tour Guidance",
    category: "Mobile Apps",
    description: "Semester project: Web-based system designed to simplify travel planning and attraction browsing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/Asgard-Tour-"
  }
];

const DEFAULT_IMAGE_LIST = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
];

const inferCategory = (project) => {
  if (project.category && PROJECT_CATEGORIES.includes(project.category)) return project.category;
  if (project.category) return project.category;
  const t = `${project.title || ''} ${project.description || ''}`.toLowerCase();
  if (t.includes('saas') || t.includes('cloud')) return 'SaaS & Cloud';
  if (t.includes('thesis') || t.includes('school') || t.includes('education') || t.includes('student')) return 'Education Platforms';
  if (t.includes('hospital') || t.includes('medical') || t.includes('patient') || t.includes('health') || t.includes('hms')) return 'Healthcare Systems';
  if (t.includes('schedule') || t.includes('appointment') || t.includes('chat') || t.includes('real-time') || t.includes('socket')) return 'Real-Time Applications';
  if (t.includes('factory') || t.includes('packaging') || t.includes('industrial') || t.includes('enterprise')) return 'Enterprise Systems';
  if (t.includes('invitation') || t.includes('e-commerce') || t.includes('shop') || t.includes('store') || t.includes('cart') || t.includes('maraki')) return 'E-Commerce';
  if (t.includes('tour') || t.includes('travel') || t.includes('flutter') || t.includes('mobile')) return 'Mobile Apps';
  if (t.includes('game') || t.includes('gaming')) return 'Games';
  if (t.includes('telegram') || t.includes('bot') || t.includes('mini app')) return 'Telegram Mini Apps';
  if (t.includes('dashboard') || t.includes('admin') || t.includes('portal')) return 'Admin Dashboards';
  if (t.includes('ai') || t.includes('gpt') || t.includes('llm') || t.includes('intelligence') || t.includes('ml')) return 'AI Applications';
  if (t.includes('api') || t.includes('backend') || t.includes('nest') || t.includes('microservice')) return 'API & Backend Systems';
  if (t.includes('technology solution') || t.includes('company') || t.includes('business') || t.includes('ttm')) return 'Business Systems';
  return 'Web Applications';
};

/**
 * Fullscreen Swipeable Image Lightbox
 * Supports: Touch swiping on mobile, desktop arrows, keyboard (← / → / Esc),
 * thumbnail selector, and body scroll locking.
 */
const ProjectImageLightbox = ({ project, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const images = useMemo(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      const filtered = project.images.filter(img => typeof img === 'string' && img.trim());
      if (filtered.length > 0) return filtered;
    }
    if (project.imageUrl) return [project.imageUrl];
    return [DEFAULT_IMAGE_LIST[0]];
  }, [project]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Touch Swipe handlers for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum distance in px to register a horizontal swipe
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext(); // swipe left -> next screenshot
      } else {
        handlePrev(); // swipe right -> prev screenshot
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, images.length]);

  const currentImg = images[currentIndex] || images[0];

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot preview`}
    >
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <div 
          className="lightbox-img-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Big Full-Size Image */}
          <img
            src={currentImg}
            alt={`${project.title} - Screenshot ${currentIndex + 1}`}
            className="lightbox-full-img"
            loading="eager"
          />

          {/* Top Header Overlay ON the image */}
          <div className="lightbox-top-overlay">
            <div className="lightbox-header-info">
              <h3 className="lightbox-project-title">{project.title}</h3>
              {images.length > 1 && (
                <span className="lightbox-counter-badge">
                  {currentIndex + 1} of {images.length}
                </span>
              )}
            </div>
            <button 
              type="button" 
              className="lightbox-close-btn" 
              onClick={onClose}
              aria-label="Close fullscreen gallery"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Navigation Arrows ON the image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={handlePrev}
                aria-label="Previous screenshot"
                title="Previous (Left Arrow)"
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={handleNext}
                aria-label="Next screenshot"
                title="Next (Right Arrow)"
              >
                ›
              </button>
            </>
          )}

          {/* Bottom Overlay ON the image */}
          <div className="lightbox-bottom-overlay">
            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div className="lightbox-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`lightbox-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View screenshot ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} />
                    <span className="thumb-idx">{idx + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Actions & Shortcut Hints Row */}
            <div className="lightbox-actions-row">
              <div className="lightbox-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn secondary"
                  >
                    🚀 Live Demo
                  </a>
                )}
                {(project.githubUrl || project.link) && (
                  <a
                    href={project.githubUrl || project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    💻 Source Code
                  </a>
                )}
              </div>

              {images.length > 1 && (
                <div className="lightbox-swipe-hint">
                  <span className="lightbox-desktop-swipe-hint">👈 Swipe or click arrows to view all {images.length} screenshots 👉</span>
                  <span className="lightbox-mobile-swipe-hint">👈 Swipe to browse screenshots ({images.length}) 👉</span>
                </div>
              )}

              <span className="lightbox-help-hint lightbox-desktop-kbd-hint">
                Press <kbd>Esc</kbd> or ✕ to close • Use <kbd>←</kbd> / <kbd>→</kbd>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCardItem = ({ project, index, onOpenLightbox }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Extract valid non-empty images
  const images = useMemo(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      const filtered = project.images.filter(img => typeof img === 'string' && img.trim());
      if (filtered.length > 0) return filtered;
    }
    if (project.imageUrl) return [project.imageUrl];
    return [DEFAULT_IMAGE_LIST[index % DEFAULT_IMAGE_LIST.length]];
  }, [project.images, project.imageUrl, index]);

  const currentImg = images[activeImgIdx] || images[0];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleImageWrapperClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(project, activeImgIdx);
    }
  };

  const descText = project.description || '';
  const needsReadMore = descText.length > 110;
  const displayedDesc = needsReadMore && !isDescExpanded ? `${descText.slice(0, 110)}...` : descText;

  return (
    <div className="project-card">
      <div 
        className="project-image-wrapper"
        onClick={handleImageWrapperClick}
        title="Click image to expand full-screen and swipe screenshots"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageWrapperClick();
          }
        }}
      >
        <img
          src={currentImg}
          alt={`${project.title} - Visual ${activeImgIdx + 1}`}
          className="project-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE_LIST[0];
          }}
        />

        {project.category && (
          <span className="project-category-badge">{project.category}</span>
        )}

        {/* Hover Hint for Fullscreen & Swipe */}
        <div className="project-expand-hint">
          <span>🔍 Click to view full & swipe ({images.length})</span>
        </div>

        {images.length > 1 && (
          <span className="project-img-count-badge" title={`${images.length} screenshots available`}>
            {activeImgIdx + 1} / {images.length}
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous screenshot preview"
              title="Previous preview"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-nav-btn next"
              onClick={handleNext}
              aria-label="Next screenshot preview"
              title="Next preview"
            >
              ›
            </button>
            <div className="project-gallery-dots">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`gallery-dot ${dotIdx === activeImgIdx ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIdx(dotIdx);
                  }}
                  aria-label={`Switch to screenshot ${dotIdx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p className="project-card-description">
          {displayedDesc}
          {needsReadMore && (
            <button
              type="button"
              className="read-more-btn"
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              aria-expanded={isDescExpanded}
            >
              {isDescExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
        <div className="tech-tags">
          {project.technologies && project.technologies.map((tech, idx) => (
            <span key={idx} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {(project.githubUrl || project.link) && (
            <a
              href={project.githubUrl || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              View Project
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn secondary"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxData, setLightboxData] = useState(null); // { project, initialIndex }
  const API_BASE = import.meta.env.VITE_API_URL || '';

  // Fetch projects from backend, with local cache and fallback
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const processed = data.map((p, idx) => ({
            ...p,
            category: inferCategory(p),
            imageUrl: p.imageUrl || (p.images && p.images[0]) || DEFAULT_IMAGE_LIST[idx % DEFAULT_IMAGE_LIST.length],
            images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.imageUrl || DEFAULT_IMAGE_LIST[idx % DEFAULT_IMAGE_LIST.length]]
          }));
          setProjects(processed);
          try { localStorage.setItem('adminProjects', JSON.stringify(processed)); } catch (e) {}
        } else {
          const local = localStorage.getItem('adminProjects');
          if (local) {
            setProjects(JSON.parse(local));
          } else {
            setProjects(FALLBACK_PROJECTS);
          }
        }
      } catch (error) {
        console.warn('Backend projects unavailable, checking local storage:', error);
        try {
          const local = localStorage.getItem('adminProjects');
          if (local) {
            setProjects(JSON.parse(local));
          } else {
            setProjects(FALLBACK_PROJECTS);
          }
        } catch {
          setProjects(FALLBACK_PROJECTS);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_BASE]);

  const PROJECTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Counts for each of the 14 categories + All
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    PROJECT_CATEGORIES.forEach(cat => {
      counts[cat] = projects.filter(p => (p.category || inferCategory(p)) === cat).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => (p.category || inferCategory(p)) === activeCategory);
  }, [projects, activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (cat, e) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLightbox = (project, initialIndex = 0) => {
    setLightboxData({ project, initialIndex });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>

      {/* Category Filter Pills on Top (All 14 Categories + All) */}
      <div className="project-filters-wrapper">
        <div className="project-filters" role="tablist" aria-label="Filter projects by category">
          {['All', ...PROJECT_CATEGORIES].map(cat => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={(e) => handleCategoryChange(cat, e)}
              >
                <span>{cat}</span>
                <span className="filter-count-chip">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <div className="empty-category-notice">
          <div className="empty-category-icon">📁</div>
          <h3>No {activeCategory} Projects Yet</h3>
          <p>Projects under {activeCategory} will be added soon. In the meantime, browse our other categories!</p>
          <button 
            type="button" 
            className="project-link-btn"
            onClick={() => handleCategoryChange('All')}
          >
            View All Projects ({projects.length})
          </button>
        </div>
      ) : (
        <>
          <div className="projects-grid">
            {paginatedProjects.map((project, index) => (
              <ProjectCardItem 
                key={project._id || index} 
                project={project} 
                index={index} 
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </div>

          {/* 8-Project Pagination Bar */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProjects.length}
            itemsPerPage={PROJECTS_PER_PAGE}
            onPageChange={handlePageChange}
            label="projects"
          />
        </>
      )}

      {/* Fullscreen Swipeable Image Lightbox */}
      {lightboxData && (
        <ProjectImageLightbox
          project={lightboxData.project}
          initialIndex={lightboxData.initialIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
};

export default Projects;

