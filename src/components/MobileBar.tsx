import React from 'react';

interface MobileBarProps {
  onSurprise: () => void;
  onFocusSearch: () => void;
}

export const MobileBar: React.FC<MobileBarProps> = ({
  onSurprise,
  onFocusSearch
}) => {
  return (
    <div className="mobile-bar">
      <button onClick={onSurprise} id="mobileSurprise" aria-label="Surprise me">
        <svg viewBox="0 0 24 24">
          <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      </button>
      <div className="mobile-title">The AI Almanac · Expanded v0.7</div>
      <button onClick={onFocusSearch} id="mobileSearch" aria-label="Search">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </div>
  );
};
