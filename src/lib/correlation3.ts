// Shared math for the elliptope explainer: everything here operates on the
// off-diagonal entries of a 3x3 unit-diagonal symmetric matrix
//   R = [[1, r12, r13], [r12, 1, r23], [r13, r23, 1]]
// i.e. a candidate 3x3 correlation matrix that may or may not be PSD.

export interface Corr3 {
  r12: number;
  r13: number;
  r23: number;
}

// det(R) = 0 is exactly the elliptope's boundary.
export function determinant3(v: Corr3): number {
  const { r12, r13, r23 } = v;
  return 1 + 2 * r12 * r13 * r23 - r12 ** 2 - r13 ** 2 - r23 ** 2;
}

// Closed-form eigenvalues of a symmetric 3x3 matrix with unit diagonal
// (Smith, O.K. (1961), "Eigenvalues of a symmetric 3x3 matrix", specialized
// to trace = 3 / diagonal = 1). Returns eigenvalues sorted descending.
// Real-valued and numerically stable for symmetric input by construction.
export function eigenvalues3(v: Corr3): [number, number, number] {
  const { r12, r13, r23 } = v;
  const p1 = r12 ** 2 + r13 ** 2 + r23 ** 2;
  if (p1 < 1e-12) return [1, 1, 1];

  const p = Math.sqrt(p1 / 3);
  let r = (r12 * r13 * r23) / p ** 3;
  r = Math.max(-1, Math.min(1, r));
  const phi = Math.acos(r) / 3;

  const eigA = 1 + 2 * p * Math.cos(phi);
  const eigB = 1 + 2 * p * Math.cos(phi + (2 * Math.PI) / 3);
  const eigC = 3 - eigA - eigB;

  return [eigA, eigB, eigC].sort((a, b) => b - a) as [number, number, number];
}

export function isPSD(v: Corr3, tolerance = 1e-9): boolean {
  return eigenvalues3(v).every((e) => e >= -tolerance);
}

// The four rank-1 vertices: R = s*s^T for a sign vector s in {+1,-1}^3,
// taken up to global sign flip (s and -s give the same matrix).
export const ELLIPTOPE_VERTICES: Corr3[] = [
  { r12: 1, r13: 1, r23: 1 },
  { r12: 1, r13: -1, r23: -1 },
  { r12: -1, r13: 1, r23: -1 },
  { r12: -1, r13: -1, r23: 1 },
];

// For fixed r23 = c, the feasible (r12, r13) region is the ellipse
//   r12^2 + r13^2 - 2c*r12*r13 <= 1 - c^2
// Diagonalizing in u = (r12+r13)/sqrt2, v = (r12-r13)/sqrt2 gives
//   u^2/(1+c) + v^2/(1-c) <= 1
// i.e. an ellipse with semi-axes sqrt(1+c), sqrt(1-c) along the u/v axes,
// which are the +45 deg and -45 deg directions in (r12, r13) space.
export function crossSectionSemiAxes(c: number): { u: number; v: number } {
  return { u: Math.sqrt(Math.max(0, 1 + c)), v: Math.sqrt(Math.max(0, 1 - c)) };
}
