import React, { useRef, useState } from 'react';
import type { Term, ClipStyle } from '../../types/almanac';
import { playPaperTearSound } from '../../utils/sound';
import { getPublicPath, getTermRoutePath } from '../../utils/ogImage';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';
import { getLocalizedTermPresentation, getRuntimeLocale } from '../../i18n/reactLocale';

const clipStyleOptions: Array<{
  id: ClipStyle;
  name: string;
  personality: string;
  mark: string;
}> = [
  { id: 'clipping', name: 'Dictionary sheet', personality: 'precise · quiet · archival', mark: 'ARCHIVE / A' },
  { id: 'library', name: 'Library card', personality: 'ordered · catalogued · useful', mark: 'CATALOG / 01' },
  { id: 'newspaper', name: 'News desk', personality: 'bold · current · editorial', mark: 'EXTRA / FILED' },
  { id: 'margin-card', name: 'Margin note', personality: 'warm · curious · personal', mark: 'KEEP / CLOSE' },
  { id: 'terminal', name: 'Terminal memo', personality: 'technical · direct · builder-minded', mark: 'SHELL / 0x01' },
  { id: 'field-guide', name: 'Field guide', personality: 'observant · practical · exploratory', mark: 'FIELD / OBSERVE' }
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
  const strings = getOverlayStrings();
  const locale = getRuntimeLocale();
  const presentation = getLocalizedTermPresentation(term, 'dictionary', {}, locale);
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
    return `${presentation.word}${term.pron ? ` ${term.pron}` : ''} · ${presentation.part}\n\n${presentation.definition}\n\nThe AI Almanac - ${deepLink()}`;
  };

  const handleDownloadPng = async () => {
    if (!canvasRef.current || !previewRef.current) return;
    if (soundEnabled) playPaperTearSound();
    const filename = `the-ai-almanac-${term.word.toLowerCase().replace(/\s+/g, '-')}.png`;
    try {
      const { downloadCanvasAsPng, renderClipPreviewToCanvas } = await import('../../utils/canvasExport');
      await renderClipPreviewToCanvas(canvasRef.current, previewRef.current);
      downloadCanvasAsPng(canvasRef.current, filename);
      onShowStamp('ENTRY SAVED');
    } catch {
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
          title: `${presentation.word} - The AI Almanac`,
          text: presentation.definition,
          url: deepLink()
        });
        onShowStamp('SHARED');
      } catch {}
    } else {
      await handleCopyLink();
    }
  };

  return (
    <div className="overlay" id="clipOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
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
            <small>The AI Almanac · {strings.saveOrShare}</small>
            <h2 id="clipTitle">{strings.saveThisEntry}</h2>
            <p className="clip-intro">{strings.saveIntro}</p>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={`${strings.close} ${strings.saveThisEntry}`}>×</button>
        </div>

        <div className="clip-layout">
          <article ref={previewRef} className={`clipping clip-style-${clipStyle}`} id="clippingPreview">
            <span className="clip-texture" aria-hidden="true" />
            <span className="clip-frame" aria-hidden="true" />
            <div className="clip-topline">
              <div className="clip-mast">THE AI ALMANAC · {strings.savedEntry}</div>
              <div className="clip-mark" aria-hidden="true">{activeStyle.mark}</div>
            </div>
            <div className="clip-word" id="clipWord">{presentation.word}</div>
            <div className="clip-pron" id="clipPron">{term.pron ? `${term.pron} · ${presentation.part}` : presentation.part}</div>
            <div className="clip-category">{presentation.category}</div>
            <div className="clip-def-label">{strings.definitionLower}</div>
            <div className="clip-def" id="clipDefinition">{presentation.definition}</div>
            {presentation.example && (
              <div className="clip-example" id="clipExample">
                <span>{strings.inUse}</span>
                {presentation.example}
              </div>
            )}
            <div className="clip-foot">
              <span id="clipPage">{pageNumber}</span>
              <span id="clipDate">{formattedDate}</span>
            </div>
          </article>

          <aside className="clip-controls">
            <div className="clip-controls-label">{strings.pickPersonality}</div>
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

            <button type="button" className="action" onClick={handleDownloadPng} id="downloadClip">{strings.downloadPng}</button>
            <button type="button" className="action" onClick={handleCopyText} id="copyClip">{strings.copyText}</button>
            <button type="button" className="action" onClick={handleCopyLink} id="copyLink">{strings.copyLink}</button>
            <button type="button" className="action" onClick={handleShare} id="shareClip">{strings.share}</button>
          </aside>
        </div>

        <canvas ref={canvasRef} id="shareCanvas" width="1200" height="675" hidden />
      </section>
    </div>
  );
};
