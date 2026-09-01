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
import { resolveAutoLocale } from '../src/client/languagePreference.ts';

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
  assert.equal(
    getLocalizedTermPath('pt', 'context window'),
    'pt/term/janela-de-contexto/'
  );
});

test('localized routes use the same React app while keeping English bootstrap isolated', () => {
  const localizedHome = readFileSync(new URL('../src/pages/[lang]/index.astro', import.meta.url), 'utf8');
  const localizedTerm = readFileSync(new URL('../src/pages/[lang]/term/[slug].astro', import.meta.url), 'utf8');
  const shell = readFileSync(new URL('../src/layouts/AppShell.astro', import.meta.url), 'utf8');
  const englishClient = readFileSync(new URL('../src/components/ClientApp.tsx', import.meta.url), 'utf8');
  const localizedClient = readFileSync(new URL('../src/components/LocalizedClientApp.tsx', import.meta.url), 'utf8');

  assert.match(localizedHome, /import AppShell from '..\/..\/layouts\/AppShell\.astro'/);
  assert.match(localizedTerm, /import AppShell from '..\/..\/..\/layouts\/AppShell\.astro'/);
  assert.match(shell, /<ClientApp client:only="react" \/>/);
  assert.match(shell, /<LocalizedClientApp locale=\{localizedLocale\} initialTermKey=\{translationKey\} client:only="react" \/>/);
  assert.match(englishClient, /import App from '..\/App'/);
  assert.doesNotMatch(englishClient, /runtimeClient/);
  assert.match(localizedClient, /import App from '..\/App'/);
  assert.match(localizedClient, /prepareLocalizedRuntime/);
  assert.doesNotMatch(localizedHome, /locale-term-card/);
});

test('language detection suggests supported languages and protects the India default', () => {
  assert.equal(resolveAutoLocale('BR', ['en-US']), 'pt');
  assert.equal(resolveAutoLocale('ES', ['en-US']), 'es');
  assert.equal(resolveAutoLocale('DE', ['en-US']), 'de');
  assert.equal(resolveAutoLocale('BR', ['fr-FR', 'en-US']), 'fr');
  assert.equal(resolveAutoLocale('IN', ['en-IN']), null);
  assert.equal(resolveAutoLocale('IN', ['hi-IN', 'en-IN']), 'hi');
  assert.equal(resolveAutoLocale(null, ['fr-FR']), 'fr');

  const source = readFileSync(new URL('../src/client/languagePreference.ts', import.meta.url), 'utf8');
  const shell = readFileSync(new URL('../src/layouts/AppShell.astro', import.meta.url), 'utf8');
  const endpoint = readFileSync(new URL('../api/locale.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /window\.location\.replace/);
  assert.match(source, /showLanguageSuggestion/);
  assert.match(source, /Stay in English/);
  assert.match(source, /localStorage\.removeItem\(PREFERENCE_KEY\)/);
  assert.match(source, /localStorage\.removeItem\(DISMISSAL_KEY\)/);
  assert.match(source, /syncLanguagePreferenceState/);
  assert.match(shell, /data-language-auto/);
  assert.match(shell, /automaticLanguageLabels/);
  assert.match(endpoint, /x-vercel-ip-country/);
});

test('sound effects default to off until the user opts in', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(
    appSource,
    /loadStorage<boolean>\('aiAlmanacSound',\s*false,\s*isBoolean\)/,
    'Sound effects must default to disabled when no saved preference exists.'
  );
});
