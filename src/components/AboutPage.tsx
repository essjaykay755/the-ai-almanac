import React from 'react';

interface AboutPageProps {
  totalTerms: number;
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ totalTerms, onBack }) => {
  return (
    <article className="about-page" aria-labelledby="about-page-title">
      <div className="about-page-inner">
        <header className="about-page-header">
          <span className="about-page-kicker">About the almanac</span>
          <div className="about-wordmark" aria-label="AI Almanac">
            <strong>AI</strong>
            <span>Almanac</span>
          </div>
          <div className="about-page-mark" aria-hidden="true">
            <i></i>
            <b></b>
            <i></i>
          </div>
        </header>

        <section className="about-page-content">
          <h1 id="about-page-title">A field guide for the language of AI.</h1>
          <p className="about-page-lede">
            An evolving reference book for AI enthusiasts &amp; vibe coders.
          </p>
          <p>
            AI Almanac gathers the words, patterns, and practical ideas shaping modern AI work—one
            carefully filed page at a time.
          </p>

          <div className="about-page-notes">
            <div>
              <span>Inside</span>
              <strong>Definitions, connections, and context</strong>
            </div>
            <div>
              <span>Use it like</span>
              <strong>A living reference book for curious builders</strong>
            </div>
          </div>
        </section>

        <footer className="about-page-footer">
          <small>Field edition · v0.7 · {totalTerms} terms</small>
          <button type="button" className="about-back" onClick={onBack}>
            Back to the almanac <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </article>
  );
};
