import React, { useEffect, useRef, useState } from 'react';
import { Ornament } from './Ornament';
import { APP_VERSION } from '../version';
import { getRuntimeLocale, getUiStrings } from '../i18n/reactLocale';
import { authorVideoPosterUrl, precacheAuthorVideo } from '../utils/authorVideo';
import essjaykayLogoUrl from '../assets/essjaykay-logo.svg?url';

interface AboutPageProps {
  totalTerms: number;
  onClose?: () => void;
  // The copy painted on the cover-turn leaf is never hovered, so it skips the video.
  decorative?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ totalTerms, onClose, decorative = false }) => {
  const strings = getUiStrings(getRuntimeLocale());
  const [showVideo, setShowVideo] = useState(false);
  const [touchPreviewOpen, setTouchPreviewOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const authorCreditRef = useRef<HTMLDivElement>(null);
  const authorVideoRef = useRef<HTMLVideoElement>(null);
  const firstTouchTap = useRef(false);
  const wantsVideoPreview = showVideo || touchPreviewOpen;

  // The clip is usually already cached by the app-level idle precache; this
  // attaches the local blob: URL as soon as the About page mounts.
  useEffect(() => {
    if (decorative) return;
    let cancelled = false;
    void precacheAuthorVideo().then((source) => {
      if (!cancelled) setVideoSrc(source);
    });
    return () => {
      cancelled = true;
    };
  }, [decorative]);

  useEffect(() => {
    const video = authorVideoRef.current;
    if (!video || !videoSrc) return;
    if (wantsVideoPreview) void video.play().catch(() => {});
    else {
      video.pause();
      video.currentTime = 0;
    }
  }, [videoSrc, wantsVideoPreview]);

  useEffect(() => {
    if (decorative) return;
    const handleTouchOutside = (event: PointerEvent) => {
      if (
        event.pointerType !== 'touch' ||
        !window.matchMedia('(max-width: 760px)').matches ||
        !authorCreditRef.current ||
        authorCreditRef.current.contains(event.target as Node)
      ) return;
      firstTouchTap.current = false;
      setTouchPreviewOpen(false);
    };
    document.addEventListener('pointerdown', handleTouchOutside);
    return () => document.removeEventListener('pointerdown', handleTouchOutside);
  }, [decorative]);

  const startPreview = () => {
    // Start decoding in the same frame as the hover instead of waiting for the
    // React commit, so motion begins as the popup fades in.
    const video = authorVideoRef.current;
    if (video?.src) void video.play().catch(() => {});
  };

  const handleAuthorMouseEnter = () => {
    if (decorative) return;
    startPreview();
    setShowVideo(true);
  };

  const handleAuthorPointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const isMobileTouch = event.pointerType === 'touch' && window.matchMedia('(max-width: 760px)').matches;
    if (decorative || !isMobileTouch) {
      firstTouchTap.current = false;
      return;
    }
    if (!touchPreviewOpen) {
      firstTouchTap.current = true;
      event.preventDefault();
      startPreview();
      setTouchPreviewOpen(true);
    } else firstTouchTap.current = false;
  };

  const handleAuthorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (firstTouchTap.current) {
      event.preventDefault();
      firstTouchTap.current = false;
      return;
    }
    if (touchPreviewOpen) setTouchPreviewOpen(false);
  };

  const [aboutLineOne, aboutLineTwo] = strings.aboutTitle.split('\n');

  return (
    <article className="about-page" aria-labelledby="about-page-title">
      <div className="about-page-inner redesign-layout">
        {onClose ? (
          <button
            type="button"
            className="about-page-close"
            style={{ border: 0, background: 'transparent' }}
            onClick={onClose}
            aria-label={strings.returnToBook}
            title={strings.returnToBook}
          >×</button>
        ) : (
          <span className="about-page-close" style={{ border: 0, background: 'transparent', pointerEvents: 'none' }} aria-hidden="true">×</span>
        )}
        <header className="about-page-header">
          <div className="about-wordmark" aria-label="The AI Almanac">
            <span className="wordmark-main-lockup"><span className="wordmark-pretitle">The</span><strong className="wordmark-main">AI</strong></span>
            <span className="wordmark-suffix">Almanac</span>
          </div>
          <div className="about-page-mark" aria-hidden="true"><Ornament className="about-page-ornament" /></div>
        </header>

        <section className="about-page-content centered">
          <h1 id="about-page-title">{aboutLineOne}<br />{aboutLineTwo}</h1>
          <p className="about-page-lede">{strings.aboutLede}</p>
        </section>

        <footer className="about-page-footer redesign-footer">
          <div className="about-credits">
            <div className="about-credit-line">
              <span>Made with </span>
              <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor" aria-label="love">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span> by </span>
              <div ref={authorCreditRef} className="author-credit" onMouseEnter={handleAuthorMouseEnter} onMouseLeave={() => setShowVideo(false)}>
                <a href="https://x.com/essjaykay755" target="_blank" rel="noreferrer" aria-expanded={decorative ? undefined : wantsVideoPreview} aria-controls={decorative ? undefined : 'author-video-popup'} onPointerDown={handleAuthorPointerDown} onClick={handleAuthorClick}>Subhojit Karmakar</a>
                {!decorative && (
                  <div id="author-video-popup" className={`author-video-popup${wantsVideoPreview ? ' is-visible' : ''}`} aria-hidden={!wantsVideoPreview}>
                    <video
                      ref={authorVideoRef}
                      src={videoSrc ?? undefined}
                      poster={authorVideoPosterUrl}
                      preload="auto"
                      muted
                      loop
                      playsInline
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <small className="about-terms">{totalTerms} {strings.terms}</small>
            <div className="about-website">
              <a href="https://essjaykay.dev" target="_blank" rel="noreferrer"><img className="about-website-logo" src={essjaykayLogoUrl} alt="EssJayKay.dev" /></a>
            </div>
            <small className="about-version">v{APP_VERSION}</small>
          </div>
        </footer>
      </div>
    </article>
  );
};
