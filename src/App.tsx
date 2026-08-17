import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Term, ExplanationMode, OverlayType } from './types/almanac';
import { terms, sortedTerms, termsByWord, timeline } from './data/terms';
import { Cover } from './components/Cover';
import { Page } from './components/Page';
import { Tabs } from './components/Tabs';
import { EdgeMarkers } from './components/EdgeMarkers';
import { Stamp } from './components/Stamp';
import { MobileBar } from './components/MobileBar';
import { IndexOverlay } from './components/overlays/IndexOverlay';
import { ListOverlay } from './components/overlays/ListOverlay';
import { TimelineOverlay } from './components/overlays/TimelineOverlay';
import { CollectionsOverlay } from './components/overlays/CollectionsOverlay';
import { PickerOverlay } from './components/overlays/PickerOverlay';
import { ClipOverlay } from './components/overlays/ClipOverlay';
import {
  playPageTurnSound,
  playRiffleSound,
  playPaperSmallSound,
  playStampSound
} from './utils/sound';

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const App: React.FC = () => {
  // Date calculation
  const today = useMemo(() => new Date(), []);
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
      .format(today)
      .toUpperCase();
  }, [today]);

  // Daily Term
  const dailyTerm = useMemo(() => {
    const dayIndex =
      Math.abs(Number(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`)) %
      sortedTerms.length;
    return sortedTerms[dayIndex] || sortedTerms[0];
  }, [today]);

  // Read initial term from hash
  const getHashTerm = useCallback((): Term | null => {
    if (typeof window === 'undefined') return null;
    const match = window.location.hash.match(/(?:^#|&)term=([^&]+)/);
    if (!match) return null;
    try {
      const decoded = decodeURIComponent(match[1].replace(/\+/g, ' '));
      return termsByWord[decoded.toLowerCase()] || null;
    } catch {
      return null;
    }
  }, []);

  const [currentTerm, setCurrentTerm] = useState<Term>(() => {
    return getHashTerm() || termsByWord['vibe coding'] || sortedTerms[0];
  });

  const [explanationMode, setExplanationMode] = useState<ExplanationMode>('dictionary');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fromSearchQuestion, setFromSearchQuestion] = useState<string>('');
  const [trail, setTrail] = useState<string[]>([currentTerm.word]);

  // Persistent States
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    loadStorage<string[]>('aiAlmanacBookmarks', [])
  );
  const [historyTerms, setHistoryTerms] = useState<string[]>(() =>
    loadStorage<string[]>('aiAlmanacHistory', [currentTerm.word])
  );
  const [collections, setCollections] = useState<Record<string, string[]>>(() =>
    loadStorage<Record<string, string[]>>('aiAlmanacCollections', {
      'Vibe coder essentials': ['vibe coding', 'diff', 'ship loop', 'taste', 'eval'],
      'Agent rabbit hole': ['agentic', 'tool calling', 'workflow', 'reasoning', 'grounding']
    })
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() =>
    loadStorage<boolean>('aiAlmanacSound', false)
  );

  // Overlays & Stamp State
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [stampText, setStampText] = useState<string | null>(null);
  const [isStampVisible, setIsStampVisible] = useState(false);
  const stampTimerRef = useRef<number | null>(null);

  // Refs for 3D turn and Riffle animations
  const searchInputRef = useRef<HTMLInputElement>(null);
  const paperBlockRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const turnFxRef = useRef<HTMLDivElement>(null);
  const turnLeafRef = useRef<HTMLDivElement>(null);
  const turnFrontRef = useRef<HTMLDivElement>(null);
  const turnGhostRef = useRef<HTMLDivElement>(null);
  const turnShadeRef = useRef<HTMLDivElement>(null);
  const turnEdgeRef = useRef<HTMLDivElement>(null);
  const castShadowRef = useRef<HTMLDivElement>(null);
  const cornerCurlRef = useRef<HTMLDivElement>(null);
  const underGlowRef = useRef<HTMLDivElement>(null);
  const riffleStackRef = useRef<HTMLDivElement>(null);
  const isTurningRef = useRef<boolean>(false);

  // Compute depth and index
  const termIndex = useMemo(() => {
    const idx = sortedTerms.findIndex((t) => t.word === currentTerm.word);
    return idx >= 0 ? idx : 0;
  }, [currentTerm]);

  const availableLetters = useMemo(() => {
    return new Set(sortedTerms.map((t) => t.word[0].toUpperCase()));
  }, []);

  // Update root CSS variable for page-depth
  useEffect(() => {
    const pct =
      sortedTerms.length <= 1
        ? 50
        : Math.round((termIndex / (sortedTerms.length - 1)) * 100);
    const clamped = Math.max(4, Math.min(96, pct));
    document.documentElement.style.setProperty('--page-depth', `${clamped}%`);
  }, [termIndex]);

  // Sync to history & localStorage
  const recordHistory = useCallback((word: string) => {
    setHistoryTerms((prev) => {
      const filtered = prev.filter((w) => w.toLowerCase() !== word.toLowerCase());
      const updated = [word, ...filtered].slice(0, 20);
      saveStorage('aiAlmanacHistory', updated);
      return updated;
    });
  }, []);

  // Stamp popup helper
  const triggerStamp = useCallback(
    (text: string) => {
      if (stampTimerRef.current) {
        clearTimeout(stampTimerRef.current);
      }
      setStampText(text);
      setIsStampVisible(true);
      if (soundEnabled) {
        playStampSound();
      }
      stampTimerRef.current = window.setTimeout(() => {
        setIsStampVisible(false);
      }, 1550);
    },
    [soundEnabled]
  );

  // 3D Page Turn Animation
  const animatePageTurn = useCallback(
    async (
      nextTerm: Term,
      direction: 'forward' | 'backward' = 'forward',
      onComplete?: () => void
    ) => {
      if (
        isTurningRef.current ||
        (typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ) {
        setCurrentTerm(nextTerm);
        onComplete?.();
        return;
      }

      isTurningRef.current = true;
      if (soundEnabled) {
        playPageTurnSound();
      }

      const paperBlock = paperBlockRef.current;
      const turnFx = turnFxRef.current;
      const pageEl = pageRef.current;
      const turnLeaf = turnLeafRef.current;
      const turnFront = turnFrontRef.current;
      const turnGhost = turnGhostRef.current;
      const turnShade = turnShadeRef.current;
      const turnEdge = turnEdgeRef.current;
      const castShadow = castShadowRef.current;
      const cornerCurl = cornerCurlRef.current;
      const underGlow = underGlowRef.current;

      if (!paperBlock || !turnFx || !pageEl || !turnLeaf || !turnFront) {
        setCurrentTerm(nextTerm);
        isTurningRef.current = false;
        onComplete?.();
        return;
      }

      paperBlock.classList.add('turning-book');
      turnFx.classList.add('active');
      pageEl.classList.add('turning-under');

      // Clone existing page inner into turning face
      const pageInner = pageEl.querySelector('.page-inner');
      if (pageInner) {
        turnFront.innerHTML = '';
        const clone = pageInner.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
        clone.querySelectorAll('button, input').forEach((n) => {
          (n as HTMLElement).tabIndex = -1;
          n.setAttribute('aria-hidden', 'true');
        });
        turnFront.appendChild(clone);
      }

      if (turnGhost) {
        turnGhost.textContent = `${currentTerm.word} — ${currentTerm.definition}`;
      }

      // Switch underlying React term midway
      setCurrentTerm(nextTerm);

      const isForward = direction === 'forward';
      turnLeaf.style.transformOrigin = isForward ? 'left center' : 'right center';
      turnLeaf.style.borderRadius = isForward ? '0 9px 9px 0' : '9px 0 0 9px';

      const leafFrames = isForward
        ? [
            { transform: 'translateZ(0) rotateY(0deg) rotateZ(0deg)', filter: 'brightness(1)', offset: 0 },
            { transform: 'translateZ(8px) rotateY(-18deg) rotateZ(-.12deg)', filter: 'brightness(.99)', offset: 0.18 },
            { transform: 'translateZ(22px) rotateY(-74deg) rotateZ(-.38deg)', filter: 'brightness(.94)', offset: 0.44 },
            { transform: 'translateZ(18px) rotateY(-112deg) rotateZ(-.42deg)', filter: 'brightness(.91)', offset: 0.58 },
            { transform: 'translateZ(5px) rotateY(-164deg) rotateZ(.1deg)', filter: 'brightness(.83)', offset: 0.84 },
            { transform: 'translateZ(0) rotateY(-180deg) rotateZ(0deg)', filter: 'brightness(.78)', offset: 1 }
          ]
        : [
            { transform: 'translateZ(0) rotateY(180deg)', filter: 'brightness(.78)', offset: 0 },
            { transform: 'translateZ(9px) rotateY(150deg)', filter: 'brightness(.86)', offset: 0.18 },
            { transform: 'translateZ(22px) rotateY(102deg) rotateZ(.35deg)', filter: 'brightness(.93)', offset: 0.46 },
            { transform: 'translateZ(14px) rotateY(48deg) rotateZ(.2deg)', filter: 'brightness(.98)', offset: 0.72 },
            { transform: 'translateZ(0) rotateY(0deg)', filter: 'brightness(1)', offset: 1 }
          ];

      const leafAnim = turnLeaf.animate(leafFrames, {
        duration: 760,
        easing: 'cubic-bezier(.22,.68,.16,1)',
        fill: 'forwards'
      });

      turnShade?.animate(
        [
          { opacity: 0 },
          { opacity: 0.2, offset: 0.15 },
          { opacity: 0.72, offset: 0.48 },
          { opacity: 0.32, offset: 0.72 },
          { opacity: 0 }
        ],
        { duration: 760, easing: 'ease-in-out' }
      );

      turnEdge?.animate(
        [
          { opacity: 0.1, transform: 'scaleX(.5)' },
          { opacity: 1, transform: 'scaleX(1.8)', offset: 0.48 },
          { opacity: 0.15, transform: 'scaleX(.6)' }
        ],
        { duration: 760, easing: 'ease-in-out' }
      );

      if (castShadow) {
        castShadow.style.left = isForward ? '0' : '72%';
        castShadow.style.background = isForward
          ? 'linear-gradient(90deg,rgba(28,18,9,.5),rgba(28,18,9,.16) 48%,transparent)'
          : 'linear-gradient(270deg,rgba(28,18,9,.5),rgba(28,18,9,.16) 48%,transparent)';
        castShadow.animate(
          [
            { opacity: 0, transform: 'scaleX(.1)' },
            { opacity: 0.72, transform: 'scaleX(1)', offset: 0.5 },
            { opacity: 0, transform: 'scaleX(.22)' }
          ],
          { duration: 760, easing: 'ease-in-out' }
        );
      }

      if (cornerCurl) {
        cornerCurl.style.left = isForward ? 'auto' : '0';
        cornerCurl.style.right = isForward ? '0' : 'auto';
        cornerCurl.style.transform = isForward ? 'none' : 'scaleX(-1)';
        cornerCurl.animate(
          [
            { opacity: 0, transform: (isForward ? '' : 'scaleX(-1) ') + 'scale(.35)' },
            { opacity: 0.9, transform: (isForward ? '' : 'scaleX(-1) ') + 'scale(1)', offset: 0.28 },
            { opacity: 0.25, transform: (isForward ? '' : 'scaleX(-1) ') + 'scale(.58)', offset: 0.58 },
            { opacity: 0, transform: (isForward ? '' : 'scaleX(-1) ') + 'scale(.2)' }
          ],
          { duration: 620, easing: 'ease-out' }
        );
      }

      underGlow?.animate([{ opacity: 0 }, { opacity: 0.45, offset: 0.48 }, { opacity: 0 }], {
        duration: 760
      });

      await leafAnim.finished.catch(() => {});

      turnFx.classList.remove('active');
      paperBlock.classList.remove('turning-book');
      pageEl.classList.remove('turning-under');
      turnLeaf.getAnimations().forEach((a) => a.cancel());
      isTurningRef.current = false;
      onComplete?.();
    },
    [currentTerm, soundEnabled]
  );

  // Riffle animation helper
  const riffleToTerm = useCallback(
    async (targetTerm: Term) => {
      if (isTurningRef.current) return;
      const stack = riffleStackRef.current;
      const pageEl = pageRef.current;
      if (!stack || !pageEl) {
        setCurrentTerm(targetTerm);
        return;
      }

      stack.classList.add('active');
      pageEl.classList.add('riffling');
      if (soundEnabled) {
        playRiffleSound();
      }

      const sheets = Array.from(stack.children) as HTMLElement[];
      sheets.forEach((s, i) => {
        s.animate(
          [
            { opacity: 0, transform: 'rotateY(0deg) translateX(0)' },
            { opacity: 0.82, transform: `rotateY(${-28 - i * 4}deg) translateX(${-3 - i}px)`, offset: 0.45 },
            { opacity: 0, transform: `rotateY(${-82 - i * 5}deg) translateX(${-14 - i * 2}px)` }
          ],
          { duration: 210, delay: i * 58, easing: 'cubic-bezier(.4,0,.2,1)' }
        );
      });

      await new Promise((r) => setTimeout(r, 610));
      pageEl.classList.remove('riffling');
      stack.classList.remove('active');
      animatePageTurn(targetTerm, 'forward');
    },
    [animatePageTurn, soundEnabled]
  );

  // Select a term (via search, related link, index, etc.)
  const handleSelectTerm = useCallback(
    (termToSelect: Term, options?: { fromSearch?: boolean; addTrail?: boolean }) => {
      // Resolve term object if incomplete
      const resolved =
        termsByWord[termToSelect.word.toLowerCase()] ||
        sortedTerms.find((t) => t.word.toLowerCase() === termToSelect.word.toLowerCase()) ||
        termToSelect;

      const fromSearch = options?.fromSearch ?? false;
      const addTrail = options?.addTrail ?? true;

      if (fromSearch) {
        setFromSearchQuestion(searchQuery);
        setSearchQuery('');
      } else {
        setFromSearchQuestion('');
      }

      if (resolved.word.toLowerCase() === currentTerm.word.toLowerCase()) {
        window.location.hash = `#term=${encodeURIComponent(resolved.word)}`;
        return;
      }

      window.location.hash = `#term=${encodeURIComponent(resolved.word)}`;

      if (addTrail) {
        setTrail((prev) => {
          if (prev[prev.length - 1]?.toLowerCase() === resolved.word.toLowerCase()) return prev;
          return [...prev.slice(-6), resolved.word];
        });
      }

      recordHistory(resolved.word);
      animatePageTurn(resolved, 'forward');
    },
    [currentTerm, searchQuery, recordHistory, animatePageTurn]
  );

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const target = getHashTerm();
      if (target && target.word.toLowerCase() !== currentTerm.word.toLowerCase()) {
        handleSelectTerm(target, { addTrail: false });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentTerm, getHashTerm, handleSelectTerm]);

  // Global keyboard shortcuts (⌘K, Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'Escape') {
        setActiveOverlay(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Bookmarks Toggle
  const handleToggleBookmark = useCallback(() => {
    const word = currentTerm.word;
    const exists = bookmarks.includes(word);
    const updated = exists ? bookmarks.filter((w) => w !== word) : [...bookmarks, word];
    setBookmarks(updated);
    saveStorage('aiAlmanacBookmarks', updated);
    triggerStamp(exists ? 'BOOKMARK REMOVED' : 'DOG-EARED');
  }, [bookmarks, currentTerm, triggerStamp]);

  // Speech pronunciation
  const handleSpeak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      triggerStamp('PRONUNCIATION UNAVAILABLE');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentTerm.word);
    utterance.rate = 0.78;
    utterance.pitch = 0.88;
    window.speechSynthesis.speak(utterance);
  }, [currentTerm, triggerStamp]);

  // Collections handler
  const handleCreateCollection = useCallback(
    (name: string) => {
      if (!collections[name]) {
        const updated = { ...collections, [name]: [] };
        setCollections(updated);
        saveStorage('aiAlmanacCollections', updated);
        triggerStamp(`COLLECTION “${name}” CREATED`);
      }
    },
    [collections, triggerStamp]
  );

  const handleAddToCollection = useCallback(
    (name: string) => {
      const existing = collections[name] || [];
      if (!existing.includes(currentTerm.word)) {
        const updated = { ...collections, [name]: [...existing, currentTerm.word] };
        setCollections(updated);
        saveStorage('aiAlmanacCollections', updated);
        triggerStamp(`FILED IN ${name.toUpperCase()}`);
      } else {
        triggerStamp(`ALREADY IN ${name.toUpperCase()}`);
      }
      setActiveOverlay(null);
    },
    [collections, currentTerm, triggerStamp]
  );

  // Tab jump by letter
  const handleSelectLetter = useCallback(
    (letter: string) => {
      const found = sortedTerms.find((t) => t.word[0].toUpperCase() === letter);
      if (found) {
        riffleToTerm(found);
      } else {
        triggerStamp(`NO ${letter} ENTRIES YET`);
      }
    },
    [riffleToTerm, triggerStamp]
  );

  // Surprise random jump
  const handleSurprise = useCallback(() => {
    const pool = sortedTerms.filter((t) => t.word !== currentTerm.word);
    const randomTerm = pool[Math.floor(Math.random() * pool.length)] || sortedTerms[0];
    riffleToTerm(randomTerm);
  }, [currentTerm, riffleToTerm]);

  // Copy deep link
  const handleCopyLink = useCallback(async () => {
    const url = `${window.location.href.split('#')[0]}#term=${encodeURIComponent(currentTerm.word)}`;
    try {
      await navigator.clipboard.writeText(url);
      triggerStamp('LINK COPIED');
    } catch {
      triggerStamp('COPY LINK FROM ADDRESS BAR');
    }
  }, [currentTerm, triggerStamp]);

  // Sound toggle
  const handleToggleSound = useCallback(() => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    saveStorage('aiAlmanacSound', nextState);
    if (nextState) {
      playPaperSmallSound();
    }
    triggerStamp(nextState ? 'SOUND ON' : 'SOUND OFF');
  }, [soundEnabled, triggerStamp]);

  return (
    <>
      <MobileBar
        onSurprise={handleSurprise}
        onFocusSearch={() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }}
      />

      <main className="stage">
        <section className="book">
          <Cover
            totalTerms={terms.length}
            bookmarkCount={bookmarks.length}
            historyCount={historyTerms.length}
            collectionCount={Object.keys(collections).length}
            dailyTerm={dailyTerm}
            formattedDate={formattedDate}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onOpenOverlay={(overlay) => {
              if (soundEnabled) playPaperSmallSound();
              setActiveOverlay(overlay);
            }}
            onFocusSearch={() => {
              searchInputRef.current?.focus();
              searchInputRef.current?.select();
            }}
            onGoToDaily={() => riffleToTerm(dailyTerm)}
            onSurprise={handleSurprise}
          />

          <div className="paper-block" ref={paperBlockRef} id="paperBlock">
            <div className="page-stack"></div>

            <Page
              currentTerm={currentTerm}
              termIndex={termIndex}
              totalTerms={sortedTerms.length}
              isBookmarked={bookmarks.includes(currentTerm.word)}
              explanationMode={explanationMode}
              searchQuery={searchQuery}
              fromSearchQuestion={fromSearchQuestion}
              trail={trail}
              searchRef={searchInputRef}
              onSelectTerm={handleSelectTerm}
              onToggleBookmark={handleToggleBookmark}
              onChangeMode={(m) => setExplanationMode(m)}
              onSearchChange={setSearchQuery}
              onClearTrail={() => setTrail([currentTerm.word])}
              onOpenPicker={() => setActiveOverlay('picker')}
              onOpenClip={() => setActiveOverlay('clip')}
              onOpenTimeline={() => setActiveOverlay('timeline')}
              onCopyLink={handleCopyLink}
              onSpeak={handleSpeak}
            />

            <EdgeMarkers bookmarks={bookmarks} />

            <div className="depth-left"></div>
            <div className="depth-right"></div>

            <Tabs
              currentLetter={currentTerm.word[0].toUpperCase()}
              availableLetters={availableLetters}
              onSelectLetter={handleSelectLetter}
            />

            <div className="under-glow" ref={underGlowRef} id="underGlow"></div>
            <div className="cast-shadow" ref={castShadowRef} id="castShadow"></div>

            {/* 3D Page Turn System */}
            <div className="turn-fx" ref={turnFxRef} id="turnFx" aria-hidden="true">
              <div className="turn-leaf" ref={turnLeafRef} id="turnLeaf">
                <div className="turn-face turn-front" ref={turnFrontRef} id="turnFront"></div>
                <div className="turn-face turn-back" id="turnBack">
                  <div className="ghost" ref={turnGhostRef} id="turnGhost"></div>
                </div>
                <div className="turn-shade" ref={turnShadeRef} id="turnShade"></div>
                <div className="turn-edge" ref={turnEdgeRef} id="turnEdge"></div>
              </div>
              <div className="corner-curl" ref={cornerCurlRef} id="cornerCurl"></div>
            </div>

            {/* Riffle Sheets */}
            <div className="riffle-stack" ref={riffleStackRef} id="riffleStack">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="riffle-sheet" style={{ zIndex: 7 - i }} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Stamp text={stampText} visible={isStampVisible} />

      {/* Overlays */}
      <IndexOverlay
        isOpen={activeOverlay === 'index'}
        terms={sortedTerms}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
      />

      <ListOverlay
        isOpen={activeOverlay === 'bookmarks' || activeOverlay === 'history'}
        kind={activeOverlay === 'bookmarks' ? 'bookmarks' : 'history'}
        words={activeOverlay === 'bookmarks' ? bookmarks : historyTerms}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
      />

      <TimelineOverlay
        isOpen={activeOverlay === 'timeline'}
        timeline={timeline}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
      />

      <CollectionsOverlay
        isOpen={activeOverlay === 'collections'}
        collections={collections}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
        onCreateCollection={handleCreateCollection}
      />

      <PickerOverlay
        isOpen={activeOverlay === 'picker'}
        collections={collections}
        currentWord={currentTerm.word}
        onClose={() => setActiveOverlay(null)}
        onAddToCollection={handleAddToCollection}
      />

      <ClipOverlay
        isOpen={activeOverlay === 'clip'}
        term={currentTerm}
        pageNumber={101 + termIndex * 7}
        formattedDate={formattedDate}
        onClose={() => setActiveOverlay(null)}
        onShowStamp={triggerStamp}
      />
    </>
  );
};

export default App;
