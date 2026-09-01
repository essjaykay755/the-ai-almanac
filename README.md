# The AI Almanac

The AI Almanac is an evolving reference book for AI enthusiasts and vibe coders. It presents a searchable living dictionary of artificial intelligence concepts, architectures and practices inside a tactile, book-inspired interface.

## Features

- Search the glossary with ranked suggestions, aliases and natural-language prompts.
- Read entries in Dictionary, Plain English, Technical, or Vibe Coder modes.
- Navigate with the A-Z index, previous/next controls, keyboard shortcuts, deep links and related terms.
- Browse the complete index, About cover page, timeline, reading history, bookmarks and collections.
- Bookmark entries and organize them into editable reading lists persisted in the browser; create, rename, delete and remove entries from collections.
- Save an entry as a PNG, copy its text or deep link, or share it through the browser share sheet.
- Hear pronunciation with browser speech synthesis and tactile paper sound effects throughout the book.
- Use the responsive book layout on desktop, tablet and mobile screens.

## Astro architecture

Astro owns the document shell, static routes, metadata and generated Open Graph assets. The existing React application is mounted as a client-only island so the current book UI, page-turn animation, overlays, browser storage and navigation behavior can be migrated without a visual rewrite.

Static routes include:

- `/` for the Almanac home page.
- `/about/` for the About view.
- `/term/<slug>/` for every glossary entry.
- `/og/<slug>.svg` for every term-specific Open Graph image.

This first Astro migration intentionally keeps the interactive dictionary body in React. A later SEO/i18n pass can render the primary term content directly in Astro while retaining React only for the interactive controls.

## Social previews

Astro generates a term-specific Open Graph SVG and crawlable `/term/<slug>/` HTML page for every glossary entry. New copy/share links continue to use those routes, so social crawlers can read matching page metadata without executing the React app.

Set `VITE_SITE_URL` in the deployment environment, for example `https://example.com`, when absolute Open Graph and canonical URLs are required.

## Getting started

### Prerequisites

- Node.js
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, usually `http://localhost:4321`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server with hot reload. |
| `npm run build` | Type-check the TypeScript source and generate the static Astro build in `dist/`. |
| `npm run lint` | Run Oxlint against the project. |
| `npm run test` | Run the search, route and default-preference tests. |
| `npm run test:e2e` | Run the Playwright suite against the Astro development server. |
| `npm run preview` | Serve the production Astro build locally. |

## Keyboard shortcuts

- `Cmd/Ctrl + K` - focus the search field.
- `Left Arrow` or `P` - previous definition.
- `Right Arrow` or `N` - next definition.
- `Escape` - close an open overlay.

## Project structure

```text
src/
├── App.tsx                      # React application state and interactions
├── client/navigation.ts         # Browser URL compatibility and history bridge
├── components/                  # React book UI and overlays
├── data/terms.ts                # Glossary entries, explanations and timeline
├── layouts/AppShell.astro       # Shared HTML, metadata, styles and React island
├── pages/
│   ├── index.astro              # Home route
│   ├── about/index.astro        # About route
│   ├── term/[slug].astro        # Static glossary routes
│   └── og/[slug].svg.ts         # Static term Open Graph images
├── types/almanac.ts             # Shared domain types
├── utils/search.ts              # Search and query matching
├── utils/pronunciation.ts       # Pronunciation lookup and fallbacks
├── utils/sound.ts               # Page-turn and paper audio helpers
└── utils/canvasExport.ts        # PNG entry export
```

Bookmarks, history, collections and sound preferences remain stored in `localStorage`. Existing legacy hash links are normalized to the clean Astro routes in the browser.

## Stack

- Astro
- React
- TypeScript
- Vite, through Astro
- Oxlint
