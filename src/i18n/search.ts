import type { LocalizedEntry, LocalizedLocale } from './catalog.ts';

export const localizedSearchCopy: Record<LocalizedLocale, { placeholder: string; noResults: string }> = {
  es: {
    placeholder: 'Buscar un término de IA',
    noResults: 'No hay términos traducidos que coincidan con esta búsqueda.'
  },
  pt: {
    placeholder: 'Buscar um termo de IA',
    noResults: 'Nenhum termo traduzido corresponde a esta busca.'
  },
  it: {
    placeholder: 'Cerca un termine di IA',
    noResults: 'Nessun termine tradotto corrisponde a questa ricerca.'
  },
  fr: {
    placeholder: 'Rechercher un terme d’IA',
    noResults: 'Aucun terme traduit ne correspond à cette recherche.'
  },
  de: {
    placeholder: 'KI-Begriff suchen',
    noResults: 'Kein übersetzter Begriff passt zu dieser Suche.'
  },
  hi: {
    placeholder: 'एआई शब्द खोजें',
    noResults: 'इस खोज से मेल खाने वाला कोई अनुवादित शब्द नहीं मिला।'
  }
};

const aliases: Partial<Record<LocalizedLocale, Record<string, readonly string[]>>> = {
  pt: {
    'artificial intelligence': ['IA', 'AI', 'o que e inteligencia artificial'],
    'machine learning': ['ML', 'aprendizagem de maquina', 'machine learning'],
    'generative AI': ['GenAI', 'inteligencia artificial generativa', 'generative AI'],
    'large language model': ['LLM', 'modelo de linguagem grande', 'modelo de linguagem de grande porte', 'large language model'],
    prompt: ['prompt de IA', 'instrucao para IA', 'comando para IA'],
    token: ['token de IA', 'tokens de LLM'],
    'context window': ['context window', 'janela de contexto IA', 'limite de contexto', 'limite de contexto do ChatGPT', 'contexto de LLM'],
    hallucination: ['AI hallucination', 'alucinacao de IA', 'IA inventando respostas'],
    RAG: ['retrieval augmented generation', 'geracao aumentada por recuperacao', 'busca com IA'],
    agentic: ['agentic AI', 'IA agentica', 'agentes de IA', 'AI agents']
  }
};

const stopWords = new Set([
  'a', 'an', 'and', 'as', 'como', 'da', 'das', 'de', 'del', 'der', 'des', 'die', 'do', 'dos',
  'e', 'el', 'em', 'en', 'et', 'for', 'für', 'i', 'il', 'in', 'la', 'le', 'les', 'o', 'of', 'on',
  'para', 'per', 'por', 'que', 'the', 'to', 'um', 'uma', 'un', 'una', 'und', 'what'
]);

export function normalizeLocalizedSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getLocalizedSearchText(locale: LocalizedLocale, entry: LocalizedEntry): string {
  return [
    entry.word,
    entry.key,
    entry.slug,
    entry.definition,
    entry.note,
    ...(aliases[locale]?.[entry.key] || [])
  ].join(' ');
}

export function matchesLocalizedSearch(haystack: string, query: string): boolean {
  const normalizedHaystack = normalizeLocalizedSearchText(haystack);
  const normalizedQuery = normalizeLocalizedSearchText(query);
  if (!normalizedQuery) return true;
  if (normalizedHaystack.includes(normalizedQuery)) return true;

  const meaningfulTokens = normalizedQuery
    .split(' ')
    .filter((token) => token.length > 1 && !stopWords.has(token));

  return meaningfulTokens.length > 0 && meaningfulTokens.every((token) => normalizedHaystack.includes(token));
}
