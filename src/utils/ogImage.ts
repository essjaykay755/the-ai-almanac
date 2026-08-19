import type { Term } from '../types/almanac.js';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const DEFAULT_TERM: Pick<Term, 'word' | 'part' | 'pron' | 'definition' | 'category'> = {
  word: 'The AI Almanac',
  part: 'living reference book',
  definition: 'An evolving field guide to artificial intelligence concepts, architectures, and practices.',
  category: 'AI concepts, architectures & practice'
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;'
    };
    return entities[character];
  });
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function wrapText(value: string, maxCharacters: number, maxLines: number): string[] {
  const words = normalizeText(value).split(' ').filter(Boolean);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;

  const visible = lines.slice(0, maxLines);
  const last = visible[maxLines - 1].replace(/[.!,;:?]+$/, '');
  visible[maxLines - 1] = `${last.slice(0, Math.max(1, maxCharacters - 1))}…`;
  return visible;
}

function renderLines(lines: string[], x: number, y: number, lineHeight: number): string {
  return lines
    .map((line, index) => `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
}

export function slugifyTerm(word: string): string {
  const slug = word
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/\+\+/g, ' plus plus ')
    .replace(/#/g, ' sharp ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'entry';
}

export function getTermRoutePath(term: Pick<Term, 'word'>): string {
  return `term/${slugifyTerm(term.word)}/`;
}

export function getTermOgImagePath(term: Pick<Term, 'word'>): string {
  return `og/${slugifyTerm(term.word)}.svg`;
}

export function getPublicPath(baseUrl: string, relativePath: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${relativePath.replace(/^\/+/, '')}`;
}

export function getOgImageSvg(term?: Pick<Term, 'word' | 'part' | 'pron' | 'definition' | 'category'>): string {
  const entry = term || DEFAULT_TERM;
  const wordSize = entry.word.length > 24 ? 50 : entry.word.length > 16 ? 60 : 72;
  const definitionLines = wrapText(entry.definition, 67, 4);
  const pronPart = [entry.pron, entry.part].filter(Boolean).join('  ·  ');
  const category = normalizeText(entry.category || 'AI concepts');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(entry.word)} — The AI Almanac</title>
  <desc id="description">${escapeXml(entry.definition)}</desc>
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f8f1e3" />
      <stop offset="1" stop-color="#e8ddc9" />
    </linearGradient>
    <pattern id="grain" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M0 7h28M0 21h28" stroke="#8f7659" stroke-opacity=".08" />
      <circle cx="6" cy="14" r=".8" fill="#8f7659" fill-opacity=".1" />
      <circle cx="21" cy="4" r=".6" fill="#8f7659" fill-opacity=".08" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#17130f" />
  <circle cx="1080" cy="-30" r="270" fill="#2d6965" fill-opacity=".32" />
  <circle cx="1160" cy="570" r="190" fill="#c59a5b" fill-opacity=".18" />
  <rect x="42" y="38" width="1116" height="554" rx="12" fill="url(#paper)" />
  <rect x="42" y="38" width="1116" height="554" rx="12" fill="url(#grain)" />
  <path d="M42 38h1116v14H42z" fill="#2d6965" />
  <path d="M42 578h1116v14H42z" fill="#b78043" fill-opacity=".9" />
  <text x="92" y="105" fill="#2d6965" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="3">THE AI ALMANAC  /  FIELD NOTE</text>
  <text x="1108" y="105" text-anchor="end" fill="#765f47" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5">ENTRY ${escapeXml(category.toUpperCase())}</text>
  <line x1="92" y1="132" x2="1108" y2="132" stroke="#b78043" stroke-opacity=".6" />
  <text x="92" y="222" fill="#201b16" font-family="Georgia, 'Times New Roman', serif" font-size="${wordSize}" font-weight="700">${escapeXml(entry.word)}</text>
  <text x="94" y="258" fill="#765f47" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" letter-spacing=".6">${escapeXml(pronPart || 'AI reference entry')}</text>
  <text x="94" y="308" fill="#2d6965" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="2">DEFINITION</text>
  <text fill="#2b241d" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="400">${renderLines(definitionLines, 94, 350, 39)}</text>
  <g transform="translate(1010 390)" fill="none" stroke="#2d6965" stroke-width="3" opacity=".78">
    <circle r="46" />
    <path d="M-62 0h124M0-62v124" />
    <circle r="7" fill="#b78043" stroke="none" />
  </g>
  <text x="94" y="548" fill="#765f47" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="2">EXPANDED LIVING DICTIONARY  ·  SHAREABLE FIELD NOTES</text>
  <text x="1108" y="548" text-anchor="end" fill="#2d6965" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">THEAIALMANAC</text>
</svg>`;
}
