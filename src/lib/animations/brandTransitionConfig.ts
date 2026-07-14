export const brandTransitionTiming = {
  prepare: 0.2,
  center: 0.34,
  expand: 0.72,
  reveal: 0.18,
  settle: 0.26,
  sectionScroll: 1.15,
  sectionScrollFallback: 1.5,
  sectionArrivalRecovery: 3.4
} as const;

export const brandTransitionEasing = {
  standard: "cubic-bezier(0.16, 1, 0.3, 1)",
  reducedMotion: "linear"
} as const;
