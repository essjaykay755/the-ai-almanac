import type { Term } from '../types/almanac.ts';

export interface SearchMatch {
  term: Term;
  score: number;
}

export interface SearchIndex {
  entries: SearchIndexEntry[];
  byWord: Map<string, SearchIndexEntry>;
}

interface SearchIndexEntry {
  term: Term;
  word: string;
  aliases: string[];
  haystack: string;
}

const STOP_WORDS = new Set([
  'what', 'the', 'this', 'that', 'with', 'from', 'into', 'does', 'mean',
  'called', 'how', 'is', 'an', 'are'
]);

const SEMANTIC_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/makes? (things|stuff) up|false answer|invent(ed|s)?|fabricat|confident.*wrong/, 'hallucination'],
  [/documents?.*(before|then).*answer|search.*before.*answer|retrieve.*answer|look.*up.*answer/, 'RAG'],
  [/how much.*(read|remember)|memory limit|context length|how many tokens/, 'context window'],
  [/ai.*(act|action).*own|autonom|multiple steps|does things for me/, 'agentic'],
  [/api|external function|use tools?|call.*function/, 'tool calling'],
  [/meaning.*vector|similar meaning|semantic.*numbers/, 'embedding'],
  [/coding.*ai|natural language.*code|vibe coder|describe.*software/, 'vibe coding'],
  [/test.*ai|quality.*test|evaluate|regression/, 'eval'],
  [/trusted source|cite|evidence.*answer/, 'grounding'],
  [/system instructions|hidden instructions|assistant rules/, 'system prompt'],
  [/\bnlp\b|natural language processing/, 'natural language processing'],
  [/vision language action|\bvla\b/, 'vision-language-action model'],
  [/generative ai|\bgenai\b/, 'generative AI'],
  [/\bmcp\b|model context protocol/, 'MCP']
];

export function normalizeText(text: string = ''): string {
  return String(text)
    .toLowerCase()
    .replace(/[-_/]+/g, ' ')
    .replace(/[^a-z0-9+#. ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createSearchIndexEntry(term: Term): SearchIndexEntry {
  const word = normalizeText(term.word);
  const aliases = term.aliases.map(normalizeText);
  const haystack = normalizeText([
    term.word,
    term.definition,
    term.note,
    ...term.aliases,
    ...term.related,
    term.category
  ].join(' '));
  return { term, word, aliases, haystack };
}

export function createSearchIndex(terms: readonly Term[]): SearchIndex {
  const entries = terms.map(createSearchIndexEntry);
  return {
    entries,
    byWord: new Map(entries.map((entry) => [entry.word, entry]))
  };
}

function getQueryTokens(query: string): string[] {
  return query
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreIndexedTerm(index: SearchIndexEntry, query: string, tokens: string[]): number {
  if (!query) return 20;

  const { word, aliases, haystack } = index;
  let score = 99;

  if (word === query) {
    score = 0;
  } else if (word.startsWith(query)) {
    score = 0.8;
  } else if (word.includes(query)) {
    score = 1.35;
  }

  if (aliases.some((alias) => alias === query)) {
    score = Math.min(score, 0.25);
  } else if (aliases.some((alias) => alias.startsWith(query) || query.startsWith(alias))) {
    score = Math.min(score, 0.9);
  } else if (aliases.some((alias) => alias.includes(query) || query.includes(alias))) {
    score = Math.min(score, 1.4);
  }

  let hits = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) hits++;
  }

  if (hits > 0) {
    const tokenScore = Math.max(1.5, 3.8 - hits * 0.7);
    score = Math.min(score, tokenScore);
  }

  if (tokens.length > 1 && tokens.every((token) => word.includes(token))) {
    score = Math.min(score, 0.65);
  }

  for (const [pattern, targetWord] of SEMANTIC_RULES) {
    if (pattern.test(query) && word === normalizeText(targetWord)) {
      score = -1;
      break;
    }
  }

  return score;
}

export function scoreTerm(term: Term, query: string, searchIndex?: SearchIndex): number {
  const normalizedQuery = normalizeText(query);
  const index = searchIndex?.byWord.get(normalizeText(term.word)) || createSearchIndexEntry(term);
  return scoreIndexedTerm(index, normalizedQuery, getQueryTokens(normalizedQuery));
}

export function searchTerms(query: string, searchIndex: SearchIndex, limit = 7): SearchMatch[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  const tokens = getQueryTokens(normalizedQuery);
  const matches: SearchMatch[] = [];
  for (const index of searchIndex.entries) {
    const score = scoreIndexedTerm(index, normalizedQuery, tokens);
    if (score < 12) {
      matches.push({ term: index.term, score });
    }
  }

  return matches
    .sort((a, b) => a.score - b.score || a.term.word.localeCompare(b.term.word))
    .slice(0, limit);
}

export function findBestMatch(query: string, searchIndex: SearchIndex): Term | null {
  return searchTerms(query, searchIndex, 1)[0]?.term || null;
}
