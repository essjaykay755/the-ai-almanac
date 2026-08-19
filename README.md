# The AI Almanac

The AI Almanac is an evolving reference book for AI enthusiasts and vibe coders. It presents a searchable living dictionary of artificial intelligence concepts, architectures, and practices inside a tactile, book-inspired interface.

## Features

- Search the glossary with ranked suggestions, aliases, and natural-language prompts.
- Read entries in Dictionary, Plain English, Technical, or Vibe Coder modes.
- Navigate with the A–Z index, previous/next controls, keyboard shortcuts, deep links, and related terms.
- Browse the complete index, About cover page, timeline, reading history, bookmarks, and collections.
- Bookmark entries and organize them into editable reading lists persisted in the browser; create, rename, delete, and remove entries from collections.
- Save an entry as a PNG, copy its text or deep link, or share it through the browser share sheet.
- Hear pronunciation with browser speech synthesis and tactile paper sound effects throughout the book.
- Use the responsive book layout on desktop, tablet, and mobile screens.

## Social previews

The production build generates a term-specific Open Graph SVG and crawlable `/term/<slug>/` HTML page for every glossary entry. New copy/share links use those routes, so social crawlers can read the matching title, description, and image without executing the React app. Set `VITE_SITE_URL` in the deployment environment (for example, `https://example.com`) when absolute Open Graph and canonical URLs are required.

## Getting started

### Prerequisites

- Node.js
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check and create a production build in `dist/`. |
| `npm run lint` | Run Oxlint against the project. |
| `npm run preview` | Serve the production build locally. |

## Keyboard shortcuts

- `Cmd/Ctrl + K` — focus the search field.
- `Left Arrow` or `P` — previous definition.
- `Right Arrow` or `N` — next definition.
- `Escape` — close an open overlay.

## Project structure

```text
src/
├── App.tsx                 # Application state, navigation, persistence, and overlays
├── components/             # Cover, About page, glossary page, mobile controls, tabs, and overlays
├── data/terms.ts           # Glossary entries, special explanations, and timeline
├── types/almanac.ts        # Shared domain types
├── utils/search.ts         # Search and query matching
├── utils/pronunciation.ts  # Pronunciation lookup and fallbacks
├── utils/sound.ts          # Page-turn and paper audio helpers
└── utils/canvasExport.ts   # PNG entry export
```

The app is client-side only. Bookmarks, history, and collections are stored in `localStorage`; the current entry and About view are shareable through the URL hash.

## Stack

- React
- TypeScript
- Vite
- Oxlint
