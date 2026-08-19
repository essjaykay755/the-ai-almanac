import React, { useState } from 'react';
import { Ornament } from './Ornament';
import { APP_VERSION } from '../version';
import essjaykayLogoUrl from '../assets/essjaykay-logo.svg';

interface AboutPageProps {
  totalTerms: number;
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ totalTerms, onBack }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <article className="about-page" aria-labelledby="about-page-title">
      <div className="about-page-inner redesign-layout">
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
                className="author-credit"
                onMouseEnter={() => setShowVideo(true)}
                onMouseLeave={() => setShowVideo(false)}
              >
                <a href="https://x.com/essjaykay755" target="_blank" rel="noreferrer">
                  Subhojit Karmakar
                </a>
                {showVideo && (
                  <div className="author-video-popup">
                    <video 
                      src="/author-video.mp4" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="about-website">
              <a href="https://essjaykay.dev" target="_blank" rel="noreferrer">
                <img className="about-website-logo" src={essjaykayLogoUrl} alt="EssJayKay.dev" />
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <small>v{APP_VERSION} · {totalTerms} terms</small>
            <button type="button" className="about-back" onClick={onBack}>
              Back to the almanac <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};
