import {
  getLocalizedEntries,
  getLocalizedTermPath,
  localizedLocales,
  type LocalizedLocale,
  type SupportedLocale
} from './catalog';
import { getPublicPath } from '../utils/ogImage';

interface UiStrings {
  fieldEdition: string;
  terms: string;
  searchPlaceholder: string;
  searchLabel: string;
  page: string;
  dictionary: string;
  plain: string;
  technical: string;
  vibe: string;
  origin: string;
  inPractice: string;
  addCollection: string;
  saveEntry: string;
  copyLink: string;
  timeline: string;
  recentTerms: string;
  clearList: string;
  seeAlso: string;
  compare: string;
  confused: string;
  filedUnder: string;
  marginalia: string;
  previous: string;
  next: string;
  noExactMatch: string;
  tryIdea: string;
  clearSearch: string;
}

const ui: Record<LocalizedLocale, UiStrings> = {
  es: {
    fieldEdition: 'Edición de campo', terms: 'términos', searchPlaceholder: 'Pregunta a The AI Almanac o busca un término…', searchLabel: 'Buscar en The AI Almanac', page: 'Página', dictionary: 'Diccionario', plain: 'Lenguaje sencillo', technical: 'Técnico', vibe: 'Vibe Coder', origin: 'Origen', inPractice: 'En la práctica', addCollection: '+ añadir a colección', saveEntry: 'guardar entrada', copyLink: 'copiar enlace', timeline: 'cronología', recentTerms: 'Términos recientes', clearList: 'Limpiar lista', seeAlso: 'Ver también', compare: 'Comparar', confused: 'A menudo se confunde con', filedUnder: 'Archivado en', marginalia: 'Marginalia', previous: 'Anterior', next: 'Siguiente', noExactMatch: 'Sin coincidencia exacta', tryIdea: 'Prueba con la idea de tu pregunta:', clearSearch: 'Limpiar búsqueda'
  },
  pt: {
    fieldEdition: 'Edição de campo', terms: 'termos', searchPlaceholder: 'Pergunte ao The AI Almanac ou pesquise um termo…', searchLabel: 'Pesquisar no The AI Almanac', page: 'Página', dictionary: 'Dicionário', plain: 'Linguagem simples', technical: 'Técnico', vibe: 'Vibe Coder', origin: 'Origem', inPractice: 'Na prática', addCollection: '+ adicionar à coleção', saveEntry: 'salvar entrada', copyLink: 'copiar link', timeline: 'linha do tempo', recentTerms: 'Termos recentes', clearList: 'Limpar lista', seeAlso: 'Veja também', compare: 'Comparar', confused: 'Frequentemente confundido com', filedUnder: 'Arquivado em', marginalia: 'Marginalia', previous: 'Anterior', next: 'Próximo', noExactMatch: 'Sem correspondência exata', tryIdea: 'Tente a ideia por trás da sua pergunta:', clearSearch: 'Limpar pesquisa'
  },
  it: {
    fieldEdition: 'Edizione da campo', terms: 'termini', searchPlaceholder: 'Chiedi a The AI Almanac o cerca un termine…', searchLabel: 'Cerca in The AI Almanac', page: 'Pagina', dictionary: 'Dizionario', plain: 'Linguaggio semplice', technical: 'Tecnico', vibe: 'Vibe Coder', origin: 'Origine', inPractice: 'In pratica', addCollection: '+ aggiungi alla raccolta', saveEntry: 'salva voce', copyLink: 'copia link', timeline: 'cronologia', recentTerms: 'Termini recenti', clearList: 'Svuota elenco', seeAlso: 'Vedi anche', compare: 'Confronta', confused: 'Spesso confuso con', filedUnder: 'Archiviato in', marginalia: 'Marginalia', previous: 'Precedente', next: 'Successivo', noExactMatch: 'Nessuna corrispondenza esatta', tryIdea: 'Prova l’idea alla base della domanda:', clearSearch: 'Cancella ricerca'
  },
  fr: {
    fieldEdition: 'Édition de terrain', terms: 'termes', searchPlaceholder: 'Interrogez The AI Almanac ou recherchez un terme…', searchLabel: 'Rechercher dans The AI Almanac', page: 'Page', dictionary: 'Dictionnaire', plain: 'Langage simple', technical: 'Technique', vibe: 'Vibe Coder', origin: 'Origine', inPractice: 'En pratique', addCollection: '+ ajouter à une collection', saveEntry: 'enregistrer l’entrée', copyLink: 'copier le lien', timeline: 'chronologie', recentTerms: 'Termes récents', clearList: 'Effacer la liste', seeAlso: 'Voir aussi', compare: 'Comparer', confused: 'Souvent confondu avec', filedUnder: 'Classé dans', marginalia: 'Marginalia', previous: 'Précédent', next: 'Suivant', noExactMatch: 'Aucune correspondance exacte', tryIdea: 'Essayez l’idée derrière votre question :', clearSearch: 'Effacer la recherche'
  },
  de: {
    fieldEdition: 'Feldausgabe', terms: 'Begriffe', searchPlaceholder: 'The AI Almanac fragen oder einen Begriff suchen…', searchLabel: 'The AI Almanac durchsuchen', page: 'Seite', dictionary: 'Wörterbuch', plain: 'Einfach erklärt', technical: 'Technisch', vibe: 'Vibe Coder', origin: 'Ursprung', inPractice: 'In der Praxis', addCollection: '+ zur Sammlung hinzufügen', saveEntry: 'Eintrag speichern', copyLink: 'Link kopieren', timeline: 'Zeitleiste', recentTerms: 'Letzte Begriffe', clearList: 'Liste leeren', seeAlso: 'Siehe auch', compare: 'Vergleichen', confused: 'Oft verwechselt mit', filedUnder: 'Eingeordnet unter', marginalia: 'Marginalia', previous: 'Zurück', next: 'Weiter', noExactMatch: 'Keine genaue Übereinstimmung', tryIdea: 'Versuche die Idee hinter deiner Frage:', clearSearch: 'Suche löschen'
  },
  hi: {
    fieldEdition: 'फील्ड संस्करण', terms: 'शब्द', searchPlaceholder: 'The AI Almanac से पूछें या कोई शब्द खोजें…', searchLabel: 'The AI Almanac में खोजें', page: 'पृष्ठ', dictionary: 'शब्दकोश', plain: 'सरल भाषा', technical: 'तकनीकी', vibe: 'Vibe Coder', origin: 'उत्पत्ति', inPractice: 'व्यवहार में', addCollection: '+ संग्रह में जोड़ें', saveEntry: 'प्रविष्टि सहेजें', copyLink: 'लिंक कॉपी करें', timeline: 'समयरेखा', recentTerms: 'हाल के शब्द', clearList: 'सूची साफ़ करें', seeAlso: 'यह भी देखें', compare: 'तुलना करें', confused: 'अक्सर इससे भ्रमित होता है', filedUnder: 'श्रेणी', marginalia: 'हाशिया टिप्पणी', previous: 'पिछला', next: 'अगला', noExactMatch: 'सटीक मिलान नहीं मिला', tryIdea: 'अपने प्रश्न के विचार से खोजें:', clearSearch: 'खोज साफ़ करें'
  }
};

const partTranslations: Record<LocalizedLocale, Record<string, string>> = {
  es: { noun: 'sustantivo', verb: 'verbo', adjective: 'adjetivo', phrase: 'frase', acronym: 'acrónimo' },
  pt: { noun: 'substantivo', verb: 'verbo', adjective: 'adjetivo', phrase: 'expressão', acronym: 'sigla' },
  it: { noun: 'sostantivo', verb: 'verbo', adjective: 'aggettivo', phrase: 'espressione', acronym: 'acronimo' },
  fr: { noun: 'nom', verb: 'verbe', adjective: 'adjectif', phrase: 'expression', acronym: 'acronyme' },
  de: { noun: 'Substantiv', verb: 'Verb', adjective: 'Adjektiv', phrase: 'Ausdruck', acronym: 'Akronym' },
  hi: { noun: 'संज्ञा', verb: 'क्रिया', adjective: 'विशेषण', phrase: 'वाक्यांश', acronym: 'संक्षिप्त रूप' }
};

function isLocalizedLocale(locale: SupportedLocale): locale is LocalizedLocale {
  return localizedLocales.includes(locale as LocalizedLocale);
}

function withBase(path: string): string {
  return getPublicPath(import.meta.env.BASE_URL || '/', path);
}

function decodeTermHash(hash: string): string | null {
  const match = hash.match(/(?:^#|&)term=([^&]+)/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1].replace(/\+/g, ' '));
  } catch {
    return null;
  }
}

function localizedHistoryUrl(locale: LocalizedLocale, rawUrl: string | URL | null | undefined): string | URL | null | undefined {
  if (rawUrl == null || typeof window === 'undefined') return rawUrl;

  const next = new URL(rawUrl.toString(), window.location.href);
  if (next.origin !== window.location.origin) return rawUrl;

  const key = decodeTermHash(next.hash);
  if (key) {
    const translatedPath = getLocalizedTermPath(locale, key);
    next.pathname = translatedPath ? withBase(translatedPath) : withBase(`${locale}/`);
    return `${next.pathname}${next.search}${next.hash}`;
  }

  if (next.hash === '#about') {
    next.pathname = withBase(`${locale}/`);
    return `${next.pathname}${next.search}${next.hash}`;
  }

  return rawUrl;
}

export function prepareLocalizedRuntime(locale: SupportedLocale, initialTermKey?: string): void {
  if (typeof window === 'undefined' || !isLocalizedLocale(locale)) return;

  const historyState = window.history as History & { __aiAlmanacLocalePatched?: boolean };
  const nativeReplace = window.history.replaceState.bind(window.history);

  if (initialTermKey && !decodeTermHash(window.location.hash)) {
    nativeReplace(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}#term=${encodeURIComponent(initialTermKey)}`
    );
  }

  if (historyState.__aiAlmanacLocalePatched) return;
  historyState.__aiAlmanacLocalePatched = true;

  const nativePush = window.history.pushState.bind(window.history);
  window.history.pushState = (data: unknown, unused: string, url?: string | URL | null) => {
    nativePush(data, unused, localizedHistoryUrl(locale, url));
  };
  window.history.replaceState = (data: unknown, unused: string, url?: string | URL | null) => {
    nativeReplace(data, unused, localizedHistoryUrl(locale, url));
  };
}

function setText(element: Element | null, value: string): void {
  if (element && element.textContent !== value) element.textContent = value;
}

function setAttribute(element: Element | null, name: string, value: string): void {
  if (element && element.getAttribute(name) !== value) element.setAttribute(name, value);
}

function localizePage(page: Element, locale: LocalizedLocale): void {
  const strings = ui[locale];
  const entries = getLocalizedEntries(locale);
  const word = page.querySelector('.word');
  const rawWord = word?.textContent?.trim().toLowerCase() || '';
  const entry = entries.find((item) => item.key.toLowerCase() === rawWord || item.word.toLowerCase() === rawWord);

  if (entry) {
    // AI vocabulary is commonly used in English. Keep the canonical term while localizing its explanation.
    setText(word, entry.key);
    const dictionarySelected = page.querySelector('#mode-tab-dictionary')?.getAttribute('aria-selected') === 'true';
    if (dictionarySelected) setText(page.querySelector('.definition'), entry.definition);

    const lowerParagraphs = page.querySelectorAll('.lower-grid p');
    if (lowerParagraphs[1]) setText(lowerParagraphs[1], entry.note);

    const note = page.querySelector('.margin-note:not(.search-note) p');
    if (note) setText(note, entry.note);
  }

  const part = page.querySelector('.headword-line .part');
  const partKey = part?.textContent?.trim().toLowerCase() || '';
  const partValue = partTranslations[locale][partKey];
  if (partValue) setText(part, partValue);

  const edition = page.querySelector('.edition');
  const editionMatch = edition?.textContent?.match(/v([\d.]+).*?(\d+)/);
  if (editionMatch) setText(edition, `${strings.fieldEdition} · v${editionMatch[1]} · ${editionMatch[2]} ${strings.terms}`);

  const search = page.querySelector<HTMLInputElement>('.search-box input');
  if (search) {
    if (search.placeholder !== strings.searchPlaceholder) search.placeholder = strings.searchPlaceholder;
    setAttribute(search, 'aria-label', strings.searchLabel);
  }

  const pageNumberElements = [page.querySelector('.folio-top'), page.querySelector('#pageNumber')];
  pageNumberElements.forEach((element) => {
    const number = element?.textContent?.match(/\d+/)?.[0];
    if (number) setText(element, `${strings.page} ${number}`);
  });

  const modeLabels: Record<string, string> = {
    dictionary: strings.dictionary,
    plain: strings.plain,
    technical: strings.technical,
    vibe: strings.vibe
  };
  Object.entries(modeLabels).forEach(([mode, label]) => setText(page.querySelector(`#mode-tab-${mode}`), label));
  const selectedMode = page.querySelector('[id^="mode-tab-"][aria-selected="true"]')?.id.replace('mode-tab-', '');
  if (selectedMode && modeLabels[selectedMode]) setText(page.querySelector('.definition-mode'), modeLabels[selectedMode]);

  const lowerHeadings = page.querySelectorAll('.lower-grid .kicker');
  if (lowerHeadings[0]) setText(lowerHeadings[0], strings.origin);
  if (lowerHeadings[1]) setText(lowerHeadings[1], strings.inPractice);

  setText(page.querySelector('#addCollection'), strings.addCollection);
  setText(page.querySelector('#clipEntry'), strings.saveEntry);
  setText(page.querySelector('#copyDeepLink'), strings.copyLink);
  setText(page.querySelector('#openChronology'), strings.timeline);
  setText(page.querySelector('.thread-title'), strings.recentTerms);
  setText(page.querySelector('#clearThread'), strings.clearList);

  const headingMap: Record<string, string> = {
    'See also': strings.seeAlso,
    Compare: strings.compare,
    'Often confused with': strings.confused,
    'Filed under': strings.filedUnder,
    Marginalia: strings.marginalia
  };
  page.querySelectorAll('.margin-section h3, .margin-note strong').forEach((heading) => {
    const translated = headingMap[heading.textContent?.trim() || ''];
    if (translated) setText(heading, translated);
  });

  const previous = page.querySelector<HTMLButtonElement>('#prevDefBtn');
  if (previous) {
    const value = `← ${strings.previous}`;
    if (previous.textContent?.replace(/\s+/g, ' ').trim() !== value) previous.innerHTML = `<span class="nav-arrow">←</span> ${strings.previous}`;
    setAttribute(previous, 'aria-label', strings.previous);
  }

  const next = page.querySelector<HTMLButtonElement>('#nextDefBtn');
  if (next) {
    const value = `${strings.next} →`;
    if (next.textContent?.replace(/\s+/g, ' ').trim() !== value) next.innerHTML = `${strings.next} <span class="nav-arrow">→</span>`;
    setAttribute(next, 'aria-label', strings.next);
  }

  const empty = page.querySelector('.suggestion-empty');
  if (empty) {
    setText(empty.querySelector('strong'), strings.noExactMatch);
    const statusSpans = empty.querySelectorAll('p span');
    if (statusSpans[0]) setText(statusSpans[0], strings.tryIdea);
    setText(empty.querySelector('.suggestion-clear'), strings.clearSearch);
  }
}

export function startLocalizedDomSync(locale: SupportedLocale): () => void {
  if (typeof window === 'undefined' || !isLocalizedLocale(locale)) return () => {};

  const root = document.getElementById('root');
  if (!root) return () => {};

  let frame = 0;
  const sync = () => {
    frame = 0;
    root.querySelectorAll('.page-inner').forEach((page) => localizePage(page, locale));
  };
  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(sync);
  };

  sync();
  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-selected'] });

  return () => {
    observer.disconnect();
    if (frame) window.cancelAnimationFrame(frame);
  };
}
