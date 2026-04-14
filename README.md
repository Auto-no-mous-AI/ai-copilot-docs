**AI Copilot — developer documentation**

This book describes the **current implementation** of the AI Copilot enterprise platform. The running system lives in the **`ai-copilot-platform`** monorepo (Angular admin + marketing apps, NestJS API, ingestion worker, PostgreSQL/pgvector, Redis, embeddable SDKs). Other folders under `ai-copilot-workspace` are mostly scaffolds or future splits; see [Companion repositories](docs/workspace/companion-repositories.md).

## Who this is for

- Engineers onboarding to the platform
- Teams integrating the embeddable copilot into Angular/React/host apps
- DevOps and SRE reviewing deployment, health checks, and smoke automation

## How to read this book

- Start with [System architecture](docs/architecture/overview.md) and [Monorepo & services map](docs/platform/source-layout.md).
- Use [HTTP API reference](docs/api/README.md) when wiring clients or reviewing contracts.
- Follow [Local setup & first environment](docs/getting-started/README.md) to run the stack locally.

## Source of truth

Implementation details are derived from the **`ai-copilot-platform`** repository. When code and docs diverge, **prefer the repository** and open a documentation PR.

## GitBook-style navigation

This repository uses a classic GitBook layout:

- **`SUMMARY.md`** — table of contents (import into GitBook or compatible static site generators).
- **`docs/`** — chapters as Markdown files.

To publish with [GitBook](https://docs.gitbook.com/) or [HonKit](https://honkit.netlify.app/), point the book root at this repository and use `SUMMARY.md` as the structure file.

## Preview locally

From this repository root:

```bash
npm install
npm start
```

This starts **[HonKit](https://honkit.netlify.app/)** (classic GitBook-compatible preview). Open the URL it prints (usually **http://localhost:4000**). To use another port:

```bash
npx honkit serve --port 4321
```

**Static HTML output** (optional):

```bash
npm run build
```

Output is written to **`_book/`** (ignored by git).

### Bundled GitBook-like features

Configuration lives in **`book.json`** (`plugins` and `pluginsConfig`).

| Feature | How it works |
|--------|----------------|
| **Mermaid** | [`honkit-plugin-mermaid`](https://www.npmjs.com/package/honkit-plugin-mermaid) renders fenced **mermaid** code blocks as diagrams. |
| **Search** | Default search is replaced by [`honkit-plugin-search-plus`](https://www.npmjs.com/package/honkit-plugin-search-plus) for stronger full-text search (including code-oriented matches). The sidebar search field is styled larger via **`styles/website.css`**. |
| **Prev / Next** | **`_layouts/website/page.html`** replaces the floating chevrons with a **two-column footer**: **Previous** in the left half (left-aligned), **Next** in the right half (right-aligned), equal column widths on desktop. |
| **In this Chapter** | On viewports **≥1100px**, **`assets/ai-copilot-chapter-toc.js`** builds a **sticky mini-TOC** from **h2–h4** (with ids) in the article, with scroll highlighting. Hidden if there are no such headings or on small screens. |
| **Light / Dark / System** | Use the **Theme** control in the **sticky top bar** (Font Awesome: sun / moon / desktop). **System** follows `prefers-color-scheme`. Choice is stored in **`localStorage`** (`ai-copilot-color-scheme`). Styling uses **`html[data-ai-effective]`** in **`styles/website.css`** + **`assets/ai-copilot-theme.js`**. |
| **Fonts (GitBook)** | The **“A”** menu is still provided by **fontsettings** (font family / size and the legacy white·sepia·night color presets). Prefer the **Theme** control for light/dark/system; if both are used, the **Theme** toggle sets the main page/sidebar colors. |

Custom look-and-feel: edit **`styles/website.css`** (CSS variables and rules at the top).

**Without HonKit:** open any `docs/**/*.md` file in your editor and use its Markdown preview, or use [GitBook.com](https://gitbook.com) / another static generator that imports `SUMMARY.md`.
