import { isPrimitive, isPrimitiveArray } from './types.js';
const extractHeader = (data: Record<string, any>): any[] => {
  const header = [];
  if (Array.isArray(data)) {
    if (isPrimitiveArray(data)) header.push(null);
    else {
      header.push(extractHeader(data[0]));
    }
  } else if (typeof data === 'object') {
    const keys = Object.keys(data);
    for (const key of keys) {
      if (Array.isArray(data[key]) || typeof data[key] == 'object') {
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
const getValues = (data: Record<string, any>): any[] => {
  const body = [];
  if (Array.isArray(data)) {
    if (isPrimitiveArray(data)) body.push(data);
    else {
      for (const d of data) {
        body.push(getValues(d));
      }
    }
  } else if (typeof data === 'object') {
    const keys = Object.keys(data);
    for (const key of keys) {
      if (Array.isArray(data[key]) || typeof data[key] == 'object') {
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
export const encodeSJT = (data: Record<string, any> | Record<string, any>[]): object => {
  const headerSJT = extractHeader(data);
  const dataSJT = getValues(data);
  return [headerSJT, dataSJT];
};
