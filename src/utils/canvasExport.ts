import type { Term, ClipStyle } from '../types/almanac';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 675;

function collectDocumentStyles(): string {
  return Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');
      } catch {
        return '';
      }
    })
    .filter(Boolean)
    .join('\n');
}

function copyComputedStyles(source: HTMLElement, target: HTMLElement): void {
  const sourceElements = [source, ...Array.from(source.querySelectorAll<HTMLElement>('*'))];
  const targetElements = [target, ...Array.from(target.querySelectorAll<HTMLElement>('*'))];

  sourceElements.forEach((sourceElement, index) => {
    const targetElement = targetElements[index];
    if (!targetElement) return;

    const computed = window.getComputedStyle(sourceElement);
    for (let propertyIndex = 0; propertyIndex < computed.length; propertyIndex += 1) {
      const property = computed.item(propertyIndex);
      targetElement.style.setProperty(
        property,
        computed.getPropertyValue(property),
        computed.getPropertyPriority(property)
      );
    }
  });
}

function loadSvgImage(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('The saved entry preview could not be rendered.'));
    };
    image.src = url;
  });
}

/**
 * Renders the actual preview element into a PNG canvas. Keeping the DOM and
 * export paths together prevents the saved image from drifting away from the
 * design the user just chose.
 */
export async function renderClipPreviewToCanvas(
  canvas: HTMLCanvasElement,
  preview: HTMLElement
): Promise<HTMLCanvasElement> {
  await document.fonts?.ready;

  const width = Math.max(1, Math.ceil(preview.offsetWidth));
  const height = Math.max(1, Math.ceil(preview.offsetHeight));
  const scale = Math.max(2, Math.min(3, 2400 / width));
  const clone = preview.cloneNode(true) as HTMLElement;

  clone.removeAttribute('id');
  copyComputedStyles(preview, clone);
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.minHeight = `${height}px`;
  // The preview may be slightly rotated for materiality. Export the complete
  // card at its natural dimensions so the transform cannot crop its corners.
  clone.style.transform = 'none';
  clone.style.transformOrigin = 'top left';
  clone.style.margin = '0';

  const styles = collectDocumentStyles();
  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject x="0" y="0" width="${width}" height="${height}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;overflow:hidden;">
      <style>${styles}</style>
      ${serialized}
    </div>
  </foreignObject>
</svg>`;

  const image = await loadSvgImage(svg);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function setFont(
  ctx: CanvasRenderingContext2D,
  weight: string,
  size: number,
  family: string,
  style = 'normal'
): void {
  ctx.font = `${style} ${weight} ${size}px ${family}`;
}

function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  startingSize: number,
  family: string,
  weight: string,
  color: string,
  style = 'normal'
): number {
  let size = startingSize;
  setFont(ctx, weight, size, family, style);
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 1;
    setFont(ctx, weight, size, family, style);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  return size;
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): number {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  const visibleLines = lines.slice(0, maxLines);
  if (lines.length > maxLines && visibleLines.length > 0) {
    let finalLine = `${visibleLines[visibleLines.length - 1]}…`;
    while (ctx.measureText(finalLine).width > maxWidth && finalLine.length > 2) {
      finalLine = `${finalLine.slice(0, -2)}…`;
    }
    visibleLines[visibleLines.length - 1] = finalLine;
  }

  visibleLines.forEach((visibleLine, index) => {
    ctx.fillText(visibleLine, x, y + index * lineHeight);
  });
  return y + visibleLines.length * lineHeight;
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  size = 15,
  family = 'Arial, sans-serif'
): void {
  setFont(ctx, '700', size, family);
  ctx.fillStyle = color;
  ctx.fillText(text.toUpperCase(), x, y);
}

function drawFooter(
  ctx: CanvasRenderingContext2D,
  pageNumber: number,
  formattedDate: string,
  left: number,
  right: number,
  color: string,
  rule: string,
  family = 'Arial, sans-serif'
): void {
  ctx.strokeStyle = rule;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, 590);
  ctx.lineTo(right, 590);
  ctx.stroke();

  setFont(ctx, '700', 15, family);
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.fillText(`PAGE ${pageNumber}`, left, 625);
  ctx.textAlign = 'right';
  ctx.fillText(formattedDate, right, 625);
  ctx.textAlign = 'left';
}

function drawTape(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'rgba(255, 250, 220, 0.72)';
  ctx.fillRect(-65, -16, 130, 32);
  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D, clipStyle: ClipStyle): void {
  if (clipStyle === 'library') {
    ctx.fillStyle = '#dce6dc';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = '#91aa95';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, CANVAS_WIDTH - 52, CANVAS_HEIGHT - 52);
    ctx.strokeStyle = 'rgba(64, 99, 75, 0.4)';
    ctx.beginPath();
    ctx.moveTo(118, 42);
    ctx.lineTo(118, 635);
    ctx.stroke();
    for (let y = 318; y < 545; y += 37) {
      ctx.beginPath();
      ctx.moveTo(152, y);
      ctx.lineTo(1115, y);
      ctx.stroke();
    }
    return;
  }

  if (clipStyle === 'newspaper') {
    ctx.fillStyle = '#eeeae1';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#ad3029';
    ctx.fillRect(0, 0, CANVAS_WIDTH, 13);
    ctx.strokeStyle = 'rgba(32, 33, 31, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, CANVAS_WIDTH - 52, CANVAS_HEIGHT - 52);
    ctx.beginPath();
    ctx.moveTo(870, 145);
    ctx.lineTo(870, 550);
    ctx.stroke();
    return;
  }

  if (clipStyle === 'margin-card') {
    ctx.fillStyle = '#f6e9ad';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(161, 59, 44, 0.34)';
    ctx.fillRect(92, 0, 2, CANVAS_HEIGHT);
    ctx.strokeStyle = 'rgba(111, 98, 48, 0.2)';
    ctx.lineWidth = 1;
    for (let y = 54; y < CANVAS_HEIGHT; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }
    ctx.setLineDash([8, 7]);
    ctx.strokeStyle = 'rgba(161, 59, 44, 0.32)';
    ctx.strokeRect(25, 25, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 50);
    ctx.setLineDash([]);
    drawTape(ctx, 153, 32, -0.08);
    drawTape(ctx, 1045, 31, 0.08);
    return;
  }

  if (clipStyle === 'terminal') {
    ctx.fillStyle = '#18241e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    roundedRect(ctx, 12, 12, CANVAS_WIDTH - 24, CANVAS_HEIGHT - 24, 8);
    ctx.strokeStyle = '#58765d';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#223328';
    roundedRect(ctx, 13, 13, CANVAS_WIDTH - 26, 46, 7);
    ctx.fill();
    ctx.fillStyle = '#d07a68';
    ctx.beginPath();
    ctx.arc(34, 36, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c8a366';
    ctx.beginPath();
    ctx.arc(55, 36, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8bb58d';
    ctx.beginPath();
    ctx.arc(76, 36, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(175, 208, 140, 0.2)';
    for (let y = 82; y < 590; y += 7) {
      ctx.beginPath();
      ctx.moveTo(13, y);
      ctx.lineTo(CANVAS_WIDTH - 13, y);
      ctx.stroke();
    }
    return;
  }

  if (clipStyle === 'field-guide') {
    ctx.fillStyle = '#dce9e6';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'rgba(45, 105, 101, 0.22)';
    for (let x = 20; x < CANVAS_WIDTH; x += 20) {
      for (let y = 20; y < CANVAS_HEIGHT; y += 20) {
        ctx.beginPath();
        ctx.arc(x, y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.strokeStyle = '#2d6965';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, CANVAS_WIDTH - 40, CANVAS_HEIGHT - 40);
    ctx.setLineDash([8, 7]);
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80);
    ctx.setLineDash([]);
    return;
  }

  ctx.fillStyle = '#f4e8cf';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = 'rgba(76, 58, 35, 0.14)';
  ctx.lineWidth = 1;
  ctx.strokeRect(22, 18, CANVAS_WIDTH - 44, CANVAS_HEIGHT - 36);
  ctx.strokeStyle = '#9a382c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(1050, 92, 36, 0, Math.PI * 2);
  ctx.stroke();
  drawLabel(ctx, 'ARCHIVE', 1013, 97, '#9a382c', 11, 'Arial, sans-serif');
}

function drawClippingEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#2c2319';
  const muted = '#76634d';
  const accent = '#9a382c';
  const family = 'Georgia, serif';

  drawLabel(ctx, 'THE AI ALMANAC · SAVED ENTRY', 80, 78, muted, 16, 'Arial, sans-serif');
  drawFittedText(ctx, term.word, 80, 182, 1000, 72, family, '500', ink);
  setFont(ctx, '400', 24, family, 'italic');
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  ·  ${term.part}` : term.part, 80, 224);
  drawLabel(ctx, term.category, 80, 267, muted, 12, 'Arial, sans-serif');
  drawLabel(ctx, 'Definition', 80, 314, accent, 14, 'Arial, sans-serif');
  setFont(ctx, '400', 31, family);
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 80, 356, 1020, 44, 4);

  if (term.example && definitionEnd < 530) {
    setFont(ctx, '400', 20, family, 'italic');
    ctx.fillStyle = muted;
    drawWrappedText(ctx, term.example, 80, definitionEnd + 24, 990, 27, 2);
  }

  drawFooter(ctx, pageNumber, formattedDate, 80, 1120, '#8b7359', 'rgba(76, 58, 35, 0.3)');
}

function drawLibraryEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#26352b';
  const muted = '#5d7565';
  const accent = '#40634b';
  const family = 'Arial, sans-serif';

  drawLabel(ctx, 'THE AI ALMANAC · CATALOG CARD', 153, 80, muted, 16, family);
  drawLabel(ctx, `CARD NO. ${String(pageNumber).padStart(3, '0')}`, 972, 80, accent, 13, family);
  drawFittedText(ctx, term.word.toUpperCase(), 153, 176, 930, 62, family, '700', ink);
  setFont(ctx, '700', 16, family);
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  /  ${term.part}` : term.part.toUpperCase(), 153, 214);
  drawLabel(ctx, term.category, 153, 258, muted, 12, family);
  drawLabel(ctx, 'Definition', 153, 304, accent, 13, family);
  setFont(ctx, '400', 27, 'Georgia, serif');
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 153, 345, 900, 40, 4);

  if (term.example && definitionEnd < 528) {
    setFont(ctx, '400', 18, 'Georgia, serif', 'italic');
    ctx.fillStyle = muted;
    drawWrappedText(ctx, term.example, 153, definitionEnd + 22, 900, 25, 2);
  }

  drawFooter(ctx, pageNumber, formattedDate, 153, 1115, muted, 'rgba(64, 99, 75, 0.34)', family);
}

function drawNewspaperEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#20211f';
  const muted = '#696961';
  const accent = '#ad3029';
  const family = 'Arial, sans-serif';

  drawLabel(ctx, 'THE AI ALMANAC / EXTRA', 70, 78, ink, 17, family);
  drawLabel(ctx, 'FILED TODAY', 1000, 78, accent, 13, family);
  drawFittedText(ctx, term.word.toUpperCase(), 70, 180, 760, 70, family, '800', ink);
  setFont(ctx, '700', 13, family);
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  ·  ${term.part}` : term.part, 70, 218);
  drawLabel(ctx, term.category, 70, 262, muted, 12, family);
  drawLabel(ctx, 'The short read', 70, 310, accent, 14, family);
  setFont(ctx, '400', 29, 'Georgia, serif');
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 70, 352, 730, 40, 5);

  if (term.example && definitionEnd < 528) {
    setFont(ctx, '400', 18, 'Georgia, serif', 'italic');
    ctx.fillStyle = muted;
    drawWrappedText(ctx, term.example, 70, definitionEnd + 21, 725, 25, 2);
  }

  drawLabel(ctx, 'News desk', 910, 180, accent, 12, family);
  setFont(ctx, '700', 19, family);
  ctx.fillStyle = ink;
  drawWrappedText(ctx, term.category, 910, 218, 190, 27, 4);
  drawLabel(ctx, 'Page', 910, 360, accent, 12, family);
  setFont(ctx, '800', 44, family);
  ctx.fillStyle = ink;
  ctx.fillText(String(pageNumber).padStart(2, '0'), 910, 410);

  drawFooter(ctx, pageNumber, formattedDate, 70, 1120, muted, 'rgba(32, 33, 31, 0.34)', family);
}

function drawMarginCardEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#44391d';
  const muted = '#776433';
  const accent = '#a13b2c';
  const family = 'Segoe Print, Bradley Hand, Comic Sans MS, cursive';

  drawLabel(ctx, 'THE AI ALMANAC · a note to keep', 150, 80, muted, 15, 'Georgia, serif');
  drawLabel(ctx, 'KEEP / CLOSE', 986, 80, accent, 12, family);
  drawFittedText(ctx, term.word, 150, 178, 900, 65, family, '500', ink, 'italic');
  setFont(ctx, '400', 21, family, 'italic');
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  ·  ${term.part}` : term.part, 150, 218);
  drawLabel(ctx, term.category, 150, 263, muted, 11, family);
  drawLabel(ctx, 'Why it matters', 150, 310, accent, 13, family);
  setFont(ctx, '400', 28, family);
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 150, 351, 895, 42, 4);

  if (term.example && definitionEnd < 530) {
    setFont(ctx, '400', 18, family, 'italic');
    ctx.fillStyle = muted;
    drawWrappedText(ctx, term.example, 150, definitionEnd + 22, 870, 25, 2);
  }

  drawFooter(ctx, pageNumber, formattedDate, 150, 1115, muted, 'rgba(161, 59, 44, 0.3)', family);
}

function drawTerminalEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#dce9d8';
  const muted = '#91b094';
  const accent = '#afd08c';
  const family = 'Courier New, monospace';

  drawLabel(ctx, 'ALMANAC SHELL  //  SAVED ENTRY', 92, 43, muted, 15, family);
  setFont(ctx, '400', 18, family);
  ctx.fillStyle = accent;
  ctx.fillText(`> lookup --term "${term.word}"`, 78, 112);
  drawFittedText(ctx, term.word, 78, 187, 1030, 52, family, '700', ink);
  setFont(ctx, '400', 18, family);
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  //  ${term.part}` : `// ${term.part}`, 78, 226);
  drawLabel(ctx, term.category, 78, 267, muted, 12, family);
  drawLabel(ctx, 'definition', 78, 313, accent, 13, family);
  setFont(ctx, '400', 22, family);
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 78, 351, 1032, 34, 5);

  if (term.example && definitionEnd < 530) {
    setFont(ctx, '400', 15, family);
    ctx.fillStyle = muted;
    drawWrappedText(ctx, `// ${term.example}`, 78, definitionEnd + 20, 990, 22, 2);
  }

  drawFooter(ctx, pageNumber, formattedDate, 78, 1120, muted, 'rgba(175, 208, 140, 0.34)', family);
}

function drawFieldGuideEntry(
  ctx: CanvasRenderingContext2D,
  term: Term,
  pageNumber: number,
  formattedDate: string
): void {
  const ink = '#254b49';
  const muted = '#4c7270';
  const accent = '#2d6965';
  const family = 'Arial, sans-serif';

  drawLabel(ctx, 'THE AI ALMANAC · FIELD GUIDE', 76, 80, muted, 16, family);
  drawLabel(ctx, 'FIELD / OBSERVE', 975, 80, accent, 12, family);
  drawFittedText(ctx, term.word, 76, 181, 980, 70, family, '800', ink);
  setFont(ctx, '700', 15, family);
  ctx.fillStyle = muted;
  ctx.fillText(term.pron ? `${term.pron}  ·  ${term.part}` : term.part, 76, 220);
  drawLabel(ctx, term.category, 76, 263, muted, 12, family);
  drawLabel(ctx, 'Field note', 76, 311, accent, 13, family);
  setFont(ctx, '400', 29, 'Georgia, serif');
  ctx.fillStyle = ink;
  const definitionEnd = drawWrappedText(ctx, term.definition, 76, 353, 950, 41, 4);

  if (term.example && definitionEnd < 530) {
    setFont(ctx, '400', 18, 'Georgia, serif', 'italic');
    ctx.fillStyle = muted;
    drawWrappedText(ctx, term.example, 76, definitionEnd + 21, 920, 25, 2);
  }

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(1065, 172, 36, 0, Math.PI * 2);
  ctx.moveTo(1065, 124);
  ctx.lineTo(1065, 220);
  ctx.moveTo(1017, 172);
  ctx.lineTo(1113, 172);
  ctx.stroke();

  drawFooter(ctx, pageNumber, formattedDate, 76, 1120, muted, 'rgba(45, 105, 101, 0.38)', family);
}

export function drawClipToCanvas(
  canvas: HTMLCanvasElement,
  term: Term,
  clipStyle: ClipStyle,
  pageNumber: number,
  formattedDate: string
): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.textAlign = 'left';
  ctx.setLineDash([]);

  drawBackground(ctx, clipStyle);

  if (clipStyle === 'library') {
    drawLibraryEntry(ctx, term, pageNumber, formattedDate);
  } else if (clipStyle === 'newspaper') {
    drawNewspaperEntry(ctx, term, pageNumber, formattedDate);
  } else if (clipStyle === 'margin-card') {
    drawMarginCardEntry(ctx, term, pageNumber, formattedDate);
  } else if (clipStyle === 'terminal') {
    drawTerminalEntry(ctx, term, pageNumber, formattedDate);
  } else if (clipStyle === 'field-guide') {
    drawFieldGuideEntry(ctx, term, pageNumber, formattedDate);
  } else {
    drawClippingEntry(ctx, term, pageNumber, formattedDate);
  }

  return canvas;
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
