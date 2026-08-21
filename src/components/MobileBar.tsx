import React from 'react';
import { Ornament } from './Ornament';

interface MobileBarProps {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  onOpenMenu: () => void;
  onToggleSearch: () => void;
}

export const MobileBar: React.FC<MobileBarProps> = ({
  isMenuOpen,
  isSearchOpen,
  onOpenMenu,
  onToggleSearch
}) => {
  return (
    <div className="mobile-bar">
      <button
        onClick={onOpenMenu}
        id="mobileMenu"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobileSidebar"
        title={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <svg viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="mobile-title">
        <span className="mobile-wordmark">
          <span className="mobile-main-lockup">
            <small>The</small>
            <strong>AI</strong>
          </span>
          <em>Almanac</em>
        </span>
        <Ornament className="mobile-brand-mark" />
      </div>
      <button
        onClick={onToggleSearch}
        id="mobileSearch"
        aria-label={isSearchOpen ? 'Close search' : 'Open search'}
        aria-expanded={isSearchOpen}
        aria-controls="search"
        title={isSearchOpen ? 'Close search' : 'Search terms'}
      >
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </div>
  );
};
