export type TutorialPlacement = 'auto' | 'top' | 'right' | 'bottom' | 'left';
export type TutorialRegion = 'sidebar' | 'page';

export interface TutorialStep {
  id: string;
  title: string;
  body: string;
  target: string;
  mobileTarget?: string;
  fallbackTarget?: string;
  region: TutorialRegion;
  placement?: TutorialPlacement;
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: 'replay',
    title: 'A guide you can replay',
    body: 'You can come back to this walkthrough whenever you need a refresher. The rest of the Almanac stays untouched while the guide is open.',
    target: '#navTutorial',
    mobileTarget: '#mobileSidebar #navTutorial',
    fallbackTarget: '#mobileMenu',
    region: 'sidebar',
    placement: 'right'
  },
  {
    id: 'sidebar',
    title: 'Your navigation shelf',
    body: 'Use the sidebar to search, browse the complete index, revisit bookmarks and history, open the timeline, manage collections, find a surprise term, save an entry, or read About.',
    target: '#coverNav',
    mobileTarget: '#mobileSidebar #coverNav',
    fallbackTarget: '#mobileMenu',
    region: 'sidebar',
    placement: 'right'
  },
  {
    id: 'search',
    title: 'Ask or search',
    body: 'Type a term or describe an idea in plain language. Suggestions appear as you type and ⌘ K or Ctrl K focuses the field from anywhere.',
    target: '#search',
    fallbackTarget: '#page',
    region: 'page',
    placement: 'bottom'
  },
  {
    id: 'entry',
    title: 'Read the current entry',
    body: 'Each page gives you the definition, an example, where the term came from and how it shows up in practice.',
    target: '#definitionContent',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'right'
  },
  {
    id: 'modes',
    title: 'Change the explanation mode',
    body: 'Switch between Dictionary, Plain English, Technical and Vibe Coder when you want the same idea explained from a different angle.',
    target: '#modeSwitch',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'bottom'
  },
  {
    id: 'bookmark',
    title: 'Keep useful entries close',
    body: 'Use the bookmark ribbon to save the current entry. Your saved entries are available from Bookmarks in the sidebar.',
    target: '#bookmarkBtn',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'left'
  },
  {
    id: 'entry-actions',
    title: 'Save, collect and share',
    body: 'Add an entry to a collection, save a designed copy, copy its deep link, or open its timeline from these page actions.',
    target: '#entryActions',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'top'
  },
  {
    id: 'references',
    title: 'Follow the references',
    body: 'The margin gathers related terms, comparisons, common confusions and the category where the current entry is filed.',
    target: '#margin',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'left'
  },
  {
    id: 'trail',
    title: 'Pick up your reading trail',
    body: 'Recent terms keeps your last stops nearby, so you can move back through the ideas you were exploring.',
    target: '#thread',
    fallbackTarget: '#entry',
    region: 'page',
    placement: 'top'
  },
  {
    id: 'alphabet',
    title: 'Jump by letter',
    body: 'The A–Z rail lets you jump straight to the first available term under any letter.',
    target: '#tabs',
    fallbackTarget: '#page',
    region: 'page',
    placement: 'left'
  },
  {
    id: 'page-navigation',
    title: 'Turn the pages',
    body: 'Use Previous and Next to move through the glossary. The left and right arrow keys, or P and N, work too.',
    target: '#pageNavigation',
    fallbackTarget: '#page',
    region: 'page',
    placement: 'top'
  }
];
