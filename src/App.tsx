import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { flushSync } from 'react-dom';
import type { Term, ExplanationMode, OverlayType } from './types/almanac';
import { terms, sortedTerms, termsByWord, timeline, specialModes, crossRefs } from './data/terms';
import { Cover } from './components/Cover';
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
import {
  playPageTurnSound,
  playPaperTearSound,
  playPaperSmallSound,
  playStampSound
} from './utils/sound';
import { getPronunciation } from './utils/pronunciation';

const modeNames: Record<ExplanationMode, string> = {
  dictionary: 'Dictionary',
  plain: 'Plain English',
  technical: 'Technical',
  vibe: 'Vibe Coder'
};

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

function cleanClone(node: HTMLElement): HTMLElement {
  const c = node.cloneNode(true) as HTMLElement;
  c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  c.querySelectorAll('button, input').forEach((n) => {
    (n as HTMLElement).tabIndex = -1;
    n.setAttribute('aria-hidden', 'true');
  });
  return c;
}

function getExplanationForTerm(term: Term, mode: ExplanationMode): string {
  const s = specialModes[term.word];
  if (mode === 'dictionary') return term.definition;
  if (s && s[mode]) return s[mode];
  if (mode === 'plain') return `Put simply: ${term.definition}`;
  if (mode === 'technical') {
    return `${term.definition} In implementation terms, this usually intersects with ${term.related.slice(0, 2).join(' and ')}.`;
  }
  return `${term.note} ${(term.example || '').replace(/[“”]/g, '')}`;
}

function createDestinationSnapshot(
  term: Term,
  mode: ExplanationMode,
  sampleInner: HTMLElement,
  termIndex: number,
  totalTerms: number,
  isBookmarked: boolean = false,
  nextTrail: string[] = []
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
    defEl.textContent = getExplanationForTerm(term, mode);
  }

  // 4. Example
  const exEl = clone.querySelector('.example') as HTMLElement | null;
  if (exEl) {
    if (term.example) {
      exEl.textContent = term.example;
      exEl.style.display = 'block';
    } else {
      exEl.style.display = 'none';
    }
  }

  // 5. Lower grid (Origin & In Practice)
  const lowerGridPs = clone.querySelectorAll('.lower-grid p');
  if (lowerGridPs.length >= 2) {
    lowerGridPs[0].textContent = term.origin || 'A standard term in modern AI practice.';
    lowerGridPs[1].textContent = term.note || 'Use the term precisely in context.';
  }

  // 6. Thread & Trail
  const trailEl = clone.querySelector('.trail');
  if (trailEl && nextTrail && nextTrail.length > 0) {
    trailEl.innerHTML = nextTrail
      .slice(-10)
      .map((w) => `<button type="button" tabindex="-1" aria-hidden="true">${w}</button>`)
      .join('');
  }

  // 7. Margin sections: See also, Compare, Often confused with, Filed under, Marginalia
  const marginEl = clone.querySelector('.margin');
  if (marginEl) {
    const x = crossRefs[term.word] || { compare: [], confused: [] };
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
  }

  // 8. Folio top, Page number
  const pageNumEl = clone.querySelector('#pageNumber') || clone.querySelector('.page-footer .center');
  if (pageNumEl) {
    pageNumEl.textContent = String(101 + termIndex * 7);
  }
  const folioTopEl = clone.querySelector('.folio-top');
  if (folioTopEl) {
    folioTopEl.textContent = `Leaf ${String(termIndex + 1).padStart(2, '0')} of ${totalTerms}`;
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

  // Refs for page turn animations
  const searchInputRef = useRef<HTMLInputElement>(null);
  const paperBlockRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const turnFxRef = useRef<HTMLDivElement>(null);
  const turnLeafRef = useRef<HTMLDivElement>(null);
  const turnBackRef = useRef<HTMLDivElement>(null);
  const turnFrontRef = useRef<HTMLDivElement>(null);
  const turnBottomRef = useRef<HTMLDivElement>(null);
  const turnShadeRef = useRef<HTMLDivElement>(null);
  const isTurningRef = useRef<boolean>(false);
  const isProgrammaticHashRef = useRef<boolean>(false);

  // Compute depth and index
  const termIndex = useMemo(() => {
    const idx = sortedTerms.findIndex((t) => t.word === currentTerm.word);
    return idx >= 0 ? idx : 0;
  }, [currentTerm]);

  const availableLetters = useMemo(() => {
    return new Set(sortedTerms.map((t) => t.word[0].toUpperCase()));
  }, []);

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
  }, [termIndex]);

  // Record history
  const recordHistory = useCallback((word: string) => {
    setHistoryTerms((prev) => {
      const updated = [word, ...prev.filter((w) => w.toLowerCase() !== word.toLowerCase())].slice(0, 40);
      saveStorage('aiAlmanacHistory', updated);
      return updated;
    });
  }, []);

  // Trigger stamp animation
  const triggerStamp = useCallback(
    (text: string) => {
      if (stampTimerRef.current) {
        window.clearTimeout(stampTimerRef.current);
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
        recordHistory(nextTerm.word);
        isProgrammaticHashRef.current = true;
        window.location.hash = `#term=${encodeURIComponent(nextTerm.word)}`;
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
        recordHistory(nextTerm.word);
        isProgrammaticHashRef.current = true;
        window.location.hash = `#term=${encodeURIComponent(nextTerm.word)}`;
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

      paperBlockEl.classList.add('turning-book');
      turnFxEl.classList.add('active');

      const w = Math.max(1, turnFxEl.getBoundingClientRect().width);
      const h = Math.max(1, turnFxEl.getBoundingClientRect().height);

      const nextIndex = sortedTerms.findIndex((t) => t.word.toLowerCase() === nextTerm.word.toLowerCase());
      const safeNextIndex = nextIndex >= 0 ? nextIndex : 0;
      const isSaved = bookmarks.includes(nextTerm.word);
      const targetTrail = options?.nextTrail || trail;

      const pageInner = pageEl.querySelector('.page-inner');
      if (pageInner) {
        if (direction === 'forward') {
          // Forward turn:
          if (turnBackEl) {
            turnBackEl.style.display = 'none';
            turnBackEl.innerHTML = '';
          }

          // turnFront = current page (peels away to the left in 3D)
          turnFrontEl.innerHTML = '';
          turnFrontEl.appendChild(cleanClone(pageInner as HTMLElement));
          turnFrontEl.style.display = 'block';

          // turnBottom = destination page (revealed underneath from right to left)
          turnBottomEl.innerHTML = '';
          const destSnap = createDestinationSnapshot(
            nextTerm,
            explanationMode,
            pageInner as HTMLElement,
            safeNextIndex,
            sortedTerms.length,
            isSaved,
            targetTrail
          );
          turnBottomEl.appendChild(destSnap);
          turnBottomEl.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
          turnBottomEl.style.display = 'block';
        } else {
          // Backward turn (exact opposite of forward):
          // turnBack = destination page (revealed on base from left to right as current page uncurls)
          if (turnBackEl) {
            turnBackEl.innerHTML = '';
            const destSnap = createDestinationSnapshot(
              nextTerm,
              explanationMode,
              pageInner as HTMLElement,
              safeNextIndex,
              sortedTerms.length,
              isSaved,
              targetTrail
            );
            turnBackEl.appendChild(destSnap);
            turnBackEl.style.display = 'block';
          }

          // turnBottom = current page (unmasks revealing destSnap underneath)
          turnBottomEl.innerHTML = '';
          turnBottomEl.appendChild(cleanClone(pageInner as HTMLElement));
          turnBottomEl.style.clipPath = 'none';
          turnBottomEl.style.display = 'block';

          // turnFront = current page (3D curled folding flap uncurling back across from left to right)
          turnFrontEl.innerHTML = '';
          turnFrontEl.appendChild(cleanClone(pageInner as HTMLElement));
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
        turnFrontEl.style.filter = `drop-shadow(2px 2px ${4 + progress * 0.04}px rgba(43,29,16,${0.09 + progress * 0.0022}))`;
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
      recordHistory(nextTerm.word);
      isProgrammaticHashRef.current = true;
      window.location.hash = `#term=${encodeURIComponent(nextTerm.word)}`;
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
    [explanationMode, soundEnabled, bookmarks, trail]
  );

  // Select a term (via search, related link, index, etc.)
  const handleSelectTerm = useCallback(
    (
      termToSelect: Term,
      options?: { fromSearch?: boolean; addTrail?: boolean; direction?: 'forward' | 'backward' }
    ) => {
      if (isTurningRef.current) return;

      // Resolve term object if incomplete
      const resolved =
        termsByWord[termToSelect.word.toLowerCase()] ||
        sortedTerms.find((t) => t.word.toLowerCase() === termToSelect.word.toLowerCase()) ||
        termToSelect;

      const fromSearch = options?.fromSearch ?? false;
      const addTrail = options?.addTrail ?? true;

      if (resolved.word.toLowerCase() === currentTerm.word.toLowerCase()) {
        if (fromSearch) {
          setFromSearchQuestion(searchQuery);
          setSearchQuery('');
        }
        isProgrammaticHashRef.current = true;
        window.location.hash = `#term=${encodeURIComponent(resolved.word)}`;
        return;
      }

      const currentIndex = sortedTerms.findIndex((t) => t.word.toLowerCase() === currentTerm.word.toLowerCase());
      const targetIndex = sortedTerms.findIndex((t) => t.word.toLowerCase() === resolved.word.toLowerCase());
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
    [currentTerm, searchQuery, trail, animatePageTurn]
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
    const currentIndex = sortedTerms.findIndex((t) => t.word.toLowerCase() === currentTerm.word.toLowerCase());
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sortedTerms.length - 1;
    handleSelectTerm(sortedTerms[prevIndex], { addTrail: true, direction: 'backward' });
  }, [currentTerm, handleSelectTerm]);

  const handleNextTerm = useCallback(() => {
    const currentIndex = sortedTerms.findIndex((t) => t.word.toLowerCase() === currentTerm.word.toLowerCase());
    const nextIndex = currentIndex < sortedTerms.length - 1 ? currentIndex + 1 : 0;
    handleSelectTerm(sortedTerms[nextIndex], { addTrail: true, direction: 'forward' });
  }, [currentTerm, handleSelectTerm]);

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      if (isProgrammaticHashRef.current) {
        isProgrammaticHashRef.current = false;
        return;
      }
      const target = getHashTerm();
      if (target && target.word.toLowerCase() !== currentTerm.word.toLowerCase()) {
        handleSelectTerm(target, { addTrail: false });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentTerm, getHashTerm, handleSelectTerm]);

  // Global keyboard shortcuts (⌘K, Ctrl+K, Escape, ArrowLeft/P, ArrowRight/N)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'Escape') {
        setActiveOverlay(null);
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
  }, [activeOverlay, handlePrevTerm, handleNextTerm]);

  // Bookmarks Toggle
  const handleToggleBookmark = useCallback(() => {
    const word = currentTerm.word;
    const exists = bookmarks.includes(word);
    const updated = exists ? bookmarks.filter((w) => w !== word) : [...bookmarks, word];
    setBookmarks(updated);
    saveStorage('aiAlmanacBookmarks', updated);
    if (soundEnabled) {
      playPaperTearSound();
    }
    triggerStamp(exists ? 'BOOKMARK REMOVED' : 'DOG-EARED');
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
      const currentLetter = currentTerm.word[0].toUpperCase();
      const direction: 'forward' | 'backward' = letter < currentLetter ? 'backward' : 'forward';
      const found = sortedTerms.find((t) => t.word[0].toUpperCase() === letter);
      if (found) {
        handleSelectTerm(found, { addTrail: true, direction });
      } else {
        triggerStamp(`NO ${letter} ENTRIES YET`);
      }
    },
    [currentTerm, handleSelectTerm, triggerStamp]
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
              if (soundEnabled) {
                if (overlay === 'clip') {
                  playPaperTearSound();
                } else {
                  playPaperSmallSound();
                }
              }
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
            <div className="page-stack" aria-hidden="true">
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
              <i className="stack-sheet"></i>
            </div>

            <Page
              ref={pageRef}
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
              onPrevTerm={handlePrevTerm}
              onNextTerm={handleNextTerm}
              onToggleBookmark={handleToggleBookmark}
              onChangeMode={(m) => setExplanationMode(m)}
              onSearchChange={setSearchQuery}
              onClearTrail={() => setTrail([currentTerm.word])}
              onOpenPicker={() => setActiveOverlay('picker')}
              onOpenClip={() => {
                if (soundEnabled) playPaperTearSound();
                setActiveOverlay('clip');
              }}
              onOpenTimeline={() => setActiveOverlay('timeline')}
              onCopyLink={handleCopyLink}
              onSpeak={handleSpeak}
            />

            <Tabs
              currentLetter={currentTerm.word[0].toUpperCase()}
              availableLetters={availableLetters}
              onSelectLetter={handleSelectLetter}
            />

            {/* Single-leaf soft page turn */}
            <div className="turn-fx" ref={turnFxRef} id="turnFx" aria-hidden="true">
              <div className="turn-leaf" ref={turnLeafRef} id="turnLeaf">
                <div className="turn-back" ref={turnBackRef} id="turnBack"></div>
                <div className="turn-bottom" ref={turnBottomRef} id="turnBottom"></div>
                <div className="turn-face turn-front" ref={turnFrontRef} id="turnFront"></div>
                <div className="turn-shade" ref={turnShadeRef} id="turnShade"></div>
              </div>
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
