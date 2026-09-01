import type { APIRoute } from 'astro';
import { sortedTerms, terms } from '../../data/terms';
import type { Term } from '../../types/almanac';
import { getOgImageSvg, slugifyTerm } from '../../utils/ogImage';

const termPageNumbers = new Map(
  sortedTerms.map((term, index) => [term.word.toLowerCase(), index + 1])
);

export function getStaticPaths() {
  return terms.map((term) => ({
    params: { slug: slugifyTerm(term.word) },
    props: { term }
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { term } = props as { term: Term };
  const svg = getOgImageSvg(term, {
    pageNumber: termPageNumbers.get(term.word.toLowerCase()),
    totalTerms: sortedTerms.length
  });

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
