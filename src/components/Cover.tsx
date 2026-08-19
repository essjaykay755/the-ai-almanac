import React from 'react';
import type { OverlayType } from '../types/almanac';
import { APP_VERSION } from '../version';
import { Ornament } from './Ornament';

interface CoverProps {
  totalTerms: number;
  bookmarkCount: number;
  historyCount: number;
  collectionCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenOverlay: (overlay: OverlayType) => void;
  onFocusSearch: () => void;
  onOpenAbout: () => void;
  onSurprise: () => void;
  isMobileOpen?: boolean;
  isMobileClosing?: boolean;
  onCloseMobile?: () => void;
  onMobileAnimationEnd?: () => void;
  isAboutActive?: boolean;
}

export const Cover: React.FC<CoverProps> = ({
  totalTerms,
  bookmarkCount,
  historyCount,
  collectionCount,
  soundEnabled,
  onToggleSound,
  onOpenOverlay,
  onFocusSearch,
  onOpenAbout,
  onSurprise,
  isMobileOpen = false,
  onCloseMobile,
  isMobileClosing = false,
  onMobileAnimationEnd,
  isAboutActive = false
}) => {
  const mobileClass = isMobileOpen
    ? ` mobile-sidebar${isMobileClosing ? ' mobile-sidebar-closing' : ''}`
    : '';

  return (
    <aside
      className={`cover${mobileClass}`}
      id={isMobileOpen ? 'mobileSidebar' : undefined}
      onAnimationEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          isMobileClosing &&
          event.animationName === 'mobileSidebarOut'
        ) {
          onMobileAnimationEnd?.();
        }
      }}
    >
      {isMobileOpen && onCloseMobile && (
        <button
          type="button"
          className="mobile-sidebar-close"
          onClick={onCloseMobile}
          aria-label="Close navigation menu"
          title="Close navigation menu"
        >
          ×
        </button>
      )}
      <div className="brand">
        <h1>
          <span className="brand-main-lockup">
            <small className="brand-pretitle">The</small>
            <span className="brand-main">AI</span>
          </span>
          <span className="brand-suffix">Almanac</span>
        </h1>
        <p>An evolving reference book for AI enthusiasts &amp; vibe coders</p>
        <Ornament className="brand-mark" />
      </div>

      <nav className="cover-nav">
        <button className="nav-btn" onClick={onFocusSearch} id="navSearch">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span>Ask / Search</span>
          <small>⌘K</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('index')} id="navIndex">
          <svg viewBox="0 0 24 24">
            <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
          </svg>
          <span>Complete index</span>
          <small id="termCount">{totalTerms}</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('bookmarks')} id="navBookmarks">
          <svg viewBox="0 0 24 24">
            <path d="M6 3h12v18l-6-4-6 4z" />
          </svg>
          <span>Dog-eared pages</span>
          <small id="bookmarkCount">{bookmarkCount}</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('history')} id="navHistory">
          <svg viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5M12 7v5l3 2" />
          </svg>
          <span>Reading history</span>
          <small id="historyCount">{historyCount}</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('timeline')} id="navTimeline">
          <svg viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
            <path d="M8 4v4m5 2v4m4 2v4" />
          </svg>
          <span>Chronology</span>
          <small>fold-out</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('collections')} id="navCollections">
          <svg viewBox="0 0 24 24">
            <path d="M4 5h7v14H4zM13 5h7v14h-7z" />
            <path d="M6 8h3m6 0h3" />
          </svg>
          <span>Collections</span>
          <small id="collectionCount">{collectionCount}</small>
        </button>

        <button className="nav-btn" onClick={onSurprise} id="navSurprise">
          <svg viewBox="0 0 24 24">
            <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
          </svg>
          <span>Surprise me</span>
          <small>riffle</small>
        </button>

        <button className="nav-btn" onClick={() => onOpenOverlay('clip')} id="navClip">
          <svg viewBox="0 0 24 24">
            <path d="M8 3v18M16 3v18M3 8h18M3 16h18" />
          </svg>
          <span>Clip this entry</span>
          <small>share</small>
        </button>

        <button
          className={`nav-btn ${isAboutActive ? 'active' : ''}`}
          onClick={onOpenAbout}
          id="navAbout"
          aria-current={isAboutActive ? 'page' : undefined}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 10.5v5M12 7.5h.01" />
          </svg>
          <span>About</span>
          <small>cover</small>
        </button>
      </nav>

      <Ornament className="cover-divider-mark" />

      <div className="sound-row">
        <span>Paper &amp; ink sounds</span>
        <button className="sound-toggle" onClick={onToggleSound} id="soundToggle">
          {soundEnabled ? 'On' : 'Off'}
        </button>
      </div>

      <small className="cover-version">v{APP_VERSION}</small>
    </aside>
  );
};
