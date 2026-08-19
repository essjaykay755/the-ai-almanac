import React, { useState } from 'react';

interface PickerOverlayProps {
  isOpen: boolean;
  collections: Record<string, string[]>;
  onClose: () => void;
  onAddToCollection: (collectionName: string) => void;
}

export const PickerOverlay: React.FC<PickerOverlayProps> = ({
  isOpen,
  collections,
  onClose,
  onAddToCollection
}) => {
  const [newColName, setNewColName] = useState('');

  if (!isOpen) return null;

  const collectionNames = Object.keys(collections);

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newColName.trim();
    if (trimmed) {
      onAddToCollection(trimmed);
      setNewColName('');
    }
  };

  return (
    <div className="overlay" id="pickerOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="insert" style={{ width: 'min(520px, 100%)' }} role="dialog" aria-modal="true">
        <div className="insert-head">
          <div>
            <small>File this leaf</small>
            <h2>Add to collection</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="picker" id="pickerList">
          {collectionNames.map((name) => (
            <button
              key={name}
              onClick={() => onAddToCollection(name)}
            >
              {name} <small>· {(collections[name] || []).length} leaves</small>
            </button>
          ))}
        </div>

        <form onSubmit={handleCreateAndAdd} className="collection-new">
          <input
            id="newCollectionName"
            placeholder="New collection name"
            maxLength={36}
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
          />
          <button type="submit" className="mini-btn" id="createCollection">
            Create
          </button>
        </form>
      </section>
    </div>
  );
};
