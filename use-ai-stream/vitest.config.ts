import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [], // Add setup file if we need to polyfill TextEncoder
  },
});
