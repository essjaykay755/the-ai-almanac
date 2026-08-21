import type { Term } from '../types/almanac.ts';
import { APP_VERSION } from '../version.ts';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export type OgImageTerm = Pick<
  Term,
  'word' | 'part' | 'pron' | 'definition' | 'example' | 'origin' | 'note' | 'related' | 'category'
>;

export type OgImageOptions = {
  pageNumber?: number;
  totalTerms?: number;
  editionVersion?: string;
};

const DEFAULT_TOTAL_TERMS = 791;

const DEFAULT_TERM: OgImageTerm = {
  word: 'The AI Almanac',
  part: 'living reference book',
  definition: 'An evolving field guide to artificial intelligence concepts, architectures, and practices.',
  example: '',
  origin: 'A living reference for the language of AI.',
  note: 'Browse the index, follow related terms, and keep the useful ones close.',
  related: ['artificial intelligence', 'vibe coding'],
  category: 'AI concepts & practice'
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
  visible[maxLines - 1] = `${last.slice(0, Math.max(1, maxCharacters - 1)).trimEnd()}…`;
  return visible;
}

function renderLines(lines: string[], x: number, y: number, lineHeight: number): string {
  return lines
    .map((line, index) => `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
}

function fitFontSize(text: string, startingSize: number, minimumSize: number, maxWidth: number): number {
  let size = startingSize;
  while (text.length * size * 0.54 > maxWidth && size > minimumSize) {
    size -= 1;
  }
  return size;
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

export function getOgImageSvg(term?: OgImageTerm, options: OgImageOptions = {}): string {
  const entry = term || DEFAULT_TERM;
  const totalTerms = options.totalTerms || DEFAULT_TOTAL_TERMS;
  const pageNumber = options.pageNumber || 1;
  const editionVersion = options.editionVersion || APP_VERSION;
  const wordSize = fitFontSize(entry.word, 46, 29, 520);
  const definitionLines = wrapText(entry.definition, 44, 3);
  const exampleLines = wrapText(entry.example, 52, 2);
  const originLines = wrapText(entry.origin || 'A standard term in modern AI practice.', 24, 3);
  const practiceLines = wrapText(entry.note || 'Keep the useful distinction close at hand.', 24, 3);
  const categoryLines = wrapText(entry.category || 'AI concepts', 24, 3);
  const relatedLines = entry.related
    .slice(0, 2)
    .flatMap((related) => wrapText(related, 22, 2))
    .slice(0, 4);
  const pronPart = [entry.pron, entry.part].filter(Boolean).join('  ·  ');
  const lowerGridTop = Math.min(
    456,
    273 + Math.max(0, definitionLines.length - 1) * 31 + (exampleLines.length > 0 ? 82 : 56)
  );
  const exampleMarkup = exampleLines.length > 0
    ? `<text x="351" y="${lowerGridTop - 40}" fill="#5c4e3c" font-family="Georgia, 'Times New Roman', serif" font-size="15" font-style="italic">${renderLines(exampleLines, 351, lowerGridTop - 40, 21)}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(entry.word)} — The AI Almanac</title>
  <desc id="description">${escapeXml(entry.definition)}</desc>
  <defs>
    <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#38261b" />
      <stop offset="1" stop-color="#2d1f16" />
    </linearGradient>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f2e8d4" />
      <stop offset="1" stop-color="#eadcc1" />
    </linearGradient>
    <filter id="deskNoise" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <filter id="paperNoise" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".67" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <pattern id="paperRules" width="80" height="15" patternUnits="userSpaceOnUse">
      <path d="M0 14.5H80" stroke="#796746" stroke-opacity=".075" />
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#desk)" />
  <rect width="1200" height="630" fill="#2b1d14" filter="url(#deskNoise)" opacity=".055" />
  <rect x="29" y="25" width="1142" height="582" rx="15" fill="#150f0b" opacity=".42" />

  <!-- A quiet cover rail keeps the real book proportions without adding illustration. -->
  <rect x="36" y="25" width="248" height="582" rx="14" fill="#1a1410" />
  <rect x="36" y="25" width="248" height="582" rx="14" fill="#20160f" filter="url(#deskNoise)" opacity=".07" />
  <rect x="52" y="41" width="216" height="550" rx="6" fill="none" stroke="#c5a263" stroke-opacity=".17" />
  <path d="M279 25h8v582h-8z" fill="#0e0b08" opacity=".66" />
  <text x="160" y="126" text-anchor="middle" fill="#8f7650" font-family="Cinzel, Georgia, serif" font-size="9" letter-spacing="3.1">THE</text>
  <text x="160" y="177" text-anchor="middle" fill="#ead4a7" font-family="Cinzel, Georgia, serif" font-size="48" font-weight="600" letter-spacing="3">AI</text>
  <text x="160" y="204" text-anchor="middle" fill="#c5a263" font-family="Cinzel, Georgia, serif" font-size="16" letter-spacing="4.2">ALMANAC</text>
  <path d="M78 226H242" stroke="#c5a263" stroke-opacity=".55" />
  <circle cx="160" cy="226" r="3" fill="#c5a263" />
  <text x="160" y="263" text-anchor="middle" fill="#a99168" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.8">AN EVOLVING REFERENCE BOOK</text>
  <text x="160" y="279" text-anchor="middle" fill="#a99168" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.8">FOR AI ENTHUSIASTS &amp; VIBE CODERS</text>
  <text x="160" y="535" text-anchor="middle" fill="#756346" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="2">FIELD EDITION</text>
  <text x="160" y="554" text-anchor="middle" fill="#9d7b43" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.5">v${escapeXml(editionVersion)}  ·  ${totalTerms} TERMS</text>

  <!-- One clean paper surface keeps the preview legible when social platforms crop it. -->
  <rect x="280" y="25" width="884" height="579" rx="8" fill="url(#paper)" />
  <rect x="280" y="25" width="884" height="579" rx="8" fill="url(#paperRules)" />
  <rect x="280" y="25" width="884" height="579" rx="8" fill="#8d7657" filter="url(#paperNoise)" opacity=".042" />
  <path d="M280 25h884v1H280z" fill="#fffaf0" opacity=".62" />
  <path d="M280 25v579" stroke="#bca47f" stroke-opacity=".45" />

  <text x="318" y="54" fill="#817562" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.5">FIELD EDITION  ·  v${escapeXml(editionVersion)}  ·  ${totalTerms} TERMS</text>
  <rect x="570" y="35" width="292" height="28" fill="#f8f0e0" fill-opacity=".56" stroke="#56452d" stroke-opacity=".23" />
  <circle cx="588" cy="49" r="6.5" fill="none" stroke="#574b3b" stroke-width="1.2" />
  <path d="M593 54l5 5" stroke="#574b3b" stroke-width="1.2" />
  <text x="607" y="53" fill="#91836d" font-family="Georgia, 'Times New Roman', serif" font-size="11">Ask The AI Almanac or search a term…</text>
  <text x="1125" y="54" text-anchor="end" fill="#817562" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.5">PAGE ${pageNumber}</text>
  <path d="M318 76H1125" stroke="#4c3a23" stroke-opacity=".22" />

  <text x="320" y="133" fill="#282119" font-family="Newsreader, Georgia, 'Times New Roman', serif" font-size="${wordSize}" font-weight="500" letter-spacing="-1.1">${escapeXml(entry.word)}</text>
  <text x="320" y="158" fill="#866c45" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-style="italic">${escapeXml(pronPart || 'living reference entry')}</text>
  <path d="M318 208H864" stroke="#4c3a23" stroke-opacity=".22" />
  <text x="320" y="198" fill="#7f2c24" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.35">DICTIONARY</text>
  <text x="400" y="198" fill="#8c7d67" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.2">PLAIN ENGLISH</text>
  <text x="515" y="198" fill="#8c7d67" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.2">TECHNICAL</text>
  <text x="598" y="198" fill="#8c7d67" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.2">VIBE CODER</text>
  <path d="M320 208H385" stroke="#7f2c24" stroke-width="2" />

  <text x="351" y="237" fill="#9a8a73" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.25">DICTIONARY</text>
  <text x="322" y="274" fill="#6b5e4b" font-family="Georgia, 'Times New Roman', serif" font-size="17">1.</text>
  <text x="351" y="274" fill="#282119" font-family="Newsreader, Georgia, 'Times New Roman', serif" font-size="23" line-height="1.45">${renderLines(definitionLines, 351, 274, 31)}</text>
  ${exampleMarkup}

  <path d="M318 ${lowerGridTop - 14}H864" stroke="#4c3a23" stroke-opacity=".22" />
  <text x="320" y="${lowerGridTop + 10}" fill="#745e3c" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.25">ORIGIN</text>
  <text x="320" y="${lowerGridTop + 31}" fill="#493f32" font-family="Georgia, 'Times New Roman', serif" font-size="12.5">${renderLines(originLines, 320, lowerGridTop + 31, 17)}</text>
  <text x="592" y="${lowerGridTop + 10}" fill="#745e3c" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.25">IN PRACTICE</text>
  <text x="592" y="${lowerGridTop + 31}" fill="#493f32" font-family="Georgia, 'Times New Roman', serif" font-size="12.5">${renderLines(practiceLines, 592, lowerGridTop + 31, 17)}</text>

  <path d="M884 96V542" stroke="#4c3a23" stroke-opacity=".22" />
  <text x="908" y="119" fill="#7f2c24" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.25">SEE ALSO</text>
  <text x="908" y="143" fill="#5e5343" font-family="Georgia, 'Times New Roman', serif" font-size="13">${renderLines(relatedLines, 908, 143, 18)}</text>
  <path d="M908 190H1125" stroke="#4c3a23" stroke-opacity=".18" />
  <text x="908" y="214" fill="#745e3c" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.25">FILED UNDER</text>
  <text x="908" y="238" fill="#5e5343" font-family="Georgia, 'Times New Roman', serif" font-size="13">${renderLines(categoryLines, 908, 238, 18)}</text>
  <path d="M908 300H1125" stroke="#4c3a23" stroke-opacity=".18" />
  <text x="908" y="324" fill="#745e3c" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.25">MARGINALIA</text>
  <path d="M904 340H908" stroke="#7f2c24" stroke-width="2" />
  <text x="908" y="350" fill="#5e5343" font-family="Georgia, 'Times New Roman', serif" font-size="12.5" font-style="italic">${renderLines(wrapText(entry.note || 'Keep the useful distinction close at hand.', 25, 5), 908, 350, 17)}</text>

  <path d="M318 551H1125" stroke="#4c3a23" stroke-opacity=".32" stroke-width="2" />
  <text x="318" y="578" fill="#7d6f5a" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.15">← PREVIOUS</text>
  <text x="721" y="578" text-anchor="middle" fill="#493f32" font-family="Georgia, 'Times New Roman', serif" font-size="12">Page ${pageNumber}</text>
  <text x="1125" y="578" text-anchor="end" fill="#7d6f5a" font-family="Arial, Helvetica, sans-serif" font-size="8" letter-spacing="1.15">NEXT →</text>
</svg>`;
}
