---
title: "Hello, and what this site is for"
date: 2026-07-02
tags: [meta]
description: "A short note on what's here now and what's coming: interactive explainers on the geometry of correlation matrices, and occasional writing."
draft: false
---

This site is in its early, foundational form: a working home page, an about
page, a CV, and this blog. The more ambitious part — interactive,
[distill.pub](https://distill.pub)-style explainers on the geometry of
correlation matrices — is coming next, starting with the **elliptope**: the
convex body that every valid $3 \times 3$ correlation matrix lives inside.

A $3 \times 3$ correlation matrix is determined by three off-diagonal
correlations, $r_{12}$, $r_{13}$, and $r_{23}$, subject to one constraint:
the matrix has to be positive semidefinite. For the $3 \times 3$ case, that
constraint has a clean closed form — the determinant has to be non-negative:

$$
\det(R) = 1 - r_{12}^2 - r_{13}^2 - r_{23}^2 + 2 r_{12} r_{13} r_{23} \geq 0.
$$

The boundary of that region, $\det(R) = 0$, is a curved surface sitting
inside the cube $[-1, 1]^3$ — a shape called the elliptope. Every point
inside or on it is a valid correlation matrix; step outside, and at least one
eigenvalue goes negative:

```r
cor_matrix <- matrix(
  c(1.0, 0.9, 0.9,
    0.9, 1.0, -0.9,
    0.9, -0.9, 1.0),
  nrow = 3
)

eigen(cor_matrix)$values
#> [1]  2.2360680  0.7639320 -0.9999999
```

That third eigenvalue being negative means this isn't a valid correlation
matrix at all, even though every individual entry looks like a plausible
correlation. Explaining why — and what that has to do with tetrachoric
correlations, matrix smoothing, and model error — is the point of the
explainer series that's coming to `/research`.

For now: welcome.
