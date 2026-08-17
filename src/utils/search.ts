import type { Term } from '../types/almanac';
import { sortedTerms } from '../data/terms';

export interface SearchMatch {
  term: Term;
  score: number;
}

export function normalizeText(text: string = ''): string {
  return String(text)
    .toLowerCase()
    .replace(/[-_/]+/g, ' ')
    .replace(/[^a-z0-9+#. ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function scoreTerm(term: Term, query: string): number {
  const q = normalizeText(query);
  if (!q) return 20;

  const w = normalizeText(term.word);
  const als = term.aliases.map(normalizeText);

  let score = 99;

  if (w === q) {
    score = 0;
  } else if (w.startsWith(q)) {
    score = 0.8;
  } else if (w.includes(q)) {
    score = 1.35;
  }

  if (als.some(a => a === q)) {
    score = Math.min(score, 0.25);
  } else if (als.some(a => a.startsWith(q) || q.startsWith(a))) {
    score = Math.min(score, 0.9);
  } else if (als.some(a => a.includes(q) || q.includes(a))) {
    score = Math.min(score, 1.4);
  }

  const stopWords = ['what', 'the', 'this', 'that', 'with', 'from', 'into', 'does', 'mean', 'called', 'how', 'is', 'an', 'are'];
  const tokens = q.split(/\s+/).filter(x => x.length > 1 && !stopWords.includes(x));

  let hits = 0;
  const haystack = normalizeText([term.word, term.definition, term.note, ...term.aliases, ...term.related, term.category].join(' '));
  tokens.forEach(tok => {
    if (haystack.includes(tok)) hits++;
  });

  if (hits > 0) {
    score = Math.min(score, 3.8 - hits * 0.7);
  }

  if (tokens.length > 1 && tokens.every(tok => w.includes(tok))) {
    score = Math.min(score, 0.65);
  }

  // Domain semantic heuristics for conversational / concept queries
  const semanticRules: Array<[RegExp, string]> = [
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

  for (const [pattern, targetWord] of semanticRules) {
    if (pattern.test(q) && normalizeText(term.word) === normalizeText(targetWord)) {
      score = -1;
      break;
    }
  }

  return score;
}

export function searchTerms(query: string, limit = 7): SearchMatch[] {
  if (!query.trim()) return [];
  return sortedTerms
    .map(term => ({ term, score: scoreTerm(term, query) }))
    .filter(item => item.score < 12)
    .sort((a, b) => a.score - b.score || a.term.word.localeCompare(b.term.word))
    .slice(0, limit);
}

export function findBestMatch(query: string): Term | null {
  const matches = searchTerms(query, 1);
  return matches.length > 0 ? matches[0].term : null;
}
