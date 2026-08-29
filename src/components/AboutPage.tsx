import React, { useEffect, useRef, useState } from 'react';
import { Ornament } from './Ornament';
import { APP_VERSION } from '../version';
import essjaykayLogoUrl from '../assets/essjaykay-logo.svg';

interface AboutPageProps {
  totalTerms: number;
  onClose?: () => void;
}

const authorVideoUrl = `${import.meta.env.BASE_URL || '/'}author-video.mp4`;

export const AboutPage: React.FC<AboutPageProps> = ({ totalTerms, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [touchPreviewOpen, setTouchPreviewOpen] = useState(false);
  const [videoRequested, setVideoRequested] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const authorCreditRef = useRef<HTMLDivElement>(null);
  const authorVideoRef = useRef<HTMLVideoElement>(null);
  const firstTouchTap = useRef(false);
  const wantsVideoPreview = showVideo || touchPreviewOpen;
  const videoVisible = wantsVideoPreview && videoReady;

  useEffect(() => {
    const video = authorVideoRef.current;
    if (!video || !videoRequested) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setVideoReady(true);
    } else {
      // Start buffering in the hidden popup and reveal it only after the first
      // usable frame has decoded. This avoids a black preview on slow networks.
      video.load();
    }
  }, [videoRequested]);

  useEffect(() => {
    const video = authorVideoRef.current;
    if (!video) return;

    if (videoVisible) {
      void video.play().catch(() => {
        // Keep the decoded first frame visible if autoplay is blocked.
      });
    } else {
      video.pause();
      if (!wantsVideoPreview) {
        video.currentTime = 0;
      }
    }
  }, [videoVisible, wantsVideoPreview]);

  useEffect(() => {
    const handleTouchOutside = (event: PointerEvent) => {
      if (
        event.pointerType !== 'touch' ||
        !window.matchMedia('(max-width: 760px)').matches ||
        !authorCreditRef.current ||
        authorCreditRef.current.contains(event.target as Node)
      ) {
        return;
      }

      firstTouchTap.current = false;
      setTouchPreviewOpen(false);
    };

    document.addEventListener('pointerdown', handleTouchOutside);
    return () => document.removeEventListener('pointerdown', handleTouchOutside);
  }, []);

  const handleAuthorMouseEnter = () => {
    setVideoRequested(true);
    setShowVideo(true);
  };

  const handleAuthorPointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const isMobileTouch =
      event.pointerType === 'touch' &&
      window.matchMedia('(max-width: 760px)').matches;

    if (!isMobileTouch) {
      firstTouchTap.current = false;
      return;
    }

    if (!touchPreviewOpen) {
      firstTouchTap.current = true;
      event.preventDefault();
      setVideoRequested(true);
      setTouchPreviewOpen(true);
    } else {
      firstTouchTap.current = false;
    }
  };

  const handleAuthorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (firstTouchTap.current) {
      event.preventDefault();
      firstTouchTap.current = false;
      return;
    }

    if (touchPreviewOpen) {
      setTouchPreviewOpen(false);
    }
  };

  return (
    <article className="about-page" aria-labelledby="about-page-title">
      <div className="about-page-inner redesign-layout">
        {onClose && (
          <button
            type="button"
            className="about-page-close"
            style={{ border: 0, background: 'transparent' }}
            onClick={onClose}
            aria-label="Close About page and return to the book"
            title="Return to the book"
          >
            ×
          </button>
        )}
        <header className="about-page-header">
          <div className="about-wordmark" aria-label="The AI Almanac">
            <span className="wordmark-main-lockup">
              <span className="wordmark-pretitle">The</span>
              <strong className="wordmark-main">AI</strong>
            </span>
            <span className="wordmark-suffix">Almanac</span>
          </div>
          <div className="about-page-mark" aria-hidden="true">
            <Ornament className="about-page-ornament" />
          </div>
        </header>

        <section className="about-page-content centered">
          <h1 id="about-page-title">A Field Guide to<br/>the Language of AI.</h1>
          <p className="about-page-lede">
            An evolving reference book for AI enthusiasts &amp; vibe coders.
          </p>
        </section>

        <footer className="about-page-footer redesign-footer">
          <div className="about-credits">
            <div className="about-credit-line">
              <span>Made with </span>
              <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor" aria-label="love">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span> by </span>
              <div
                ref={authorCreditRef}
                className="author-credit"
                onMouseEnter={handleAuthorMouseEnter}
                onMouseLeave={() => setShowVideo(false)}
              >
                <a
                  href="https://x.com/essjaykay755"
                  target="_blank"
                  rel="noreferrer"
                  aria-expanded={videoVisible}
                  aria-controls="author-video-popup"
                  onPointerDown={handleAuthorPointerDown}
                  onClick={handleAuthorClick}
                >
                  Subhojit Karmakar
                </a>
                <div
                  id="author-video-popup"
                  className={`author-video-popup${videoVisible ? ' is-visible' : ''}`}
                  aria-hidden={!videoVisible}
                >
                  <video
                    ref={authorVideoRef}
                    src={videoRequested ? authorVideoUrl : undefined}
                    preload="none"
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    onError={() => setVideoReady(false)}
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <small className="about-terms">{totalTerms} terms</small>
            <div className="about-website">
              <a href="https://essjaykay.dev" target="_blank" rel="noreferrer">
                <img className="about-website-logo" src={essjaykayLogoUrl} alt="EssJayKay.dev" />
              </a>
            </div>
            <small className="about-version">v{APP_VERSION}</small>
          </div>
        </footer>
      </div>
    </article>
  );
};
