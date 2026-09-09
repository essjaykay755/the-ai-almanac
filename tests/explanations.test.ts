import assert from 'node:assert/strict';
import test from 'node:test';
import type { Term } from '../src/types/almanac.ts';
import { getExplanations } from '../src/utils/explanations.ts';
import { getLocalizedTermPresentation } from '../src/i18n/reactLocale.ts';
import { getBengaliTermCopy } from '../src/i18n/bengali.ts';

const sampleTerm: Term = {
  word: 'sample term',
  part: 'noun',
  definition: 'A compact description of the concept.',
  example: '“The team used the sample term in production.”',
  origin: 'A test entry.',
  note: 'It is useful when checking a system.',
  related: ['another term', 'one more term'],
  aliases: [],
  category: 'Testing'
};

test('fallback explanation modes keep labels out of the definition prose', () => {
  const explanations = getExplanations(sampleTerm, {});

  assert.equal(explanations.dictionary, sampleTerm.definition);
  assert.equal(explanations.plain, 'Think of sample term this way — The team used the sample term in production.');
  assert.equal(
    explanations.technical,
    'A compact description of the concept. It is commonly discussed alongside another term and one more term.'
  );
  assert.equal(explanations.vibe, 'It is useful when checking a system. The team used the sample term in production.');
  assert.doesNotMatch(explanations.technical, /^Technical lens\s*-/i);
  assert.doesNotMatch(explanations.vibe, /^sample term in the build:/i);
});

test('localized explanation modes use the entry text without inline mode leads', () => {
  const localizedTerm: Term = {
    ...sampleTerm,
    word: 'artificial intelligence'
  };

  for (const locale of ['es', 'pt', 'it', 'fr', 'de', 'hi', 'bn'] as const) {
    const dictionary = getLocalizedTermPresentation(localizedTerm, 'dictionary', {}, locale);
    const plain = getLocalizedTermPresentation(localizedTerm, 'plain', {}, locale);
    const technical = getLocalizedTermPresentation(localizedTerm, 'technical', {}, locale);
    const vibe = getLocalizedTermPresentation(localizedTerm, 'vibe', {}, locale);

    assert.equal(plain.definition, dictionary.definition, `${locale} plain mode should not add a lead`);
    assert.equal(technical.definition, dictionary.definition, `${locale} technical mode should not add a lead`);
    assert.notEqual(vibe.definition, dictionary.definition, `${locale} vibe mode should use the entry note`);
  }
});

test('shared Bengali fallback copy remains authoritative across all explanation modes', () => {
  const bengaliTerm: Term = {
    ...sampleTerm,
    definition: 'এটি একটি বাংলা সংজ্ঞা।'
  };
  const sharedCopy = bengaliTerm.definition;
  const explanations = getExplanations(bengaliTerm, {
    [bengaliTerm.word]: {
      plain: sharedCopy,
      technical: sharedCopy,
      vibe: sharedCopy
    }
  });

  assert.equal(explanations.plain, sharedCopy);
  assert.equal(explanations.technical, sharedCopy);
  assert.equal(explanations.vibe, sharedCopy);
});

test('taste has Bengali copy for every visible explanation and supporting field', () => {
  const taste = getBengaliTermCopy('taste');
  if (!taste) throw new Error('Expected curated Bengali copy for taste');
  assert.ok(Object.values(taste.modes).every((value) => /[\u0980-\u09FF]/.test(value)));
  assert.match(taste.example, /[\u0980-\u09FF]/);
  assert.match(taste.origin, /[\u0980-\u09FF]/);
  assert.match(taste.note, /[\u0980-\u09FF]/);

  const presentation = getLocalizedTermPresentation(
    { ...sampleTerm, word: 'taste' },
    'vibe',
    { taste: { plain: taste.modes.plain, technical: taste.modes.technical, vibe: taste.modes.vibe } },
    'bn'
  );
  assert.equal(presentation.definition, taste.modes.vibe);
});
