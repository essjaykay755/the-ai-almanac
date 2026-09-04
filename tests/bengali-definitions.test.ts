import test from 'node:test';
import assert from 'node:assert/strict';
import { terms } from '../src/data/terms.ts';
import {
  bengaliDefinitions,
  getBengaliDefinition
} from '../src/i18n/bengaliDefinitions.generated.ts';
import { getBengaliTermPath } from '../src/i18n/bengaliRoutes.ts';

const bengaliPattern = /[\u0980-\u09FF]/;

test('Bengali definitions cover the complete 791-term corpus', () => {
  assert.equal(terms.length, 791);
  assert.equal(Object.keys(bengaliDefinitions).length, 791);

  for (const term of terms) {
    const definition = getBengaliDefinition(term.word);
    assert.ok(definition, `Missing Bengali definition for ${term.word}`);
    assert.match(definition, bengaliPattern, `${term.word} must contain Bengali text`);
    assert.notEqual(definition.trim(), term.definition.trim(), `${term.word} must not fall back to English`);
  }
});

test('every term has a stable Bengali route while curated slugs stay intact', () => {
  assert.equal(getBengaliTermPath('activation patching'), 'bn/term/activation-patching/');
  assert.equal(getBengaliTermPath('RAG'), 'bn/term/retrieval-augmented-generation-rag/');
  assert.equal(getBengaliTermPath('agentic'), 'bn/term/agentic-ai/');
  assert.equal(getBengaliTermPath('gated recurrent unit'), 'bn/term/gated-recurrent-unit/');
});
