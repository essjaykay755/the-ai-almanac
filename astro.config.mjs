import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    site: env.VITE_SITE_URL || undefined,
    output: 'static',
    trailingSlash: 'always',
    integrations: [react()]
  };
});
