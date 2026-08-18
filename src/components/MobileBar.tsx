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
      <button onClick={onSurprise} id="mobileSurprise" aria-label="Surprise me" title="Surprise term">
        <svg viewBox="0 0 24 24">
          <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      </button>
      <div className="mobile-title">
        <svg className="mobile-brand-mark" viewBox="0 0 64 34" fill="none" stroke="currentColor" strokeWidth="1.35">
          <path d="M4 17h15m26 0h15M22 17c5-9 15-9 20 0-5 9-15 9-20 0Z" />
          <circle cx="32" cy="17" r="3" />
          <path d="M32 3v5m0 18v5" />
        </svg>
        <span>AI <em>Almanac</em></span>
      </div>
      <button onClick={onFocusSearch} id="mobileSearch" aria-label="Search" title="Search terms">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </div>
  );
};

