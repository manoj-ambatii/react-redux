// `defineConfig` is imported from 'vitest/config' (a superset of Vite's) so the
// `test` block below is type-checked.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vite configuration. The `test` block configures Vitest so unit tests run in a
// jsdom environment with `describe/it/expect` available globally.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Runs once before each test file — registers jest-dom matchers and cleanup.
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
