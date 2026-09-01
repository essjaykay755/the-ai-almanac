# The AI Almanac - UX and accessibility review

Captured 2026-08-21 from the local preview at the default desktop viewport and 390×844 mobile viewport.

## Flow evidence

1. `01-entry.png` - desktop dictionary entry: visually strong, but small utility actions and lower-page content are easy to miss.
2. `02-search.png` - desktop search: ranked results are clear; the suggestion list needs combobox/listbox semantics.
3. `03-retrieval.png` - selected entry: navigation works, but the search query can remain stale after non-search navigation.
4. `04-mobile-entry.png` - mobile entry: responsive reflow works, with dense bottom actions and a narrow alphabet rail.
5. `05-mobile-menu.png` - mobile navigation: the panel is clear and branded; focus/scroll locking should be hardened.
6. `07-index-overlay.png` - complete index: readable and attractive, but 791 terms need in-dialog filtering or section shortcuts.
7. `08-tutorial.png` - tutorial: focus and progress treatment are stronger than the other dialogs.
8. `09-no-match.png` - no-match search: “Describe the idea instead” is rendered as a button but has no follow-up behavior.
9. `10-mobile-search.png` - mobile search: results are usable, but the retained query and dense overlay make recovery less obvious.

## Highest-impact recommendations

- Make no-match search actionable: show related concepts, example prompts, or a clear fallback state; do not leave a dead button.
- Clear or explicitly label the query after navigation from related terms, history, collections and the A–Z index.
- Add focus management, accessible names and focus trapping to every `role="dialog"`; the complete-index dialog currently opens with focus still on the trigger.
- Add ARIA combobox/listbox semantics to search and tab semantics to explanation modes; mark the active A–Z letter and disable unavailable letters.
- Lazy-load `html2canvas` only when PNG export is requested and avoid preloading the About-page video on every first visit.
- Add automated browser coverage for search, deep links, persistence, overlays, keyboard shortcuts, responsive layout, reduced motion and export failure states.

Build and lint both passed during the review. This is a screenshot/code review, not a full WCAG conformance audit.
