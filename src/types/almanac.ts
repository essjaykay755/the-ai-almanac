export interface Term {
  word: string;
  part: string;
  pron?: string;
  definition: string;
  example: string;
  origin: string;
  note: string;
  related: string[];
  aliases: string[];
  category: string;
}

export type TermSelectionTarget = Pick<Term, 'word'>;

export type ExplanationMode = 'dictionary' | 'plain' | 'technical' | 'vibe';

export interface SpecialModes {
  [word: string]: {
    plain?: string;
    technical?: string;
    vibe?: string;
  };
}

export interface CrossRefInfo {
  compare: string[];
  confused: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  body: string;
  term: string;
}

export type ClipStyle = 'clipping' | 'library' | 'newspaper' | 'margin-card';

export type OverlayType = 'index' | 'bookmarks' | 'history' | 'timeline' | 'collections' | 'picker' | 'clip' | null;
