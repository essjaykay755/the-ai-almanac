import type { ExplanationMode, SpecialModes, Term } from '../types/almanac';

const explanationModes: ExplanationMode[] = ['dictionary', 'plain', 'technical', 'vibe'];

function cleanExample(example: string): string {
  return example.replace(/[“”]/g, '').trim();
}

function fallbackExplanations(term: Term): Record<ExplanationMode, string> {
  const example = cleanExample(term.example);
  const related = term.related.slice(0, 2).join(' and ');
  const note = term.note.trim();

  return {
    dictionary: term.definition,
    plain: example
      ? `A simple way to think about ${term.word}: ${example}`
      : `In everyday language, ${term.word} is the idea described by this entry.`,
    technical: related
      ? `Technical lens — ${term.word}: ${term.definition} It is commonly discussed alongside ${related}.`
      : `Technical lens — ${term.word}: ${term.definition}`,
    vibe: note && example
      ? `${term.word} in the build: ${note} Example: ${example}`
      : `${term.word} in the build: ${note || example || 'Use the term precisely and verify it in context.'}`
  };
}

function normalizeExplanation(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/**
 * Returns the four explanation lenses for a term, resolving bespoke copy first
 * and making sure a duplicated override cannot collapse two tabs into one.
 */
export function getExplanations(
  term: Term,
  specialModes: SpecialModes
): Record<ExplanationMode, string> {
  const overrides = specialModes[term.word] || {};
  const fallbacks = fallbackExplanations(term);
  const explanations = {} as Record<ExplanationMode, string>;
  const used = new Set<string>();

  for (const mode of explanationModes) {
    const override = mode === 'dictionary' ? undefined : overrides[mode];
    const candidate = override?.trim() || fallbacks[mode];
    const normalizedCandidate = normalizeExplanation(candidate);

    if (!used.has(normalizedCandidate)) {
      explanations[mode] = candidate;
      used.add(normalizedCandidate);
      continue;
    }

    const fallback = fallbacks[mode];
    const normalizedFallback = normalizeExplanation(fallback);
    if (!used.has(normalizedFallback)) {
      explanations[mode] = fallback;
      used.add(normalizedFallback);
      continue;
    }

    // This is a last-resort guard for malformed data with repeated overrides.
    const distinctFallback = `${fallback} (${mode} view)`;
    explanations[mode] = distinctFallback;
    used.add(normalizeExplanation(distinctFallback));
  }

  return explanations;
}

export function getExplanationForTerm(
  term: Term,
  mode: ExplanationMode,
  specialModes: SpecialModes
): string {
  return getExplanations(term, specialModes)[mode];
}
