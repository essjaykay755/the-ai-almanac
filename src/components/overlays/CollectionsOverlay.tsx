import React, { useState } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';

interface CollectionsOverlayProps {
  isOpen: boolean;
  collections: Record<string, string[]>;
  termsByWord: Record<string, Term>;
  onClose: () => void;
  onSelectTerm: (term: TermSelectionTarget) => void;
  onCreateCollection: (name: string) => boolean;
  onRenameCollection: (currentName: string, nextName: string) => boolean;
  onDeleteCollection: (name: string) => void;
  onRemoveFromCollection: (collectionName: string, word: string) => void;
}

export const CollectionsOverlay: React.FC<CollectionsOverlayProps> = ({
  isOpen,
  collections,
  termsByWord,
  onClose,
  onSelectTerm,
  onCreateCollection,
  onRenameCollection,
  onDeleteCollection,
  onRemoveFromCollection
}) => {
  const strings = getOverlayStrings();
  const collectionNames = Object.keys(collections);
  const [selectedCollection, setSelectedCollection] = useState<string>(collectionNames[0] || 'Vibe coder essentials');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [editingCollection, setEditingCollection] = useState<string | null>(null);
  const [editedCollectionName, setEditedCollectionName] = useState('');
  const [pendingDeleteCollection, setPendingDeleteCollection] = useState<string | null>(null);
  const dialogRef = useDialogFocus(isOpen, onClose);

  if (!isOpen) return null;

  const currentCollectionName = Object.prototype.hasOwnProperty.call(collections, selectedCollection)
    ? selectedCollection
    : collectionNames[0] || '';
  const currentItems = collections[currentCollectionName] || [];

  const handleSelectCollection = (name: string) => {
    setSelectedCollection(name);
    setEditingCollection(null);
    setPendingDeleteCollection(null);
  };

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newCollectionName.trim();
    if (trimmed && onCreateCollection(trimmed)) {
      setSelectedCollection(trimmed);
      setNewCollectionName('');
      setPendingDeleteCollection(null);
    }
  };

  const beginRename = () => {
    if (!currentCollectionName) return;
    setEditingCollection(currentCollectionName);
    setEditedCollectionName(currentCollectionName);
    setPendingDeleteCollection(null);
  };

  const cancelRename = () => {
    setEditingCollection(null);
    setEditedCollectionName('');
  };

  const handleRename = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentCollectionName) return;
    const trimmed = editedCollectionName.trim();
    if (trimmed && onRenameCollection(currentCollectionName, trimmed)) {
      setSelectedCollection(trimmed);
      cancelRename();
    }
  };

  const confirmDelete = () => {
    if (!pendingDeleteCollection) return;
    const nextCollection = collectionNames.find((name) => name !== pendingDeleteCollection) || '';
    onDeleteCollection(pendingDeleteCollection);
    setSelectedCollection(nextCollection);
    setPendingDeleteCollection(null);
    cancelRename();
  };

  return (
    <div className="overlay" id="collectionsOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collectionsTitle"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small>The AI Almanac · {strings.readingLists}</small>
            <h2 id="collectionsTitle">{strings.collections}</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={`${strings.close} ${strings.collections}`}>×</button>
        </div>

        <div className="collections-layout">
          <aside className="collection-tabs" id="collectionTabs">
            {collectionNames.map((name) => (
              <button
                key={name}
                type="button"
                className={`collection-tab ${name === currentCollectionName ? 'active' : ''}`}
                aria-pressed={name === currentCollectionName}
                onClick={() => handleSelectCollection(name)}
              >
                {name} <small>({(collections[name] || []).length})</small>
              </button>
            ))}

            <form onSubmit={handleCreate} className="collection-new">
              <input
                id="inlineCollectionName"
                placeholder={strings.newCollection}
                maxLength={36}
                value={newCollectionName}
                onChange={(event) => setNewCollectionName(event.target.value)}
              />
              <button type="submit" className="mini-btn" id="inlineCreateCollection">+</button>
            </form>
          </aside>

          <section>
            {currentCollectionName ? (
              <div className="collection-detail-head">
                {editingCollection === currentCollectionName ? (
                  <form onSubmit={handleRename} className="collection-rename-form">
                    <input
                      id="editCollectionName"
                      aria-label={strings.collectionName}
                      maxLength={36}
                      value={editedCollectionName}
                      onChange={(event) => setEditedCollectionName(event.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="mini-btn">{strings.save}</button>
                    <button type="button" className="mini-btn" onClick={cancelRename}>{strings.cancel}</button>
                  </form>
                ) : (
                  <>
                    <div>
                      <small>{strings.collection} · {currentItems.length} {strings.collectionEntries}</small>
                      <h3>{currentCollectionName}</h3>
                    </div>
                    {pendingDeleteCollection === currentCollectionName ? (
                      <div className="collection-delete-confirm" role="alert">
                        <span>{strings.deleteCollectionQuestion}</span>
                        <button type="button" className="mini-btn" onClick={() => setPendingDeleteCollection(null)}>{strings.cancel}</button>
                        <button type="button" className="mini-btn collection-confirm-delete" onClick={confirmDelete}>{strings.delete}</button>
                      </div>
                    ) : (
                      <div className="collection-actions">
                        <button type="button" className="mini-btn" onClick={beginRename}>{strings.rename}</button>
                        <button type="button" className="mini-btn collection-delete" onClick={() => setPendingDeleteCollection(currentCollectionName)}>{strings.delete}</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="empty-state collection-empty-state">{strings.noCollections}</div>
            )}

            {currentCollectionName && (
              <div className="list" id="collectionItems">
                {currentItems.length === 0 ? (
                  <div className="empty-state">{strings.emptyCollection}</div>
                ) : (
                  currentItems.map((word, index) => {
                    const term = termsByWord[word.toLowerCase()];
                    const displayWord = term?.word || word;
                    return (
                      <div key={`${word}-${index}`} className="list-row collection-list-row">
                        <span className="list-letter">{displayWord[0]?.toUpperCase()}</span>
                        {term ? (
                          <button
                            type="button"
                            className="collection-item-open"
                            onClick={() => {
                              onSelectTerm(term);
                              onClose();
                            }}
                          >
                            <span className="collection-item-copy"><strong>{term.word}</strong><span>{term.part}</span></span>
                            <span className="collection-item-open-label">{strings.open} →</span>
                          </button>
                        ) : (
                          <span className="collection-item-copy collection-item-missing"><strong>{word}</strong><span>{strings.entryUnavailable}</span></span>
                        )}
                        <button
                          type="button"
                          className="collection-remove"
                          aria-label={`${strings.remove} ${displayWord} · ${currentCollectionName}`}
                          onClick={() => onRemoveFromCollection(currentCollectionName, word)}
                        >
                          {strings.remove}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};
