'use strict';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 120000,
    include: ['__tests__/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
    sequence: {
      shuffle: false,
      concurrent: false,
    },
  },
});
