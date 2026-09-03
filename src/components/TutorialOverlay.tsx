import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TutorialPlacement, TutorialStep } from './tutorialSteps';

interface TutorialOverlayProps {
  isOpen: boolean;
  steps: readonly TutorialStep[];
  activeStepIndex: number;
  onStepChange: (index: number) => void;
  onClose: () => void;
}

interface RectPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TooltipPosition {
  top: number;
  left: number;
  placement: Exclude<TutorialPlacement, 'auto'>;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isCompactViewport = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;

const isVisible = (element: Element): element is HTMLElement => {
  if (!(element instanceof HTMLElement)) return false;
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);
  return rect.width > 0 && rect.height > 0 && styles.display !== 'none' && styles.visibility !== 'hidden';
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  isOpen,
  steps,
  activeStepIndex,
  onStepChange,
  onClose
}) => {
  const activeStep = steps[activeStepIndex] || steps[0];
  const cardRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const targetElementRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const measureFrameRef = useRef<number | null>(null);
  const [targetRect, setTargetRect] = useState<RectPosition | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const [mobileSidebarCardMaxHeight, setMobileSidebarCardMaxHeight] = useState<number | null>(null);

  const resolveTarget = useCallback((step: TutorialStep): HTMLElement | null => {
    if (typeof document === 'undefined') return null;

    const compact = isCompactViewport();
    const mobileSidebar = compact ? document.querySelector('#mobileSidebar') : null;

    // On compact layouts the sidebar and page are separate visual surfaces. Do
    // not briefly target the page while the drawer is still closing, or fall
    // back to the hidden desktop sidebar while the mobile drawer is opening.
    if (compact && step.region === 'page' && mobileSidebar && isVisible(mobileSidebar)) {
      return null;
    }

    const selectors = compact && step.region === 'sidebar'
      ? [step.mobileTarget]
      : [
          compact && step.mobileTarget ? step.mobileTarget : step.target,
          compact ? step.target : step.mobileTarget,
          step.fallbackTarget,
          '#page',
          '#mobileMenu'
        ];

    for (const selector of selectors.filter((value): value is string => Boolean(value))) {
      try {
        const element = document.querySelector(selector);
        if (element && isVisible(element)) return element;
      } catch {
        // Ignore an invalid optional selector and continue to the next fallback.
      }
    }

    return null;
  }, []);

  const measure = useCallback(() => {
    if (!isOpen || !activeStep) return;

    const target = resolveTarget(activeStep);
    targetElementRef.current = target;

    if (!target) {
      setTargetRect(null);
      setTooltipPosition(null);
      setMobileSidebarCardMaxHeight(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const nextRect = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    setTargetRect(nextRect);

    const card = cardRef.current;
    if (!card) {
      setTooltipPosition(null);
      return;
    }

    const compact = isCompactViewport();
    const isMobileSidebarStep = compact && activeStep.region === 'sidebar';
    const isMobilePageNavigationStep = compact && activeStep.id === 'page-navigation';
    const cardRect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = viewportWidth <= 540 ? 14 : 22;
    const gap = viewportWidth <= 540 ? 12 : 18;
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    if (isMobileSidebarStep) {
      // The mobile drawer leaves no useful horizontal space for a conventional
      // tooltip. Reserve the non-interactive brand area above the navigation
      // instead, so the tutorial never blankets the menu it is explaining.
      const mobileNav = document.querySelector<HTMLElement>('#mobileSidebar #coverNav');
      const navTop = mobileNav?.getBoundingClientRect().top ?? rect.top;
      const availableHeight = Math.max(88, Math.floor(navTop - margin - gap));
      setMobileSidebarCardMaxHeight(availableHeight);
      setTooltipPosition({
        top: margin,
        left: clamp((viewportWidth - cardWidth) / 2, margin, viewportWidth - cardWidth - margin),
        placement: 'top'
      });
      return;
    }

    setMobileSidebarCardMaxHeight(null);

    if (isMobilePageNavigationStep) {
      // Keep the bottom Previous / Next bar completely exposed. A top-docked
      // coach card is stable and avoids the page-navigation target by design.
      setTooltipPosition({
        top: margin,
        left: clamp((viewportWidth - cardWidth) / 2, margin, viewportWidth - cardWidth - margin),
        placement: 'top'
      });
      return;
    }

    const candidateWithoutClamp = (placement: Exclude<TutorialPlacement, 'auto'>): RectPosition => {
      let top = rect.top + rect.height / 2 - cardHeight / 2;
      let left = rect.left + rect.width / 2 - cardWidth / 2;

      if (placement === 'top') top = rect.top - cardHeight - gap;
      if (placement === 'right') left = rect.right + gap;
      if (placement === 'bottom') top = rect.bottom + gap;
      if (placement === 'left') left = rect.left - cardWidth - gap;

      return { top, left, width: cardWidth, height: cardHeight };
    };

    const candidate = (placement: Exclude<TutorialPlacement, 'auto'>): TooltipPosition => {
      const raw = candidateWithoutClamp(placement);
      return {
        top: clamp(raw.top, margin, viewportHeight - cardHeight - margin),
        left: clamp(raw.left, margin, viewportWidth - cardWidth - margin),
        placement
      };
    };

    const overlapWithTarget = (position: TooltipPosition): number => {
      // Keep a small visual moat around the spotlight, not merely a zero-pixel collision.
      const keepout = gap;
      const targetTop = rect.top - keepout;
      const targetLeft = rect.left - keepout;
      const targetRight = rect.right + keepout;
      const targetBottom = rect.bottom + keepout;
      const cardRight = position.left + cardWidth;
      const cardBottom = position.top + cardHeight;
      const overlapWidth = Math.max(0, Math.min(cardRight, targetRight) - Math.max(position.left, targetLeft));
      const overlapHeight = Math.max(0, Math.min(cardBottom, targetBottom) - Math.max(position.top, targetTop));
      return overlapWidth * overlapHeight;
    };

    const preferred: Exclude<TutorialPlacement, 'auto'> = activeStep.placement && activeStep.placement !== 'auto'
      ? activeStep.placement
      : 'bottom';
    const placements = [
      preferred,
      'bottom',
      'right',
      'top',
      'left'
    ].filter((placement, index, all) => all.indexOf(placement) === index) as Exclude<TutorialPlacement, 'auto'>[];

    const options = placements.map((placement) => {
      const position = candidate(placement);
      return {
        position,
        overlap: overlapWithTarget(position)
      };
    });
    const clearOption = options.find((option) => option.overlap === 0);
    const selected = clearOption || options.reduce((best, option) =>
      option.overlap < best.overlap ? option : best
    );
    setTooltipPosition(selected.position);
  }, [activeStep, isOpen, resolveTarget]);

  const scheduleMeasure = useCallback(() => {
    if (measureFrameRef.current !== null) {
      window.cancelAnimationFrame(measureFrameRef.current);
    }
    measureFrameRef.current = window.requestAnimationFrame(() => {
      measureFrameRef.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    if (!isOpen || !activeStep) return;

    const target = resolveTarget(activeStep);
    targetElementRef.current = target;

    if (target && activeStep.region === 'page') {
      const rect = target.getBoundingClientRect();
      const viewportMargin = 16;
      const isFullyVisible =
        rect.top >= viewportMargin &&
        rect.bottom <= window.innerHeight - viewportMargin &&
        rect.left >= viewportMargin &&
        rect.right <= window.innerWidth - viewportMargin;

      // Smooth centering was making the spotlight and card visibly chase the
      // target for a few hundred milliseconds. Only move when necessary, and
      // do it synchronously before paint so each tutorial step opens settled.
      if (!isFullyVisible) {
        target.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }

    measure();
    const firstFrame = window.requestAnimationFrame(scheduleMeasure);
    const settleTimer = window.setTimeout(scheduleMeasure, 320);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(settleTimer);
    };
  }, [activeStep, isOpen, measure, resolveTarget, scheduleMeasure]);

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => scheduleMeasure();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleViewportChange);
      if (targetElementRef.current) resizeObserver.observe(targetElementRef.current);
      if (cardRef.current) resizeObserver.observe(cardRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
      resizeObserver?.disconnect();
    };
  }, [isOpen, activeStepIndex, scheduleMeasure]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const focusFrame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      const previous = previousFocusRef.current;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [activeStepIndex, isOpen]);

  const handleNext = useCallback(() => {
    if (activeStepIndex >= steps.length - 1) {
      onClose();
      return;
    }
    onStepChange(activeStepIndex + 1);
  }, [activeStepIndex, onClose, onStepChange, steps.length]);

  const handlePrevious = useCallback(() => {
    if (activeStepIndex > 0) onStepChange(activeStepIndex - 1);
  }, [activeStepIndex, onStepChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
        return;
      }

      if (event.key === 'Enter' && (event.target === cardRef.current || event.target === headingRef.current)) {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === 'Tab' && cardRef.current) {
        const focusable = [
          headingRef.current,
          ...Array.from(cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        ].filter((element): element is HTMLElement => Boolean(element));
        if (focusable.length === 0) {
          event.preventDefault();
          cardRef.current.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && activeIndex <= 0) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && activeIndex === focusable.length - 1) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious, isOpen, onClose]);

  if (!isOpen || !activeStep || steps.length === 0) return null;

  const compact = isCompactViewport();
  const isMobileSidebarStep = compact && activeStep.region === 'sidebar';
  const isMobilePageNavigationStep = compact && activeStep.id === 'page-navigation';
  const isCompactDockedStep = isMobileSidebarStep || isMobilePageNavigationStep;
  const isWaitingForMobileSurface = compact && targetRect === null;
  const progress = ((activeStepIndex + 1) / steps.length) * 100;
  const cardStyle: React.CSSProperties = tooltipPosition
    ? {
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`
      }
    : {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };

  if (isWaitingForMobileSurface) {
    cardStyle.visibility = 'hidden';
  }
  if (isMobileSidebarStep && mobileSidebarCardMaxHeight !== null) {
    cardStyle.maxHeight = `${mobileSidebarCardMaxHeight}px`;
  } else if (isMobilePageNavigationStep) {
    cardStyle.maxHeight = '220px';
  }
  if (isCompactDockedStep) {
    cardStyle.padding = '12px 14px 10px';
  }

  const spotlightStyle: React.CSSProperties | undefined = targetRect
    ? {
        top: `${Math.max(6, targetRect.top - 7)}px`,
        left: `${Math.max(6, targetRect.left - 7)}px`,
        width: `${targetRect.width + 14}px`,
        height: `${targetRect.height + 14}px`
      }
    : undefined;

  const compactHeadStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { gap: '10px', paddingBottom: '6px' }
    : undefined;
  const compactEyebrowStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { fontSize: '7px', lineHeight: 1.2 }
    : undefined;
  const compactHeadingStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { fontSize: '21px', lineHeight: 1.05, margin: 0 }
    : undefined;
  const compactBodyStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? {
        margin: '7px 0 10px',
        fontSize: '13px',
        lineHeight: 1.35,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: isMobileSidebarStep ? 2 : 3,
        overflow: 'hidden'
      }
    : undefined;
  const compactProgressStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { margin: '6px 0 8px' }
    : undefined;
  const compactActionsStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { marginTop: 0 }
    : undefined;
  const compactButtonStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { padding: '7px 11px', minHeight: '34px', fontSize: '11px' }
    : undefined;
  const compactSkipStyle: React.CSSProperties | undefined = isCompactDockedStep
    ? { marginTop: '5px', padding: '2px 4px', fontSize: '9px' }
    : undefined;

  return (
    <div className="tutorial-overlay" aria-label="The AI Almanac tutorial">
      {targetRect && (
        <div className="tutorial-spotlight" style={spotlightStyle} aria-hidden="true" />
      )}

      <section
        ref={cardRef}
        className={`tutorial-card${tooltipPosition ? ' is-positioned' : ''}${isCompactDockedStep ? ' tutorial-card-compact-docked' : ''}`}
        style={cardStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`tutorial-title-${activeStep.id}`}
        aria-describedby={`tutorial-body-${activeStep.id}`}
        tabIndex={-1}
      >
        <div className="tutorial-card-head" style={compactHeadStyle}>
          <div>
            <small style={compactEyebrowStyle}>How to use The AI Almanac</small>
            <div className="tutorial-step-count" aria-live="polite">
              Step {activeStepIndex + 1} of {steps.length}
            </div>
          </div>
          <button type="button" className="tutorial-close" onClick={onClose} aria-label="Close tutorial">
            ×
          </button>
        </div>

        <div
          className="tutorial-progress"
          style={compactProgressStyle}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={activeStepIndex + 1}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <h2
          ref={headingRef}
          id={`tutorial-title-${activeStep.id}`}
          style={compactHeadingStyle}
          tabIndex={-1}
        >
          {activeStep.title}
        </h2>
        <p id={`tutorial-body-${activeStep.id}`} style={compactBodyStyle}>{activeStep.body}</p>

        <div className="tutorial-actions" style={compactActionsStyle}>
          <button
            type="button"
            className="tutorial-secondary"
            style={compactButtonStyle}
            onClick={handlePrevious}
            disabled={activeStepIndex === 0}
          >
            Back
          </button>
          <button
            type="button"
            className="tutorial-primary"
            style={compactButtonStyle}
            onClick={handleNext}
          >
            {activeStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <button
          type="button"
          className="tutorial-skip"
          style={compactSkipStyle}
          onClick={onClose}
        >
          Skip tutorial
        </button>
      </section>
    </div>
  );
};