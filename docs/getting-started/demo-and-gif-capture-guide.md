# Demo and GIF capture guide

This chapter explains how to capture short product demos and onboarding clips from the local first environment.

## Goal

Create short, repeatable recordings that show the product clearly without requiring engineers to prepare a custom dataset every time.

The seeded first environment already gives you the best reusable demo baseline.

## Recommended local prep

From `ai-copilot-platform` run:

```powershell
pnpm deploy:first:up
pnpm seed:first:demo
pnpm smoke:first:env
```

This ensures:

- the stack is healthy
- the demo user works
- the three demo applications are present
- the usage, ingestion, audit, and approval screens have content

If you want a fresh approval flow just before recording:

```powershell
pnpm smoke:first:ui:approvals
```

That creates fresh TEST and AGENT approval items you can show in the admin UI.

## Best demo flows to record

### 1. Admin sign-in and landing

Suggested clip length: 15 to 25 seconds

Flow:

1. open `http://127.0.0.1:4200`
2. click `Continue with SSO`
3. sign in with the demo user
4. land on the Applications page showing the three demo apps

Why it works:

- immediately explains that the platform is enterprise-facing
- shows real OIDC and seeded application context

### 2. Application operations walkthrough

Suggested clip length: 30 to 60 seconds

Flow:

1. open Supplier Portal Copilot
2. show Configuration
3. show Install
4. show Usage
5. show Ingestion
6. show Audit

Why it works:

- demonstrates the full operator surface quickly
- makes the product feel complete and practical

### 3. Approval lifecycle walkthrough

Suggested clip length: 30 to 45 seconds

Flow:

1. run `pnpm smoke:first:ui:approvals` beforehand
2. open Conversations for Supplier Portal Copilot
3. show pending approvals and agent run steps
4. approve one item or show the queue state

Why it works:

- highlights the platform's enterprise safety story
- makes TEST and AGENT modes easy to understand

### 4. Embed and token handoff walkthrough

Suggested clip length: 20 to 35 seconds

Flow:

1. open Install
2. generate an install token
3. show the script snippet and npm snippet
4. optionally open `demo/tenant-shell.html`

Why it works:

- directly answers how the SDK/embed story works
- is useful for customer onboarding and partner teams

## Recommended capture tools on Windows

Simple options:

- Xbox Game Bar for quick MP4 recording
- ScreenToGif for short GIF clips
- OBS Studio for polished recordings and window capture control

Good default approach:

- use OBS for narrated or longer demos
- use ScreenToGif for short looping onboarding clips

## Recording settings

For most product demos:

- capture at 1440x900 or 1920x1080
- use browser zoom around 100% to 110%
- keep one browser tab only
- hide bookmarks bar and unrelated extensions
- prefer light mode for internal product walkthroughs unless dark mode is part of the story

For GIFs:

- keep them under 20 seconds when possible
- focus on one user action per GIF
- avoid large cursor travel across the screen

## Before you record

Use this checklist:

1. `pnpm deploy:first:up` completed
2. `pnpm seed:first:demo` completed
3. sign-in works for `owner@local.autonomous.ai`
4. browser window size is consistent
5. terminal windows and notifications are hidden
6. approvals are refreshed if the demo depends on them

## Suggested script for a short onboarding demo

### 45-second version

1. start on the login page
2. sign in through SSO
3. show the three demo apps
4. open Supplier Portal Copilot Usage
5. open Ingestion
6. open Conversations and show approvals

### 90-second version

1. sign in
2. show Applications
3. open Configuration and explain repo plus docs wiring
4. open Install and explain script tag plus npm package
5. open Usage and Ingestion
6. open Conversations and explain approvals plus agent runs

## Where to save captured media in this docs repo

Recommended folders:

- `assets/screenshots/` for static screenshots
- `assets/demos/` for short GIFs or MP4s if you decide to version them here later

If demo media becomes large, move it to external storage or release assets and link to it from the docs.

## After recording

Do these cleanup steps:

1. trim the clip to remove dead time
2. crop to the active product area if needed
3. ensure any token values or secrets are not visible
4. add the media to the relevant walkthrough chapter
5. keep filenames short and descriptive

Good filename examples:

- `admin-login-flow.gif`
- `supplier-usage-tour.mp4`
- `approval-queue-review.gif`
