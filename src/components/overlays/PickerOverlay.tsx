import React, { useState } from 'react';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';

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
  const strings = getOverlayStrings();
  const [newColName, setNewColName] = useState('');
  const dialogRef = useDialogFocus(isOpen, onClose);

  if (!isOpen) return null;

  const collectionNames = Object.keys(collections);

  const handleCreateAndAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newColName.trim();
    if (trimmed) {
      onAddToCollection(trimmed);
      setNewColName('');
    }
  };

  return (
    <div className="overlay" id="pickerOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
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
            <small>{strings.addThisEntry}</small>
            <h2 id="pickerTitle">{strings.addToCollection}</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={strings.collectionPickerClose}>×</button>
        </div>

        <div className="picker" id="pickerList">
          {collectionNames.map((name) => (
            <button key={name} type="button" onClick={() => onAddToCollection(name)}>
              {name} <small>· {(collections[name] || []).length} {strings.collectionEntries}</small>
            </button>
          ))}
        </div>

        <form onSubmit={handleCreateAndAdd} className="collection-new">
          <input
            id="newCollectionName"
            placeholder={strings.newCollectionName}
            maxLength={36}
            value={newColName}
            onChange={(event) => setNewColName(event.target.value)}
          />
          <button type="submit" className="mini-btn" id="createCollection">{strings.create}</button>
        </form>
      </section>
    </div>
  );
};
