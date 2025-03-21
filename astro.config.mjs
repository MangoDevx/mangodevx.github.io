// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [alpinejs()],

  build: {
    assetsPrefix: '/'
  },

  prefetch: {
    defaultStrategy: 'viewport'
  },

  site: 'https://mangodevx.github.io',
  base: ''
});