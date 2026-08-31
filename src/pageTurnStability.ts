function getVisiblePageLayout(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.term-page-layer .page-layout');
}

function resetVisiblePageScroll(): void {
  const pageLayout = getVisiblePageLayout();
  if (!pageLayout) return;

  pageLayout.scrollTop = 0;
  pageLayout.scrollLeft = 0;
}

function scheduleVisiblePageScrollReset(): void {
  resetVisiblePageScroll();
  window.requestAnimationFrame(() => {
    resetVisiblePageScroll();
    window.requestAnimationFrame(resetVisiblePageScroll);
  });
}

function attachPageTurnHandoffGuard(): void {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const settleAfterPageRestore = () => {
    // Mobile Safari may restore a nested overflow container after React has
    // mounted. That small restored scrollTop is what physically pushes the
    // headword under .page-layout's clipping edge. Reassert the intended top
    // position across a few paint frames instead of trying to hide the symptom
    // with more padding.
    scheduleVisiblePageScrollReset();
  };

  window.addEventListener('pageshow', settleAfterPageRestore);

  const attach = () => {
    const turnFx = document.querySelector<HTMLElement>('.turn-fx');
    if (!turnFx) {
      window.requestAnimationFrame(attach);
      return;
    }

    // Initial render/deep-link load can inherit Safari's nested scroll restore
    // even when no page-turn animation has happened yet.
    scheduleVisiblePageScrollReset();

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        const pageLayout = getVisiblePageLayout();
        if (!pageLayout) return;

        // Only repair a small residual offset after late font metrics settle.
        // A real user scroll should never be pulled back to the top.
        if (pageLayout.scrollTop > 0 && pageLayout.scrollTop <= 96) {
          scheduleVisiblePageScrollReset();
        }
      });
    }

    let wasActive = turnFx.classList.contains('active');

    const observer = new MutationObserver(() => {
      const isActive = turnFx.classList.contains('active');

      // App.tsx resets the destination page before the final layout frame. A
      // font/layout/scroll-anchor adjustment can still leave the live
      // .page-layout a few pixels away from the animated destination by the
      // time the turn overlay is removed. Reassert the top position at the
      // actual handoff so the browser never paints that residual offset.
      if (wasActive && !isActive) {
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
