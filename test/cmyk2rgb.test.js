import { cmyk2rgb } from '../src/io/cmyk/cmyk2rgb.js';

describe('cmyk2rgb()', () => {
  const tests = [
    ['black', [0, 0, 0, 1], [0, 0, 0, 1]],
    ['white', [0, 0, 0, 0], [255, 255, 255, 1]],
    ['red', [0, 1, 1, 0], [255, 0, 0, 1]],
    ['green', [1, 0, 1, 0], [0, 255, 0, 1]],
    ['blue', [1, 1, 0, 0], [0, 0, 255, 1]],
    ['yellow', [0, 0, 1, 0], [255, 255, 0, 1]],
    ['cyan', [1, 0, 0, 0], [0, 255, 255, 1]],
    ['magenta', [0, 1, 0, 0], [255, 0, 255, 1]],
  ];

  test.each(tests)('%s', (name, input, expected) => {
    expect(cmyk2rgb(input)).toStrictEqual(expected);
  });
});
