import React from 'react';
import type { Term } from '../types/almanac';

interface EdgeMarkersProps {
  bookmarks: string[];
  termsByWord: Record<string, Term>;
  sortedTerms: readonly Term[];
}

export const EdgeMarkers: React.FC<EdgeMarkersProps> = ({ bookmarks, termsByWord, sortedTerms }) => {
  return (
    <div className="markers" id="markers">
      {bookmarks.slice(0, 12).map((word, i) => {
        const term = termsByWord[word.toLowerCase()];
        const idx = term ? sortedTerms.findIndex((t) => t.word === term.word) : i;
        const left = 6 + (idx / Math.max(1, sortedTerms.length - 1)) * 87;
        const rot = ((i % 5) - 2) * 0.35;
        return (
          <span
            key={word}
            className="marker"
            style={
              {
                left: `${left}%`,
                '--rot': `${rot}deg`
              } as React.CSSProperties
            }
            title={word}
          />
        );
      })}
    </div>
  );
};
