# Contributing

## Branch naming
Use feature branches with clear scope, for example:
- feature/<short-topic>
- fix/<short-topic>

## Commit style
Use concise, imperative commit messages:
- feat: add sdk init options
- fix: handle missing embed token

## Pull requests
1. Keep PRs focused and small.
2. Include test evidence for behavior changes.
3. Update docs when API or setup changes.
4. Request review from code owners.

## Documentation (this book)

The developer guide lives in Markdown at the repo root and under `docs/`. GitBook-style navigation is **`SUMMARY.md`**; the landing page is **`README.md`**.

- When you add, rename, or remove a chapter, **update `SUMMARY.md`** so the table of contents matches.
- Implementation truth lives in **`ai-copilot-platform`** (API routes, Angular apps, migrations). If you document behavior, align it with that repo or note the gap.
- Before opening a PR, run **`node scripts/verify-book-links.mjs`** from this repo root so every path in `SUMMARY.md` resolves to a real file. CI runs the same check on `main` and pull requests.
- HonKit plugins and theme options live in **`book.json`**. UI tweaks for the local preview go in **`styles/website.css`**; layout overrides go under **`_layouts/`** (see the default footer navigation in `_layouts/website/page.html`). After changing plugins, run **`npm run build`** to confirm the book still generates.