import { isPrimitive, isPrimitiveArray } from './types.js';
const extractHeader = (data: Record<string, any>): any[] => {
  const header = [];
  if (Array.isArray(data)) {
    if (isPrimitiveArray(data)) header.push(null);
    else {
      header.push(extractHeader(data[0]));
    }
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    for (const key of keys) {
      if (Array.isArray(data[key]) || (typeof data[key] == 'object' && data[key] !== null)) {
        header.push([key, extractHeader(data[key])]);
      } else if (isPrimitive(key)) header.push(key);
      else {
        throw new Error('Unsupported type');
      }
    }
  } else {
    throw new Error('Unknow types');
  }
  return header;
};

/*
This function is only for extracting data without header, performance is less efficient than extracting with header
*/
const getValues = (data: Record<string, any>): any[] => {
  const body = [];
  if (Array.isArray(data)) {
    if (isPrimitiveArray(data)) body.push(data);
    else {
      for (const d of data) {
        body.push(getValues(d));
      }
    }
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    for (const key of keys) {
      if (Array.isArray(data[key]) || (typeof data[key] == 'object' && data[key] !== null)) {
        body.push(getValues(data[key]));
      } else if (isPrimitive(data[key])) {
        body.push(data[key]);
      } else {
        throw new Error('Unsupported type');
      }
    }
  } else {
    throw new Error('Unknow types');
  }
  return body;
};
const encode = (header: any, data: any): any => {
  // Case array object (header is [[subHeader]])
  if (Array.isArray(header) && header.length === 1 && Array.isArray(header[0])) {
    const values = [];
    for (const d of data) {
      values.push(encode(header[0], d));
    }
    return values;
  }

  // Case object
  else if (Array.isArray(header)) {
    //Case primitive array
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

export const encodeSJT = (data: Record<string, any> | Record<string, any>[]): object => {
  const headerSJT = extractHeader(data);
  const dataSJT = encode(headerSJT, data);
  return [headerSJT, dataSJT];
};
