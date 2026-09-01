import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import type { Term } from '../src/types/almanac.ts';
import { createSearchIndex, findBestMatch, searchTerms } from '../src/utils/search.ts';
import { getTermRoutePath, slugifyTerm } from '../src/utils/ogImage.ts';
import {
  getLocalizedEntries,
  getLocalizedTermPath,
  localizedLocales
} from '../src/i18n/catalog.ts';
import { getSuggestedLocale } from '../src/i18n/detection.ts';
import { getLocalizedSearchText, matchesLocalizedSearch } from '../src/i18n/search.ts';

const term = (word: string, definition: string, aliases: string[] = []): Term => ({
  word,
  part: 'noun',
  definition,
  example: '',
  origin: '',
  note: '',
  related: [],
  aliases,
  category: 'AI concepts'
});

const terms = [
  term('hallucination', 'A confident but incorrect model output.', ['fabrication']),
  term('RAG', 'Retrieval augmented generation: retrieve documents before answering.', ['retrieval augmented generation']),
  term('context window', 'The amount of input a model can process at once.', ['memory limit'])
];

const searchIndex = createSearchIndex(terms);

test('semantic search turns a natural-language question into an entry', () => {
  assert.equal(findBestMatch('What makes AI invent answers?', searchIndex)?.word, 'hallucination');
  assert.equal(findBestMatch('How much can a model remember?', searchIndex)?.word, 'context window');
});

test('search includes aliases and preserves an intentional no-match state', () => {
  assert.equal(findBestMatch('fabrication', searchIndex)?.word, 'hallucination');
  assert.deepEqual(searchTerms('xylophone marsupial', searchIndex), []);
});

test('term routes remain stable and crawlable', () => {
  assert.equal(slugifyTerm('Vision + Language # Action'), 'vision-language-sharp-action');
  assert.equal(getTermRoutePath({ word: 'context window' }), 'term/context-window/');
});

test('multilingual starter exposes six locales with ten translated entries each', () => {
  assert.deepEqual(localizedLocales, ['es', 'pt', 'it', 'fr', 'de', 'hi']);
  for (const locale of localizedLocales) {
    assert.equal(getLocalizedEntries(locale).length, 10);
  }
  assert.equal(
    getLocalizedTermPath('es', 'artificial intelligence'),
    'es/term/inteligencia-artificial/'
  );
  assert.equal(
    getLocalizedTermPath('hi', 'artificial intelligence'),
    'hi/term/kritrim-buddhimatta/'
  );
});

test('smart language detection prefers browser language and never infers Hindi from India alone', () => {
  assert.equal(getSuggestedLocale(['pt-BR'], 'BR'), 'pt');
  assert.equal(getSuggestedLocale(['de-DE'], 'FR'), 'de');
  assert.equal(getSuggestedLocale(['en-US'], 'BR'), 'pt');
  assert.equal(getSuggestedLocale(['en-IN'], 'IN'), null);
  assert.equal(getSuggestedLocale(['hi-IN'], 'IN'), 'hi');
});

test('Portuguese localized search understands native phrasing and English AI terms', () => {
  const contextWindow = getLocalizedEntries('pt').find((entry) => entry.key === 'context window');
  const llm = getLocalizedEntries('pt').find((entry) => entry.key === 'large language model');
  assert.ok(contextWindow);
  assert.ok(llm);

  const contextSearchText = getLocalizedSearchText('pt', contextWindow);
  assert.equal(matchesLocalizedSearch(contextSearchText, 'janela de contexto'), true);
  assert.equal(matchesLocalizedSearch(contextSearchText, 'context window'), true);
  assert.equal(matchesLocalizedSearch(contextSearchText, 'o que é limite de contexto do ChatGPT'), true);

  const llmSearchText = getLocalizedSearchText('pt', llm);
  assert.equal(matchesLocalizedSearch(llmSearchText, 'LLM'), true);
  assert.equal(matchesLocalizedSearch(llmSearchText, 'modelo de linguagem de grande porte'), true);
});

test('sound effects default to off until the user opts in', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(
    appSource,
    /loadStorage<boolean>\('aiAlmanacSound',\s*false,\s*isBoolean\)/,
    'Sound effects must default to disabled when no saved preference exists.'
  );
});
