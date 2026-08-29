import React, { useEffect, useState } from 'react';
import { Cover } from './Cover';
import { MobileBar } from './MobileBar';
import { Tabs } from './Tabs';
import catalogPhotoUrl from '../assets/404-catalog-photo.webp';
import { getPublicPath } from '../utils/ogImage';

const TOTAL_TERMS = 791;
const AVAILABLE_LETTERS = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
const coverPath = getPublicPath(import.meta.env.BASE_URL || '/', '');
const aboutPath = `${coverPath}#about`;

function readStoredCount(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.length;
    if (typeof parsed === 'object' && parsed !== null) return Object.keys(parsed).length;
  } catch {
    // Keep the cover useful even when storage is unavailable or malformed.
  }
  return fallback;
}

const goToCover = () => {
  window.location.assign(coverPath);
};

const goToAbout = () => {
  window.location.assign(aboutPath);
};

export const NotFoundPage: React.FC = () => {
  const requestedPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [sidebarCounts] = useState(() => ({
    bookmarkCount: readStoredCount('aiAlmanacBookmarks', 0),
    historyCount: readStoredCount('aiAlmanacHistory', 1),
    collectionCount: readStoredCount('aiAlmanacCollections', 4)
  }));

  useEffect(() => {
    document.title = '404 — The AI Almanac';
  }, []);

  const openMobileMenu = () => {
    setIsMobileMenuMounted(true);
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuAnimationEnd = () => {
    if (!isMobileMenuOpen) setIsMobileMenuMounted(false);
  };

  const renderCover = (isMobileOpen = false, isMobileClosing = false) => (
    <Cover
      totalTerms={TOTAL_TERMS}
      bookmarkCount={sidebarCounts.bookmarkCount}
      historyCount={sidebarCounts.historyCount}
      collectionCount={sidebarCounts.collectionCount}
      soundEnabled={false}
      onToggleSound={goToCover}
      onPlayTutorial={goToCover}
      isMobileOpen={isMobileOpen}
      isMobileClosing={isMobileClosing}
      isAboutActive={false}
      onCloseMobile={closeMobileMenu}
      onMobileAnimationEnd={handleMobileMenuAnimationEnd}
      onOpenOverlay={goToCover}
      onFocusSearch={goToCover}
      onOpenAbout={goToAbout}
      onSurprise={goToCover}
    />
  );

  return (
    <>
      <MobileBar
        isMenuOpen={isMobileMenuOpen}
        isSearchOpen={false}
        onOpenMenu={() => {
          if (isMobileMenuOpen) closeMobileMenu();
          else openMobileMenu();
        }}
        onToggleSearch={goToCover}
      />

      {isMobileMenuMounted && (
        <button
          type="button"
          className={`mobile-sidebar-scrim${isMobileMenuOpen ? '' : ' mobile-sidebar-scrim-closing'}`}
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
      )}

      {isMobileMenuMounted && renderCover(true, !isMobileMenuOpen)}

      <main className="stage not-found-stage">
        <section className="book not-found-book">
          {renderCover()}

          <div className="paper-block not-found-paper-block">
            <div className="page-stack" aria-hidden="true">
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
            </div>

            <article className="page not-found-book-page" aria-labelledby="not-found-title">
              <div className="page-inner not-found-page-inner">
                <header className="topline not-found-topline">
                  <span className="edition">404 / Unfiled</span>
                  <div className="not-found-page-indicator" aria-label="Page not found">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h7" />
                    </svg>
                    <span>Page not found</span>
                  </div>
                  <span className="folio-top">Folio 404</span>
                </header>

                <div className="page-layout not-found-page-layout">
                  <section className="entry not-found-entry">
                    <div className="not-found-entry-number" aria-hidden="true">404</div>

                    <div className="headword-line">
                      <h1 className="word" id="not-found-title">Page not found</h1>
                      <span className="part">unfiled</span>
                    </div>

                    <div className="pronounce-row">
                      <span className="pronounce-text">/ˌfō-lē-ō ˌfōr-ō-fōr/</span>
                      <span className="not-found-status">missing from index</span>
                    </div>

                    <div className="definition-wrap">
                      <span className="sense-num">1.</span>
                      <div className="definition-mode">Dictionary</div>
                      <p className="definition">
                        The address you followed is not part of this edition of the Almanac.
                      </p>
                      <p className="example">
                        The card is here. The page is not.
                      </p>
                    </div>

                    <div className="lower-grid">
                      <section>
                        <h3 className="kicker">Origin</h3>
                        <p>A loose folio, somewhere between the cover and the index.</p>
                      </section>
                      <section>
                        <h3 className="kicker">In practice</h3>
                        <p>Return to the cover and choose another thread through the book.</p>
                      </section>
                    </div>

                    <div className="entry-actions not-found-actions">
                      <a className="text-action not-found-home-action" href={coverPath}>
                        ← return to cover
                      </a>
                      <a className="text-action" href={aboutPath}>
                        read about the guide
                      </a>
                    </div>

                    <div className="thread not-found-request" aria-label="Requested address">
                      <div className="thread-head">
                        <span className="thread-title">Requested folio</span>
                      </div>
                      <div className="trail">
                        <code>{requestedPath}</code>
                      </div>
                    </div>
                  </section>

                  <aside className="margin not-found-margin">
                    <figure className="not-found-photo-figure">
                      <div className="not-found-photo-card">
                        <img
                          src={catalogPhotoUrl}
                          alt="An open drawer in a wooden library card catalogue with a blank card slipping out"
                        />
                        <span className="not-found-photo-stamp">Misfiled</span>
                      </div>
                      <figcaption>
                        <span>Fig. 04</span>
                        <span>Card catalogue, lower drawer</span>
                      </figcaption>
                    </figure>

                    <section className="margin-section">
                      <h3>Filed under</h3>
                      <p>Errors / Missing folios</p>
                    </section>

                    <aside className="margin-note">
                      <strong>Marginalia</strong>
                      <p>Try the cover, the index, or a fresh surprise term.</p>
                    </aside>
                  </aside>
                </div>

                <footer className="page-footer not-found-page-footer">
                  <a className="footer-nav footer-prev left" href={coverPath}>
                    <span className="nav-arrow">←</span> Cover
                  </a>
                  <span className="center">Page 404</span>
                  <a className="footer-nav footer-next right" href={aboutPath}>
                    About <span className="nav-arrow">→</span>
                  </a>
                </footer>
              </div>
            </article>

            <Tabs
              currentLetter="N"
              availableLetters={AVAILABLE_LETTERS}
              onSelectLetter={goToCover}
            />
          </div>
        </section>
      </main>
    </>
  );
};
