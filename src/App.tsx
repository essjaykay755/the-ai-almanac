import React, { use, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { flushSync } from 'react-dom';
import type { Term, ExplanationMode, OverlayType, TermSelectionTarget } from './types/almanac';
import { Cover } from './components/Cover';
import { AboutPage } from './components/AboutPage';
import { Page } from './components/Page';
import { Tabs } from './components/Tabs';
import { Stamp } from './components/Stamp';
import { MobileBar } from './components/MobileBar';
import { IndexOverlay } from './components/overlays/IndexOverlay';
import { ListOverlay } from './components/overlays/ListOverlay';
import { TimelineOverlay } from './components/overlays/TimelineOverlay';
import { CollectionsOverlay } from './components/overlays/CollectionsOverlay';
import { PickerOverlay } from './components/overlays/PickerOverlay';
import { ClipOverlay } from './components/overlays/ClipOverlay';
import { NotFoundPage } from './components/NotFoundPage';
import { TutorialOverlay } from './components/TutorialOverlay';
import { TUTORIAL_STEPS } from './components/tutorialSteps';
import {
  playPageTurnSound,
  playPaperTearSound,
  playPaperSmallSound,
  playStampSound
} from './utils/sound';
import { getPronunciation } from './utils/pronunciation';
import { createSearchIndex } from './utils/search';
import { getExplanationForTerm } from './utils/explanations';
import {
  getPublicPath,
  getTermOgImagePath,
  getTermRoutePath,
  slugifyTerm
} from './utils/ogImage';

type AlmanacData = typeof import('./data/terms');
const almanacDataPromise: Promise<AlmanacData> = import('./data/terms');

const modeNames: Record<ExplanationMode, string> = {
  dictionary: 'Dictionary',
  plain: 'Plain English',
  technical: 'Technical',
  vibe: 'Vibe Coder'
};

type BookView = 'term' | 'about';

type TermSelectionOptions = {
  fromSearch?: boolean;
  addTrail?: boolean;
  direction?: 'forward' | 'backward';
};

type Collections = Record<string, string[]>;

const DEFAULT_PAGE_TITLE = 'The AI Almanac — Expanded Living Dictionary v0.7';
const DEFAULT_PAGE_DESCRIPTION =
  'An evolving reference book for AI enthusiasts & vibe coders. Living dictionary of artificial intelligence concepts, architectures, and practices.';

const legacyDefaultCollections: Collections = {
  'Vibe coder essentials': ['vibe coding', 'diff', 'ship loop', 'taste', 'eval'],
  'Agent rabbit hole': ['agentic', 'tool calling', 'workflow', 'reasoning', 'grounding']
};

const defaultCollections: Collections = {
  ...legacyDefaultCollections,
  'Build & ship': ['prompt-to-product', 'tool calling', 'workflow', 'observability', 'diff'],
  'Evaluation & safety': ['eval', 'benchmark', 'guardrail', 'safety eval', 'grounding']
};

function getBookViewFromHash(): BookView {
  return typeof window !== 'undefined' && window.location.hash === '#about' ? 'about' : 'term';
}

function getAbsoluteSiteUrl(relativePath: string): string {
  if (typeof window === 'undefined') return relativePath;
  return new URL(getPublicPath(import.meta.env.BASE_URL || '/', relativePath), window.location.origin).toString();
}

function updateMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateCanonicalUrl(href: string): void {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = href;
}

function updateDocumentMetadata(term: Term | null, bookView: BookView): void {
  const isTermView = bookView === 'term' && Boolean(term);
  const title = isTermView && term ? `${term.word} — The AI Almanac` : DEFAULT_PAGE_TITLE;
  const description = isTermView && term ? term.definition : DEFAULT_PAGE_DESCRIPTION;
  const imagePath = isTermView && term ? getTermOgImagePath(term) : 'og-image.svg';
  const pagePath = isTermView && term ? getTermRoutePath(term) : '';
  const pageUrl = getAbsoluteSiteUrl(pagePath);
  const imageUrl = getAbsoluteSiteUrl(imagePath);
  const imageAlt = isTermView && term
    ? `${term.word} definition card from The AI Almanac`
    : 'The AI Almanac — an evolving field guide to artificial intelligence.';

  document.title = title;
  updateMetaTag('name', 'description', description);
  updateMetaTag('property', 'og:type', isTermView ? 'article' : 'website');
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:url', pageUrl);
  updateMetaTag('property', 'og:image', imageUrl);
  updateMetaTag('property', 'og:image:alt', imageAlt);
  updateMetaTag('name', 'twitter:title', title);
  updateMetaTag('name', 'twitter:description', description);
  updateMetaTag('name', 'twitter:image', imageUrl);
  updateMetaTag('name', 'twitter:image:alt', imageAlt);
  updateCanonicalUrl(pageUrl);
}

function loadStorage<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed: unknown = JSON.parse(item);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

const isCollections = (value: unknown): value is Record<string, string[]> =>
  typeof value === 'object' &&
  value !== null &&
  Object.values(value).every((items) => isStringArray(items));

function collectionsMatch(left: Collections, right: Collections): boolean {
  const leftNames = Object.keys(left);
  const rightNames = Object.keys(right);
  if (leftNames.length !== rightNames.length || leftNames.some((name) => !right[name])) return false;
  return leftNames.every((name) => {
    const leftItems = left[name];
    const rightItems = right[name];
    return leftItems.length === rightItems.length && leftItems.every((item, index) => item === rightItems[index]);
  });
}

function loadCollections(): Collections {
  const stored = loadStorage<Collections>('aiAlmanacCollections', defaultCollections, isCollections);

  // Upgrade an untouched install from the original two seeded collections to the new four.
  // Any renamed, deleted, or otherwise edited collection set is left exactly as the user saved it.
  return collectionsMatch(stored, legacyDefaultCollections) ? defaultCollections : stored;
}

function hasCollection(collections: Collections, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(collections, name);
}

function normalizeCollectionName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function cleanClone(node: HTMLElement): HTMLElement {
  const c = node.cloneNode(true) as HTMLElement;
  c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  c.querySelectorAll('button, input').forEach((n) => {
    (n as HTMLElement).tabIndex = -1;
    n.setAttribute('aria-hidden', 'true');
  });
  return c;
}

function getPageScrollContainer(root: HTMLElement | null): HTMLElement | null {
  if (!root) return null;
  if (root.matches('.page-layout')) return root;
  return root.querySelector<HTMLElement>('.page-layout') ||
    (root.matches('.page-inner') ? root : root.querySelector<HTMLElement>('.page-inner'));
}

function resetPageScroll(page: HTMLElement | null): void {
  const scrollContainer = getPageScrollContainer(page);
  if (!scrollContainer) return;
  scrollContainer.scrollTop = 0;
  scrollContainer.scrollLeft = 0;
}

function cloneWithScroll(node: HTMLElement, scrollTop: number, scrollLeft: number): HTMLElement {
  const clone = cleanClone(node);
  const scrollContainer = getPageScrollContainer(clone);
  if (scrollContainer) {
    scrollContainer.scrollTop = scrollTop;
    scrollContainer.scrollLeft = scrollLeft;
  }
  return clone;
}

function createDestinationSnapshot(
  term: Term,
  mode: ExplanationMode,
  sampleInner: HTMLElement,
  data: Pick<AlmanacData, 'specialModes' | 'crossRefs'>,
  termIndex: number,
  isBookmarked: boolean = false,
  nextTrail: string[] = [],
  fromSearchQuestion: string = '',
  searchQueryValue: string = ''
): HTMLElement {
  const clone = cleanClone(sampleInner);

  // 1. Headword line
  const wordEl = clone.querySelector('.word');
  if (wordEl) {
    wordEl.textContent = term.word;
  }
  const partEl = clone.querySelector('.headword-line .part');
  if (partEl) {
    partEl.textContent = term.part;
  }

  // 2. Pronunciation
  const pronEl = clone.querySelector('.pronounce-text');
  if (pronEl) {
    pronEl.textContent = getPronunciation(term.word, term.pron);
  }

  // 3. Definition mode & text
  const defModeEl = clone.querySelector('.definition-mode');
  if (defModeEl) {
    defModeEl.textContent = modeNames[mode] || 'Standard Dictionary';
  }
  const defEl = clone.querySelector('.definition');
  if (defEl) {
    defEl.textContent = getExplanationForTerm(term, mode, data.specialModes);
    defEl.classList.toggle('search-hit', Boolean(fromSearchQuestion));
  }

  // 4. Example
  const exEl = clone.querySelector('.example') as HTMLElement | null;
  if (exEl) {
    exEl.textContent = term.example || '';
    exEl.style.display = term.example ? 'block' : 'none';
  }

  // Keep the controlled search input in sync with the target React render.
  const searchInput = clone.querySelector('.search-box input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.value = searchQueryValue;
    searchInput.setAttribute('value', searchQueryValue);
  }

  // 5. Lower grid (Origin & In Practice)
  const lowerGridPs = clone.querySelectorAll('.lower-grid p');
  if (lowerGridPs.length >= 2) {
    lowerGridPs[0].textContent = term.origin || 'A standard term in modern AI practice.';
    lowerGridPs[1].textContent = term.note || 'Use the term precisely in context.';
  }

  // 6. Thread & Trail
  const trailEl = clone.querySelector('.trail');
  if (trailEl) {
    trailEl.innerHTML = nextTrail
      .slice(-10)
      .map((w) => `<button type="button" tabindex="-1" aria-hidden="true">${w}</button>`)
      .join('');
  }

  // 7. Margin sections: See also, Compare, Often confused with, Filed under, Marginalia
  const marginEl = clone.querySelector('.margin');
  if (marginEl) {
    const x = data.crossRefs[term.word] || { compare: [], confused: [] };
    const seeRefs = term.related || [];
    const compareRefs = x.compare && x.compare.length > 0 ? x.compare : seeRefs.slice(0, 2);
    const confusedRefs = x.confused || [];

    let marginHtml = '';
    if (seeRefs.length > 0) {
      marginHtml += `
        <section class="margin-section">
          <h3>See also</h3>
          <div class="xref">
            ${seeRefs.map((r) => `<button type="button" tabindex="-1" aria-hidden="true">${r}</button>`).join('')}
          </div>
        </section>
      `;
    }
    if (compareRefs.length > 0) {
      marginHtml += `
        <section class="margin-section">
          <h3>Compare</h3>
          <div class="xref">
            ${compareRefs.map((r) => `<button type="button" tabindex="-1" aria-hidden="true">${r}</button>`).join('')}
          </div>
        </section>
      `;
    }
    if (confusedRefs.length > 0) {
      marginHtml += `
        <section class="margin-section">
          <h3>Often confused with</h3>
          <div class="xref">
            ${confusedRefs.map((r) => `<button type="button" tabindex="-1" aria-hidden="true">${r}</button>`).join('')}
          </div>
        </section>
      `;
    }
    marginHtml += `
      <section class="margin-section">
        <h3>Filed under</h3>
        <p>${term.category || 'AI Concepts'}</p>
      </section>
      <aside class="margin-note">
        <strong>Marginalia</strong>
        <p>${term.note || ''}</p>
      </aside>
    `;
    marginEl.innerHTML = marginHtml;

    const marginNote = marginEl.querySelector('.margin-note');
    if (marginNote) {
      const isSearchResult = Boolean(fromSearchQuestion);
      marginNote.classList.toggle('search-note', isSearchResult);

      const noteHeading = marginNote.querySelector('strong');
      if (noteHeading) {
        noteHeading.textContent = isSearchResult ? 'The AI Almanac suggests' : 'Marginalia';
      }

      const noteText = marginNote.querySelector('p');
      if (noteText) {
        noteText.textContent = isSearchResult
          ? `“${fromSearchQuestion}” points most closely to this entry.`
          : term.note || '';
      }
    }
  }

  // 8. Folio top, page counter
  const pageNumEl = clone.querySelector('#pageNumber') || clone.querySelector('.page-footer .center');
  if (pageNumEl) {
    pageNumEl.textContent = `Page ${termIndex + 1}`;
  }
  const folioTopEl = clone.querySelector('.folio-top');
  if (folioTopEl) {
    folioTopEl.textContent = `Page ${termIndex + 1}`;
  }

  // 9. Bookmark button
  const bookmarkBtn = clone.querySelector('.bookmark-btn');
  if (bookmarkBtn) {
    bookmarkBtn.classList.toggle('saved', isBookmarked);
    const star = bookmarkBtn.querySelector('.bookmark-star');
    if (star) star.textContent = isBookmarked ? '★' : '☆';
  }

  return clone;
}

const AlmanacApp: React.FC = () => {
  const { sortedTerms, termsByWord, timeline, specialModes, crossRefs, resolveTerm } = use(almanacDataPromise);

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

  // Read the initial term from a crawlable route or the legacy hash link.
  const getHashTerm = useCallback((): Term | null => {
    if (typeof window === 'undefined') return null;
    const pathMatch = window.location.pathname.match(/\/term\/([^/]+)\/?$/);
    const hashMatch = window.location.hash.match(/(?:^#|&)term=([^&]+)/);
    const requestedValue = pathMatch?.[1] || hashMatch?.[1];
    if (!requestedValue) return null;

    try {
      const decoded = decodeURIComponent(requestedValue.replace(/\+/g, ' '));
      if (pathMatch) {
        return sortedTerms.find((term) => slugifyTerm(term.word) === decoded) ||
          resolveTerm(decoded.replace(/-/g, ' '));
      }
      return resolveTerm(decoded);
    } catch {
      return null;
    }
  }, [resolveTerm, sortedTerms]);

  const [currentTerm, setCurrentTerm] = useState<Term>(() => {
    return getHashTerm() || resolveTerm('artificial intelligence') || sortedTerms[0];
  });
  const initialBookView = getBookViewFromHash();
  const [bookView, setBookView] = useState<BookView>(initialBookView);

  const [explanationMode, setExplanationMode] = useState<ExplanationMode>('dictionary');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fromSearchQuestion, setFromSearchQuestion] = useState<string>('');
  const [trail, setTrail] = useState<string[]>([currentTerm.word]);

  // Persistent States
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    loadStorage<string[]>('aiAlmanacBookmarks', [], isStringArray)
  );
  const [historyTerms, setHistoryTerms] = useState<string[]>(() =>
    loadStorage<string[]>('aiAlmanacHistory', [currentTerm.word], isStringArray)
  );
  const [collections, setCollections] = useState<Collections>(loadCollections);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() =>
    loadStorage<boolean>('aiAlmanacSound', false, isBoolean)
  );

  // Overlays & Stamp State
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialStepIndex, setTutorialStepIndex] = useState(0);
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  );
  const [stampText, setStampText] = useState<string | null>(null);
  const [isStampVisible, setIsStampVisible] = useState(false);
  const stampTimerRef = useRef<number | null>(null);

  // Refs for page turn animations
  const searchInputRef = useRef<HTMLInputElement>(null);
  const paperBlockRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const solidTurnRef = useRef<HTMLDivElement>(null);
  const turnFxRef = useRef<HTMLDivElement>(null);
  const turnLeafRef = useRef<HTMLDivElement>(null);
  const turnBackRef = useRef<HTMLDivElement>(null);
  const turnFrontRef = useRef<HTMLDivElement>(null);
  const turnBottomRef = useRef<HTMLDivElement>(null);
  const turnShadeRef = useRef<HTMLDivElement>(null);
  const isTurningRef = useRef<boolean>(false);
  const isProgrammaticHashRef = useRef<boolean>(false);
  const bookViewRef = useRef<BookView>(initialBookView);
  const pendingTermRef = useRef<{ term: Term; options?: TermSelectionOptions } | null>(null);

  useEffect(() => {
    updateDocumentMetadata(bookView === 'term' ? currentTerm : null, bookView);
  }, [bookView, currentTerm]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const syncViewport = () => setIsCompactViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  // Compute depth and index
  const termIndexByWord = useMemo(
    () => new Map(sortedTerms.map((term, index) => [term.word.toLowerCase(), index])),
    [sortedTerms]
  );
  const termIndex = useMemo(() => {
    const idx = termIndexByWord.get(currentTerm.word.toLowerCase()) ?? -1;
    return idx >= 0 ? idx : 0;
  }, [currentTerm.word, termIndexByWord]);
  const totalPages = sortedTerms.length;
  const searchIndex = useMemo(() => createSearchIndex(sortedTerms), [sortedTerms]);

  const availableLetters = useMemo(() => {
    return new Set(sortedTerms.map((t) => t.word[0].toUpperCase()));
  }, [sortedTerms]);

  // Update root CSS variable for page-depth and stack heights
  useEffect(() => {
    const pct =
      sortedTerms.length <= 1
        ? 50
        : Math.round((termIndex / (sortedTerms.length - 1)) * 100);
    const clamped = Math.max(4, Math.min(96, pct));
    const p = clamped / 100;
    document.documentElement.style.setProperty('--page-depth', `${clamped}%`);
    document.documentElement.style.setProperty('--stack-turned', `${(4 + 7 * p).toFixed(1)}px`);
    document.documentElement.style.setProperty('--stack-remaining', `${(4 + 7 * (1 - p)).toFixed(1)}px`);
  }, [termIndex, sortedTerms.length]);

  // Record history
  const recordHistory = useCallback((word: string) => {
    setHistoryTerms((prev) => {
      return [word, ...prev.filter((w) => w.toLowerCase() !== word.toLowerCase())].slice(0, 40);
    });
  }, []);

  useEffect(() => {
    saveStorage('aiAlmanacHistory', historyTerms);
  }, [historyTerms]);

  // Trigger stamp animation
  const triggerStamp = useCallback(
    (text: string, withSound = soundEnabled) => {
      if (stampTimerRef.current) {
        window.clearTimeout(stampTimerRef.current);
      }
      setStampText(text);
      setIsStampVisible(true);
      if (withSound) {
        playStampSound();
      }
      stampTimerRef.current = window.setTimeout(() => {
        setIsStampVisible(false);
      }, 1550);
    },
    [soundEnabled]
  );

  const setLocationHash = useCallback((hash: string) => {
    if (typeof window === 'undefined') return;

    const termMatch = hash.match(/^#term=([^&]+)/);
    let routePath = getPublicPath(import.meta.env.BASE_URL || '/', '');
    if (termMatch) {
      try {
        const word = decodeURIComponent(termMatch[1].replace(/\+/g, ' '));
        routePath = getPublicPath(import.meta.env.BASE_URL || '/', getTermRoutePath({ word }));
      } catch {
        // Keep the current path if a malformed legacy hash is encountered.
        routePath = window.location.pathname;
      }
    }

    const nextUrl = `${routePath}${hash}`;
    const currentUrl = `${window.location.pathname}${window.location.hash}`;
    if (currentUrl === nextUrl) return;

    isProgrammaticHashRef.current = true;
    if (window.location.hash === hash) {
      window.history.pushState(window.history.state, '', nextUrl);
      isProgrammaticHashRef.current = false;
      return;
    }

    // Assigning the hash preserves the existing back/forward behavior. The
    // replaceState immediately after it moves that new history entry to the
    // crawlable term route without reloading the React app.
    window.location.hash = hash;
    window.history.replaceState(window.history.state, '', nextUrl);
  }, []);

  const commitBookView = useCallback((view: BookView) => {
    bookViewRef.current = view;
    setBookView(view);
    if (view === 'about') {
      setActiveOverlay(null);
    }
  }, []);

  const animateAboutTurn = useCallback(
    async (nextView: BookView, onComplete?: () => void, hashOverride?: string) => {
      if (bookViewRef.current === nextView) {
        onComplete?.();
        return;
      }
      if (isTurningRef.current) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextHash = hashOverride ?? (nextView === 'about'
        ? '#about'
        : `#term=${encodeURIComponent(currentTerm.word)}`);

      if (prefersReducedMotion) {
        flushSync(() => commitBookView(nextView));
        setLocationHash(nextHash);
        onComplete?.();
        return;
      }

      isTurningRef.current = true;
      if (soundEnabled) {
        playPageTurnSound();
      }

      const solidTurn = solidTurnRef.current;
      if (!solidTurn) {
        flushSync(() => commitBookView(nextView));
        setLocationHash(nextHash);
        isTurningRef.current = false;
        onComplete?.();
        return;
      }

      const paperBlock = paperBlockRef.current;
      const book = paperBlock?.parentElement;
      paperBlock?.classList.add('cover-turning');
      book?.classList.add('cover-turning');

      solidTurn.classList.remove('active', 'opening', 'closing');
      solidTurn.style.animation = 'none';
      solidTurn.classList.add('active');
      solidTurn.style.transform = nextView === 'about'
        ? 'translateZ(0) rotateY(-86deg)'
        : 'translateZ(0) rotateY(0deg)';
      flushSync(() => commitBookView(nextView));
      setLocationHash(nextHash);

      // Start from the hinge and turn a rigid plane across the book. There is
      // no polygon clipping or soft-page fold in this cover transition.
      void solidTurn.offsetWidth;
      solidTurn.style.animation = '';
      solidTurn.style.transform = '';
      solidTurn.classList.add(nextView === 'about' ? 'opening' : 'closing');

      await new Promise<void>((resolve) => {
        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          solidTurn.removeEventListener('animationend', finish);
          window.clearTimeout(timeout);
          resolve();
        };
        const timeout = window.setTimeout(finish, 800);
        solidTurn.addEventListener('animationend', finish);
      });

      solidTurn.classList.remove('active', 'opening', 'closing');
      solidTurn.style.animation = '';
      paperBlock?.classList.remove('cover-turning');
      book?.classList.remove('cover-turning');
      isTurningRef.current = false;
      onComplete?.();
    },
    [commitBookView, currentTerm.word, setLocationHash, soundEnabled]
  );

  // Single-leaf page turn — soft-page geometry adapted from StPageFlip's fold model
  const animatePageTurn = useCallback(
    async (
      nextTerm: Term,
      direction: 'forward' | 'backward' = 'forward',
      options?: {
        nextTrail?: string[];
        fromSearch?: boolean;
        searchQ?: string;
      },
      onComplete?: () => void
    ) => {
      if (isTurningRef.current) {
        return;
      }
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        flushSync(() => {
          setCurrentTerm(nextTerm);
          if (options?.nextTrail) {
            setTrail(options.nextTrail);
          }
          if (options?.fromSearch) {
            setFromSearchQuestion(options.searchQ || '');
            setSearchQuery('');
          } else {
            setFromSearchQuestion('');
          }
        });
        resetPageScroll(pageRef.current);
        recordHistory(nextTerm.word);
        setLocationHash(`#term=${encodeURIComponent(nextTerm.word)}`);
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
      const turnBack = turnBackRef.current;
      const turnFront = turnFrontRef.current;
      const turnBottom = turnBottomRef.current;
      const turnShade = turnShadeRef.current;

      if (!pageEl || !paperBlock || !turnFx || !turnLeaf || !turnFront || !turnBottom || !turnShade) {
        flushSync(() => {
          setCurrentTerm(nextTerm);
          if (options?.nextTrail) {
            setTrail(options.nextTrail);
          }
          if (options?.fromSearch) {
            setFromSearchQuestion(options.searchQ || '');
            setSearchQuery('');
          } else {
            setFromSearchQuestion('');
          }
        });
        resetPageScroll(pageRef.current);
        recordHistory(nextTerm.word);
        setLocationHash(`#term=${encodeURIComponent(nextTerm.word)}`);
        isTurningRef.current = false;
        onComplete?.();
        return;
      }

      const paperBlockEl: HTMLElement = paperBlock;
      const turnFxEl: HTMLElement = turnFx;
      const turnBackEl: HTMLElement | null = turnBack;
      const turnFrontEl: HTMLElement = turnFront;
      const turnBottomEl: HTMLElement = turnBottom;
      const turnShadeEl: HTMLElement = turnShade;

      // Do not let the clicked page control restore focus against the newly
      // rendered content and introduce a small scroll offset at the handoff.
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && paperBlockEl.contains(activeElement)) {
        activeElement.blur();
      }

      paperBlockEl.classList.add('turning-book');
      turnFxEl.classList.add('active');

      const w = Math.max(1, turnFxEl.getBoundingClientRect().width);
      const h = Math.max(1, turnFxEl.getBoundingClientRect().height);

      const nextIndex = termIndexByWord.get(nextTerm.word.toLowerCase()) ?? -1;
      const safeNextIndex = nextIndex >= 0 ? nextIndex : 0;
      const isSaved = bookmarks.includes(nextTerm.word);
      const targetTrail = options?.nextTrail || trail;
      const targetSearchQuestion = options?.fromSearch ? options.searchQ || '' : '';
      const targetSearchQuery = options?.fromSearch ? '' : searchQuery;

      const pageInner = pageEl.querySelector('.page-inner');
      const mountDestinationPage = (container: HTMLElement, sampleInner: HTMLElement) => {
        const destination = createDestinationSnapshot(
          nextTerm,
          explanationMode,
          sampleInner,
          { specialModes, crossRefs },
          safeNextIndex,
          isSaved,
          targetTrail,
          targetSearchQuestion,
          targetSearchQuery
        );
        resetPageScroll(destination);
        container.appendChild(destination);
      };

      if (pageInner) {
        const pageInnerEl = pageInner as HTMLElement;
        const pageScrollContainer = getPageScrollContainer(pageInnerEl);
        const currentScrollTop = pageScrollContainer?.scrollTop ?? 0;
        const currentScrollLeft = pageScrollContainer?.scrollLeft ?? 0;
        const cloneCurrentPage = () =>
          cloneWithScroll(pageInnerEl, currentScrollTop, currentScrollLeft);

        if (direction === 'forward') {
          // Forward turn:
          if (turnBackEl) {
            turnBackEl.style.display = 'none';
            turnBackEl.innerHTML = '';
          }

          // turnFront = current page (peels away to the left in 3D)
          turnFrontEl.innerHTML = '';
          turnFrontEl.appendChild(cloneCurrentPage());
          turnFrontEl.style.display = 'block';

          // turnBottom = destination page (revealed underneath from right to left)
          turnBottomEl.innerHTML = '';
          turnBottomEl.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
          turnBottomEl.style.display = 'block';
          mountDestinationPage(turnBottomEl, pageInner as HTMLElement);
        } else {
          // Backward turn (exact opposite of forward):
          // turnBack = destination page (revealed on base from left to right as current page uncurls)
          if (turnBackEl) {
            turnBackEl.innerHTML = '';
            turnBackEl.style.display = 'block';
            mountDestinationPage(turnBackEl, pageInner as HTMLElement);
          }

          // turnBottom = current page (unmasks revealing destSnap underneath)
          turnBottomEl.innerHTML = '';
          turnBottomEl.appendChild(cloneCurrentPage());
          turnBottomEl.style.clipPath = 'none';
          turnBottomEl.style.display = 'block';

          // turnFront = current page (3D curled folding flap uncurling back across from left to right)
          turnFrontEl.innerHTML = '';
          turnFrontEl.appendChild(cloneCurrentPage());
          turnFrontEl.style.display = 'block';
        }
      }

      const dist = (a: { x: number; y: number } | null, b: { x: number; y: number } | null) =>
        !a || !b ? Infinity : Math.hypot(b.x - a.x, b.y - a.y);
      const rot = (pt: { x: number; y: number }, origin: { x: number; y: number }, ang: number) => ({
        x: pt.x * Math.cos(ang) + pt.y * Math.sin(ang) + origin.x,
        y: pt.y * Math.cos(ang) - pt.x * Math.sin(ang) + origin.y
      });
      const inRect = (r: { left: number; top: number; width: number; height: number }, p: { x: number; y: number } | null) =>
        p && p.x >= r.left && p.x <= r.left + r.width && p.y >= r.top && p.y <= r.top + r.height ? p : null;
      const lineX = (one: { x: number; y: number }[], two: { x: number; y: number }[]) => {
        const A1 = one[0].y - one[1].y, A2 = two[0].y - two[1].y;
        const B1 = one[1].x - one[0].x, B2 = two[1].x - two[0].x;
        const C1 = one[0].x * one[1].y - one[1].x * one[0].y;
        const C2 = two[0].x * two[1].y - two[1].x * two[0].y;
        const d = A1 * B2 - A2 * B1;
        if (Math.abs(d) < 1e-8) return null;
        const x = -((C1 * B2 - C2 * B1) / d);
        const y = -((A1 * C2 - A2 * C1) / d);
        return isFinite(x) && isFinite(y) ? { x, y } : null;
      };
      const segX = (r: { left: number; top: number; width: number; height: number }, a: { x: number; y: number }[], b: { x: number; y: number }[]) =>
        inRect(r, lineX(a, b));
      const limitCircle = (center: { x: number; y: number }, radius: number, p: { x: number; y: number }) => {
        if (dist(center, p) <= radius) return p;
        const a = center.x, b = center.y, n = p.x, m = p.y;
        const den = (a - n) * (a - n) + (b - m) * (b - m);
        if (!den) return p;
        let x = Math.sqrt((radius * radius * (a - n) * (a - n)) / den) + a;
        if (p.x < 0) x *= -1;
        const y = (a - n) !== 0 ? ((x - a) * (b - m)) / (a - n) + b : radius;
        return { x, y };
      };
      const angleLines = (a: { x: number; y: number }[], b: { x: number; y: number }[]) => {
        if (!a?.[0] || !a?.[1] || !b?.[0] || !b?.[1]) return 0;
        const A1 = a[0].y - a[1].y, A2 = b[0].y - b[1].y;
        const B1 = a[1].x - a[0].x, B2 = b[1].x - b[0].x;
        const den = Math.hypot(A1, B1) * Math.hypot(A2, B2);
        return den ? Math.acos(Math.max(-1, Math.min(1, (A1 * A2 + B1 * B2) / den))) : 0;
      };

      function calculate(pointer: { x: number; y: number }) {
        let pos = { ...pointer };
        let angle = 0;
        let rect = {
          topLeft: { x: 0, y: 0 },
          topRight: { x: 0, y: 0 },
          bottomLeft: { x: 0, y: 0 },
          bottomRight: { x: 0, y: 0 }
        };
        let topI: { x: number; y: number } | null = null;
        let sideI: { x: number; y: number } | null = null;
        let bottomI: { x: number; y: number } | null = null;

        const update = () => {
          const left = w - pos.x + 1;
          const top = h - pos.y;
          let a = 2 * Math.acos(left / Math.hypot(top, left));
          if (top < 0) a = -a;
          const da = Math.PI - a;
          if (!isFinite(a) || (da >= 0 && da < 0.003)) throw Error('fold');
          a = -a;
          angle = a;
          const pts = [
            { x: 0, y: -h },
            { x: w, y: -h },
            { x: 0, y: 0 },
            { x: w, y: 0 }
          ];
          rect = {
            topLeft: rot(pts[0], pos, a),
            topRight: rot(pts[1], pos, a),
            bottomLeft: rot(pts[2], pos, a),
            bottomRight: rot(pts[3], pos, a)
          };
        };

        try {
          update();
          let limited = limitCircle({ x: 0, y: h }, w, pos);
          if (limited.x !== pos.x || limited.y !== pos.y) {
            pos = limited;
            update();
          }
          const radius = Math.hypot(w, h);
          if (rect.topRight.x <= 0) {
            limited = limitCircle({ x: 0, y: 0 }, radius, rect.bottomLeft);
            if (limited.x !== pos.x || limited.y !== pos.y) {
              pos = limited;
              update();
            }
          }
          const bound = { left: -1, top: -1, width: w + 2, height: h + 2 };
          topI = segX(bound, [rect.topLeft, rect.topRight], [{ x: 0, y: 0 }, { x: w, y: 0 }]);
          sideI = segX(bound, [pos, rect.topLeft], [{ x: w, y: 0 }, { x: w, y: h }]);
          bottomI = segX(bound, [rect.bottomLeft, rect.bottomRight], [{ x: 0, y: h }, { x: w, y: h }]);
          return { pos, angle, rect, topI, sideI, bottomI };
        } catch {
          return null;
        }
      }

      function renderFold(c: ReturnType<typeof calculate>) {
        if (!c) return false;
        let flip: ({ x: number; y: number } | null)[] = [c.rect.topLeft, c.topI];
        if (c.sideI) flip.push(c.sideI);
        flip.push(c.bottomI, c.rect.bottomLeft);
        const validFlip = flip.filter(Boolean) as { x: number; y: number }[];
        if (validFlip.length < 3) return false;
        const active = c.rect.topLeft;
        const drawAngle = -c.angle;
        const flipPoly = validFlip
          .map((pt) => {
            const rel = { x: pt.x - active.x, y: pt.y - active.y };
            const q = rot(rel, { x: 0, y: 0 }, drawAngle);
            return `${q.x.toFixed(2)}px ${q.y.toFixed(2)}px`;
          })
          .join(',');
        turnFrontEl.style.clipPath = `polygon(${flipPoly})`;
        turnFrontEl.style.transform = `translate3d(${active.x}px,${active.y}px,0) rotate(${drawAngle}rad)`;

        let under: ({ x: number; y: number } | null)[] = [c.topI];
        if (c.topI) under.push({ x: w, y: 0 });
        under.push({ x: w, y: h });
        if (c.sideI && dist(c.sideI, c.topI) >= 10) under.push(c.sideI);
        under.push(c.bottomI, c.topI);
        const validUnder = under.filter(Boolean) as { x: number; y: number }[];
        if (validUnder.length >= 3) {
          turnBottomEl.style.clipPath = `polygon(${validUnder.map((pt) => `${pt.x.toFixed(2)}px ${pt.y.toFixed(2)}px`).join(',')})`;
        } else {
          turnBottomEl.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
        }

        const progress = Math.max(0, Math.min(100, Math.abs(((c.pos.x - w) / (2 * w)) * 100)));
        const shadowPos = c.sideI || c.topI;
        const second = shadowPos !== c.sideI && c.sideI ? c.sideI : c.bottomI;
        if (shadowPos && second) {
          const shadowAngle = angleLines([shadowPos, second], [{ x: 0, y: 0 }, { x: w, y: 0 }]);
          const width = Math.max(8, ((3 * w) / 4) * (progress / 100));
          const opacity = Math.max(0, (100 - progress) * 0.004);
          const r = shadowAngle + (3 * Math.PI) / 2;
          turnShadeEl.style.display = 'block';
          turnShadeEl.style.width = `${width}px`;
          turnShadeEl.style.height = `${2 * h}px`;
          turnShadeEl.style.opacity = String(opacity);
          turnShadeEl.style.transform = `translate3d(${shadowPos.x}px,${shadowPos.y - 100}px,0) rotate(${r}rad)`;
        }
        return true;
      }

      const margin = Math.max(18, Math.min(h * 0.1, 82));
      const a = { x: w - margin, y: h - margin };
      const b = { x: -w, y: h };
      const duration = 940;
      const start = performance.now();
      let last: ReturnType<typeof calculate> = null;

      await new Promise<void>((resolve) => {
        function frame(now: number) {
          const raw = Math.min(1, (now - start) / duration);
          const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          const pos =
            direction === 'forward'
              ? { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p }
              : { x: b.x + (a.x - b.x) * p, y: b.y + (a.y - b.y) * p };
          const c = calculate(pos);
          if (c && renderFold(c)) last = c;
          else if (last) renderFold(last);
          if (raw < 1) requestAnimationFrame(frame);
          else resolve();
        }
        requestAnimationFrame(frame);
      });

      flushSync(() => {
        setCurrentTerm(nextTerm);
        if (options?.nextTrail) {
          setTrail(options.nextTrail);
        }
        if (options?.fromSearch) {
          setFromSearchQuestion(options.searchQ || '');
          setSearchQuery('');
        } else {
          setFromSearchQuestion('');
        }
      });
      resetPageScroll(pageEl);
      recordHistory(nextTerm.word);
      setLocationHash(`#term=${encodeURIComponent(nextTerm.word)}`);

      // The destination layer is still covering the page. Give the live React page a
      // layout/paint frame (and any pending web-font metrics) before removing
      // the cover, so the handoff cannot reveal a one-frame vertical jump.
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      turnFxEl.classList.remove('active');
      paperBlockEl.classList.remove('turning-book');
      if (turnBackEl) {
        turnBackEl.style.cssText = '';
        turnBackEl.innerHTML = '';
      }
      turnFrontEl.style.cssText = '';
      turnShadeEl.style.cssText = '';
      turnBottomEl.style.cssText = '';
      turnBottomEl.innerHTML = '';
      turnFrontEl.innerHTML = '';
      isTurningRef.current = false;
      onComplete?.();
    },
    [
      explanationMode,
      specialModes,
      crossRefs,
      bookmarks,
      trail,
      searchQuery,
      recordHistory,
      setLocationHash,
      termIndexByWord,
      soundEnabled
    ]
  );

  // Select a term (via search, related link, index, etc.)
  const handleSelectTerm = useCallback(
    (termToSelect: TermSelectionTarget, options?: TermSelectionOptions) => {
      if (isTurningRef.current) return;

      const resolved = resolveTerm(termToSelect.word);
      if (!resolved) {
        triggerStamp('ENTRY NOT FOUND');
        return;
      }

      const fromSearch = options?.fromSearch ?? false;
      const addTrail = options?.addTrail ?? true;

      if (bookViewRef.current === 'about') {
        pendingTermRef.current = { term: resolved, options };
        animateAboutTurn('term', () => {
          const pending = pendingTermRef.current;
          pendingTermRef.current = null;
          if (pending) {
            handleSelectTerm(pending.term, pending.options);
          }
        }, `#term=${encodeURIComponent(resolved.word)}`);
        return;
      }

      if (resolved.word.toLowerCase() === currentTerm.word.toLowerCase()) {
        if (fromSearch) {
          setFromSearchQuestion(searchQuery);
          setSearchQuery('');
        }
        setLocationHash(`#term=${encodeURIComponent(resolved.word)}`);
        return;
      }

      const currentIndex = termIndexByWord.get(currentTerm.word.toLowerCase()) ?? -1;
      const targetIndex = termIndexByWord.get(resolved.word.toLowerCase()) ?? -1;
      const direction: 'forward' | 'backward' =
        options?.direction ?? (targetIndex !== -1 && currentIndex !== -1 && targetIndex < currentIndex ? 'backward' : 'forward');

      // Compute the next trail without updating React state prematurely (limit to 10 items)
      const nextTrail = addTrail
        ? (trail[trail.length - 1]?.toLowerCase() === resolved.word.toLowerCase()
            ? trail
            : [...trail.slice(-9), resolved.word])
        : trail;

      const searchQ = searchQuery;

      // Defer all state mutations until page turn animation completes
      animatePageTurn(
        resolved,
        direction,
        {
          nextTrail,
          fromSearch,
          searchQ
        },
        () => {}
      );
    },
    [
      animateAboutTurn,
      currentTerm,
      searchQuery,
      trail,
      animatePageTurn,
      resolveTerm,
      termIndexByWord,
      setLocationHash,
      triggerStamp
    ]
  );

  // Single page flip navigation directly to target term
  const riffleToTerm = useCallback(
    (targetTerm: Term, options?: { direction?: 'forward' | 'backward' }) => {
      handleSelectTerm(targetTerm, { addTrail: true, direction: options?.direction });
    },
    [handleSelectTerm]
  );

  // Previous and Next term step helpers
  const handlePrevTerm = useCallback(() => {
    const currentIndex = termIndexByWord.get(currentTerm.word.toLowerCase()) ?? 0;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sortedTerms.length - 1;
    handleSelectTerm(sortedTerms[prevIndex], { addTrail: true, direction: 'backward' });
  }, [currentTerm, handleSelectTerm, sortedTerms, termIndexByWord]);

  const handleNextTerm = useCallback(() => {
    const currentIndex = termIndexByWord.get(currentTerm.word.toLowerCase()) ?? 0;
    const nextIndex = currentIndex < sortedTerms.length - 1 ? currentIndex + 1 : 0;
    handleSelectTerm(sortedTerms[nextIndex], { addTrail: true, direction: 'forward' });
  }, [currentTerm, handleSelectTerm, sortedTerms, termIndexByWord]);

  const handleOpenAbout = useCallback(() => {
    setIsMobileMenuOpen(false);
    pendingTermRef.current = null;
    if (bookViewRef.current === 'about') {
      animateAboutTurn('term');
    } else {
      animateAboutTurn('about');
    }
  }, [animateAboutTurn]);

  const handleCloseAbout = useCallback(() => {
    setIsMobileMenuOpen(false);
    pendingTermRef.current = null;
    animateAboutTurn('term');
  }, [animateAboutTurn]);

  const handleFocusSearch = useCallback(() => {
    setIsMobileMenuOpen(false);
    if (bookViewRef.current === 'about') {
      animateAboutTurn('term', () => {
        window.requestAnimationFrame(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        });
      });
      return;
    }
    searchInputRef.current?.focus();
    searchInputRef.current?.select();
  }, [animateAboutTurn]);

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      if (isProgrammaticHashRef.current) {
        isProgrammaticHashRef.current = false;
        return;
      }

      if (getBookViewFromHash() === 'about') {
        if (bookViewRef.current !== 'about') {
          animateAboutTurn('about');
        }
        return;
      }

      const target = getHashTerm();
      if (bookViewRef.current === 'about') {
        pendingTermRef.current = target ? { term: target, options: { addTrail: false } } : null;
        animateAboutTurn('term', () => {
          const pending = pendingTermRef.current;
          pendingTermRef.current = null;
          if (pending) {
            handleSelectTerm(pending.term, pending.options);
          }
        }, window.location.hash);
        return;
      }
      if (target && target.word.toLowerCase() !== currentTerm.word.toLowerCase()) {
        handleSelectTerm(target, { addTrail: false });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [animateAboutTurn, currentTerm, getHashTerm, handleSelectTerm]);

  // Global keyboard shortcuts (⌘K, Ctrl+K, Escape, ArrowLeft/P, ArrowRight/N)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (isTutorialOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsTutorialOpen(false);
          setTutorialStepIndex(0);
          setIsMobileMenuOpen(false);
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleFocusSearch();
      } else if (e.key === 'Escape') {
        setActiveOverlay(null);
        setIsMobileMenuOpen(false);
        if (bookViewRef.current === 'about') {
          handleCloseAbout();
        }
      } else if (!isInputActive && !activeOverlay) {
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
          e.preventDefault();
          handlePrevTerm();
        } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
          e.preventDefault();
          handleNextTerm();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeOverlay, handleCloseAbout, handleFocusSearch, handleNextTerm, handlePrevTerm, isTutorialOpen]);

  // Bookmarks Toggle
  const handleToggleBookmark = useCallback(() => {
    if (bookViewRef.current === 'about') return;

    const word = currentTerm.word;
    const exists = bookmarks.includes(word);
    const updated = exists ? bookmarks.filter((w) => w !== word) : [...bookmarks, word];
    setBookmarks(updated);
    saveStorage('aiAlmanacBookmarks', updated);
    if (soundEnabled) {
      playPaperTearSound();
    }
    triggerStamp(exists ? 'BOOKMARK REMOVED' : 'BOOKMARKED');
  }, [bookmarks, currentTerm, soundEnabled, triggerStamp]);

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
    (name: string): boolean => {
      if (bookViewRef.current === 'about') return false;

      const trimmed = normalizeCollectionName(name);
      if (!trimmed) {
        triggerStamp('COLLECTION NAME REQUIRED');
        return false;
      }
      if (hasCollection(collections, trimmed)) {
        triggerStamp('COLLECTION ALREADY EXISTS');
        return false;
      }

      const updated = { ...collections, [trimmed]: [] };
      setCollections(updated);
      saveStorage('aiAlmanacCollections', updated);
      triggerStamp(`COLLECTION “${trimmed}” CREATED`);
      return true;
    },
    [collections, triggerStamp]
  );

  const handleAddToCollection = useCallback(
    (name: string) => {
      if (bookViewRef.current === 'about') return;

      const trimmed = normalizeCollectionName(name);
      if (!trimmed) {
        triggerStamp('COLLECTION NAME REQUIRED');
        return;
      }

      const existing = collections[trimmed];
      if (existing && !existing.includes(currentTerm.word)) {
        const updated = { ...collections, [trimmed]: [...existing, currentTerm.word] };
        setCollections(updated);
        saveStorage('aiAlmanacCollections', updated);
        triggerStamp(`FILED IN ${trimmed.toUpperCase()}`);
      } else if (existing) {
        triggerStamp(`ALREADY IN ${trimmed.toUpperCase()}`);
      } else {
        const updated = { ...collections, [trimmed]: [currentTerm.word] };
        setCollections(updated);
        saveStorage('aiAlmanacCollections', updated);
        triggerStamp(`COLLECTION “${trimmed}” CREATED & FILED`);
      }
      setActiveOverlay(null);
    },
    [collections, currentTerm, triggerStamp]
  );

  const handleRenameCollection = useCallback(
    (currentName: string, nextName: string): boolean => {
      if (bookViewRef.current === 'about') return false;

      const trimmed = normalizeCollectionName(nextName);
      if (!hasCollection(collections, currentName)) return false;
      if (!trimmed) {
        triggerStamp('COLLECTION NAME REQUIRED');
        return false;
      }
      if (trimmed !== currentName && hasCollection(collections, trimmed)) {
        triggerStamp('COLLECTION ALREADY EXISTS');
        return false;
      }
      if (trimmed === currentName) return true;

      const updated: Collections = {};
      Object.entries(collections).forEach(([name, words]) => {
        updated[name === currentName ? trimmed : name] = words;
      });
      setCollections(updated);
      saveStorage('aiAlmanacCollections', updated);
      triggerStamp(`COLLECTION RENAMED TO “${trimmed}”`);
      return true;
    },
    [collections, triggerStamp]
  );

  const handleDeleteCollection = useCallback(
    (name: string) => {
      if (bookViewRef.current === 'about') return;

      if (!hasCollection(collections, name)) return;

      const updated = { ...collections };
      delete updated[name];
      setCollections(updated);
      saveStorage('aiAlmanacCollections', updated);
      triggerStamp(`COLLECTION “${name}” DELETED`);
    },
    [collections, triggerStamp]
  );

  const handleRemoveFromCollection = useCallback(
    (collectionName: string, word: string) => {
      if (bookViewRef.current === 'about') return;

      const existing = collections[collectionName];
      if (!existing) return;

      const updated = {
        ...collections,
        [collectionName]: existing.filter((item) => item !== word)
      };
      setCollections(updated);
      saveStorage('aiAlmanacCollections', updated);
      triggerStamp(`REMOVED FROM ${collectionName.toUpperCase()}`);
    },
    [collections, triggerStamp]
  );

  // Tab jump by letter
  const handleSelectLetter = useCallback(
    (letter: string) => {
      const currentLetter = currentTerm.word[0].toUpperCase();
      const direction: 'forward' | 'backward' = letter < currentLetter ? 'backward' : 'forward';
      const found = sortedTerms.find((t) => t.word[0].toUpperCase() === letter);
      if (found) {
        handleSelectTerm(found, { addTrail: true, direction });
      } else {
        triggerStamp(`NO ${letter} ENTRIES YET`);
      }
    },
    [currentTerm, handleSelectTerm, sortedTerms, triggerStamp]
  );

  // Surprise random jump
  const handleSurprise = useCallback(() => {
    const pool = sortedTerms.filter((t) => t.word !== currentTerm.word);
    const randomTerm = pool[Math.floor(Math.random() * pool.length)] || sortedTerms[0];
    riffleToTerm(randomTerm);
  }, [currentTerm, riffleToTerm, sortedTerms]);

  // Copy deep link
  const handleCopyLink = useCallback(async () => {
    const url = getAbsoluteSiteUrl(getTermRoutePath(currentTerm));
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
    triggerStamp(nextState ? 'SOUND ON' : 'SOUND OFF', false);
  }, [soundEnabled, triggerStamp]);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuMounted(true);
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleMobileMenuAnimationEnd = useCallback(() => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuMounted(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isTutorialOpen || !isCompactViewport) return;

    const activeStep = TUTORIAL_STEPS[tutorialStepIndex];
    if (!activeStep) return;

    if (activeStep.region === 'sidebar') {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }, [closeMobileMenu, isCompactViewport, isTutorialOpen, openMobileMenu, tutorialStepIndex]);

  const handleCloseTutorial = useCallback(() => {
    setIsTutorialOpen(false);
    setTutorialStepIndex(0);
    closeMobileMenu();
  }, [closeMobileMenu]);

  const handlePlayTutorial = useCallback(() => {
    setActiveOverlay(null);
    setTutorialStepIndex(0);
    closeMobileMenu();

    if (bookViewRef.current === 'about') {
      animateAboutTurn('term', () => setIsTutorialOpen(true));
      return;
    }

    setIsTutorialOpen(true);
  }, [animateAboutTurn, closeMobileMenu]);

  const handlePageChangeMode = useCallback((mode: ExplanationMode) => {
    setExplanationMode(mode);
  }, []);

  const handlePageClearTrail = useCallback(() => {
    setTrail([currentTerm.word]);
  }, [currentTerm.word]);

  const handlePageOpenPicker = useCallback(() => {
    if (bookViewRef.current === 'about') return;

    setActiveOverlay('picker');
  }, []);

  const handlePageOpenClip = useCallback(() => {
    if (bookViewRef.current === 'about') return;

    if (soundEnabled) {
      playPaperTearSound();
    }
    setActiveOverlay('clip');
  }, [soundEnabled]);

  const handlePageOpenTimeline = useCallback(() => {
    setActiveOverlay('timeline');
  }, []);

  const renderCover = (isMobileOpen = false, isMobileClosing = false) => (
    <Cover
      totalTerms={totalPages}
      bookmarkCount={bookmarks.length}
      historyCount={historyTerms.length}
      collectionCount={Object.keys(collections).length}
      soundEnabled={soundEnabled}
      onPlayTutorial={handlePlayTutorial}
      isMobileOpen={isMobileOpen}
      isMobileClosing={isMobileClosing}
      isAboutActive={bookView === 'about'}
      onCloseMobile={closeMobileMenu}
      onMobileAnimationEnd={handleMobileMenuAnimationEnd}
      onToggleSound={handleToggleSound}
      onOpenOverlay={(overlay) => {
        if (
          bookViewRef.current === 'about' &&
          (overlay === 'bookmarks' || overlay === 'collections' || overlay === 'clip')
        ) {
          return;
        }

        closeMobileMenu();
        if (soundEnabled) {
          if (overlay === 'clip') {
            playPaperTearSound();
          } else {
            playPaperSmallSound();
          }
        }
        setActiveOverlay(overlay);
      }}
      onFocusSearch={handleFocusSearch}
      onOpenAbout={handleOpenAbout}
      onSurprise={() => {
        closeMobileMenu();
        handleSurprise();
      }}
    />
  );

  return (
    <>
      <MobileBar
        isMenuOpen={isMobileMenuOpen}
        onOpenMenu={() => {
          if (isMobileMenuOpen) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }
        }}
        onFocusSearch={handleFocusSearch}
      />

      {isMobileMenuMounted && (
        <button
          type="button"
          className={`mobile-sidebar-scrim${isMobileMenuOpen ? '' : ' mobile-sidebar-scrim-closing'}`}
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
      )}

      {isMobileMenuMounted && renderCover(true, !isMobileMenuOpen)}

      <main className="stage">
        <section className="book">
          {renderCover()}

          <div
            className={`paper-block ${bookView === 'about' ? 'about-active' : ''}${activeOverlay ? ' overlay-open' : ''}`}
            ref={paperBlockRef}
            id="paperBlock"
          >
            <div className="page-stack" aria-hidden="true">
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
            </div>

            <div className="term-page-layer" aria-hidden={bookView === 'about'}>
              <Page
                ref={pageRef}
                currentTerm={currentTerm}
                termIndex={termIndex}
                totalTerms={totalPages}
                isBookmarked={bookmarks.includes(currentTerm.word)}
                explanationMode={explanationMode}
                specialModes={specialModes}
                crossRefs={crossRefs}
                searchIndex={searchIndex}
                searchQuery={searchQuery}
                fromSearchQuestion={fromSearchQuestion}
                trail={trail}
                searchRef={searchInputRef}
                onSelectTerm={handleSelectTerm}
                onPrevTerm={handlePrevTerm}
                onNextTerm={handleNextTerm}
                onToggleBookmark={handleToggleBookmark}
                onChangeMode={handlePageChangeMode}
                onSearchChange={setSearchQuery}
                onClearTrail={handlePageClearTrail}
                onOpenPicker={handlePageOpenPicker}
                onOpenClip={handlePageOpenClip}
                onOpenTimeline={handlePageOpenTimeline}
                onCopyLink={handleCopyLink}
                onSpeak={handleSpeak}
              />
            </div>

            {bookView === 'about' && (
              <div className="about-page-layer">
                <AboutPage totalTerms={totalPages} />
              </div>
            )}

            {bookView !== 'about' && (
              <Tabs
                currentLetter={currentTerm.word[0].toUpperCase()}
                availableLetters={availableLetters}
                onSelectLetter={handleSelectLetter}
              />
            )}

            {/* Single-leaf soft page turn */}
            <div className="turn-fx" ref={turnFxRef} id="turnFx" aria-hidden="true">
              <div className="turn-leaf" ref={turnLeafRef} id="turnLeaf">
                <div className="turn-back" ref={turnBackRef} id="turnBack"></div>
                <div className="turn-bottom" ref={turnBottomRef} id="turnBottom"></div>
                <div className="turn-face turn-front" ref={turnFrontRef} id="turnFront"></div>
                <div className="turn-shade" ref={turnShadeRef} id="turnShade"></div>
              </div>
            </div>

            <div className="solid-turn" ref={solidTurnRef} aria-hidden="true">
              <AboutPage totalTerms={totalPages} />
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
        termsByWord={termsByWord}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
      />

      <TimelineOverlay
        isOpen={activeOverlay === 'timeline'}
        timeline={timeline}
        termsByWord={termsByWord}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
      />

      <CollectionsOverlay
        isOpen={activeOverlay === 'collections'}
        collections={collections}
        termsByWord={termsByWord}
        onClose={() => setActiveOverlay(null)}
        onSelectTerm={handleSelectTerm}
        onCreateCollection={handleCreateCollection}
        onRenameCollection={handleRenameCollection}
        onDeleteCollection={handleDeleteCollection}
        onRemoveFromCollection={handleRemoveFromCollection}
      />

      <PickerOverlay
        isOpen={activeOverlay === 'picker'}
        collections={collections}
        onClose={() => setActiveOverlay(null)}
        onAddToCollection={handleAddToCollection}
      />

      <ClipOverlay
        isOpen={activeOverlay === 'clip'}
        term={currentTerm}
        pageNumber={termIndex + 1}
        formattedDate={formattedDate}
        soundEnabled={soundEnabled}
        onClose={() => setActiveOverlay(null)}
        onShowStamp={triggerStamp}
      />

      <TutorialOverlay
        isOpen={isTutorialOpen}
        steps={TUTORIAL_STEPS}
        activeStepIndex={tutorialStepIndex}
        onStepChange={setTutorialStepIndex}
        onClose={handleCloseTutorial}
      />
    </>
  );
};

export const App: React.FC = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isTermPath = /\/term\/[^/]+\/?$/.test(pathname);
  const isKnownPath = pathname === '/' || pathname === '' || pathname === '/index.html' || isTermPath;

  return isKnownPath ? <AlmanacApp /> : <NotFoundPage />;
};

export default App;
