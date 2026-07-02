# data-gen

R scripts that precompute anything numerically heavy (simulation grids,
smoothing trajectories, parallel-analysis reference curves) for the research
explainers. Client-side JS only reads and interpolates the resulting JSON —
the browser never runs a simulation.

## Workflow

1. Write or edit a script here (e.g. `elliptope-escape.R`).
2. Run it: `Rscript data-gen/your-script.R`. It writes JSON to `public/data/`.
3. Commit both the script and the JSON output. CI builds the site straight
   from the committed JSON — it never runs R — so a script only needs to be
   re-run by hand when its output should change.

## Environment

This is meant to be `renv`-locked once real explainer scripts land, so
results are reproducible: run `renv::init()` in this directory the first
time you add a script with package dependencies, then `renv::snapshot()`
after installing packages. No `renv.lock` exists yet since `example.R` is a
placeholder with only a `jsonlite` dependency, and no R installation was
available in the environment this skeleton was built in to generate one
honestly — don't hand-write a lockfile; let `renv` produce it.

## Example

`example.R` computes eigenvalues for a family of 3×3 equicorrelation
matrices (`R = (1 - ρ)·I + ρ·J`) and writes `public/data/example-eigenvalues.json`,
just to exercise the pipeline end to end. It's consumed by the primitive
demo page at `/research/demo`.
