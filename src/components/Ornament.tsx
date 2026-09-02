import React from 'react';
import ornamentUrl from '../assets/1542594957.svg?url';

interface OrnamentProps {
  className?: string;
}

type OrnamentStyle = React.CSSProperties & {
  '--ornament-image': string;
};

export const Ornament: React.FC<OrnamentProps> = ({ className }) => (
  <span
    className={`svg-ornament${className ? ` ${className}` : ''}`}
    style={{ '--ornament-image': `url("${ornamentUrl}")` } as OrnamentStyle}
    aria-hidden="true"
  />
);
