import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy'
import path from 'path';

export default defineConfig({
  base: '/meetings/',
  plugins: [vue(), legacy({
    targets: ['defaults', 'not IE 11', 'iOS >= 9'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime']
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});