import React from 'react';
import type { TimelineItem, Term } from '../../types/almanac';
import { termsByWord } from '../../data/terms';

interface TimelineOverlayProps {
  isOpen: boolean;
  timeline: TimelineItem[];
  onClose: () => void;
  onSelectTerm: (term: Term) => void;
}

export const TimelineOverlay: React.FC<TimelineOverlayProps> = ({
  isOpen,
  timeline,
  onClose,
  onSelectTerm
}) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" id="timelineOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="insert timeline-insert" role="dialog" aria-modal="true">
        <div className="timeline-head">
          <div>
            <small>AI Almanac · fold-out chronology</small>
            <h2>How the vocabulary accumulated</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="timeline-paper">
          <div className="timeline-line"></div>
          <div className="timeline-items" id="timelineItems">
            {timeline.map((item) => (
              <article key={item.year + item.title} className="time-item">
                <div className="time-year">{item.year}</div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <button
                  onClick={() => {
                    const t = termsByWord[item.term.toLowerCase()];
                    if (t) {
                      onSelectTerm(t);
                      onClose();
                    }
                  }}
                >
                  Open related entry →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
