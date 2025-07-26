'use strict';
import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'browser',
  dts: true,
  bundle: true,
  splitting: false,
  outDir: 'dist',
  clean: true,
  shims: true,
  treeshake: false,
  minify: true,
  target: 'es2022',
  define: {},
  external: [],
});
