function isCompactViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
}

function getVisiblePageInner(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.term-page-layer .page-inner');
}

function getVisiblePageLayout(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.term-page-layer .page-layout');
}

function getVisiblePageScrollContainer(): HTMLElement | null {
  // Mobile deliberately scrolls .page-inner. Desktop/tablet keep the historical
  // .page-layout scrollport.
  if (isCompactViewport()) {
    return getVisiblePageInner();
  }
  return getVisiblePageLayout();
}

function resetVisiblePageScroll(): void {
  const scrollContainer = getVisiblePageScrollContainer();
  if (!scrollContainer) return;

  scrollContainer.scrollTop = 0;
  scrollContainer.scrollLeft = 0;
}

function scheduleVisiblePageScrollReset(): void {
  resetVisiblePageScroll();
  window.requestAnimationFrame(() => {
    resetVisiblePageScroll();
    window.requestAnimationFrame(resetVisiblePageScroll);
  });
}

function syncMobileTurnSnapshots(): void {
  if (!isCompactViewport()) return;

  const liveInner = getVisiblePageInner();
  if (!liveInner) return;

  const currentScrollTop = liveInner.scrollTop;
  const currentScrollLeft = liveInner.scrollLeft;
  const turnFront = document.querySelector<HTMLElement>('.turn-front > .page-inner');
  const turnBottom = document.querySelector<HTMLElement>('.turn-bottom > .page-inner');
  const turnBack = document.querySelector<HTMLElement>('.turn-back > .page-inner');
  const turnBackHost = document.querySelector<HTMLElement>('.turn-back');
  const isBackwardTurn = Boolean(turnBackHost && getComputedStyle(turnBackHost).display !== 'none');

  // App.tsx historically stores page-turn scroll state on .page-layout. Mobile
  // now scrolls .page-inner to remove the invisible clipping plane above the
  // headword, so copy the real scroll offset into the animated current-page
  // clones here. Destination snapshots always begin at the top.
  if (turnFront) {
    turnFront.scrollTop = currentScrollTop;
    turnFront.scrollLeft = currentScrollLeft;
  }

  if (isBackwardTurn) {
    if (turnBottom) {
      turnBottom.scrollTop = currentScrollTop;
      turnBottom.scrollLeft = currentScrollLeft;
    }
    if (turnBack) {
      turnBack.scrollTop = 0;
      turnBack.scrollLeft = 0;
    }
  } else if (turnBottom) {
    turnBottom.scrollTop = 0;
    turnBottom.scrollLeft = 0;
  }
}

function attachPageTurnHandoffGuard(): void {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const settleAfterPageRestore = () => {
    scheduleVisiblePageScrollReset();
  };

  window.addEventListener('pageshow', settleAfterPageRestore);
  window.addEventListener('hashchange', scheduleVisiblePageScrollReset);

  const attach = () => {
    const turnFx = document.querySelector<HTMLElement>('.turn-fx');
    if (!turnFx) {
      window.requestAnimationFrame(attach);
      return;
    }

    // Initial render/deep-link load can inherit browser scroll restoration.
    scheduleVisiblePageScrollReset();

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        const scrollContainer = getVisiblePageScrollContainer();
        if (!scrollContainer) return;

        // Only repair a small residual offset after late font metrics settle.
        // A real user scroll should never be pulled back to the top.
        if (scrollContainer.scrollTop > 0 && scrollContainer.scrollTop <= 96) {
          scheduleVisiblePageScrollReset();
        }
      });
    }

    let wasActive = turnFx.classList.contains('active');

    const observer = new MutationObserver(() => {
      const isActive = turnFx.classList.contains('active');

      if (!wasActive && isActive) {
        // The clones are mounted synchronously in the same task that activates
        // turnFx, so the mutation microtask can mirror the real mobile scroll
        // position before the first animated frame is painted.
        syncMobileTurnSnapshots();
      }

      if (wasActive && !isActive) {
        // Every new glossary entry must start at the top. This also covers the
        // normal animated path where App.tsx still resets the historical
        // .page-layout element.
        scheduleVisiblePageScrollReset();
      }

      wasActive = isActive;
    });

    observer.observe(turnFx, {
      attributes: true,
      attributeFilter: ['class']
    });
  };

  window.requestAnimationFrame(attach);
}

attachPageTurnHandoffGuard();
