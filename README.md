# justinkracht.com

Personal site: professional profile, distill-style interactive research
explainers, and a markdown-driven blog. Built with [Astro](https://astro.build).

## Publishing a blog post

1. Create `src/content/blog/my-post.md` with frontmatter:

   ```markdown
   ---
   title: "Post title"
   date: 2026-07-15
   tags: [psychometrics, bayes]
   description: "One-line summary for the index, RSS, and OG card."
   draft: false
   ---

   Body in markdown. Inline math $\lambda_1 < 0$ and display math work.
   R/Python code blocks get syntax highlighting.
   ```

2. `git push` to `main` — GitHub Actions builds and deploys automatically.
3. Set `draft: true` to keep a post out of production builds while you write it.

Editing an explainer's prose works the same way: edit text in the `.mdx`
file under `src/content/research/`; the interactive components inside are
self-contained and don't need to be touched for content edits.

## Local development

```sh
npm install
npm run dev
```

That's the only part of this stack that touches the terminal for routine
content edits — everything above happens by editing markdown and pushing.

| Command         | Action                                    |
| :--------------- | :----------------------------------------- |
| `npm install`    | Install dependencies                       |
| `npm run dev`     | Start the local dev server                 |
| `npm run build`   | Build the production site to `./dist/`     |
| `npm run preview` | Preview the production build locally       |
| `npm run check`   | Type-check the project (also runs in CI)   |

## Project structure

```
src/
├─ content/
│  ├─ blog/            *.md   — blog posts
│  └─ research/         *.mdx  — explainer prose + embedded viz components
├─ components/
│  ├─ layout/           Nav, Footer, SEO, Analytics
│  └─ viz/               D3/three.js explainer components (Phase 2+)
├─ layouts/             BaseLayout, PostLayout, ExplainerLayout
├─ styles/              tokens.css (fonts/colors/spacing), typography, grid
└─ lib/                 site config, OG image generation

data-gen/                R scripts (Phase 2+) that precompute JSON for explainers
public/                 favicons, robots.txt, CV PDF
.github/workflows/      CI (build/typecheck on PRs) + deploy (GitHub Pages on main)
```

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to
`main`, currently at `https://justinkracht.github.io/blog`.

Once `justinkracht.com` is purchased and DNS is pointed at GitHub Pages:

1. Add a `public/CNAME` file containing `justinkracht.com`.
2. Remove `base: '/blog'` and update `site` in `astro.config.mjs`.
3. Set the custom domain in the repo's GitHub Pages settings.

## Analytics

Wired for [GoatCounter](https://www.goatcounter.com/) (no cookies, no consent
banner). Set `GOATCOUNTER_SITE` in `src/lib/site.ts` to the site code once an
account exists; the analytics tag is a no-op until then.

## Status

Phase 0 (foundation) and Phase 1 (core site) are done: the site is
respectable and shippable with zero explainers. Interactive research
explainers (elliptope, tetrachoric smoothing, model error) come next.
