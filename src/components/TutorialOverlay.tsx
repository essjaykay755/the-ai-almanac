import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const resolveTarget = useCallback((step: TutorialStep): HTMLElement | null => {
    if (typeof document === 'undefined') return null;

    const compact = isCompactViewport();
    const selectors = [
      compact && step.mobileTarget ? step.mobileTarget : step.target,
      compact ? step.target : step.mobileTarget,
      step.fallbackTarget,
      '#page',
      '#mobileMenu'
    ].filter((selector): selector is string => Boolean(selector));

    for (const selector of selectors) {
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

    const cardRect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = viewportWidth <= 540 ? 14 : 22;
    const gap = viewportWidth <= 540 ? 12 : 18;
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    const candidate = (placement: Exclude<TutorialPlacement, 'auto'>): TooltipPosition => {
      let top = rect.top + rect.height / 2 - cardHeight / 2;
      let left = rect.left + rect.width / 2 - cardWidth / 2;

      if (placement === 'top') top = rect.top - cardHeight - gap;
      if (placement === 'right') left = rect.right + gap;
      if (placement === 'bottom') top = rect.bottom + gap;
      if (placement === 'left') left = rect.left - cardWidth - gap;

      return {
        top: clamp(top, margin, viewportHeight - cardHeight - margin),
        left: clamp(left, margin, viewportWidth - cardWidth - margin),
        placement
      };
    };

    const fits = (position: TooltipPosition): boolean => {
      const tolerance = 2;
      const unClamped = candidateWithoutClamp(position.placement);
      return (
        unClamped.top >= margin - tolerance &&
        unClamped.left >= margin - tolerance &&
        unClamped.top + cardHeight <= viewportHeight - margin + tolerance &&
        unClamped.left + cardWidth <= viewportWidth - margin + tolerance
      );
    };

    const candidateWithoutClamp = (placement: Exclude<TutorialPlacement, 'auto'>): RectPosition => {
      let top = rect.top + rect.height / 2 - cardHeight / 2;
      let left = rect.left + rect.width / 2 - cardWidth / 2;

      if (placement === 'top') top = rect.top - cardHeight - gap;
      if (placement === 'right') left = rect.right + gap;
      if (placement === 'bottom') top = rect.bottom + gap;
      if (placement === 'left') left = rect.left - cardWidth - gap;

      return { top, left, width: cardWidth, height: cardHeight };
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
    const selected = placements.find((placement) => fits(candidate(placement))) || placements[0];
    setTooltipPosition(candidate(selected));
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

  useEffect(() => {
    if (!isOpen || !activeStep) return;

    const target = resolveTarget(activeStep);
    targetElementRef.current = target;
    if (target && activeStep.region === 'page') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }

    const firstFrame = window.requestAnimationFrame(scheduleMeasure);
    const settleTimer = window.setTimeout(scheduleMeasure, 320);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(settleTimer);
    };
  }, [activeStep, isOpen, resolveTarget, scheduleMeasure]);

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => scheduleMeasure();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && targetElementRef.current) {
      resizeObserver = new ResizeObserver(handleViewportChange);
      resizeObserver.observe(targetElementRef.current);
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

  const spotlightStyle: React.CSSProperties | undefined = targetRect
    ? {
        top: `${Math.max(6, targetRect.top - 7)}px`,
        left: `${Math.max(6, targetRect.left - 7)}px`,
        width: `${targetRect.width + 14}px`,
        height: `${targetRect.height + 14}px`
      }
    : undefined;

  return (
    <div className="tutorial-overlay" aria-label="The AI Almanac tutorial">
      {targetRect && (
        <div className="tutorial-spotlight" style={spotlightStyle} aria-hidden="true" />
      )}

      <section
        ref={cardRef}
        className={`tutorial-card${tooltipPosition ? ' is-positioned' : ''}`}
        style={cardStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`tutorial-title-${activeStep.id}`}
        aria-describedby={`tutorial-body-${activeStep.id}`}
        tabIndex={-1}
      >
        <div className="tutorial-card-head">
          <div>
            <small>How to use The AI Almanac</small>
            <div className="tutorial-step-count" aria-live="polite">
              Step {activeStepIndex + 1} of {steps.length}
            </div>
          </div>
          <button type="button" className="tutorial-close" onClick={onClose} aria-label="Close tutorial">
            ×
          </button>
        </div>

        <div className="tutorial-progress" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={activeStepIndex + 1}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <h2 ref={headingRef} id={`tutorial-title-${activeStep.id}`} tabIndex={-1}>
          {activeStep.title}
        </h2>
        <p id={`tutorial-body-${activeStep.id}`}>{activeStep.body}</p>

        <div className="tutorial-actions">
          <button type="button" className="tutorial-secondary" onClick={handlePrevious} disabled={activeStepIndex === 0}>
            Back
          </button>
          <button type="button" className="tutorial-primary" onClick={handleNext}>
            {activeStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <button type="button" className="tutorial-skip" onClick={onClose}>
          Skip tutorial
        </button>
      </section>
    </div>
  );
};
