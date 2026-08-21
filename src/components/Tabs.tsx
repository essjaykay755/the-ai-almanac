import React from 'react';

interface TabsProps {
  currentLetter: string;
  availableLetters: Set<string>;
  onSelectLetter: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const Tabs: React.FC<TabsProps> = ({
  currentLetter,
  availableLetters,
  onSelectLetter
}) => {
  return (
    <nav className="tabs" id="tabs" aria-label="A to Z index">
      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.has(letter);
        const isActive = letter === currentLetter;
        return (
          <button
            key={letter}
            type="button"
            className={`tab ${!isAvailable ? 'empty' : ''} ${isActive ? 'active' : ''}`}
            data-letter={letter}
            aria-label={`Browse ${letter}`}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={!isAvailable}
            disabled={!isAvailable}
            title={isAvailable ? `Browse ${letter}` : `No entries filed under ${letter}`}
            onClick={() => onSelectLetter(letter)}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
};
