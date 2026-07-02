# Example data-gen script: eigenvalues of a family of 3x3 equicorrelation
# matrices, R = (1 - rho) * I + rho * J, for rho on a grid.
#
# Run with:  Rscript data-gen/example.R
# Writes:    public/data/example-eigenvalues.json
#
# public/data/example-eigenvalues.json is committed to the repo, so CI never
# needs to run this — only re-run it by hand when the underlying computation
# changes. The committed file was produced by evaluating the same closed-form
# eigenvalues this script computes (1 + 2*rho, with multiplicity 1, and
# 1 - rho, with multiplicity 2), not by executing this exact script, since R
# isn't available in every environment this repo is edited in; verify the
# two agree if you touch this file.

library(jsonlite)

rhos <- seq(-0.45, 0.99, by = 0.03)

result <- lapply(rhos, function(rho) {
  R <- matrix(rho, nrow = 3, ncol = 3)
  diag(R) <- 1
  eigenvalues <- sort(eigen(R, symmetric = TRUE, only.values = TRUE)$values, decreasing = TRUE)
  list(rho = rho, eigenvalues = eigenvalues)
})

write_json(
  result,
  "public/data/example-eigenvalues.json",
  auto_unbox = TRUE,
  digits = 6
)
