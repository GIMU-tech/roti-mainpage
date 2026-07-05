export const ROTI_SMOOTH_SCROLL_EVENT = "roti:smooth-scroll-to";

export type SmoothScrollTarget = string | number;

export type SmoothScrollOptions = {
  duration?: number;
  lock?: boolean;
  offset?: number;
};

export type SmoothScrollEventDetail = SmoothScrollOptions & {
  target: SmoothScrollTarget;
};

function resolveScrollTop(target: SmoothScrollTarget, offset = 0) {
  if (typeof target === "number") {
    return Math.max(0, target + offset);
  }

  const targetId = target.startsWith("#") ? target.slice(1) : target;
  const element = document.getElementById(targetId);

  if (!element) {
    return undefined;
  }

  return Math.max(0, element.getBoundingClientRect().top + window.scrollY + offset);
}

export function nativeScrollTo(target: SmoothScrollTarget, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const top = resolveScrollTop(target, options.offset);

  if (top === undefined) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
}

export function scrollToTarget(target: SmoothScrollTarget, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const event = new CustomEvent<SmoothScrollEventDetail>(ROTI_SMOOTH_SCROLL_EVENT, {
    cancelable: true,
    detail: {
      ...options,
      target
    }
  });
  const handledBySmoothScroller = !window.dispatchEvent(event);

  if (!handledBySmoothScroller) {
    nativeScrollTo(target, options);
  }
}
