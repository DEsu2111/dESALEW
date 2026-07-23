import React, { useEffect } from 'react';

const GalleryModal = ({ item, items, onClose, onSelect }) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.title === item.title);

  const handlePrev = (e) => {
    e?.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items]);

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {items.length > 1 && (
          <>
            <button type="button" className="lightbox-nav prev" onClick={handlePrev} aria-label="Previous image">
              ‹
            </button>
            <button type="button" className="lightbox-nav next" onClick={handleNext} aria-label="Next image">
              ›
            </button>
          </>
        )}

        <div className="lightbox-media-wrapper">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="lightbox-image" />
          ) : (
            <div className="lightbox-placeholder-graphic">
              <span className="lightbox-icon">{item.icon || '🏅'}</span>
              <span className="lightbox-placeholder-badge">{item.type || 'Credential'}</span>
            </div>
          )}
        </div>

        <div className="lightbox-details">
          <span className="lightbox-badge">{item.type}</span>
          <h3>{item.title}</h3>
          <p className="lightbox-issuer"><strong>Issuer / Location:</strong> {item.issuer || item.location}</p>
          <p className="lightbox-desc">{item.description}</p>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="lightbox-link-btn">
              Verify Credential Online <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
