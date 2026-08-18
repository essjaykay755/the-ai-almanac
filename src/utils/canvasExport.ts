import type { Term, ClipStyle } from '../types/almanac';

export function drawClipToCanvas(
  canvas: HTMLCanvasElement,
  term: Term,
  clipStyle: ClipStyle,
  pageNumber: number,
  formattedDate: string
): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  canvas.width = 1200;
  canvas.height = 675;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  if (clipStyle === 'newspaper') {
    ctx.fillStyle = '#eee8db';
  } else if (clipStyle === 'library') {
    ctx.fillStyle = '#efe0c3';
  } else if (clipStyle === 'margin-card') {
    ctx.fillStyle = '#f4ebd8';
  } else {
    ctx.fillStyle = '#f2e7cf';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Margin-card accent left border
  if (clipStyle === 'margin-card') {
    ctx.fillStyle = '#7f2c24';
    ctx.fillRect(0, 0, 16, canvas.height);
  }

  // Header / Masthead
  ctx.fillStyle = '#6b5e4b';
  ctx.font = '700 16px "Avenir Next", "Helvetica Neue", Arial, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('AI ALMANAC · CLIPPED ENTRY', 80, 75);

  // Headword
  ctx.fillStyle = '#282119';
  ctx.font = '500 70px Baskerville, "Iowan Old Style", Georgia, serif';
  ctx.fillText(term.word, 80, 175);

  // Pronunciation & Part of Speech
  ctx.font = 'italic 24px Baskerville, "Iowan Old Style", Georgia, serif';
  ctx.fillStyle = '#6b5e4b';
  const pronText = term.pron ? `${term.pron}  ·  ${term.part}` : term.part;
  ctx.fillText(pronText, 80, 220);

  // Dividing Rule
  ctx.strokeStyle = 'rgba(76, 58, 35, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 252);
  ctx.lineTo(1120, 252);
  ctx.stroke();

  // Definition wrap
  ctx.fillStyle = '#282119';
  ctx.font = '32px/1.45 Baskerville, "Iowan Old Style", Georgia, serif';
  const words = term.definition.split(' ');
  let line = '';
  let y = 320;
  const maxWidth = 1040;

  for (const w of words) {
    const testLine = line + w + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      ctx.fillText(line, 80, y);
      line = w + ' ';
      y += 48;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 80, y);

  // Example (if space permits)
  if (y + 60 < 570 && term.example) {
    ctx.fillStyle = '#655847';
    ctx.font = 'italic 22px Baskerville, "Iowan Old Style", Georgia, serif';
    ctx.fillText(term.example, 80, y + 56);
  }

  // Footer
  ctx.font = '700 15px "Avenir Next", "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = '#7f705a';
  ctx.fillText(`PAGE ${pageNumber}`, 80, 620);

  ctx.textAlign = 'right';
  ctx.fillText(formattedDate, 1120, 620);
  ctx.textAlign = 'left';

  return canvas;
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
