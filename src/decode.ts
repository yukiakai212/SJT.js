export const decodeSJT = (data: object[]): any => {
  return decode(data[0], data[1]);
};
const decode = (header: any, data: any): any => {
  // Case array object (header is [[subHeader]])
  if (Array.isArray(header) && header.length === 1 && Array.isArray(header[0])) {
    return Array.isArray(data) ? data.map((item: any) => decode(header[0], item)) : undefined;
  }

  // Case object
  else if (Array.isArray(header)) {
    //Case primitive array
    if (header[0] === null) return data[0];

    const result: any = {};
    header.forEach((h, i) => {
      if (typeof h === 'string') {
        result[h] = data[i];
      } else if (Array.isArray(h) && typeof h[0] === 'string') {
        const [key, subHeader] = h;
        if (Array.isArray(subHeader)) {
          result[key] = decode(subHeader, data[i]);
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
