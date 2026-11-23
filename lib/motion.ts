export const MOTION = {
  instant: 100,
  fast: 150,
  base: 240,
  reveal: 400,
  image: 800,
  counter: 1200,
  route: 1500,
  page: 200,
  stagger: 60,
  staggerDense: 40,
  staggerCards: 80,
  revealY: 16,
  revealYSmall: 8,
  modalScale: 0.96,
  modalY: 8,
} as const;

export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const CSS_EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export function staggerDelay(index: number, step: number = MOTION.stagger) {
  return index * step;
}
