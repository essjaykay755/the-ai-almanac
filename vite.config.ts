import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { sortedTerms, terms } from './src/data/terms.ts';
import {
  getOgImageSvg,
  getTermOgImagePath,
  getTermRoutePath,
  slugifyTerm
} from './src/utils/ogImage.ts';

type PageMetadata = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
};

const termPageNumbers = new Map(
  sortedTerms.map((term, index) => [term.word.toLowerCase(), index + 1])
);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[character];
  });
}

function normalizeBase(base: string): string {
  const pathname = base.startsWith('http') ? new URL(base).pathname : base;
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function toPublicUrl(siteUrl: string, path: string): string {
  if (!siteUrl) return path;
  return new URL(path.replace(/^\/+/, ''), `${siteUrl.replace(/\/+$/, '')}/`).toString();
}

function replaceMetaTag(html: string, attribute: 'name' | 'property', key: string, value: string): string {
  const pattern = new RegExp(
    `<meta\\s+[^>]*\\b${attribute}=(['"])${escapeRegExp(key)}\\1[^>]*>`,
    'i'
  );
  const match = html.match(pattern);
  if (!match) return html;

  const updatedTag = match[0].replace(
    /\bcontent=(['"])[^'"]*\1/i,
    `content="${escapeHtml(value)}"`
  );
  return html.replace(match[0], updatedTag);
}

function replaceTitle(html: string, title: string): string {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function replaceCanonical(html: string, href: string): string {
  const pattern = /<link\s+[^>]*\brel=(['"])canonical\1[^>]*>/i;
  const match = html.match(pattern);
  if (!match) return html.replace(/<\/head>/i, `  <link rel="canonical" href="${escapeHtml(href)}" />\n</head>`);

  const updatedTag = match[0].replace(
    /\bhref=(['"])[^'"]*\1/i,
    `href="${escapeHtml(href)}"`
  );
  return html.replace(match[0], updatedTag);
}

function replacePageMetadata(html: string, metadata: PageMetadata): string {
  let next = replaceTitle(html, metadata.title);
  next = replaceMetaTag(next, 'name', 'description', metadata.description);
  next = replaceMetaTag(next, 'property', 'og:type', 'article');
  next = replaceMetaTag(next, 'property', 'og:title', metadata.title);
  next = replaceMetaTag(next, 'property', 'og:description', metadata.description);
  next = replaceMetaTag(next, 'property', 'og:url', metadata.url);
  next = replaceMetaTag(next, 'property', 'og:image', metadata.image);
  next = replaceMetaTag(next, 'property', 'og:image:alt', metadata.imageAlt);
  next = replaceMetaTag(next, 'name', 'twitter:title', metadata.title);
  next = replaceMetaTag(next, 'name', 'twitter:description', metadata.description);
  next = replaceMetaTag(next, 'name', 'twitter:image', metadata.image);
  next = replaceMetaTag(next, 'name', 'twitter:image:alt', metadata.imageAlt);
  return replaceCanonical(next, metadata.url);
}

function getTermMetadata(term: (typeof terms)[number], base: string, siteUrl: string): PageMetadata {
  const routePath = `${base}${getTermRoutePath(term)}`;
  const imagePath = `${base}${getTermOgImagePath(term)}`;
  return {
    title: `${term.word} — The AI Almanac`,
    description: term.definition,
    image: toPublicUrl(siteUrl, imagePath),
    imageAlt: `${term.word} definition card from The AI Almanac`,
    url: toPublicUrl(siteUrl, routePath)
  };
}

function almanacOgPages(siteUrl: string): Plugin {
  let resolvedConfig: ResolvedConfig | undefined;

  return {
    name: 'almanac-dynamic-og-pages',

    configResolved(config) {
      resolvedConfig = config;
    },

    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url
          ? new URL(request.url, 'http://almanac.local').pathname
          : '';
        const imageMatch = pathname.match(/\/og\/([^/]+)\.svg$/);
        const isDefaultImage = /\/og-image\.svg$/.test(pathname);

        if (!imageMatch && !isDefaultImage) {
          next();
          return;
        }

        let term: (typeof terms)[number] | undefined;
        if (imageMatch) {
          let requestedSlug = '';
          try {
            requestedSlug = decodeURIComponent(imageMatch[1]);
          } catch {
            next();
            return;
          }
          term = terms.find((entry) => slugifyTerm(entry.word) === requestedSlug);
          if (!term) {
            next();
            return;
          }
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        response.setHeader('Cache-Control', 'public, max-age=3600');
        response.end(getOgImageSvg(term, {
          pageNumber: term ? termPageNumbers.get(term.word.toLowerCase()) : 1,
          totalTerms: sortedTerms.length
        }));
      });
    },

    generateBundle() {
      for (const term of terms) {
        this.emitFile({
          type: 'asset',
          fileName: getTermOgImagePath(term),
          source: getOgImageSvg(term, {
            pageNumber: termPageNumbers.get(term.word.toLowerCase()),
            totalTerms: sortedTerms.length
          })
        });
      }
    },

    async writeBundle() {
      const outputDirectory = resolve(resolvedConfig?.build.outDir || 'dist');
      const indexHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
      const base = normalizeBase(resolvedConfig?.base || '/');

      await Promise.all(terms.map(async (term) => {
        const routeDirectory = resolve(outputDirectory, getTermRoutePath(term));
        await mkdir(routeDirectory, { recursive: true });
        const metadata = getTermMetadata(term, base, siteUrl);
        await writeFile(
          resolve(routeDirectory, 'index.html'),
          replacePageMetadata(indexHtml, metadata),
          'utf8'
        );
      }));
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), almanacOgPages(env.VITE_SITE_URL || '')]
  };
});
