function resetVisiblePageScroll(): void {
  const pageLayout = document.querySelector<HTMLElement>('.term-page-layer .page-layout');
  if (!pageLayout) return;

  pageLayout.scrollTop = 0;
  pageLayout.scrollLeft = 0;
}

function attachPageTurnHandoffGuard(): void {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

  const attach = () => {
    const turnFx = document.querySelector<HTMLElement>('.turn-fx');
    if (!turnFx) {
      window.requestAnimationFrame(attach);
      return;
    }

    let wasActive = turnFx.classList.contains('active');

    const observer = new MutationObserver(() => {
      const isActive = turnFx.classList.contains('active');

      // App.tsx resets the destination page before the final layout frame. A
      // font/layout/scroll-anchor adjustment can still leave the live
      // .page-layout a pixel or two away from the animated destination by the
      // time the turn overlay is removed. Reassert the top position at the
      // actual handoff so the browser never paints that residual offset.
      if (wasActive && !isActive) {
        resetVisiblePageScroll();
        window.requestAnimationFrame(resetVisiblePageScroll);
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
