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

// Patterns run against the normalized query and outrank every other match, so
// each keyword is anchored with \b: unanchored, "api" fired on "rapid",
// "cite" on "excited" and "regression" hijacked "linear regression".
const SEMANTIC_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bmakes? (things|stuff) up\b|\bfalse answers?\b|\binvent(ed|s|ing)?\b|\bfabricat|\bconfident\b.*\bwrong\b/, 'hallucination'],
  [/\bdocuments?\b.*\b(before|then)\b.*\banswer|\bsearch\b.*\bbefore\b.*\banswer|\bretrieve\b.*\banswer|\blook\b.*\bup\b.*\banswer/, 'RAG'],
  [/\bhow much\b.*\b(read|remember)\b|\bmemory limit\b|\bcontext length\b|\bhow many tokens\b/, 'context window'],
  [/\bai\b.*\b(acts?|actions?)\b.*\bown\b|\bautonom|\bmultiple steps\b|\bdoes things for me\b/, 'agentic'],
  [/\bapis?\b|\bexternal functions?\b|\buse tools?\b|\bcall\b.*\bfunctions?\b/, 'tool calling'],
  [/\bmeaning\b.*\bvectors?\b|\bsimilar meaning\b|\bsemantic\b.*\bnumbers\b/, 'embedding'],
  [/\bcoding\b.*\bai\b|\bnatural language\b.*\bcode\b|\bvibe coder\b|\bdescribe\b.*\bsoftware\b/, 'vibe coding'],
  [/\btest\b.*\bai\b|\bquality\b.*\btest|\bevaluat(e|es|ed|ing)\b|\bregression tests?\b/, 'eval'],
  [/\btrusted sources?\b|\bcit(e|es|ed|ing|ation|ations)\b|\bevidence\b.*\banswer/, 'grounding'],
  [/\bsystem instructions\b|\bhidden instructions\b|\bassistant rules\b/, 'system prompt'],
  [/\bnlp\b|\bnatural language processing\b/, 'natural language processing'],
  [/\bvision language action\b|\bvla\b/, 'vision-language-action model'],
  [/\bgenerative ai\b|\bgenai\b/, 'generative AI'],
  [/\bmcp\b|\bmodel context protocol\b/, 'MCP']
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

  // An alias found inside the query must be a whole word or phrase there:
  // otherwise short aliases match everywhere ("rl" in "world", "em" in "temperature").
  const paddedQuery = ` ${query} `;
  if (aliases.some((alias) => alias === query)) {
    score = Math.min(score, 0.25);
  } else if (aliases.some((alias) => alias.startsWith(query) || paddedQuery.startsWith(` ${alias} `))) {
    score = Math.min(score, 0.9);
  } else if (aliases.some((alias) => alias.includes(query) || paddedQuery.includes(` ${alias} `))) {
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
