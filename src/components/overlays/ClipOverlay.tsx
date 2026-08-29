import React, { useState, useRef } from 'react';
import type { Term, ClipStyle } from '../../types/almanac';
import { playPaperTearSound } from '../../utils/sound';
import { getPublicPath, getTermRoutePath } from '../../utils/ogImage';
import { useDialogFocus } from '../../hooks/useDialogFocus';

const clipStyleOptions: Array<{
  id: ClipStyle;
  name: string;
  personality: string;
  mark: string;
}> = [
  {
    id: 'clipping',
    name: 'Dictionary sheet',
    personality: 'precise · quiet · archival',
    mark: 'ARCHIVE / A'
  },
  {
    id: 'library',
    name: 'Library card',
    personality: 'ordered · catalogued · useful',
    mark: 'CATALOG / 01'
  },
  {
    id: 'newspaper',
    name: 'News desk',
    personality: 'bold · current · editorial',
    mark: 'EXTRA / FILED'
  },
  {
    id: 'margin-card',
    name: 'Margin note',
    personality: 'warm · curious · personal',
    mark: 'KEEP / CLOSE'
  },
  {
    id: 'terminal',
    name: 'Terminal memo',
    personality: 'technical · direct · builder-minded',
    mark: 'SHELL / 0x01'
  },
  {
    id: 'field-guide',
    name: 'Field guide',
    personality: 'observant · practical · exploratory',
    mark: 'FIELD / OBSERVE'
  }
];

interface ClipOverlayProps {
  isOpen: boolean;
  term: Term;
  pageNumber: number;
  formattedDate: string;
  soundEnabled: boolean;
  onClose: () => void;
  onShowStamp: (text: string) => void;
}

export const ClipOverlay: React.FC<ClipOverlayProps> = ({
  isOpen,
  term,
  pageNumber,
  formattedDate,
  soundEnabled,
  onClose,
  onShowStamp
}) => {
  const [clipStyle, setClipStyle] = useState<ClipStyle>('clipping');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLElement>(null);
  const dialogRef = useDialogFocus(isOpen, onClose);
  const activeStyle = clipStyleOptions.find((style) => style.id === clipStyle) || clipStyleOptions[0];

  if (!isOpen) return null;

  const deepLink = () => {
    const routePath = getPublicPath(import.meta.env.BASE_URL || '/', getTermRoutePath(term));
    return new URL(routePath, window.location.origin).toString();
  };

  const getClipText = () => {
    return `${term.word}${term.pron ? ` ${term.pron}` : ''} · ${term.part}\n\n${term.definition}\n\nThe AI Almanac — ${deepLink()}`;
  };

  const handleDownloadPng = async () => {
    if (!canvasRef.current || !previewRef.current) return;
    if (soundEnabled) {
      playPaperTearSound();
    }
    const filename = `the-ai-almanac-${term.word.toLowerCase().replace(/\s+/g, '-')}.png`;
    try {
      const { downloadCanvasAsPng, renderClipPreviewToCanvas } = await import('../../utils/canvasExport');
      await renderClipPreviewToCanvas(canvasRef.current, previewRef.current);
      downloadCanvasAsPng(canvasRef.current, filename);
      onShowStamp('ENTRY SAVED');
    } catch {
      // Never download a different visual treatment as a silent fallback.
      onShowStamp('ENTRY SAVE FAILED');
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getClipText());
      onShowStamp('TEXT COPIED');
    } catch {
      onShowStamp('COPY UNAVAILABLE');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(deepLink());
      onShowStamp('LINK COPIED');
    } catch {
      onShowStamp('COPY LINK FROM ADDRESS BAR');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${term.word} — The AI Almanac`,
          text: term.definition,
          url: deepLink()
        });
        onShowStamp('SHARED');
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="overlay" id="clipOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert clip-insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="clipTitle"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small>The AI Almanac · save or share</small>
            <h2 id="clipTitle">Save this entry</h2>
            <p className="clip-intro">Choose a visual voice for the entry. The words stay the same; the treatment changes.</p>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close save entry dialog">
            ×
          </button>
        </div>

        <div className="clip-layout">
          <article ref={previewRef} className={`clipping clip-style-${clipStyle}`} id="clippingPreview">
            <span className="clip-texture" aria-hidden="true" />
            <span className="clip-frame" aria-hidden="true" />
            <div className="clip-topline">
              <div className="clip-mast">THE AI ALMANAC · SAVED ENTRY</div>
              <div className="clip-mark" aria-hidden="true">{activeStyle.mark}</div>
            </div>
            <div className="clip-word" id="clipWord">
              {term.word}
            </div>
            <div className="clip-pron" id="clipPron">
              {term.pron ? `${term.pron} · ${term.part}` : term.part}
            </div>
            <div className="clip-category">{term.category}</div>
            <div className="clip-def-label">definition</div>
            <div className="clip-def" id="clipDefinition">
              {term.definition}
            </div>
            {term.example && (
              <div className="clip-example" id="clipExample">
                <span>in use</span>
                {term.example}
              </div>
            )}
            <div className="clip-foot">
              <span id="clipPage">PAGE {pageNumber}</span>
              <span id="clipDate">{formattedDate}</span>
            </div>
          </article>

          <aside className="clip-controls">
            <div className="clip-controls-label">Pick a personality</div>
            {clipStyleOptions.map((style, index) => (
              <button
                key={style.id}
                type="button"
                className={`clip-style clip-style-option-${style.id} ${clipStyle === style.id ? 'active' : ''}`}
                onClick={() => setClipStyle(style.id)}
                aria-pressed={clipStyle === style.id}
              >
                <span className="clip-style-swatch" aria-hidden="true" />
                <span className="clip-style-copy">
                  <span className="clip-style-name">{style.name}</span>
                  <span className="clip-style-personality">{style.personality}</span>
                </span>
                <span className="clip-style-index">{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}

            <hr />

            <button type="button" className="action" onClick={handleDownloadPng} id="downloadClip">
              Download PNG
            </button>
            <button type="button" className="action" onClick={handleCopyText} id="copyClip">
              Copy text
            </button>
            <button type="button" className="action" onClick={handleCopyLink} id="copyLink">
              Copy link
            </button>
            <button type="button" className="action" onClick={handleShare} id="shareClip">
              Share
            </button>
          </aside>
        </div>

        <canvas ref={canvasRef} id="shareCanvas" width="1200" height="675" hidden />
      </section>
    </div>
  );
};
