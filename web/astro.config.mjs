import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), mdx()],
  prefetch: {
    prefetchAll: true,
  },
  server: ({ command }) => ({
    port: command === 'dev' ? 4321 : 80,
    host: '0.0.0.0',
  }),
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});
