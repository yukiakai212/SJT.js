//import { extractHeader } from './extractHeader.js';
import { compileExtractors } from './compileExtractors.js';
import { encodeSJT as encodev1 } from './encode.js';
export interface EncodeSJTOptions {
  strict?: boolean;
}

import { isPrimitive, isPrimitiveArray } from './types.js';
const encode = (header: any, data: any): any => {
  // Case array object (header is [[subHeader]])
  if (Array.isArray(header) && header.length === 1 && Array.isArray(header[0])) {
    const values = [];
    console.log('Array', data, header);
    if (isPrimitiveArray(data)) return data;
    for (const d of data) {
      values.push(encode(header[0], d));
    }
    return values;
  }

  // Case object
  else if (Array.isArray(header)) {
    //Case primitive array
    console.log('Object', data, header);
    if (header[0] === null) return [data];

    const result: any = [];
    header.forEach((h, i) => {
      if (typeof h === 'string') {
        result.push(data[h]);
      } else if (Array.isArray(h) && typeof h[0] === 'string') {
        const [key, subHeader] = h;
        if (Array.isArray(subHeader)) {
          result.push(encode(subHeader, data[key]));
        } else {
          throw new Error('Invalid subHeader format');
        }
      } else {
        throw new Error('Invalid header format');
      }
    });
    return result;
  }

  // case primitive
  return data;
};

/**
 * Encode data into Structured JSON Table (SJT) format.
 */
export function encodeSJT(data: Record<string, any>[], options?: EncodeSJTOptions): [any[], any[]] {
  const strict = options?.strict !== false;
  const header = extractHeader(data);
  console.log(header);
  const extractors = compileExtractors(header);
  const values = data.map((row) => extractors.map((fn) => fn(row)));
  return [header, values];
}

const users = [
  { id: 1, name: 'Alice', tags: [{ key: 'role', value: 'admin' }], info: { name: 'a' } },
  { id: 2, name: 'Bob', tags: [{ key: 'role', value: 'user' }], info: { name: 'b' } },
];

const primitiveArray = ['a', 'b'];
const data = { name: 'Yuki', id: 1, guild: [1, 2], old: 24, g: null };
const data2 = { name: 'Yuki2', id: 2, guild: [10, 11], old: 10, g: null };
const array = [data, data2, data];
const nested = { name: 'Yuki', user: array, data };
const nestedArray = [nested, nested];

//const [header, values] = encodeSJT(users, { strict: false });
const [headerv1, valuesv1] = encodev1(users);
const [hp, vp] = encodev1(primitiveArray);
const [hd, vd] = encodev1(data);
const [hn, vn] = encodev1(nested);
const [hna, vna] = encodev1(nestedArray);

console.log(JSON.stringify(encode(headerv1, users)));
console.log(JSON.stringify(encode(hp, primitiveArray)));
console.log(JSON.stringify(vp));

console.log(JSON.stringify(encode(hd, data)));
console.log(JSON.stringify(vd));

console.log(JSON.stringify(headerv1));
console.log(JSON.stringify(valuesv1));
