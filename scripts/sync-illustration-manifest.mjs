import fs from 'node:fs';
import path from 'node:path';
import { terms } from '../src/data/terms.ts';
import { slugifyTerm } from '../src/utils/ogImage.ts';

const manifestPath = path.resolve('src/data/illustration-manifest.json');
const illustrationDirectory = path.resolve('public/illustrations/generated/term-specific');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

for (const term of terms) {
  const slug = slugifyTerm(term.word);
  const filePath = path.join(illustrationDirectory, `${slug}.webp`);

  if (fs.existsSync(filePath)) {
    manifest.termImages[slug] = `/illustrations/generated/term-specific/${slug}.webp`;
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Synced ${Object.keys(manifest.termImages).length} direct term illustrations.`);
