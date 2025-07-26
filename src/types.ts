export const isPrimitive = (
  val: unknown,
): val is string | number | boolean | bigint | symbol | null | undefined => {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
};

export const isPrimitiveArray = (
  arr: unknown,
): arr is Array<string | number | boolean | bigint | symbol | null | undefined> => {
  return Array.isArray(arr) && arr.every(isPrimitive);
};
