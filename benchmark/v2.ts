import { performance } from 'node:perf_hooks';
import { gzipSync, gunzipSync } from 'zlib';
import { encode as msgpackEncode, decode as msgpackDecode } from '@msgpack/msgpack';
import { encodeSJT, decodeSJT } from '../src/index.ts'; //

// Fake data
const input = {
  users: Array.from({ length: 200000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    active: i % 2 === 0,
  })),
  tags: ['a', 'b', 'c'],
  version: 1,
};

function measure<T>(fn: () => T): [T, number] {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return [result, end - start];
}

function formatSize(bytes: number) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function benchmarkCase(
  name: string,
  encodeFn: () => Uint8Array | Buffer,
  decodeFn: (buf: Uint8Array | Buffer) => any,
) {
  const [encoded, encodeTime] = measure(encodeFn);
  const [_, decodeTime] = measure(() => decodeFn(encoded));
  const size = encoded.length;

  return {
    name,
    size,
    encodeTime,
    decodeTime,
  };
}

function printResult(result: ReturnType<typeof benchmarkCase>) {
  console.log(
    result.name.padEnd(16),
    '| Size:',
    formatSize(result.size),
    '| Encode:',
    `${result.encodeTime.toFixed(2)}ms`,
    '| Decode:',
    `${result.decodeTime.toFixed(2)}ms`,
  );
}

function runBenchmark() {
  console.log('=== Full Encode/Decode Benchmark ===');

  const results = [
    benchmarkCase(
      'JSON',
      () => Buffer.from(JSON.stringify(input)),
      (buf) => JSON.parse(buf.toString()),
    ),

    benchmarkCase(
      'SJT (json)',
      () => Buffer.from(JSON.stringify(encodeSJT(input))),
      (buf) => JSON.parse(buf.toString()),
    ),
  ];

  for (const result of results) {
    printResult(result);
  }
}

runBenchmark();
