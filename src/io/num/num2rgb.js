export const num2rgb = num => {
  if (typeof num === 'number' && num >= 0 && num <= 0xffffff) {
    const r = num >> 16;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    return [r, g, b, 1];
  }
  throw new Error('unknown num color: ' + num);
};
