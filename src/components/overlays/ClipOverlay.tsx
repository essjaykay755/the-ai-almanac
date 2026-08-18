import React, { useState, useRef } from 'react';
import type { Term, ClipStyle } from '../../types/almanac';
import { drawClipToCanvas, downloadCanvasAsPng } from '../../utils/canvasExport';

interface ClipOverlayProps {
  isOpen: boolean;
  term: Term;
  pageNumber: number;
  formattedDate: string;
  onClose: () => void;
  onShowStamp: (text: string) => void;
}

export const ClipOverlay: React.FC<ClipOverlayProps> = ({
  isOpen,
  term,
  pageNumber,
  formattedDate,
  onClose,
  onShowStamp
}) => {
  const [clipStyle, setClipStyle] = useState<ClipStyle>('clipping');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const deepLink = () => {
    return `${window.location.href.split('#')[0]}#term=${encodeURIComponent(term.word)}`;
  };

  const getClipText = () => {
    return `${term.word}${term.pron ? ` ${term.pron}` : ''} · ${term.part}\n\n${term.definition}\n\nAI Almanac — ${deepLink()}`;
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    drawClipToCanvas(canvasRef.current, term, clipStyle, pageNumber, formattedDate);
    const filename = `ai-almanac-${term.word.toLowerCase().replace(/\s+/g, '-')}.png`;
    downloadCanvasAsPng(canvasRef.current, filename);
    onShowStamp('CLIPPING EXPORTED');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getClipText());
      onShowStamp('CLIPPING COPIED');
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
          title: `${term.word} — AI Almanac`,
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
      <section className="insert clip-insert" role="dialog" aria-modal="true">
        <div className="insert-head">
          <div>
            <small>AI Almanac · clipping desk</small>
            <h2>Clip this entry</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="clip-layout">
          <article className={`clipping ${clipStyle !== 'clipping' ? clipStyle : ''}`} id="clippingPreview">
            <div className="clip-mast">AI ALMANAC · CLIPPED ENTRY</div>
            <div className="clip-word" id="clipWord">
              {term.word}
            </div>
            <div className="clip-pron" id="clipPron">
              {term.pron ? `${term.pron} · ${term.part}` : term.part}
            </div>
            <div className="clip-def" id="clipDefinition">
              {term.definition}
            </div>
            <div className="clip-foot">
              <span id="clipPage">PAGE {pageNumber}</span>
              <span id="clipDate">{formattedDate}</span>
            </div>
          </article>

          <aside className="clip-controls">
            <button
              className={`clip-style ${clipStyle === 'clipping' ? 'active' : ''}`}
              onClick={() => setClipStyle('clipping')}
            >
              Dictionary clipping
            </button>
            <button
              className={`clip-style ${clipStyle === 'library' ? 'active' : ''}`}
              onClick={() => setClipStyle('library')}
            >
              Library card
            </button>
            <button
              className={`clip-style ${clipStyle === 'newspaper' ? 'active' : ''}`}
              onClick={() => setClipStyle('newspaper')}
            >
              Newspaper column
            </button>
            <button
              className={`clip-style ${clipStyle === 'margin-card' ? 'active' : ''}`}
              onClick={() => setClipStyle('margin-card')}
            >
              Margin note
            </button>

            <hr />

            <button className="action" onClick={handleDownloadPng} id="downloadClip">
              Download PNG
            </button>
            <button className="action" onClick={handleCopyText} id="copyClip">
              Copy text
            </button>
            <button className="action" onClick={handleCopyLink} id="copyLink">
              Copy link
            </button>
            <button className="action" onClick={handleShare} id="shareClip">
              Share
            </button>
          </aside>
        </div>

        <canvas ref={canvasRef} id="shareCanvas" width="1200" height="675" hidden />
      </section>
    </div>
  );
};
