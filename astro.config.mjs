import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
  site: env.VITE_SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()]
});
