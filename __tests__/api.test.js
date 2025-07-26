import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import module from 'node:module';
import path from 'path';
import * as esm from '../dist/index.js';
import * as core from '../src/index.js';
const require = module.createRequire(import.meta.url);
const cjs = require('../dist/index.cjs');

describe.each([
  ['Core', core],
  ['ESM', esm],
  ['CJS', cjs],
])('sjt.js', (name, lib) => {
  test('should produce expected output', async () => {
    const primitiveArray = ['a', 'b'];
    const data = { name: 'Yuki', id: 1, guild: [1, 2], old: 24 };
    const data2 = { name: 'Yuki2', id: 2, guild: [10, 11], old: 10 };
    const array = [data, data2, data];
    const nested = { name: 'Yuki', user: array, data };
    const nestedArray = [nested, nested];
    const encodeAndDecode = (d) => {
      return JSON.stringify(lib.decodeSJT(lib.encodeSJT(d))) === JSON.stringify(d);
    };
    expect(encodeAndDecode(primitiveArray)).toBe(true);
    expect(encodeAndDecode(data)).toBe(true);
    expect(encodeAndDecode(data2)).toBe(true);
    expect(encodeAndDecode(array)).toBe(true);
    expect(encodeAndDecode(nested)).toBe(true);
    expect(encodeAndDecode(nestedArray)).toBe(true);
  });
});
