import { slugifyTerm } from '../utils/ogImage.ts';

export const localizedLocales = ['es', 'pt', 'it', 'fr', 'de', 'hi'] as const;
export const allLocaleCodes = ['en', ...localizedLocales] as const;

export type LocalizedLocale = (typeof localizedLocales)[number];
export type SupportedLocale = (typeof allLocaleCodes)[number];

export interface LocaleMeta {
  htmlLang: string;
  ogLocale: string;
  nativeName: string;
  shortName: string;
  siteDescription: string;
  homeHeading: string;
  homeIntro: string;
  definitionLabel: string;
  noteLabel: string;
  englishLabel: string;
  openEnglishLabel: string;
  availableTermsLabel: string;
  translationNotice: string;
  homeLinkLabel: string;
  languageLabel: string;
}

export interface LocalizedEntry {
  key: string;
  slug: string;
  word: string;
  definition: string;
  note: string;
}

export const localeMeta: Record<SupportedLocale, LocaleMeta> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    nativeName: 'English',
    shortName: 'EN',
    siteDescription: 'An evolving reference book for AI enthusiasts and vibe coders. Living dictionary of artificial intelligence concepts, architectures and practices.',
    homeHeading: 'The AI Almanac',
    homeIntro: 'A living dictionary for the language of artificial intelligence.',
    definitionLabel: 'Definition',
    noteLabel: 'In brief',
    englishLabel: 'English term',
    openEnglishLabel: 'Open the full English entry',
    availableTermsLabel: 'Translated starter terms',
    translationNotice: 'This language edition is expanding. Untranslated entries continue to use the full English dictionary.',
    homeLinkLabel: 'Language home',
    languageLabel: 'Language'
  },
  es: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    nativeName: 'Español',
    shortName: 'ES',
    siteDescription: 'Diccionario vivo de conceptos, arquitecturas y prácticas de inteligencia artificial para aprender IA con claridad.',
    homeHeading: 'Diccionario de IA en español',
    homeIntro: 'Una guía clara y práctica del vocabulario que define la inteligencia artificial moderna.',
    definitionLabel: 'Definición',
    noteLabel: 'En pocas palabras',
    englishLabel: 'Término en inglés',
    openEnglishLabel: 'Abrir la entrada completa en inglés',
    availableTermsLabel: 'Términos traducidos',
    translationNotice: 'Esta edición está creciendo. Las entradas todavía no traducidas siguen disponibles en el diccionario completo en inglés.',
    homeLinkLabel: 'Inicio en español',
    languageLabel: 'Idioma'
  },
  pt: {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    nativeName: 'Português',
    shortName: 'PT',
    siteDescription: 'Dicionário vivo de conceitos, arquiteturas e práticas de inteligência artificial em português do Brasil.',
    homeHeading: 'Dicionário de IA em português',
    homeIntro: 'Um guia claro e prático para o vocabulário que define a inteligência artificial moderna.',
    definitionLabel: 'Definição',
    noteLabel: 'Em resumo',
    englishLabel: 'Termo em inglês',
    openEnglishLabel: 'Abrir a entrada completa em inglês',
    availableTermsLabel: 'Termos traduzidos',
    translationNotice: 'Esta edição está crescendo. As entradas ainda não traduzidas continuam disponíveis no dicionário completo em inglês.',
    homeLinkLabel: 'Início em português',
    languageLabel: 'Idioma'
  },
  it: {
    htmlLang: 'it',
    ogLocale: 'it_IT',
    nativeName: 'Italiano',
    shortName: 'IT',
    siteDescription: 'Dizionario vivo di concetti, architetture e pratiche di intelligenza artificiale in italiano.',
    homeHeading: 'Dizionario di IA in italiano',
    homeIntro: 'Una guida chiara e pratica al vocabolario che definisce l’intelligenza artificiale moderna.',
    definitionLabel: 'Definizione',
    noteLabel: 'In breve',
    englishLabel: 'Termine inglese',
    openEnglishLabel: 'Apri la voce completa in inglese',
    availableTermsLabel: 'Termini tradotti',
    translationNotice: 'Questa edizione è in espansione. Le voci non ancora tradotte restano disponibili nel dizionario completo in inglese.',
    homeLinkLabel: 'Home in italiano',
    languageLabel: 'Lingua'
  },
  fr: {
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    nativeName: 'Français',
    shortName: 'FR',
    siteDescription: 'Dictionnaire vivant des concepts, architectures et pratiques de l’intelligence artificielle en français.',
    homeHeading: 'Dictionnaire de l’IA en français',
    homeIntro: 'Un guide clair et pratique du vocabulaire qui définit l’intelligence artificielle moderne.',
    definitionLabel: 'Définition',
    noteLabel: 'En bref',
    englishLabel: 'Terme anglais',
    openEnglishLabel: 'Ouvrir l’entrée complète en anglais',
    availableTermsLabel: 'Termes traduits',
    translationNotice: 'Cette édition est en cours d’extension. Les entrées pas encore traduites restent disponibles dans le dictionnaire complet en anglais.',
    homeLinkLabel: 'Accueil en français',
    languageLabel: 'Langue'
  },
  de: {
    htmlLang: 'de',
    ogLocale: 'de_DE',
    nativeName: 'Deutsch',
    shortName: 'DE',
    siteDescription: 'Lebendes Wörterbuch für Begriffe, Architekturen und Praktiken der künstlichen Intelligenz auf Deutsch.',
    homeHeading: 'KI-Wörterbuch auf Deutsch',
    homeIntro: 'Ein klarer und praxisnaher Leitfaden für die Begriffe der modernen künstlichen Intelligenz.',
    definitionLabel: 'Definition',
    noteLabel: 'Kurz gesagt',
    englishLabel: 'Englischer Begriff',
    openEnglishLabel: 'Vollständigen englischen Eintrag öffnen',
    availableTermsLabel: 'Übersetzte Begriffe',
    translationNotice: 'Diese Ausgabe wird laufend erweitert. Noch nicht übersetzte Einträge bleiben im vollständigen englischen Wörterbuch verfügbar.',
    homeLinkLabel: 'Deutsche Startseite',
    languageLabel: 'Sprache'
  },
  hi: {
    htmlLang: 'hi',
    ogLocale: 'hi_IN',
    nativeName: 'हिन्दी',
    shortName: 'HI',
    siteDescription: 'कृत्रिम बुद्धिमत्ता के प्रमुख शब्दों, आर्किटेक्चर और आधुनिक एआई प्रथाओं का हिन्दी शब्दकोश।',
    homeHeading: 'हिन्दी एआई शब्दकोश',
    homeIntro: 'आधुनिक कृत्रिम बुद्धिमत्ता की भाषा को सरल और व्यावहारिक तरीके से समझने के लिए एक जीवंत मार्गदर्शिका।',
    definitionLabel: 'परिभाषा',
    noteLabel: 'संक्षेप में',
    englishLabel: 'अंग्रेज़ी शब्द',
    openEnglishLabel: 'पूरा अंग्रेज़ी लेख खोलें',
    availableTermsLabel: 'अनुवादित प्रमुख शब्द',
    translationNotice: 'यह हिन्दी संस्करण लगातार बढ़ रहा है। जिन प्रविष्टियों का अनुवाद अभी नहीं हुआ है वे पूर्ण अंग्रेज़ी शब्दकोश में उपलब्ध हैं।',
    homeLinkLabel: 'हिन्दी होम',
    languageLabel: 'भाषा'
  }
};

export const localizedEntries: Record<LocalizedLocale, readonly LocalizedEntry[]> = {
  es: [
    {
      key: 'artificial intelligence', slug: 'inteligencia-artificial', word: 'inteligencia artificial',
      definition: 'Campo que desarrolla máquinas y software capaces de realizar tareas asociadas con la percepción, el razonamiento, el aprendizaje, la generación de contenido o la toma de decisiones.',
      note: 'Es el término general. El aprendizaje automático, la IA generativa y los sistemas agénticos son áreas o enfoques dentro de la IA.'
    },
    {
      key: 'machine learning', slug: 'aprendizaje-automatico', word: 'aprendizaje automático',
      definition: 'Enfoque de IA en el que un sistema aprende patrones a partir de datos para hacer predicciones, clasificaciones o decisiones sin programar cada regla de forma explícita.',
      note: 'El aprendizaje automático es una parte de la inteligencia artificial, no un sinónimo de todo el campo.'
    },
    {
      key: 'generative AI', slug: 'ia-generativa', word: 'IA generativa',
      definition: 'Sistemas de IA diseñados para crear texto, imágenes, audio, video, código u otros contenidos nuevos a partir de patrones aprendidos.',
      note: 'Generar contenido es una capacidad específica dentro de la IA y no describe todos los sistemas inteligentes.'
    },
    {
      key: 'large language model', slug: 'modelo-lenguaje-gran-tamano', word: 'modelo de lenguaje de gran tamaño (LLM)',
      definition: 'Modelo de lenguaje entrenado a gran escala para predecir y generar secuencias de tokens, normalmente con grandes cantidades de texto y código.',
      note: 'LLM describe una clase de modelo. Un producto de IA suele incluir además herramientas, memoria, búsqueda y lógica de aplicación.'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'prompt',
      definition: 'Instrucción, contexto, ejemplo o pregunta que se entrega a un modelo de IA para orientar la respuesta que produce.',
      note: 'Un buen prompt aclara el objetivo, las restricciones y el formato esperado.'
    },
    {
      key: 'token', slug: 'token', word: 'token',
      definition: 'Unidad pequeña de texto que procesa un modelo de lenguaje. Un token puede ser una palabra completa, parte de una palabra o un signo de puntuación.',
      note: 'Los tokens influyen en el límite de contexto, la latencia y con frecuencia el coste.'
    },
    {
      key: 'context window', slug: 'ventana-contexto', word: 'ventana de contexto',
      definition: 'Cantidad máxima de información que un modelo puede tener disponible al mismo tiempo al generar su siguiente respuesta.',
      note: 'Más contexto no siempre significa mejor contexto. La relevancia sigue siendo importante.'
    },
    {
      key: 'hallucination', slug: 'alucinacion-ia', word: 'alucinación de IA',
      definition: 'Respuesta de IA que parece segura y fluida pero contiene información inventada, no respaldada o incorrecta.',
      note: 'La fluidez no garantiza exactitud. Las afirmaciones importantes deben verificarse.'
    },
    {
      key: 'RAG', slug: 'generacion-aumentada-recuperacion-rag', word: 'generación aumentada por recuperación (RAG)',
      definition: 'Arquitectura en la que un sistema recupera información externa relevante y la añade al contexto del modelo antes de generar una respuesta.',
      note: 'RAG reduce la dependencia de la memoria del modelo pero no garantiza que la respuesta sea correcta.'
    },
    {
      key: 'agentic', slug: 'ia-agentica', word: 'IA agéntica',
      definition: 'Describe una IA que persigue un objetivo mediante varios pasos, elige acciones y usa herramientas con cierto grado de autonomía.',
      note: 'La diferencia clave es actuar y continuar un proceso, no limitarse a responder una sola vez.'
    }
  ],
  pt: [
    {
      key: 'artificial intelligence', slug: 'inteligencia-artificial', word: 'inteligência artificial',
      definition: 'Campo que desenvolve máquinas e software capazes de realizar tarefas ligadas à percepção, raciocínio, aprendizagem, geração de conteúdo ou tomada de decisão.',
      note: 'É o termo mais amplo. Aprendizado de máquina, IA generativa e sistemas agênticos são áreas ou abordagens dentro da IA.'
    },
    {
      key: 'machine learning', slug: 'aprendizado-de-maquina', word: 'aprendizado de máquina',
      definition: 'Abordagem de IA em que um sistema aprende padrões a partir de dados para fazer previsões, classificações ou decisões sem programar cada regra explicitamente.',
      note: 'Aprendizado de máquina faz parte da inteligência artificial e não é sinônimo de todo o campo.'
    },
    {
      key: 'generative AI', slug: 'ia-generativa', word: 'IA generativa',
      definition: 'Sistemas de IA projetados para criar novos textos, imagens, áudios, vídeos, códigos ou outros conteúdos a partir de padrões aprendidos.',
      note: 'Gerar conteúdo é uma capacidade específica da IA e não descreve todos os sistemas inteligentes.'
    },
    {
      key: 'large language model', slug: 'grande-modelo-de-linguagem', word: 'grande modelo de linguagem (LLM)',
      definition: 'Modelo de linguagem treinado em grande escala para prever e gerar sequências de tokens, normalmente usando grandes volumes de texto e código.',
      note: 'LLM descreve uma classe de modelo. Um produto de IA geralmente inclui também ferramentas, memória, busca e lógica de aplicação.'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'prompt',
      definition: 'Instrução, contexto, exemplo ou pergunta enviada a um modelo de IA para orientar a resposta que ele produz.',
      note: 'Um bom prompt deixa claros o objetivo, as restrições e o formato esperado.'
    },
    {
      key: 'token', slug: 'token', word: 'token',
      definition: 'Pequena unidade de texto processada por um modelo de linguagem. Um token pode ser uma palavra inteira, parte de uma palavra ou um sinal de pontuação.',
      note: 'Tokens afetam o limite de contexto, a latência e muitas vezes o custo.'
    },
    {
      key: 'context window', slug: 'janela-de-contexto', word: 'janela de contexto',
      definition: 'Quantidade máxima de informação que um modelo pode manter disponível ao mesmo tempo enquanto produz a próxima resposta.',
      note: 'Mais contexto não significa automaticamente contexto melhor. Relevância continua sendo essencial.'
    },
    {
      key: 'hallucination', slug: 'alucinacao-de-ia', word: 'alucinação de IA',
      definition: 'Resposta de IA que parece segura e fluida mas contém informação inventada, sem suporte ou incorreta.',
      note: 'Fluência não garante precisão. Afirmações importantes precisam ser verificadas.'
    },
    {
      key: 'RAG', slug: 'geracao-aumentada-por-recuperacao-rag', word: 'geração aumentada por recuperação (RAG)',
      definition: 'Arquitetura em que um sistema recupera informação externa relevante e adiciona esse material ao contexto do modelo antes de gerar uma resposta.',
      note: 'RAG reduz a dependência da memória do modelo mas não garante que a resposta esteja correta.'
    },
    {
      key: 'agentic', slug: 'ia-agentica', word: 'IA agêntica',
      definition: 'Descreve uma IA que persegue um objetivo em várias etapas, escolhe ações e usa ferramentas com algum grau de autonomia.',
      note: 'A diferença principal é agir e continuar um processo em vez de apenas responder uma vez.'
    }
  ],
  it: [
    {
      key: 'artificial intelligence', slug: 'intelligenza-artificiale', word: 'intelligenza artificiale',
      definition: 'Campo che sviluppa macchine e software capaci di svolgere compiti legati a percezione, ragionamento, apprendimento, generazione di contenuti o decisioni.',
      note: 'È il termine più ampio. Apprendimento automatico, IA generativa e sistemi agentici sono aree o approcci che rientrano nell’IA.'
    },
    {
      key: 'machine learning', slug: 'apprendimento-automatico', word: 'apprendimento automatico',
      definition: 'Approccio all’IA in cui un sistema apprende schemi dai dati per fare previsioni, classificazioni o decisioni senza programmare esplicitamente ogni regola.',
      note: 'L’apprendimento automatico è una parte dell’intelligenza artificiale e non un sinonimo dell’intero campo.'
    },
    {
      key: 'generative AI', slug: 'ia-generativa', word: 'IA generativa',
      definition: 'Sistemi di IA progettati per creare nuovo testo, immagini, audio, video, codice o altri contenuti a partire da schemi appresi.',
      note: 'La generazione di contenuti è una capacità specifica dell’IA e non descrive tutti i sistemi intelligenti.'
    },
    {
      key: 'large language model', slug: 'modello-linguistico-grandi-dimensioni', word: 'modello linguistico di grandi dimensioni (LLM)',
      definition: 'Modello linguistico addestrato su larga scala per prevedere e generare sequenze di token, in genere usando grandi quantità di testo e codice.',
      note: 'LLM indica una classe di modello. Un prodotto di IA comprende spesso anche strumenti, memoria, ricerca e logica applicativa.'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'prompt',
      definition: 'Istruzione, contesto, esempio o domanda fornita a un modello di IA per orientare la risposta che produce.',
      note: 'Un buon prompt chiarisce l’obiettivo, i vincoli e il formato atteso.'
    },
    {
      key: 'token', slug: 'token', word: 'token',
      definition: 'Piccola unità di testo elaborata da un modello linguistico. Un token può essere una parola intera, parte di una parola o un segno di punteggiatura.',
      note: 'I token influenzano il limite di contesto, la latenza e spesso il costo.'
    },
    {
      key: 'context window', slug: 'finestra-di-contesto', word: 'finestra di contesto',
      definition: 'Quantità massima di informazioni che un modello può avere disponibili nello stesso momento mentre genera la risposta successiva.',
      note: 'Più contesto non significa automaticamente contesto migliore. La rilevanza resta fondamentale.'
    },
    {
      key: 'hallucination', slug: 'allucinazione-ia', word: 'allucinazione dell’IA',
      definition: 'Risposta di IA che appare sicura e scorrevole ma contiene informazioni inventate, non supportate o errate.',
      note: 'La fluidità non garantisce accuratezza. Le affermazioni importanti vanno verificate.'
    },
    {
      key: 'RAG', slug: 'generazione-aumentata-dal-recupero-rag', word: 'generazione aumentata dal recupero (RAG)',
      definition: 'Architettura in cui un sistema recupera informazioni esterne rilevanti e le aggiunge al contesto del modello prima di generare una risposta.',
      note: 'RAG riduce la dipendenza dalla memoria del modello ma non garantisce che la risposta sia corretta.'
    },
    {
      key: 'agentic', slug: 'ia-agentica', word: 'IA agentica',
      definition: 'Descrive un’IA che persegue un obiettivo attraverso più passaggi, sceglie azioni e usa strumenti con un certo grado di autonomia.',
      note: 'La differenza principale è agire e continuare un processo invece di limitarsi a una singola risposta.'
    }
  ],
  fr: [
    {
      key: 'artificial intelligence', slug: 'intelligence-artificielle', word: 'intelligence artificielle',
      definition: 'Domaine qui développe des machines et des logiciels capables d’accomplir des tâches liées à la perception, au raisonnement, à l’apprentissage, à la génération de contenu ou à la prise de décision.',
      note: 'C’est le terme le plus large. L’apprentissage automatique, l’IA générative et les systèmes agentiques sont des domaines ou approches de l’IA.'
    },
    {
      key: 'machine learning', slug: 'apprentissage-automatique', word: 'apprentissage automatique',
      definition: 'Approche de l’IA dans laquelle un système apprend des motifs à partir de données afin de produire des prédictions, des classifications ou des décisions sans programmer explicitement chaque règle.',
      note: 'L’apprentissage automatique fait partie de l’intelligence artificielle et ne désigne pas l’ensemble du domaine.'
    },
    {
      key: 'generative AI', slug: 'ia-generative', word: 'IA générative',
      definition: 'Systèmes d’IA conçus pour créer de nouveaux textes, images, contenus audio, vidéos, codes ou autres contenus à partir de motifs appris.',
      note: 'La génération de contenu est une capacité particulière de l’IA et ne décrit pas tous les systèmes intelligents.'
    },
    {
      key: 'large language model', slug: 'grand-modele-de-langage', word: 'grand modèle de langage (LLM)',
      definition: 'Modèle de langage entraîné à grande échelle pour prédire et générer des séquences de tokens, généralement à partir de grandes quantités de texte et de code.',
      note: 'LLM décrit une classe de modèle. Un produit d’IA comprend souvent aussi des outils, de la mémoire, de la recherche et de la logique applicative.'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'prompt',
      definition: 'Instruction, contexte, exemple ou question fournie à un modèle d’IA afin d’orienter la réponse qu’il produit.',
      note: 'Un bon prompt précise l’objectif, les contraintes et le format attendu.'
    },
    {
      key: 'token', slug: 'token', word: 'token',
      definition: 'Petite unité de texte traitée par un modèle de langage. Un token peut être un mot entier, une partie de mot ou un signe de ponctuation.',
      note: 'Les tokens influencent la limite de contexte, la latence et souvent le coût.'
    },
    {
      key: 'context window', slug: 'fenetre-de-contexte', word: 'fenêtre de contexte',
      definition: 'Quantité maximale d’informations qu’un modèle peut garder disponibles en même temps lorsqu’il produit sa prochaine réponse.',
      note: 'Davantage de contexte ne signifie pas automatiquement un meilleur contexte. La pertinence reste essentielle.'
    },
    {
      key: 'hallucination', slug: 'hallucination-ia', word: 'hallucination de l’IA',
      definition: 'Réponse d’IA qui paraît sûre et fluide mais contient des informations inventées, non étayées ou incorrectes.',
      note: 'La fluidité ne garantit pas l’exactitude. Les affirmations importantes doivent être vérifiées.'
    },
    {
      key: 'RAG', slug: 'generation-augmentee-recuperation-rag', word: 'génération augmentée par récupération (RAG)',
      definition: 'Architecture dans laquelle un système récupère des informations externes pertinentes et les ajoute au contexte du modèle avant de générer une réponse.',
      note: 'RAG réduit la dépendance à la mémoire du modèle mais ne garantit pas que la réponse soit correcte.'
    },
    {
      key: 'agentic', slug: 'ia-agentique', word: 'IA agentique',
      definition: 'Décrit une IA qui poursuit un objectif en plusieurs étapes, choisit des actions et utilise des outils avec un certain degré d’autonomie.',
      note: 'La différence principale est d’agir et de poursuivre un processus au lieu de simplement répondre une fois.'
    }
  ],
  de: [
    {
      key: 'artificial intelligence', slug: 'kuenstliche-intelligenz', word: 'künstliche Intelligenz',
      definition: 'Fachgebiet zur Entwicklung von Maschinen und Software, die Aufgaben aus Wahrnehmung, Schlussfolgern, Lernen, Inhaltserzeugung oder Entscheidungsfindung ausführen können.',
      note: 'Dies ist der Oberbegriff. Maschinelles Lernen, generative KI und agentische Systeme sind Bereiche oder Ansätze innerhalb der KI.'
    },
    {
      key: 'machine learning', slug: 'maschinelles-lernen', word: 'maschinelles Lernen',
      definition: 'KI-Ansatz, bei dem ein System Muster aus Daten lernt und daraus Vorhersagen, Klassifikationen oder Entscheidungen ableitet, ohne jede Regel ausdrücklich zu programmieren.',
      note: 'Maschinelles Lernen ist ein Teilgebiet der künstlichen Intelligenz und kein Synonym für das gesamte Feld.'
    },
    {
      key: 'generative AI', slug: 'generative-ki', word: 'generative KI',
      definition: 'KI-Systeme, die aus gelernten Mustern neue Texte, Bilder, Audiodaten, Videos, Code oder andere Inhalte erzeugen.',
      note: 'Das Erzeugen von Inhalten ist eine bestimmte KI-Fähigkeit und beschreibt nicht jedes intelligente System.'
    },
    {
      key: 'large language model', slug: 'grosses-sprachmodell', word: 'großes Sprachmodell (LLM)',
      definition: 'Sprachmodell, das in großem Maßstab trainiert wurde, um Tokenfolgen vorherzusagen und zu erzeugen, meist mit sehr großen Mengen an Text und Code.',
      note: 'LLM bezeichnet eine Modellklasse. Ein KI-Produkt enthält häufig zusätzlich Werkzeuge, Speicher, Suche und Anwendungslogik.'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'Prompt',
      definition: 'Anweisung, Kontext, Beispiel oder Frage, die einem KI-Modell gegeben wird, um seine Ausgabe zu steuern.',
      note: 'Ein guter Prompt macht Ziel, Einschränkungen und erwartetes Format klar.'
    },
    {
      key: 'token', slug: 'token', word: 'Token',
      definition: 'Kleine Texteinheit, die von einem Sprachmodell verarbeitet wird. Ein Token kann ein ganzes Wort, ein Wortteil oder ein Satzzeichen sein.',
      note: 'Tokens beeinflussen Kontextgrenzen, Latenz und häufig die Kosten.'
    },
    {
      key: 'context window', slug: 'kontextfenster', word: 'Kontextfenster',
      definition: 'Maximale Menge an Informationen, die einem Modell gleichzeitig zur Verfügung stehen kann, während es die nächste Antwort erzeugt.',
      note: 'Mehr Kontext ist nicht automatisch besserer Kontext. Relevanz bleibt entscheidend.'
    },
    {
      key: 'hallucination', slug: 'ki-halluzination', word: 'KI-Halluzination',
      definition: 'KI-Antwort, die sicher und flüssig wirkt aber erfundene, unbelegte oder falsche Informationen enthält.',
      note: 'Flüssige Sprache garantiert keine Genauigkeit. Wichtige Aussagen sollten überprüft werden.'
    },
    {
      key: 'RAG', slug: 'retrieval-augmented-generation-rag', word: 'Retrieval-Augmented Generation (RAG)',
      definition: 'Architektur, bei der ein System relevante externe Informationen abruft und sie vor der Antworterzeugung in den Kontext des Modells einfügt.',
      note: 'RAG verringert die Abhängigkeit vom Modellgedächtnis aber garantiert keine korrekte Antwort.'
    },
    {
      key: 'agentic', slug: 'agentische-ki', word: 'agentische KI',
      definition: 'Beschreibt KI, die ein Ziel über mehrere Schritte verfolgt, Aktionen auswählt und Werkzeuge mit einem gewissen Maß an Autonomie verwendet.',
      note: 'Der zentrale Unterschied ist, dass das System handelt und einen Prozess fortsetzt statt nur einmal zu antworten.'
    }
  ],
  hi: [
    {
      key: 'artificial intelligence', slug: 'kritrim-buddhimatta', word: 'कृत्रिम बुद्धिमत्ता',
      definition: 'ऐसा क्षेत्र जिसमें मशीनों या सॉफ्टवेयर को धारणा, तर्क, सीखने, सामग्री बनाने या निर्णय लेने जैसे काम करने योग्य बनाया जाता है।',
      note: 'यह व्यापक शब्द है। मशीन लर्निंग, जनरेटिव एआई और एजेंटिक सिस्टम इसके भीतर आने वाले प्रमुख क्षेत्र या तरीके हैं।'
    },
    {
      key: 'machine learning', slug: 'machine-learning', word: 'मशीन लर्निंग',
      definition: 'एआई का वह तरीका जिसमें सिस्टम डेटा से पैटर्न सीखता है और हर नियम को अलग से प्रोग्राम किए बिना अनुमान, वर्गीकरण या निर्णय करता है।',
      note: 'मशीन लर्निंग कृत्रिम बुद्धिमत्ता का एक हिस्सा है, पूरे एआई क्षेत्र का दूसरा नाम नहीं।'
    },
    {
      key: 'generative AI', slug: 'generative-ai', word: 'जनरेटिव एआई',
      definition: 'ऐसे एआई सिस्टम जो सीखे हुए पैटर्न के आधार पर नया टेक्स्ट, चित्र, ऑडियो, वीडियो, कोड या अन्य सामग्री बनाते हैं।',
      note: 'नई सामग्री बनाना एआई की एक खास क्षमता है और यह हर एआई सिस्टम का वर्णन नहीं करता।'
    },
    {
      key: 'large language model', slug: 'large-language-model', word: 'लार्ज लैंग्वेज मॉडल (LLM)',
      definition: 'बड़े पैमाने पर प्रशिक्षित भाषा मॉडल जो टोकन की श्रृंखला का अनुमान लगाता है और नया टेक्स्ट या कोड उत्पन्न कर सकता है।',
      note: 'LLM एक मॉडल वर्ग है। पूरा एआई उत्पाद टूल, मेमोरी, सर्च और एप्लिकेशन लॉजिक भी शामिल कर सकता है।'
    },
    {
      key: 'prompt', slug: 'prompt', word: 'प्रॉम्प्ट',
      definition: 'वह निर्देश, संदर्भ, उदाहरण या प्रश्न जो एआई मॉडल को दिया जाता है ताकि उसके उत्तर की दिशा तय हो सके।',
      note: 'अच्छा प्रॉम्प्ट लक्ष्य, सीमाएं और अपेक्षित आउटपुट फॉर्मेट स्पष्ट करता है।'
    },
    {
      key: 'token', slug: 'token', word: 'टोकन',
      definition: 'टेक्स्ट की छोटी इकाई जिसे भाषा मॉडल प्रोसेस करता है। एक टोकन पूरा शब्द, शब्द का हिस्सा या विराम चिह्न हो सकता है।',
      note: 'टोकन की संख्या कॉन्टेक्स्ट सीमा, गति और अक्सर लागत को प्रभावित करती है।'
    },
    {
      key: 'context window', slug: 'context-window', word: 'कॉन्टेक्स्ट विंडो',
      definition: 'एक समय में मॉडल के सामने उपलब्ध रह सकने वाली जानकारी की अधिकतम मात्रा, जिसका उपयोग वह अगला उत्तर बनाने में करता है।',
      note: 'ज्यादा कॉन्टेक्स्ट हमेशा बेहतर नहीं होता। सही और प्रासंगिक जानकारी अधिक महत्वपूर्ण है।'
    },
    {
      key: 'hallucination', slug: 'ai-hallucination', word: 'एआई हैलुसिनेशन',
      definition: 'ऐसा एआई उत्तर जो आत्मविश्वासी और स्वाभाविक लगता है लेकिन उसमें गढ़ी हुई, असमर्थित या गलत जानकारी होती है।',
      note: 'स्वाभाविक भाषा सटीकता की गारंटी नहीं है। महत्वपूर्ण दावों की जांच करनी चाहिए।'
    },
    {
      key: 'RAG', slug: 'retrieval-augmented-generation-rag', word: 'रिट्रीवल ऑगमेंटेड जेनरेशन (RAG)',
      definition: 'ऐसा आर्किटेक्चर जिसमें सिस्टम पहले प्रासंगिक बाहरी जानकारी खोजता है और फिर उत्तर बनाने से पहले उसे मॉडल के संदर्भ में जोड़ता है।',
      note: 'RAG मॉडल की आंतरिक मेमोरी पर निर्भरता घटाता है लेकिन सही उत्तर की गारंटी नहीं देता।'
    },
    {
      key: 'agentic', slug: 'agentic-ai', word: 'एजेंटिक एआई',
      definition: 'ऐसी एआई क्षमता जिसमें सिस्टम लक्ष्य पूरा करने के लिए कई चरणों में काम करता है, कार्रवाई चुनता है और कुछ स्वायत्तता के साथ टूल इस्तेमाल करता है।',
      note: 'मुख्य अंतर यह है कि सिस्टम केवल एक उत्तर नहीं देता बल्कि कार्रवाई करता है और प्रक्रिया आगे बढ़ाता है।'
    }
  ]
};

export function getLocalizedEntries(locale: LocalizedLocale): readonly LocalizedEntry[] {
  return localizedEntries[locale];
}

export function getLocalizedEntryByKey(locale: LocalizedLocale, key: string): LocalizedEntry | null {
  return localizedEntries[locale].find((entry) => entry.key.toLowerCase() === key.toLowerCase()) || null;
}

export function getLocalizedEntryBySlug(locale: LocalizedLocale, slug: string): LocalizedEntry | null {
  return localizedEntries[locale].find((entry) => entry.slug === slug) || null;
}

export function getEnglishTermPath(key: string): string {
  return `term/${slugifyTerm(key)}/`;
}

export function getLocalizedTermPath(locale: LocalizedLocale, key: string): string | null {
  const entry = getLocalizedEntryByKey(locale, key);
  return entry ? `${locale}/term/${entry.slug}/` : null;
}

export function getLanguageSwitchPath(locale: SupportedLocale, key?: string): string {
  if (locale === 'en') return key ? getEnglishTermPath(key) : '';
  if (!key) return `${locale}/`;
  return getLocalizedTermPath(locale, key) || `${locale}/`;
}

function stripBasePath(pathname: string, baseUrl = '/'): string {
  const base = baseUrl.replace(/\/+$/, '');
  if (base && pathname === base) return '/';
  if (base && pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}

export function getLocaleFromPathname(pathname: string, baseUrl = '/'): SupportedLocale {
  const first = stripBasePath(pathname, baseUrl).replace(/^\/+/, '').split('/')[0] || '';
  return (localizedLocales as readonly string[]).includes(first) ? first as LocalizedLocale : 'en';
}

export function isAlmanacAppPath(pathname: string, baseUrl = '/'): boolean {
  const normalized = stripBasePath(pathname, baseUrl).replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/index.html' || normalized === '/about') return true;

  const segments = normalized.replace(/^\/+/, '').split('/');
  const isLocale = (value: string): value is LocalizedLocale =>
    (localizedLocales as readonly string[]).includes(value);

  if (segments.length === 1 && isLocale(segments[0])) return true;
  if (segments[0] === 'term' && Boolean(segments[1])) return true;
  if (isLocale(segments[0]) && segments[1] === 'term' && Boolean(segments[2])) return true;
  return false;
}

export function getHomeAlternateLinks(): Array<{ locale: SupportedLocale; path: string }> {
  return allLocaleCodes.map((locale) => ({
    locale,
    path: locale === 'en' ? '' : `${locale}/`
  }));
}

export function getTermAlternateLinks(key: string): Array<{ locale: SupportedLocale; path: string }> {
  const links: Array<{ locale: SupportedLocale; path: string }> = [
    { locale: 'en', path: getEnglishTermPath(key) }
  ];

  for (const locale of localizedLocales) {
    const path = getLocalizedTermPath(locale, key);
    if (path) links.push({ locale, path });
  }

  return links;
}
