import React from 'react';
import type { Term, OverlayType } from '../types/almanac';

interface CoverProps {
  totalTerms: number;
  bookmarkCount: number;
  historyCount: number;
  collectionCount: number;
  dailyTerm: Term;
  formattedDate: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenOverlay: (overlay: OverlayType) => void;
  onFocusSearch: () => void;
  onGoToDaily: () => void;
  onSurprise: () => void;
}

export const Cover: React.FC<CoverProps> = ({
  totalTerms,
  bookmarkCount,
  historyCount,
  collectionCount,
  dailyTerm,
  formattedDate,
  soundEnabled,
  onToggleSound,
  onOpenOverlay,
  onFocusSearch,
  onGoToDaily,
  onSurprise
}) => {
  return (
    <aside className="cover">
      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 64 34" fill="none" stroke="currentColor" strokeWidth="1.35">
          <path d="M4 17h15m26 0h15M22 17c5-9 15-9 20 0-5 9-15 9-20 0Z" />
          <circle cx="32" cy="17" r="3" />
          <path d="M32 3v5m0 18v5" />
        </svg>
        <h1>
          AI<span>Almanac</span>
        </h1>
        <p>An evolving reference book for AI enthusiasts &amp; vibe coders</p>
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

        <button className="nav-btn" onClick={onGoToDaily} id="navDaily">
          <svg viewBox="0 0 24 24">
            <path d="M4 5h16v15H4zM8 3v4m8-4v4M4 9h16" />
          </svg>
          <span>Today’s entry</span>
          <small>daily</small>
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
      </nav>

      <div className="cover-rule"></div>

      <div className="daily-card">
        <div className="daily-label">Filed for today</div>
        <button className="daily-term" onClick={onGoToDaily} id="dailyTerm">
          {dailyTerm.word}
        </button>
        <div className="daily-date" id="dailyDate">
          {formattedDate}
        </div>
      </div>

      <div className="sound-row">
        <span>Paper &amp; ink sounds</span>
        <button className="sound-toggle" onClick={onToggleSound} id="soundToggle">
          {soundEnabled ? 'On' : 'Off'}
        </button>
      </div>
    </aside>
  );
};
