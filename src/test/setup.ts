// Vitest setup file (referenced by vite.config.ts -> test.setupFiles).
//
// 1. `@testing-library/jest-dom` adds DOM-specific matchers such as
//    `toBeInTheDocument()` and `toBeChecked()`.
// 2. `cleanup` unmounts React trees after every test so tests stay isolated.
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
