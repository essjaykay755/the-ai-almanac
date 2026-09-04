import type { ExplanationMode, SpecialModes, Term } from '../types/almanac';
import { getExplanationForTerm } from '../utils/explanations';
import {
  getLocaleFromPathname,
  getLocalizedEntryByKey,
  localizedLocales,
  type LocalizedLocale,
  type SupportedLocale
} from './catalog';

export interface UiStrings {
  brandTagline: string;
  navSearch: string;
  navTutorial: string;
  navIndex: string;
  navBookmarks: string;
  navHistory: string;
  navTimeline: string;
  navCollections: string;
  navSurprise: string;
  navSave: string;
  navAbout: string;
  soundEffects: string;
  soundOn: string;
  soundOff: string;
  closeNavigation: string;
  openNavigation: string;
  closeSearch: string;
  openSearch: string;
  searchTerms: string;
  fieldEdition: string;
  terms: string;
  page: string;
  searchPlaceholder: string;
  searchLabel: string;
  searchSuggestions: string;
  noExactMatch: string;
  tryIdea: string;
  clearSearch: string;
  dictionary: string;
  plain: string;
  technical: string;
  vibe: string;
  explanationMode: string;
  origin: string;
  inPractice: string;
  addCollection: string;
  saveEntry: string;
  copyLink: string;
  recentTerms: string;
  clearList: string;
  seeAlso: string;
  compare: string;
  confused: string;
  filedUnder: string;
  marginalia: string;
  almanacSuggests: string;
  previous: string;
  next: string;
  bookmark: string;
  removeBookmark: string;
  bookmarkEntry: string;
  pronounce: string;
  suggested: string;
  entry: string;
  related: string;
  aboutTitle: string;
  aboutLede: string;
  madeWith: string;
  by: string;
  returnToBook: string;
  aiConcepts: string;
  searchExamples: [string, string, string];
  searchPointsToEntry: (query: string) => string;
}

const en: UiStrings = {
  brandTagline: 'An evolving reference book for AI enthusiasts & vibe coders',
  navSearch: 'Ask / Search', navTutorial: 'Play Tutorial', navIndex: 'Complete index', navBookmarks: 'Bookmarks',
  navHistory: 'Reading history', navTimeline: 'Timeline', navCollections: 'Collections', navSurprise: 'Surprise me',
  navSave: 'Save this entry', navAbout: 'About', soundEffects: 'Sound Effects', soundOn: 'On', soundOff: 'Off',
  closeNavigation: 'Close navigation menu', openNavigation: 'Open navigation menu', closeSearch: 'Close search',
  openSearch: 'Open search', searchTerms: 'Search terms', fieldEdition: 'Field edition', terms: 'terms', page: 'Page',
  searchPlaceholder: 'Ask The AI Almanac or search a term…', searchLabel: 'Search The AI Almanac', searchSuggestions: 'Search suggestions',
  noExactMatch: 'No exact match', tryIdea: 'Try the idea behind your question:', clearSearch: 'Clear search',
  dictionary: 'Dictionary', plain: 'Plain English', technical: 'Technical', vibe: 'Vibe Coder', explanationMode: 'Explanation mode',
  origin: 'Origin', inPractice: 'In practice', addCollection: '+ add to collection', saveEntry: 'save entry', copyLink: 'copy link',
  recentTerms: 'Recent terms', clearList: 'Clear list', seeAlso: 'See also', compare: 'Compare', confused: 'Often confused with',
  filedUnder: 'Filed under', marginalia: 'Marginalia', almanacSuggests: 'The Almanac suggests', previous: 'Previous', next: 'Next',
  bookmark: 'Bookmark', removeBookmark: 'Remove bookmark', bookmarkEntry: 'Bookmark this entry', pronounce: 'Pronounce',
  suggested: 'suggested', entry: 'entry', related: 'related', aboutTitle: 'A Field Guide to\nthe Language of AI.',
  aboutLede: 'An evolving reference book for AI enthusiasts & vibe coders.', madeWith: 'Made with', by: 'by', returnToBook: 'Return to the book',
  aiConcepts: 'AI Concepts', searchExamples: ['What makes AI invent answers?', 'How much can a model remember?', 'What is RAG?'],
  searchPointsToEntry: (query) => `“${query}” points most closely to this entry.`
};

const localized: Record<LocalizedLocale, UiStrings> = {
  es: {
    ...en,
    brandTagline: 'Un libro de referencia en evolución para entusiastas de la IA y vibe coders',
    navSearch: 'Preguntar / Buscar', navTutorial: 'Ver tutorial', navIndex: 'Índice completo', navBookmarks: 'Marcadores',
    navHistory: 'Historial de lectura', navTimeline: 'Cronología', navCollections: 'Colecciones', navSurprise: 'Sorpréndeme',
    navSave: 'Guardar esta entrada', navAbout: 'Acerca de', soundEffects: 'Efectos de sonido', soundOn: 'Sí', soundOff: 'No',
    closeNavigation: 'Cerrar menú de navegación', openNavigation: 'Abrir menú de navegación', closeSearch: 'Cerrar búsqueda', openSearch: 'Abrir búsqueda', searchTerms: 'Buscar términos',
    fieldEdition: 'Edición de campo', terms: 'términos', page: 'Página', searchPlaceholder: 'Pregunta a The AI Almanac o busca un término…', searchLabel: 'Buscar en The AI Almanac', searchSuggestions: 'Sugerencias de búsqueda',
    noExactMatch: 'Sin coincidencia exacta', tryIdea: 'Prueba con la idea de tu pregunta:', clearSearch: 'Limpiar búsqueda', dictionary: 'Diccionario', plain: 'Lenguaje sencillo', technical: 'Técnico', vibe: 'Vibe Coder', explanationMode: 'Modo de explicación',
    origin: 'Origen', inPractice: 'En la práctica', addCollection: '+ añadir a colección', saveEntry: 'guardar entrada', copyLink: 'copiar enlace', recentTerms: 'Términos recientes', clearList: 'Limpiar lista', seeAlso: 'Ver también', compare: 'Comparar', confused: 'A menudo se confunde con', filedUnder: 'Archivado en', marginalia: 'Marginalia', almanacSuggests: 'The Almanac sugiere', previous: 'Anterior', next: 'Siguiente',
    bookmark: 'Guardar marcador', removeBookmark: 'Quitar marcador', bookmarkEntry: 'Guardar esta entrada como marcador', pronounce: 'Pronunciar', suggested: 'sugerido', entry: 'entrada', related: 'relacionado',
    aboutTitle: 'Una guía de campo sobre\nel lenguaje de la IA.', aboutLede: 'Un libro de referencia en evolución para entusiastas de la IA y vibe coders.', madeWith: 'Hecho con', by: 'por', returnToBook: 'Volver al libro', aiConcepts: 'Conceptos de IA',
    searchExamples: ['¿Por qué la IA inventa respuestas?', '¿Cuánto puede recordar un modelo?', '¿Qué es RAG?'], searchPointsToEntry: (query) => `«${query}» apunta principalmente a esta entrada.`
  },
  pt: {
    ...en,
    brandTagline: 'Um livro de referência em evolução para entusiastas de IA e vibe coders',
    navSearch: 'Perguntar / Pesquisar', navTutorial: 'Ver tutorial', navIndex: 'Índice completo', navBookmarks: 'Favoritos', navHistory: 'Histórico de leitura', navTimeline: 'Linha do tempo', navCollections: 'Coleções', navSurprise: 'Surpreenda-me', navSave: 'Salvar esta entrada', navAbout: 'Sobre', soundEffects: 'Efeitos sonoros', soundOn: 'Ligado', soundOff: 'Desligado',
    closeNavigation: 'Fechar menu de navegação', openNavigation: 'Abrir menu de navegação', closeSearch: 'Fechar pesquisa', openSearch: 'Abrir pesquisa', searchTerms: 'Pesquisar termos', fieldEdition: 'Edição de campo', terms: 'termos', page: 'Página', searchPlaceholder: 'Pergunte ao The AI Almanac ou pesquise um termo…', searchLabel: 'Pesquisar no The AI Almanac', searchSuggestions: 'Sugestões de pesquisa',
    noExactMatch: 'Sem correspondência exata', tryIdea: 'Tente a ideia por trás da sua pergunta:', clearSearch: 'Limpar pesquisa', dictionary: 'Dicionário', plain: 'Linguagem simples', technical: 'Técnico', vibe: 'Vibe Coder', explanationMode: 'Modo de explicação', origin: 'Origem', inPractice: 'Na prática', addCollection: '+ adicionar à coleção', saveEntry: 'salvar entrada', copyLink: 'copiar link', recentTerms: 'Termos recentes', clearList: 'Limpar lista', seeAlso: 'Veja também', compare: 'Comparar', confused: 'Frequentemente confundido com', filedUnder: 'Arquivado em', marginalia: 'Marginalia', almanacSuggests: 'The Almanac sugere', previous: 'Anterior', next: 'Próximo',
    bookmark: 'Favoritar', removeBookmark: 'Remover favorito', bookmarkEntry: 'Salvar esta entrada nos favoritos', pronounce: 'Pronunciar', suggested: 'sugerido', entry: 'entrada', related: 'relacionado', aboutTitle: 'Um guia de campo para\na linguagem da IA.', aboutLede: 'Um livro de referência em evolução para entusiastas de IA e vibe coders.', madeWith: 'Feito com', by: 'por', returnToBook: 'Voltar ao livro', aiConcepts: 'Conceitos de IA',
    searchExamples: ['Por que a IA inventa respostas?', 'Quanto um modelo consegue lembrar?', 'O que é RAG?'], searchPointsToEntry: (query) => `“${query}” aponta mais diretamente para esta entrada.`
  },
  it: {
    ...en,
    brandTagline: 'Un libro di riferimento in evoluzione per appassionati di IA e vibe coder', navSearch: 'Chiedi / Cerca', navTutorial: 'Guarda tutorial', navIndex: 'Indice completo', navBookmarks: 'Segnalibri', navHistory: 'Cronologia di lettura', navTimeline: 'Cronologia', navCollections: 'Raccolte', navSurprise: 'Sorprendimi', navSave: 'Salva questa voce', navAbout: 'Informazioni', soundEffects: 'Effetti sonori', soundOn: 'Attivi', soundOff: 'Disattivi', closeNavigation: 'Chiudi menu di navigazione', openNavigation: 'Apri menu di navigazione', closeSearch: 'Chiudi ricerca', openSearch: 'Apri ricerca', searchTerms: 'Cerca termini',
    fieldEdition: 'Edizione da campo', terms: 'termini', page: 'Pagina', searchPlaceholder: 'Chiedi a The AI Almanac o cerca un termine…', searchLabel: 'Cerca in The AI Almanac', searchSuggestions: 'Suggerimenti di ricerca', noExactMatch: 'Nessuna corrispondenza esatta', tryIdea: 'Prova l’idea alla base della domanda:', clearSearch: 'Cancella ricerca', dictionary: 'Dizionario', plain: 'Linguaggio semplice', technical: 'Tecnico', vibe: 'Vibe Coder', explanationMode: 'Modalità di spiegazione', origin: 'Origine', inPractice: 'In pratica', addCollection: '+ aggiungi alla raccolta', saveEntry: 'salva voce', copyLink: 'copia link', recentTerms: 'Termini recenti', clearList: 'Svuota elenco', seeAlso: 'Vedi anche', compare: 'Confronta', confused: 'Spesso confuso con', filedUnder: 'Archiviato in', marginalia: 'Marginalia', almanacSuggests: 'The Almanac suggerisce', previous: 'Precedente', next: 'Successivo', bookmark: 'Aggiungi segnalibro', removeBookmark: 'Rimuovi segnalibro', bookmarkEntry: 'Salva questa voce nei segnalibri', pronounce: 'Pronuncia', suggested: 'suggerito', entry: 'voce', related: 'correlato', aboutTitle: 'Una guida sul campo al\nlinguaggio dell’IA.', aboutLede: 'Un libro di riferimento in evoluzione per appassionati di IA e vibe coder.', madeWith: 'Creato con', by: 'da', returnToBook: 'Torna al libro', aiConcepts: 'Concetti di IA', searchExamples: ['Perché l’IA inventa risposte?', 'Quanto può ricordare un modello?', 'Che cos’è RAG?'], searchPointsToEntry: (query) => `“${query}” rimanda soprattutto a questa voce.`
  },
  fr: {
    ...en,
    brandTagline: 'Un ouvrage de référence évolutif pour les passionnés d’IA et les vibe coders', navSearch: 'Demander / Rechercher', navTutorial: 'Voir le tutoriel', navIndex: 'Index complet', navBookmarks: 'Favoris', navHistory: 'Historique de lecture', navTimeline: 'Chronologie', navCollections: 'Collections', navSurprise: 'Surprenez-moi', navSave: 'Enregistrer cette entrée', navAbout: 'À propos', soundEffects: 'Effets sonores', soundOn: 'Activés', soundOff: 'Désactivés', closeNavigation: 'Fermer le menu de navigation', openNavigation: 'Ouvrir le menu de navigation', closeSearch: 'Fermer la recherche', openSearch: 'Ouvrir la recherche', searchTerms: 'Rechercher des termes',
    fieldEdition: 'Édition de terrain', terms: 'termes', page: 'Page', searchPlaceholder: 'Interrogez The AI Almanac ou recherchez un terme…', searchLabel: 'Rechercher dans The AI Almanac', searchSuggestions: 'Suggestions de recherche', noExactMatch: 'Aucune correspondance exacte', tryIdea: 'Essayez l’idée derrière votre question :', clearSearch: 'Effacer la recherche', dictionary: 'Dictionnaire', plain: 'Langage simple', technical: 'Technique', vibe: 'Vibe Coder', explanationMode: 'Mode d’explication', origin: 'Origine', inPractice: 'En pratique', addCollection: '+ ajouter à une collection', saveEntry: 'enregistrer l’entrée', copyLink: 'copier le lien', recentTerms: 'Termes récents', clearList: 'Effacer la liste', seeAlso: 'Voir aussi', compare: 'Comparer', confused: 'Souvent confondu avec', filedUnder: 'Classé dans', marginalia: 'Marginalia', almanacSuggests: 'The Almanac suggère', previous: 'Précédent', next: 'Suivant', bookmark: 'Ajouter aux favoris', removeBookmark: 'Retirer des favoris', bookmarkEntry: 'Ajouter cette entrée aux favoris', pronounce: 'Prononcer', suggested: 'suggéré', entry: 'entrée', related: 'associé', aboutTitle: 'Un guide de terrain du\nlangage de l’IA.', aboutLede: 'Un ouvrage de référence évolutif pour les passionnés d’IA et les vibe coders.', madeWith: 'Créé avec', by: 'par', returnToBook: 'Retourner au livre', aiConcepts: 'Concepts d’IA', searchExamples: ['Pourquoi l’IA invente-t-elle des réponses ?', 'Combien un modèle peut-il mémoriser ?', 'Qu’est-ce que RAG ?'], searchPointsToEntry: (query) => `« ${query} » correspond le mieux à cette entrée.`
  },
  de: {
    ...en,
    brandTagline: 'Ein wachsendes Nachschlagewerk für KI-Begeisterte und Vibe Coder', navSearch: 'Fragen / Suchen', navTutorial: 'Tutorial ansehen', navIndex: 'Vollständiger Index', navBookmarks: 'Lesezeichen', navHistory: 'Leseverlauf', navTimeline: 'Zeitleiste', navCollections: 'Sammlungen', navSurprise: 'Überrasche mich', navSave: 'Diesen Eintrag speichern', navAbout: 'Über', soundEffects: 'Soundeffekte', soundOn: 'An', soundOff: 'Aus', closeNavigation: 'Navigationsmenü schließen', openNavigation: 'Navigationsmenü öffnen', closeSearch: 'Suche schließen', openSearch: 'Suche öffnen', searchTerms: 'Begriffe suchen',
    fieldEdition: 'Feldausgabe', terms: 'Begriffe', page: 'Seite', searchPlaceholder: 'The AI Almanac fragen oder einen Begriff suchen…', searchLabel: 'The AI Almanac durchsuchen', searchSuggestions: 'Suchvorschläge', noExactMatch: 'Keine genaue Übereinstimmung', tryIdea: 'Versuche die Idee hinter deiner Frage:', clearSearch: 'Suche löschen', dictionary: 'Wörterbuch', plain: 'Einfach erklärt', technical: 'Technisch', vibe: 'Vibe Coder', explanationMode: 'Erklärmodus', origin: 'Ursprung', inPractice: 'In der Praxis', addCollection: '+ zur Sammlung hinzufügen', saveEntry: 'Eintrag speichern', copyLink: 'Link kopieren', recentTerms: 'Letzte Begriffe', clearList: 'Liste leeren', seeAlso: 'Siehe auch', compare: 'Vergleichen', confused: 'Oft verwechselt mit', filedUnder: 'Eingeordnet unter', marginalia: 'Randnotiz', almanacSuggests: 'The Almanac empfiehlt', previous: 'Zurück', next: 'Weiter', bookmark: 'Lesezeichen setzen', removeBookmark: 'Lesezeichen entfernen', bookmarkEntry: 'Diesen Eintrag als Lesezeichen speichern', pronounce: 'Aussprechen', suggested: 'Vorschlag', entry: 'Eintrag', related: 'verwandt', aboutTitle: 'Ein Feldführer für die\nSprache der KI.', aboutLede: 'Ein wachsendes Nachschlagewerk für KI-Begeisterte und Vibe Coder.', madeWith: 'Erstellt mit', by: 'von', returnToBook: 'Zurück zum Buch', aiConcepts: 'KI-Konzepte', searchExamples: ['Warum erfindet KI Antworten?', 'Wie viel kann sich ein Modell merken?', 'Was ist RAG?'], searchPointsToEntry: (query) => `„${query}“ passt am besten zu diesem Eintrag.`
  },
  hi: {
    ...en,
    brandTagline: 'AI सीखने वालों और vibe coders के लिए लगातार विकसित होती संदर्भ पुस्तक', navSearch: 'पूछें / खोजें', navTutorial: 'ट्यूटोरियल देखें', navIndex: 'पूरा इंडेक्स', navBookmarks: 'बुकमार्क', navHistory: 'पढ़ने का इतिहास', navTimeline: 'समयरेखा', navCollections: 'संग्रह', navSurprise: 'कुछ नया दिखाएँ', navSave: 'यह प्रविष्टि सहेजें', navAbout: 'परिचय', soundEffects: 'ध्वनि प्रभाव', soundOn: 'चालू', soundOff: 'बंद', closeNavigation: 'नेविगेशन मेनू बंद करें', openNavigation: 'नेविगेशन मेनू खोलें', closeSearch: 'खोज बंद करें', openSearch: 'खोज खोलें', searchTerms: 'शब्द खोजें',
    fieldEdition: 'फील्ड संस्करण', terms: 'शब्द', page: 'पृष्ठ', searchPlaceholder: 'The AI Almanac से पूछें या कोई शब्द खोजें…', searchLabel: 'The AI Almanac में खोजें', searchSuggestions: 'खोज सुझाव', noExactMatch: 'सटीक मिलान नहीं मिला', tryIdea: 'अपने प्रश्न के विचार से खोजें:', clearSearch: 'खोज साफ़ करें', dictionary: 'शब्दकोश', plain: 'सरल भाषा', technical: 'तकनीकी', vibe: 'Vibe Coder', explanationMode: 'व्याख्या मोड', origin: 'उत्पत्ति', inPractice: 'व्यवहार में', addCollection: '+ संग्रह में जोड़ें', saveEntry: 'प्रविष्टि सहेजें', copyLink: 'लिंक कॉपी करें', recentTerms: 'हाल के शब्द', clearList: 'सूची साफ़ करें', seeAlso: 'यह भी देखें', compare: 'तुलना करें', confused: 'अक्सर इससे भ्रमित होता है', filedUnder: 'श्रेणी', marginalia: 'हाशिया टिप्पणी', almanacSuggests: 'The Almanac का सुझाव', previous: 'पिछला', next: 'अगला', bookmark: 'बुकमार्क करें', removeBookmark: 'बुकमार्क हटाएँ', bookmarkEntry: 'इस प्रविष्टि को बुकमार्क करें', pronounce: 'उच्चारण सुनें', suggested: 'सुझाव', entry: 'प्रविष्टि', related: 'संबंधित', aboutTitle: 'AI की भाषा के लिए\nएक फील्ड गाइड।', aboutLede: 'AI सीखने वालों और vibe coders के लिए लगातार विकसित होती संदर्भ पुस्तक।', madeWith: 'बनाया गया', by: 'द्वारा', returnToBook: 'पुस्तक पर वापस जाएँ', aiConcepts: 'AI अवधारणाएँ', searchExamples: ['AI गलत जवाब क्यों गढ़ता है?', 'मॉडल कितना याद रख सकता है?', 'RAG क्या है?'], searchPointsToEntry: (query) => `“${query}” इस प्रविष्टि से सबसे अधिक मेल खाता है।`
  },
  bn: {
    ...en,
    brandTagline: 'এআই অনুরাগী ও vibe coder-দের জন্য ক্রমশ বিকশিত একটি রেফারেন্স বই', navSearch: 'জিজ্ঞেস করুন / খুঁজুন', navTutorial: 'টিউটোরিয়াল দেখুন', navIndex: 'সম্পূর্ণ সূচি', navBookmarks: 'বুকমার্ক', navHistory: 'পড়ার ইতিহাস', navTimeline: 'সময়রেখা', navCollections: 'সংগ্রহ', navSurprise: 'চমকে দিন', navSave: 'এই এন্ট্রি সংরক্ষণ করুন', navAbout: 'পরিচিতি', soundEffects: 'শব্দ প্রভাব', soundOn: 'চালু', soundOff: 'বন্ধ', closeNavigation: 'নেভিগেশন মেনু বন্ধ করুন', openNavigation: 'নেভিগেশন মেনু খুলুন', closeSearch: 'খোঁজ বন্ধ করুন', openSearch: 'খোঁজ খুলুন', searchTerms: 'শব্দ খুঁজুন',
    fieldEdition: 'ফিল্ড সংস্করণ', terms: 'শব্দ', page: 'পৃষ্ঠা', searchPlaceholder: 'The AI Almanac-কে জিজ্ঞেস করুন বা কোনো শব্দ খুঁজুন…', searchLabel: 'The AI Almanac-এ খুঁজুন', searchSuggestions: 'খোঁজার পরামর্শ', noExactMatch: 'সঠিক মিল পাওয়া যায়নি', tryIdea: 'আপনার প্রশ্নের ধারণা দিয়ে খুঁজে দেখুন:', clearSearch: 'খোঁজ পরিষ্কার করুন', dictionary: 'অভিধান', plain: 'সহজ ভাষা', technical: 'প্রযুক্তিগত', vibe: 'Vibe Coder', explanationMode: 'ব্যাখ্যার ধরন', origin: 'উৎপত্তি', inPractice: 'ব্যবহারে', addCollection: '+ সংগ্রহে যোগ করুন', saveEntry: 'এন্ট্রি সংরক্ষণ করুন', copyLink: 'লিংক কপি করুন', recentTerms: 'সাম্প্রতিক শব্দ', clearList: 'তালিকা পরিষ্কার করুন', seeAlso: 'আরও দেখুন', compare: 'তুলনা করুন', confused: 'প্রায়ই যেটির সঙ্গে গুলিয়ে ফেলা হয়', filedUnder: 'শ্রেণি', marginalia: 'পার্শ্বটীকা', almanacSuggests: 'The Almanac-এর পরামর্শ', previous: 'আগের', next: 'পরের', bookmark: 'বুকমার্ক করুন', removeBookmark: 'বুকমার্ক সরান', bookmarkEntry: 'এই এন্ট্রিটি বুকমার্ক করুন', pronounce: 'উচ্চারণ শুনুন', suggested: 'প্রস্তাবিত', entry: 'এন্ট্রি', related: 'সম্পর্কিত', aboutTitle: 'এআই-এর ভাষার জন্য\nএকটি ফিল্ড গাইড।', aboutLede: 'এআই অনুরাগী ও vibe coder-দের জন্য ক্রমশ বিকশিত একটি রেফারেন্স বই।', madeWith: 'তৈরি হয়েছে', by: 'দ্বারা', returnToBook: 'বইয়ে ফিরে যান', aiConcepts: 'এআই ধারণা', searchExamples: ['এআই কেন বানানো উত্তর দেয়?', 'একটি মডেল কতটা মনে রাখতে পারে?', 'RAG কী?'], searchPointsToEntry: (query) => `“${query}” এই এন্ট্রিটির সঙ্গে সবচেয়ে বেশি মেলে।`
  }
};

const parts: Partial<Record<LocalizedLocale, Record<string, string>>> = {
  es: { noun: 'sustantivo', verb: 'verbo', adjective: 'adjetivo', phrase: 'frase', acronym: 'acrónimo' },
  pt: { noun: 'substantivo', verb: 'verbo', adjective: 'adjetivo', phrase: 'expressão', acronym: 'sigla' },
  it: { noun: 'sostantivo', verb: 'verbo', adjective: 'aggettivo', phrase: 'espressione', acronym: 'acronimo' },
  fr: { noun: 'nom', verb: 'verbe', adjective: 'adjectif', phrase: 'expression', acronym: 'acronyme' },
  de: { noun: 'Substantiv', verb: 'Verb', adjective: 'Adjektiv', phrase: 'Ausdruck', acronym: 'Akronym' },
  hi: { noun: 'संज्ञा', verb: 'क्रिया', adjective: 'विशेषण', phrase: 'वाक्यांश', acronym: 'संक्षिप्त रूप' },
  bn: { noun: 'বিশেষ্য', verb: 'ক্রিয়া', adjective: 'বিশেষণ', phrase: 'বাক্যাংশ', acronym: 'সংক্ষিপ্ত রূপ' }
};

const exampleByLocale: Record<LocalizedLocale, Record<string, string>> = {
  es: {
    'artificial intelligence': '“El equipo usó artificial intelligence para automatizar tareas que requerían percepción, razonamiento y generación.”',
    'machine learning': '“El sistema usó machine learning para aprender patrones a partir de ejemplos anteriores.”',
    'generative AI': '“El equipo usó generative AI para crear un primer borrador del contenido.”',
    'large language model': '“El producto envió la solicitud a un large language model para generar la respuesta.”',
    prompt: '“El prompt describía el objetivo, las restricciones y el formato esperado.”', token: '“El contexto largo consumió muchos tokens antes de que el modelo empezara a responder.”',
    'context window': '“Enviamos solo los archivos relevantes para no llenar la context window.”', hallucination: '“El modelo inventó un paquete inexistente: fue una hallucination.”',
    RAG: '“RAG recuperó la política actual antes de que el modelo redactara la respuesta.”', agentic: '“El flujo se volvió agentic cuando pudo elegir herramientas y continuar varios pasos por sí mismo.”'
  },
  pt: {
    'artificial intelligence': '“A equipe usou artificial intelligence para automatizar tarefas de percepção, raciocínio e geração.”', 'machine learning': '“O sistema usou machine learning para aprender padrões a partir de exemplos anteriores.”', 'generative AI': '“A equipe usou generative AI para criar um primeiro rascunho do conteúdo.”', 'large language model': '“O produto enviou a solicitação para um large language model gerar a resposta.”', prompt: '“O prompt descrevia o objetivo, as restrições e o formato esperado.”', token: '“O contexto longo consumiu muitos tokens antes de o modelo começar a responder.”', 'context window': '“Enviamos apenas os arquivos relevantes para não lotar a context window.”', hallucination: '“O modelo inventou o nome de um pacote inexistente: foi uma hallucination.”', RAG: '“RAG recuperou a política atual antes de o modelo redigir a resposta.”', agentic: '“O fluxo ficou agentic quando passou a escolher ferramentas e continuar várias etapas sozinho.”'
  },
  it: {
    'artificial intelligence': '“Il team ha usato artificial intelligence per automatizzare attività di percezione, ragionamento e generazione.”', 'machine learning': '“Il sistema ha usato machine learning per apprendere schemi dagli esempi precedenti.”', 'generative AI': '“Il team ha usato generative AI per creare una prima bozza del contenuto.”', 'large language model': '“Il prodotto ha inviato la richiesta a un large language model per generare la risposta.”', prompt: '“Il prompt specificava obiettivo, vincoli e formato previsto.”', token: '“Il contesto lungo ha consumato molti token prima che il modello iniziasse a rispondere.”', 'context window': '“Abbiamo inviato solo i file rilevanti per non riempire la context window.”', hallucination: '“Il modello ha inventato un pacchetto inesistente: era una hallucination.”', RAG: '“RAG ha recuperato la policy aggiornata prima che il modello scrivesse la risposta.”', agentic: '“Il flusso è diventato agentic quando ha iniziato a scegliere strumenti e proseguire autonomamente per più passaggi.”'
  },
  fr: {
    'artificial intelligence': '« L’équipe a utilisé artificial intelligence pour automatiser des tâches de perception, de raisonnement et de génération. »', 'machine learning': '« Le système a utilisé machine learning pour apprendre des motifs à partir d’exemples précédents. »', 'generative AI': '« L’équipe a utilisé generative AI pour créer une première version du contenu. »', 'large language model': '« Le produit a envoyé la requête à un large language model pour générer la réponse. »', prompt: '« Le prompt précisait l’objectif, les contraintes et le format attendu. »', token: '« Le long contexte a consommé beaucoup de tokens avant que le modèle commence à répondre. »', 'context window': '« Nous avons envoyé seulement les fichiers pertinents pour ne pas remplir la context window. »', hallucination: '« Le modèle a inventé le nom d’un paquet inexistant : c’était une hallucination. »', RAG: '« RAG a récupéré la politique actuelle avant que le modèle rédige la réponse. »', agentic: '« Le flux est devenu agentic lorsqu’il a pu choisir des outils et poursuivre plusieurs étapes de façon autonome. »'
  },
  de: {
    'artificial intelligence': '„Das Team nutzte artificial intelligence, um Aufgaben rund um Wahrnehmung, Schlussfolgern und Generierung zu automatisieren.“', 'machine learning': '„Das System nutzte machine learning, um Muster aus früheren Beispielen zu lernen.“', 'generative AI': '„Das Team nutzte generative AI, um einen ersten Entwurf des Inhalts zu erstellen.“', 'large language model': '„Das Produkt schickte die Anfrage an ein large language model, um die Antwort zu erzeugen.“', prompt: '„Der prompt beschrieb Ziel, Einschränkungen und das erwartete Ausgabeformat.“', token: '„Der lange Kontext verbrauchte viele tokens, bevor das Modell mit der Antwort begann.“', 'context window': '„Wir sendeten nur die relevanten Dateien, damit die context window nicht unnötig gefüllt wird.“', hallucination: '„Das Modell erfand einen nicht existierenden Paketnamen: eine hallucination.“', RAG: '„RAG holte die aktuelle Richtlinie, bevor das Modell die Antwort formulierte.“', agentic: '„Der Ablauf wurde agentic, als er Werkzeuge auswählen und mehrere Schritte selbstständig fortsetzen konnte.“'
  },
  hi: {
    'artificial intelligence': '“टीम ने perception, reasoning और generation जैसे कामों को automate करने के लिए artificial intelligence का उपयोग किया।”', 'machine learning': '“सिस्टम ने पुराने उदाहरणों से patterns सीखने के लिए machine learning का उपयोग किया।”', 'generative AI': '“टीम ने content का पहला draft बनाने के लिए generative AI का उपयोग किया।”', 'large language model': '“उत्पाद ने उत्तर बनाने के लिए request को large language model को भेजा।”', prompt: '“prompt में लक्ष्य, सीमाएँ और अपेक्षित output format साफ़ लिखा था।”', token: '“लंबे context ने मॉडल के उत्तर शुरू करने से पहले बहुत से tokens इस्तेमाल कर लिए।”', 'context window': '“हमने केवल जरूरी files भेजीं ताकि context window बेकार जानकारी से न भर जाए।”', hallucination: '“मॉडल ने एक ऐसा package name बना दिया जो था ही नहीं; यह hallucination था।”', RAG: '“RAG ने मॉडल के उत्तर लिखने से पहले मौजूदा policy खोज ली।”', agentic: '“workflow तब agentic हुआ जब वह tools चुनकर कई steps खुद आगे बढ़ा सका।”'
  },
  bn: {
    'artificial intelligence': '“দলটি উপলব্ধি, যুক্তি ও বিষয়বস্তু তৈরির কাজ স্বয়ংক্রিয় করতে artificial intelligence ব্যবহার করেছে।”', 'machine learning': '“সিস্টেমটি আগের উদাহরণ থেকে প্যাটার্ন শিখতে machine learning ব্যবহার করেছে।”', 'generative AI': '“দলটি বিষয়বস্তুর প্রথম খসড়া তৈরি করতে generative AI ব্যবহার করেছে।”', 'large language model': '“পণ্যটি উত্তর তৈরি করতে অনুরোধটি large language model-এ পাঠিয়েছে।”', prompt: '“prompt-এ লক্ষ্য, সীমাবদ্ধতা এবং প্রত্যাশিত আউটপুটের ধরন স্পষ্টভাবে লেখা ছিল।”', token: '“দীর্ঘ কনটেক্সটের কারণে মডেল উত্তর দেওয়ার আগেই অনেক token ব্যবহার হয়ে গিয়েছিল।”', 'context window': '“context window অপ্রয়োজনীয় তথ্যে ভরে না যায় বলে আমরা শুধু প্রাসঙ্গিক ফাইল পাঠিয়েছি।”', hallucination: '“মডেলটি এমন একটি প্যাকেজের নাম বানিয়েছে যার অস্তিত্ব নেই; এটি hallucination ছিল।”', RAG: '“মডেল উত্তর লেখার আগে RAG বর্তমান নীতিটি খুঁজে এনেছিল।”', agentic: '“ওয়ার্কফ্লোটি agentic হয়েছিল যখন সেটি নিজে টুল বেছে নিয়ে একাধিক ধাপ এগোতে পেরেছিল।”'
  }
};

const originByLocale: Record<LocalizedLocale, string> = {
  es: 'La forma inglesa es habitual en documentación técnica y en la práctica moderna de IA.',
  pt: 'A forma em inglês é comum na documentação técnica e na prática moderna de IA.',
  it: 'La forma inglese è comune nella documentazione tecnica e nella pratica moderna dell’IA.',
  fr: 'La forme anglaise reste courante dans la documentation technique et la pratique moderne de l’IA.',
  de: 'Die englische Form ist in technischer Dokumentation und moderner KI-Praxis üblich.',
  hi: 'तकनीकी documentation और आधुनिक AI practice में इसका English रूप आम तौर पर इस्तेमाल होता है।',
  bn: 'প্রযুক্তিগত নথি ও আধুনিক এআই চর্চায় এই ধারণার ইংরেজি নামটিই সাধারণত ব্যবহৃত হয়।'
};

const modeLead: Record<LocalizedLocale, { plain: string; technical: string; vibe: string }> = {
  es: { plain: 'En sencillo:', technical: 'En términos técnicos:', vibe: 'Para un vibe coder:' },
  pt: { plain: 'Em termos simples:', technical: 'Em termos técnicos:', vibe: 'Para um vibe coder:' },
  it: { plain: 'In parole semplici:', technical: 'In termini tecnici:', vibe: 'Per un vibe coder:' },
  fr: { plain: 'En termes simples :', technical: 'En termes techniques :', vibe: 'Pour un vibe coder :' },
  de: { plain: 'Einfach gesagt:', technical: 'Technisch formuliert:', vibe: 'Für einen Vibe Coder:' },
  hi: { plain: 'सरल शब्दों में:', technical: 'तकनीकी रूप से:', vibe: 'एक vibe coder के लिए:' },
  bn: { plain: 'সহজভাবে:', technical: 'প্রযুক্তিগতভাবে:', vibe: 'একজন vibe coder-এর জন্য:' }
};

function isLocalizedLocale(locale: SupportedLocale): locale is LocalizedLocale {
  return localizedLocales.includes(locale as LocalizedLocale);
}

export function getRuntimeLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'en';
  return getLocaleFromPathname(window.location.pathname, import.meta.env.BASE_URL || '/');
}

export function getUiStrings(locale: SupportedLocale = getRuntimeLocale()): UiStrings {
  return locale === 'en' ? en : localized[locale];
}

export interface LocalizedTermPresentation {
  word: string;
  part: string;
  definition: string;
  example: string;
  origin: string;
  note: string;
  category: string;
  translated: boolean;
}

export function getLocalizedTermPresentation(
  term: Term,
  mode: ExplanationMode,
  specialModes: SpecialModes,
  locale: SupportedLocale = getRuntimeLocale()
): LocalizedTermPresentation {
  if (!isLocalizedLocale(locale)) {
    return {
      word: term.word,
      part: term.part,
      definition: getExplanationForTerm(term, mode, specialModes),
      example: term.example || '',
      origin: term.origin || '',
      note: term.note || '',
      category: term.category || en.aiConcepts,
      translated: false
    };
  }

  const entry = getLocalizedEntryByKey(locale, term.word);
  if (!entry) {
    return {
      word: term.word,
      part: parts[locale]?.[term.part.toLowerCase()] || term.part,
      definition: getExplanationForTerm(term, mode, specialModes),
      example: term.example || '',
      origin: term.origin || '',
      note: term.note || '',
      category: term.category || localized[locale].aiConcepts,
      translated: false
    };
  }

  let definition = entry.definition;
  if (mode === 'plain') definition = `${modeLead[locale].plain} ${entry.definition}`;
  if (mode === 'technical') definition = `${modeLead[locale].technical} ${entry.definition}`;
  if (mode === 'vibe') definition = `${modeLead[locale].vibe} ${entry.note}`;

  return {
    word: entry.key,
    part: parts[locale]?.[term.part.toLowerCase()] || term.part,
    definition,
    example: exampleByLocale[locale][entry.key] || term.example || '',
    origin: originByLocale[locale],
    note: entry.note,
    category: term.category || localized[locale].aiConcepts,
    translated: true
  };
}

export function getModeLabels(locale: SupportedLocale = getRuntimeLocale()): Record<ExplanationMode, string> {
  const strings = getUiStrings(locale);
  return { dictionary: strings.dictionary, plain: strings.plain, technical: strings.technical, vibe: strings.vibe };
}
