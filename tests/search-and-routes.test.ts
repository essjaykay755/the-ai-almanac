import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import type { Term } from '../src/types/almanac.ts';
import { createSearchIndex, findBestMatch, searchTerms } from '../src/utils/search.ts';
import { getTermRoutePath, slugifyTerm } from '../src/utils/ogImage.ts';
import { isStrictAlmanacAppPath } from '../src/i18n/appPath.ts';
import {
  getLanguageSwitchPath,
  getLocalizedEntries,
  getLocalizedTermPath,
  getLocaleFromPathname,
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

test('multilingual starter exposes seven locales with ten translated explanations each', () => {
  assert.deepEqual(localizedLocales, ['es', 'pt', 'it', 'fr', 'de', 'hi', 'bn']);
  for (const locale of localizedLocales) assert.equal(getLocalizedEntries(locale).length, 10);
  assert.equal(getLocalizedTermPath('es', 'artificial intelligence'), 'es/term/inteligencia-artificial/');
  assert.equal(getLocalizedTermPath('hi', 'artificial intelligence'), 'hi/term/kritrim-buddhimatta/');
  assert.equal(getLocalizedTermPath('pt', 'context window'), 'pt/term/janela-de-contexto/');
  assert.equal(getLocalizedTermPath('bn', 'machine learning'), 'bn/term/machine-learning/');

  const bengaliMachineLearning = getLocalizedEntries('bn').find((entry) => entry.key === 'machine learning');
  assert.equal(bengaliMachineLearning?.word, 'Machine Learning');
  assert.match(bengaliMachineLearning?.definition || '', /[\u0980-\u09FF]/);
});

test('localized routes use the same React app and render full localization through React', () => {
  const localizedHome = readFileSync(new URL('../src/pages/[lang]/index.astro', import.meta.url), 'utf8');
  const localizedTerm = readFileSync(new URL('../src/pages/[lang]/term/[slug].astro', import.meta.url), 'utf8');
  const shell = readFileSync(new URL('../src/layouts/AppShell.astro', import.meta.url), 'utf8');
  const page = readFileSync(new URL('../src/components/Page.tsx', import.meta.url), 'utf8');
  const cover = readFileSync(new URL('../src/components/Cover.tsx', import.meta.url), 'utf8');
  const about = readFileSync(new URL('../src/components/AboutPage.tsx', import.meta.url), 'utf8');
  const indexOverlay = readFileSync(new URL('../src/components/overlays/IndexOverlay.tsx', import.meta.url), 'utf8');
  const compareOverlay = readFileSync(new URL('../src/components/overlays/CompareOverlay.tsx', import.meta.url), 'utf8');
  const reactLocale = readFileSync(new URL('../src/i18n/reactLocale.ts', import.meta.url), 'utf8');
  const tutorialLocale = readFileSync(new URL('../src/i18n/tutorialLocale.ts', import.meta.url), 'utf8');
  const englishClient = readFileSync(new URL('../src/components/ClientApp.tsx', import.meta.url), 'utf8');
  const localizedClient = readFileSync(new URL('../src/components/LocalizedClientApp.tsx', import.meta.url), 'utf8');

  assert.match(localizedHome, /import AppShell from '..\/..\/layouts\/AppShell\.astro'/);
  assert.match(localizedTerm, /import AppShell from '..\/..\/..\/layouts\/AppShell\.astro'/);
  assert.match(localizedTerm, /title=\{`\$\{entry\.key\} - The AI Almanac`\}/);
  assert.match(shell, /<ClientApp client:only="react" \/>/);
  assert.match(shell, /<LocalizedClientApp locale=\{localizedLocale\} initialTermKey=\{translationKey\} client:only="react" \/>/);
  assert.match(cover, /<LanguageSwitcher termKey=\{termKey\} \/>/);
  assert.match(cover, /getUiStrings/);
  assert.match(page, /getLocalizedTermPresentation/);
  assert.match(page, /localizedTerm\.example/);
  assert.match(page, /localizedTerm\.origin/);
  assert.match(page, /modeNames\[explanationMode\]/);
  assert.match(about, /getUiStrings/);
  assert.match(indexOverlay, /getOverlayStrings/);
  assert.match(compareOverlay, /getLocalizedTermPresentation/);
  assert.match(reactLocale, /exampleByLocale/);
  assert.match(reactLocale, /originByLocale/);
  assert.match(reactLocale, /Em termos simples:/);
  assert.match(reactLocale, /पूछें \/ खोजें/);
  assert.match(reactLocale, /জিজ্ঞেস করুন \/ খুঁজুন/);
  assert.match(tutorialLocale, /localizeTutorialStep/);
  assert.match(tutorialLocale, /আপনার ভাষা বেছে নিন/);
  assert.match(englishClient, /import App from '..\/App'/);
  assert.doesNotMatch(englishClient, /runtimeClient/);
  assert.match(localizedClient, /import App from '..\/App'/);
  assert.match(localizedClient, /prepareLocalizedRuntime/);
  assert.doesNotMatch(localizedHome, /locale-term-card/);
});

test('strict app routes reject extra path segments', () => {
  assert.equal(isStrictAlmanacAppPath('/'), true);
  assert.equal(isStrictAlmanacAppPath('/term/context-window/'), true);
  assert.equal(isStrictAlmanacAppPath('/es/'), true);
  assert.equal(isStrictAlmanacAppPath('/pt/term/janela-de-contexto/'), true);
  assert.equal(isStrictAlmanacAppPath('/hi/'), true);
  assert.equal(isStrictAlmanacAppPath('/bn/'), true);
  assert.equal(isStrictAlmanacAppPath('/bn/term/machine-learning/'), true);
  assert.equal(isStrictAlmanacAppPath('/term/context-window/extra/'), false);
  assert.equal(isStrictAlmanacAppPath('/pt/term/janela-de-contexto/extra/'), false);
  assert.equal(isStrictAlmanacAppPath('/not-a-page/'), false);
  assert.equal(getLocaleFromPathname('/pt/term/janela-de-contexto/'), 'pt');
  assert.equal(getLocaleFromPathname('/bn/term/machine-learning/'), 'bn');
  assert.equal(getLocaleFromPathname('/term/context-window/'), 'en');
  assert.equal(getLanguageSwitchPath('pt', 'context window'), 'pt/term/janela-de-contexto/');
  assert.equal(getLanguageSwitchPath('bn', 'machine learning'), 'bn/term/machine-learning/');
  assert.equal(getLanguageSwitchPath('es'), 'es/');
  assert.equal(getLanguageSwitchPath('en', 'context window'), 'term/context-window/');
});

test('automatic language selection is IP-first, keeps India English and uses browser only without IP', () => {
  assert.equal(resolveAutoLocale('BR', ['en-US']), 'pt');
  assert.equal(resolveAutoLocale('ES', ['en-US']), 'es');
  assert.equal(resolveAutoLocale('DE', ['en-US']), 'de');
  assert.equal(resolveAutoLocale('BD', ['en-US']), 'bn');
  assert.equal(resolveAutoLocale('BR', ['fr-FR', 'en-US']), 'pt');
  assert.equal(resolveAutoLocale('IN', ['en-IN']), null);
  assert.equal(resolveAutoLocale('IN', ['hi-IN', 'en-IN']), null);
  assert.equal(resolveAutoLocale('IN', ['bn-IN', 'en-IN']), null);
  assert.equal(resolveAutoLocale('US', ['fr-FR']), null);
  assert.equal(resolveAutoLocale(null, ['fr-FR']), 'fr');
  assert.equal(resolveAutoLocale(null, ['bn-BD', 'en-US']), 'bn');

  const source = readFileSync(new URL('../src/client/languagePreference.ts', import.meta.url), 'utf8');
  const switcher = readFileSync(new URL('../src/components/LanguageSwitcher.tsx', import.meta.url), 'utf8');
  const workflow = readFileSync(new URL('../.github/workflows/verify.yml', import.meta.url), 'utf8');
  const endpoint = readFileSync(new URL('../api/locale.js', import.meta.url), 'utf8');
  assert.match(source, /window\.location\.assign/);
  assert.match(source, /observeLanguageMenus/);
  assert.match(source, /AUTO_SWITCH_SESSION_KEY/);
  assert.match(source, /showAutomaticSwitchBanner/);
  assert.match(source, /Keep \$\{languageName\}/);
  assert.match(source, /Use English/);
  assert.match(source, /sessionStorage/);
  assert.match(source, /localStorage\.removeItem\(PREFERENCE_KEY\)/);
  assert.match(source, /localStorage\.removeItem\(DISMISSAL_KEY\)/);
  assert.match(source, /syncLanguagePreferenceState/);
  assert.match(switcher, /data-language-auto/);
  assert.match(switcher, /automaticLanguageLabels/);
  assert.match(switcher, /স্বয়ংক্রিয়/);
  assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main/);
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
