import React, { useState } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';

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
  const collectionNames = Object.keys(collections);
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionNames[0] || 'Vibe coder essentials'
  );
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCollectionName) return;

    const trimmed = editedCollectionName.trim();
    if (trimmed && onRenameCollection(currentCollectionName, trimmed)) {
      setSelectedCollection(trimmed);
      cancelRename();
    }
  };

  const handleDelete = () => {
    if (!currentCollectionName) return;

    setPendingDeleteCollection(currentCollectionName);
  };

  const cancelDelete = () => {
    setPendingDeleteCollection(null);
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
    <div className="overlay" id="collectionsOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
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
            <small>The AI Almanac · reading lists</small>
            <h2 id="collectionsTitle">Collections</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close collections">
            ×
          </button>
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
            {currentCollectionName ? (
              <div className="collection-detail-head">
                {editingCollection === currentCollectionName ? (
                  <form onSubmit={handleRename} className="collection-rename-form">
                    <input
                      id="editCollectionName"
                      aria-label="Collection name"
                      maxLength={36}
                      value={editedCollectionName}
                      onChange={(e) => setEditedCollectionName(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="mini-btn">
                      Save
                    </button>
                    <button type="button" className="mini-btn" onClick={cancelRename}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <small>Collection · {currentItems.length} entries</small>
                      <h3>{currentCollectionName}</h3>
                    </div>
                    {pendingDeleteCollection === currentCollectionName ? (
                      <div className="collection-delete-confirm" role="alert">
                        <span>Delete this collection?</span>
                        <button type="button" className="mini-btn" onClick={cancelDelete}>
                          Cancel
                        </button>
                        <button type="button" className="mini-btn collection-confirm-delete" onClick={confirmDelete}>
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="collection-actions">
                        <button type="button" className="mini-btn" onClick={beginRename}>
                          Rename
                        </button>
                        <button type="button" className="mini-btn collection-delete" onClick={handleDelete}>
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="empty-state collection-empty-state">
                No collections yet. Create one from the field on the left.
              </div>
            )}

            {currentCollectionName && (
              <div className="list" id="collectionItems">
                {currentItems.length === 0 ? (
                  <div className="empty-state">This collection has no entries yet.</div>
                ) : (
                  currentItems.map((word, index) => {
                    const t = termsByWord[word.toLowerCase()];
                    const displayWord = t?.word || word;
                    return (
                      <div key={`${word}-${index}`} className="list-row collection-list-row">
                        <span className="list-letter">{displayWord[0]?.toUpperCase()}</span>
                        {t ? (
                          <button
                            type="button"
                            className="collection-item-open"
                            onClick={() => {
                              onSelectTerm(t);
                              onClose();
                            }}
                          >
                            <span className="collection-item-copy">
                              <strong>{t.word}</strong>
                              <span>{t.part}</span>
                            </span>
                            <span className="collection-item-open-label">open →</span>
                          </button>
                        ) : (
                          <span className="collection-item-copy collection-item-missing">
                            <strong>{word}</strong>
                            <span>Entry unavailable</span>
                          </span>
                        )}
                        <button
                          type="button"
                          className="collection-remove"
                          aria-label={`Remove ${displayWord} from ${currentCollectionName}`}
                          onClick={() => onRemoveFromCollection(currentCollectionName, word)}
                        >
                          remove
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
