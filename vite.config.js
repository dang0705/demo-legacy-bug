import { defineConfig } from 'vite';
import { createVuePlugin as Vue } from 'vite-plugin-vue2';

import { resolve } from './vite.config/alias';
import build from './vite.config/build';

import legacy from '@vitejs/plugin-legacy';
import { minifyHtml } from 'vite-plugin-html';
import { isDev } from './vite.config/env';
export default defineConfig({
  base: './',
  build,
  plugins: [
    Vue(),
    ...(isDev
      ? []
      : [
          minifyHtml(),
          legacy({
            targets: ['defaults', '> 5%, last 3 version, ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            polyfills: ['es/object', 'es.promise.all-settled']
            // modernPolyfills: ["es/object"]
          })
        ])
  ],
  resolve
});
