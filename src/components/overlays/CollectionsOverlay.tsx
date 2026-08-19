import React, { useState } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';

interface CollectionsOverlayProps {
  isOpen: boolean;
  collections: Record<string, string[]>;
  termsByWord: Record<string, Term>;
  onClose: () => void;
  onSelectTerm: (term: TermSelectionTarget) => void;
  onCreateCollection: (name: string) => void;
  onDeleteCollection?: (name: string) => void;
}

export const CollectionsOverlay: React.FC<CollectionsOverlayProps> = ({
  isOpen,
  collections,
  termsByWord,
  onClose,
  onSelectTerm,
  onCreateCollection
}) => {
  const collectionNames = Object.keys(collections);
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionNames[0] || 'Vibe coder essentials'
  );
  const [newCollectionName, setNewCollectionName] = useState('');

  if (!isOpen) return null;

  const currentCollectionName = collections[selectedCollection]
    ? selectedCollection
    : collectionNames[0] || '';
  const currentItems = collections[currentCollectionName] || [];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCollectionName.trim();
    if (trimmed && !collections[trimmed]) {
      onCreateCollection(trimmed);
      setSelectedCollection(trimmed);
      setNewCollectionName('');
    }
  };

  return (
    <div className="overlay" id="collectionsOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="insert" role="dialog" aria-modal="true">
        <div className="insert-head">
          <div>
            <small>The AI Almanac · reading lists</small>
            <h2>Collections</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="collections-layout">
          <aside className="collection-tabs" id="collectionTabs">
            {collectionNames.map((name) => (
              <button
                key={name}
                className={`collection-tab ${name === currentCollectionName ? 'active' : ''}`}
                onClick={() => setSelectedCollection(name)}
              >
                {name} <small>({(collections[name] || []).length})</small>
              </button>
            ))}

            <form onSubmit={handleCreate} className="collection-new">
              <input
                id="inlineCollectionName"
                placeholder="New collection"
                maxLength={36}
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button type="submit" className="mini-btn" id="inlineCreateCollection">
                +
              </button>
            </form>
          </aside>

          <section>
            <div className="list" id="collectionItems">
              {currentItems.length === 0 ? (
                <div className="empty-state">This collection has no leaves yet.</div>
              ) : (
                currentItems.map((word) => {
                  const t = termsByWord[word.toLowerCase()];
                  if (!t) return null;
                  return (
                    <button
                      key={t.word}
                      className="list-row"
                      onClick={() => {
                        onSelectTerm(t);
                        onClose();
                      }}
                    >
                      <span className="list-letter">{t.word[0].toUpperCase()}</span>
                      <span>
                        <strong>{t.word}</strong>
                        <span>{t.part}</span>
                      </span>
                      <span>open →</span>
                    </button>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
