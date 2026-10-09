import React from 'react';

/**
 * Reusable Pagination Component
 * Displays range info ("Showing X–Y of Z items"),
 * Prev/Next navigation, and intelligent page numbers with ellipsis.
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 8,
  onPageChange,
  label = 'items'
}) => {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis for large page sets
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pagination-bar" role="navigation" aria-label={`Pagination for ${label}`}>
      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn nav-btn prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          title="Previous page"
        >
          ‹ Prev
        </button>

        {getPageNumbers().map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`pagination-btn page-num ${currentPage === p ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
              aria-label={`Go to page ${p}`}
              aria-current={currentPage === p ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          className="pagination-btn nav-btn next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          title="Next page"
        >
          Next ›
        </button>
      </div>

      <div className="pagination-info">
        Showing <strong>{startIdx}–{endIdx}</strong> of <strong>{totalItems}</strong> {label}
      </div>
    </div>
  );
};

export default Pagination;
