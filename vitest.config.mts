import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: [ 'src/**/*.spec.ts', 'src/**/*.test.ts' ],
    exclude: [ 'node_modules', 'dist', 'src/generated' ],
    globals: true,
    setupFiles: [ './src/test/setup.ts' ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
