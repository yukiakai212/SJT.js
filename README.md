# SJT.js

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

[![Build Status][github-build-url]][github-url]
[![codecov][codecov-image]][codecov-url]

> 🚀 Fast and lightweight encoder/decoder for [Structured JSON Table (SJT)](https://github.com/SJTF/SJT/)

**SJT.js** is a JavaScript implementation of the [Structured JSON Table (SJT)](https://github.com/SJTF/SJT/) Specification. It provides an efficient way to compress repetitive JSON structures, particularly arrays of uniform objects, into a compact, schema-driven table format.

---

## 🔧 Install

```bash
npm install sjt.js
```

---

## 🧠 What is SJT?

Structured JSON Table (SJT) is a compact, schema-first data representation for JSON-like objects. It allows structured and efficient serialization/deserialization of deeply nested objects — making it ideal for storing, diffing, or transmitting data in a table-like format.

### Example

#### Input:

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

#### Encoded:

```json
[
  [ ["id", "name"] ],
  [ [1, "Alice"], [2, "Bob"] ]
]
```

You can read the full specification here: [https://github.com/SJTF/SJT/](https://github.com/SJTF/SJT/)

---

## 📦 Features

* ✅ Supports nested objects and arrays
* ✅ Supports array of objects, arrays of primitives
* ✅ Schema-defined (header + data)
* ✅ Deterministic encoding and decoding
* ✅ Works with deeply nested structures
* ✅ Fast and lightweight, no external dependencies
* ✅ Supports both **CommonJS** and **ESM**

---

## ✨ Usage

### ESM

```ts
import { encodeSJT, decodeSJT } from 'sjt.js';
```

### CJS

```ts
const { encodeSJT, decodeSJT } = require('sjt.js');
```

Then

```ts
//server

const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const compressedJson = encodeSJT(data);

client.send(compressedJson);


//client
fetch('http://your-server').then((res) => {
const restored = decodeSJT(res.json());
console.log(restored);
}) 

```

---

## 🧪 API

### `encodeSJT(input: any): [header: any, data: any]`

Encodes structured JSON input into a compact [SJT](https://github.com/SJTF/SJT/) format.

### `decodeSJT([header, data]: [any, any]): any`

Decodes SJT-encoded content back into original JSON.

---

## 🖐 Use Cases

SJT is ideal for data **transmission** where reducing **bandwidth** is crucial, especially for APIs returning large arrays of similarly structured objects. It compresses payloads without requiring gzip or other transport-level compression — making it useful in environments where such compression is not possible or too costly, and compresses even better when used with gzip.


---

## ⚠ Limitations

* Works best on uniform arrays (e.g., consistent object structure)
* Does not handle mixed schemas or optional fields (by design)

---

## 📑 Specification

This library implements the full [Structured JSON Table Specification](https://github.com/SJTF/SJT/) v1.0.

---


## 📊 Full Encode/Decode Benchmark

| Format          | Size       | Encode Time | Decode Time |
| --------------- | ---------- | ----------- | ----------- |
| **JSON**        | 3849.34 KB | 36.20 ms    | 49.46 ms    |
| **JSON + gzip** | 379.67 KB  | 49.99 ms    | 34.04 ms    |
| **MessagePack** | 2858.83 KB | 45.50 ms    | 70.28 ms    |
| **SJT (JSON)**  | 2433.38 KB | 42.44 ms    | 34.94 ms    |
| **SJT + gzip**  | 359.00 KB  | 67.90 ms    | 44.71 ms    |

### 🔍 Notes:

* **SJT** significantly reduces raw JSON size while maintaining fast encode/decode performance.
* **SJT + gzip** offers the best compression ratio overall, comparable to JSON + gzip, while still being relatively fast.
* Compared to **MessagePack**, SJT is:

  * \~15% smaller
  * Faster in both encode and decode

### 🧪 Test Conditions:

* Dataset: Large structured object with nested arrays/objects
* Benchmarked using Node.js 20
* All sizes measured in uncompressed KB (binary formats estimated)

---

> 🚀 SJT offers a great balance between size and speed, making it ideal for transmitting structured data efficiently.

---

## 📋 License

MIT © 2025 [Yuki Akai](https://github.com/yukiakai212)

---

[npm-downloads-image]: https://badgen.net/npm/dm/SJT.js
[npm-downloads-url]: https://www.npmjs.com/package/SJT.js
[npm-url]: https://www.npmjs.com/package/SJT.js
[npm-version-image]: https://badgen.net/npm/v/SJT.js
[github-build-url]: https://github.com/yukiakai212/SJT.js/actions/workflows/build.yml/badge.svg
[github-url]: https://github.com/yukiakai212/SJT.js/
[codecov-image]: https://codecov.io/gh/yukiakai212/SJT.js/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yukiakai212/SJT.js
[changelog-url]: https://github.com/yukiakai212/SJT.js/blob/main/CHANGELOG.md