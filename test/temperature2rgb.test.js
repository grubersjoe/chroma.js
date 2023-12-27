import { temp2rgb } from '../src/io/temp/temp2rgb.js';

describe('temp2rgb()', () => {
  const tests = [
    [1000, [255, 58, 0, 1]],
    [4000, [255, 208, 164, 1]],
    [5000, [255, 228, 205, 1]],
    [7000, [245, 243, 255, 1]],
    [10000, [204, 220, 255, 1]],
    [20000, [168, 197, 255, 1]],
    [30000, [159, 190, 255, 1]],
  ];

  test.each(tests)('temp2rgb(%d) = %j', (input, expected) => {
    expect(temp2rgb(input).map(Math.round)).toStrictEqual(expected);
  });
});
