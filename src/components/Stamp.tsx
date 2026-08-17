import React from 'react';

interface StampProps {
  text: string | null;
  visible: boolean;
}

export const Stamp: React.FC<StampProps> = ({ text, visible }) => {
  if (!text) return null;
  return (
    <div className={`stamp ${visible ? 'show' : ''}`} id="stamp">
      {text}
    </div>
  );
};
