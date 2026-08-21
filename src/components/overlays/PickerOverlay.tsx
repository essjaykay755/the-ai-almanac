import React, { useState } from 'react';
import { useDialogFocus } from '../../hooks/useDialogFocus';

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
  const dialogRef = useDialogFocus(isOpen, onClose);

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
      <section
        ref={dialogRef}
        className="insert"
        style={{ width: 'min(520px, 100%)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pickerTitle"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small>Add this entry</small>
            <h2 id="pickerTitle">Add to collection</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close collection picker">
            ×
          </button>
        </div>

        <div className="picker" id="pickerList">
          {collectionNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onAddToCollection(name)}
            >
              {name} <small>· {(collections[name] || []).length} entries</small>
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
