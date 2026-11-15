import { defineConfig } from 'astro/config';

// SITE and BASE_PATH are set by the GitHub Pages workflow (.github/workflows/deploy.yml);
// locally the site runs at the root.
export default defineConfig({
  site: process.env.SITE ?? 'https://lawha.app', // placeholder domain
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { assets: '_a', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
