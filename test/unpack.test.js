import { unpack } from '../src/utils/unpack.js';

describe('unpack()', () => {
  test('parse CMYK colors', () => {
    expect(unpack([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(unpack([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
    expect(unpack([{ c: 1, m: 2, y: 3, k: 4 }], 'cmyk')).toEqual([1, 2, 3, 4]);
  });
});
