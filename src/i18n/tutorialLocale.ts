import type { TutorialStep } from '../components/tutorialSteps';
import type { SupportedLocale } from './catalog';
import { getRuntimeLocale } from './reactLocale';

type TutorialCopy = Record<string, { title: string; body: string }>;

const copy: Partial<Record<SupportedLocale, TutorialCopy>> = {
  es: {
    replay: { title: 'Una guía que puedes repetir', body: 'Puedes volver a este recorrido cuando necesites un repaso. El resto del Almanac permanece intacto mientras la guía está abierta.' },
    language: { title: 'Elige tu idioma', body: 'Usa Idioma para elegir una edición manualmente o volver a Automático. Automático usa tu país según la IP cuando está disponible, India permanece en inglés y tu elección manual se recuerda.' },
    sidebar: { title: 'Tu estantería de navegación', body: 'Usa la barra lateral para buscar, explorar el índice completo, volver a marcadores e historial, abrir la cronología, gestionar colecciones, descubrir un término, guardar una entrada o leer Acerca de.' },
    search: { title: 'Pregunta o busca', body: 'Escribe un término o describe una idea con lenguaje natural. Las sugerencias aparecen al escribir y ⌘ K o Ctrl K enfoca la búsqueda desde cualquier lugar.' },
    entry: { title: 'Lee la entrada actual', body: 'Cada página incluye la definición, un ejemplo, el origen del término y cómo aparece en la práctica.' },
    modes: { title: 'Cambia el modo de explicación', body: 'Alterna entre Diccionario, Lenguaje sencillo, Técnico y Vibe Coder para ver la misma idea desde otro ángulo.' },
    bookmark: { title: 'Mantén cerca las entradas útiles', body: 'Usa la cinta de marcador para guardar la entrada actual. Tus entradas guardadas están disponibles en Marcadores.' },
    'entry-actions': { title: 'Guarda, organiza y comparte', body: 'Añade una entrada a una colección, guarda una copia diseñada, copia su enlace directo o abre su cronología desde estas acciones.' },
    references: { title: 'Sigue las referencias', body: 'El margen reúne términos relacionados, comparaciones, confusiones comunes y la categoría de la entrada actual.' },
    trail: { title: 'Retoma tu recorrido de lectura', body: 'Términos recientes mantiene cerca tus últimas paradas para volver a las ideas que estabas explorando.' },
    alphabet: { title: 'Salta por letra', body: 'La barra A–Z permite ir directamente al primer término disponible de cualquier letra.' },
    'page-navigation': { title: 'Pasa las páginas', body: 'Usa Anterior y Siguiente para recorrer el glosario. También funcionan las flechas izquierda y derecha, o P y N.' }
  },
  pt: {
    replay: { title: 'Um guia que você pode repetir', body: 'Volte a este passo a passo sempre que precisar relembrar. O restante do Almanac permanece intacto enquanto o guia estiver aberto.' },
    language: { title: 'Escolha seu idioma', body: 'Use Idioma para escolher uma edição manualmente ou voltar para Automático. O modo Automático usa seu país pelo IP quando disponível, a Índia permanece em inglês e sua escolha manual é lembrada.' },
    sidebar: { title: 'Sua estante de navegação', body: 'Use a barra lateral para pesquisar, abrir o índice completo, rever favoritos e histórico, acessar a linha do tempo, gerenciar coleções, descobrir um termo, salvar uma entrada ou abrir Sobre.' },
    search: { title: 'Pergunte ou pesquise', body: 'Digite um termo ou descreva uma ideia em linguagem natural. As sugestões aparecem enquanto você digita e ⌘ K ou Ctrl K leva o foco para a pesquisa.' },
    entry: { title: 'Leia a entrada atual', body: 'Cada página mostra a definição, um exemplo, a origem do termo e como ele aparece na prática.' },
    modes: { title: 'Mude o modo de explicação', body: 'Alterne entre Dicionário, Linguagem simples, Técnico e Vibe Coder para ver a mesma ideia por outro ângulo.' },
    bookmark: { title: 'Mantenha entradas úteis por perto', body: 'Use a fita de favorito para salvar a entrada atual. As entradas salvas ficam disponíveis em Favoritos.' },
    'entry-actions': { title: 'Salve, organize e compartilhe', body: 'Adicione uma entrada a uma coleção, salve uma cópia visual, copie o link direto ou abra a linha do tempo pelas ações da página.' },
    references: { title: 'Siga as referências', body: 'A margem reúne termos relacionados, comparações, confusões comuns e a categoria da entrada atual.' },
    trail: { title: 'Retome sua trilha de leitura', body: 'Termos recentes mantém suas últimas paradas por perto para você voltar às ideias que estava explorando.' },
    alphabet: { title: 'Pule por letra', body: 'A barra A–Z leva diretamente ao primeiro termo disponível em qualquer letra.' },
    'page-navigation': { title: 'Vire as páginas', body: 'Use Anterior e Próximo para percorrer o glossário. As setas esquerda e direita, ou P e N, também funcionam.' }
  },
  it: {
    replay: { title: 'Una guida che puoi ripetere', body: 'Puoi tornare a questa guida ogni volta che ti serve un ripasso. Il resto dell’Almanac rimane invariato mentre la guida è aperta.' },
    language: { title: 'Scegli la lingua', body: 'Usa Lingua per scegliere manualmente un’edizione o tornare ad Automatico. Automatico usa il paese rilevato dall’IP quando disponibile, l’India resta in inglese e la scelta manuale viene ricordata.' },
    sidebar: { title: 'Il tuo scaffale di navigazione', body: 'Usa la barra laterale per cercare, esplorare l’indice completo, rivedere segnalibri e cronologia, aprire la cronologia temporale, gestire raccolte, scoprire un termine, salvare una voce o leggere Informazioni.' },
    search: { title: 'Chiedi o cerca', body: 'Digita un termine o descrivi un’idea in linguaggio naturale. I suggerimenti appaiono mentre scrivi e ⌘ K o Ctrl K porta il focus alla ricerca.' },
    entry: { title: 'Leggi la voce corrente', body: 'Ogni pagina mostra la definizione, un esempio, l’origine del termine e come viene usato in pratica.' },
    modes: { title: 'Cambia modalità di spiegazione', body: 'Passa tra Dizionario, Linguaggio semplice, Tecnico e Vibe Coder per vedere la stessa idea da un’altra prospettiva.' },
    bookmark: { title: 'Tieni vicine le voci utili', body: 'Usa il segnalibro per salvare la voce corrente. Le voci salvate sono disponibili in Segnalibri.' },
    'entry-actions': { title: 'Salva, raccogli e condividi', body: 'Aggiungi una voce a una raccolta, salva una copia grafica, copia il link diretto o apri la cronologia dalle azioni della pagina.' },
    references: { title: 'Segui i riferimenti', body: 'Il margine raccoglie termini correlati, confronti, confusioni comuni e la categoria della voce corrente.' },
    trail: { title: 'Riprendi il percorso di lettura', body: 'Termini recenti mantiene vicine le ultime tappe così puoi tornare alle idee che stavi esplorando.' },
    alphabet: { title: 'Salta per lettera', body: 'La barra A–Z ti porta direttamente al primo termine disponibile per ogni lettera.' },
    'page-navigation': { title: 'Sfoglia le pagine', body: 'Usa Precedente e Successivo per muoverti nel glossario. Funzionano anche le frecce sinistra e destra, oppure P e N.' }
  },
  fr: {
    replay: { title: 'Un guide que vous pouvez relancer', body: 'Revenez à ce parcours dès que vous avez besoin d’un rappel. Le reste de l’Almanac reste intact pendant que le guide est ouvert.' },
    language: { title: 'Choisissez votre langue', body: 'Utilisez Langue pour choisir une édition manuellement ou revenir à Automatique. Automatique utilise votre pays détecté par IP quand il est disponible, l’Inde reste en anglais et votre choix manuel est mémorisé.' },
    sidebar: { title: 'Votre étagère de navigation', body: 'Utilisez la barre latérale pour rechercher, parcourir l’index complet, revoir favoris et historique, ouvrir la chronologie, gérer les collections, découvrir un terme, enregistrer une entrée ou lire À propos.' },
    search: { title: 'Demandez ou recherchez', body: 'Saisissez un terme ou décrivez une idée en langage naturel. Les suggestions apparaissent pendant la saisie et ⌘ K ou Ctrl K place le focus sur la recherche.' },
    entry: { title: 'Lisez l’entrée actuelle', body: 'Chaque page donne la définition, un exemple, l’origine du terme et son usage en pratique.' },
    modes: { title: 'Changez le mode d’explication', body: 'Passez entre Dictionnaire, Langage simple, Technique et Vibe Coder pour voir la même idée sous un autre angle.' },
    bookmark: { title: 'Gardez les entrées utiles à portée de main', body: 'Utilisez le ruban de favori pour enregistrer l’entrée actuelle. Vos entrées enregistrées sont disponibles dans Favoris.' },
    'entry-actions': { title: 'Enregistrez, classez et partagez', body: 'Ajoutez une entrée à une collection, enregistrez une copie mise en forme, copiez son lien direct ou ouvrez sa chronologie.' },
    references: { title: 'Suivez les références', body: 'La marge rassemble les termes associés, les comparaisons, les confusions courantes et la catégorie de l’entrée actuelle.' },
    trail: { title: 'Reprenez votre parcours de lecture', body: 'Termes récents garde vos dernières étapes à proximité afin de revenir aux idées explorées.' },
    alphabet: { title: 'Passez directement à une lettre', body: 'La barre A–Z permet d’aller au premier terme disponible sous n’importe quelle lettre.' },
    'page-navigation': { title: 'Tournez les pages', body: 'Utilisez Précédent et Suivant pour parcourir le glossaire. Les flèches gauche et droite, ou P et N, fonctionnent aussi.' }
  },
  de: {
    replay: { title: 'Eine Anleitung zum erneuten Abspielen', body: 'Du kannst jederzeit zu dieser Einführung zurückkehren. Der restliche Almanac bleibt unverändert, während die Anleitung geöffnet ist.' },
    language: { title: 'Sprache auswählen', body: 'Nutze Sprache, um eine Ausgabe manuell auszuwählen oder zu Automatisch zurückzukehren. Automatisch verwendet dein per IP erkanntes Land, Indien bleibt auf Englisch und deine manuelle Auswahl wird gespeichert.' },
    sidebar: { title: 'Deine Navigationsleiste', body: 'Nutze die Seitenleiste für Suche, vollständigen Index, Lesezeichen und Verlauf, Zeitleiste, Sammlungen, zufällige Begriffe, Speichern und die Über-Seite.' },
    search: { title: 'Fragen oder suchen', body: 'Gib einen Begriff ein oder beschreibe eine Idee in natürlicher Sprache. Vorschläge erscheinen während der Eingabe und ⌘ K oder Strg K fokussiert die Suche.' },
    entry: { title: 'Aktuellen Eintrag lesen', body: 'Jede Seite zeigt Definition, Beispiel, Herkunft des Begriffs und seine Verwendung in der Praxis.' },
    modes: { title: 'Erklärmodus wechseln', body: 'Wechsle zwischen Wörterbuch, Einfach erklärt, Technisch und Vibe Coder, um dieselbe Idee aus einem anderen Blickwinkel zu sehen.' },
    bookmark: { title: 'Nützliche Einträge griffbereit halten', body: 'Speichere den aktuellen Eintrag mit dem Lesezeichenband. Gespeicherte Einträge findest du unter Lesezeichen.' },
    'entry-actions': { title: 'Speichern, sammeln und teilen', body: 'Füge einen Eintrag einer Sammlung hinzu, speichere eine gestaltete Kopie, kopiere den Direktlink oder öffne die Zeitleiste.' },
    references: { title: 'Verweisen folgen', body: 'Der Rand sammelt verwandte Begriffe, Vergleiche, häufige Verwechslungen und die Kategorie des aktuellen Eintrags.' },
    trail: { title: 'Lesepfad wieder aufnehmen', body: 'Letzte Begriffe hält deine letzten Stationen bereit, damit du zu den erkundeten Ideen zurückkehren kannst.' },
    alphabet: { title: 'Nach Buchstaben springen', body: 'Über die A–Z-Leiste springst du direkt zum ersten verfügbaren Begriff eines Buchstabens.' },
    'page-navigation': { title: 'Seiten umblättern', body: 'Mit Zurück und Weiter bewegst du dich durch das Glossar. Auch die Pfeiltasten links und rechts oder P und N funktionieren.' }
  },
  hi: {
    replay: { title: 'इस गाइड को फिर से चला सकते हैं', body: 'जब भी दोबारा समझना हो, इस walkthrough पर वापस आएँ। गाइड खुला रहने पर बाकी Almanac वैसा ही रहता है।' },
    language: { title: 'अपनी भाषा चुनें', body: 'Language से कोई edition खुद चुनें या Automatic पर वापस जाएँ। Automatic उपलब्ध होने पर IP country का उपयोग करता है, India में English ही रहती है और आपकी manual choice याद रखी जाती है।' },
    sidebar: { title: 'आपकी navigation shelf', body: 'Sidebar से search करें, पूरा index देखें, bookmarks और history खोलें, timeline देखें, collections manage करें, कोई नया term खोजें, entry सहेजें या परिचय पढ़ें।' },
    search: { title: 'पूछें या खोजें', body: 'कोई term लिखें या अपनी बात सामान्य भाषा में बताएँ। टाइप करते समय suggestions दिखेंगे और ⌘ K या Ctrl K कहीं से भी search पर focus करता है।' },
    entry: { title: 'मौजूदा entry पढ़ें', body: 'हर page पर definition, example, term की origin और उसका practical use दिया गया है।' },
    modes: { title: 'Explanation mode बदलें', body: 'एक ही idea को अलग तरीके से समझने के लिए शब्दकोश, सरल भाषा, तकनीकी और Vibe Coder के बीच बदलें।' },
    bookmark: { title: 'काम की entries पास रखें', body: 'मौजूदा entry को सहेजने के लिए bookmark ribbon का उपयोग करें। सहेजी गई entries sidebar के Bookmarks में मिलेंगी।' },
    'entry-actions': { title: 'सहेजें, संग्रह करें और साझा करें', body: 'Entry को collection में जोड़ें, designed copy सहेजें, deep link कॉपी करें या page actions से timeline खोलें।' },
    references: { title: 'References को follow करें', body: 'Margin में related terms, comparisons, common confusions और मौजूदा entry की category दिखाई जाती है।' },
    trail: { title: 'अपना reading trail फिर पकड़ें', body: 'हाल के शब्द आपकी पिछली entries पास रखते हैं ताकि आप पहले देखे गए ideas पर वापस जा सकें।' },
    alphabet: { title: 'Letter से jump करें', body: 'A–Z rail से किसी भी अक्षर के पहले उपलब्ध term पर सीधे जा सकते हैं।' },
    'page-navigation': { title: 'Pages पलटें', body: 'Glossary में आगे-पीछे जाने के लिए पिछला और अगला इस्तेमाल करें। Left/right arrow keys या P और N भी काम करते हैं।' }
  }
};

export function localizeTutorialStep(step: TutorialStep, locale: SupportedLocale = getRuntimeLocale()): TutorialStep {
  const translated = copy[locale]?.[step.id];
  return translated ? { ...step, ...translated } : step;
}
