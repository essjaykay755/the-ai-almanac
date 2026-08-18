# AI Almanac

AI Almanac is an evolving reference book for AI enthusiasts and vibe coders. It presents a searchable living dictionary of artificial intelligence concepts, architectures, and practices inside a tactile, book-inspired interface.

## Features

- Search the glossary with ranked suggestions, aliases, and natural-language prompts.
- Read entries in Dictionary, Plain English, Technical, or Vibe Coder modes.
- Navigate with the A–Z index, previous/next controls, keyboard shortcuts, deep links, and related terms.
- Browse the complete index, About cover page, chronology, reading history, bookmarks, and collections.
- Bookmark entries and organize them into reading lists persisted in the browser.
- Clip an entry as a PNG, copy its text or deep link, or share it through the browser share sheet.
- Hear pronunciation with browser speech synthesis and optionally enable page-turn paper sounds.
- Use the responsive book layout on desktop, tablet, and mobile screens.

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
├── data/terms.ts           # Glossary entries, special explanations, and chronology
├── types/almanac.ts        # Shared domain types
├── utils/search.ts         # Search and query matching
├── utils/pronunciation.ts  # Pronunciation lookup and fallbacks
├── utils/sound.ts          # Page-turn and paper audio helpers
└── utils/canvasExport.ts   # PNG clipping export
```

The app is client-side only. Bookmarks, history, collections, and sound preferences are stored in `localStorage`; the current entry and About view are shareable through the URL hash.

## Stack

- React
- TypeScript
- Vite
- Oxlint
