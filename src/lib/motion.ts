// Shared reduced-motion check for interactive viz components (D3/three.js
// islands). CSS in global.css already kills transitions/animations; this
// covers imperative JS motion (scroll-jacking, canvas/WebGL loops, drags)
// that CSS can't reach.
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
