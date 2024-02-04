import { hsi2rgb } from '../src/io/hsi/hsi2rgb';

describe('hsi2rgb()', () => {
  const tests = [
    [
      [0, 0, 0],
      [0, 0, 0, 1],
    ],
    [
      [NaN, 0, 0],
      [0, 0, 0, 1],
    ],
    [
      [0, 0, 1],
      [255, 255, 255, 1],
    ],
    [
      [0, 0, 0.5],
      [127.5, 127.5, 127.5, 1],
    ],
    [
      [0, 1, 1 / 3],
      [255, 0, 0, 1],
    ],
    [
      [60, 1, 2 / 3],
      [255, 255, 0, 1],
    ],
    [
      [120, 1, 1 / 3],
      [0, 255, 0, 1],
    ],
    [
      [180, 1, 2 / 3],
      [0, 255, 255, 1],
    ],
    [
      [240, 1, 1 / 3],
      [0, 0, 255, 1],
    ],
    [
      [300, 1, 2 / 3],
      [255, 0, 255, 1],
    ],
    [
      [360, 1, 1 / 3],
      [255, 0, 0, 1],
    ],
  ];

  test.each(tests)('%j -> %j', (input, expected) => {
    for (const [k, c] of Object.entries(hsi2rgb(input))) {
      expect(c).toBeCloseTo(expected[k], 10);
    }

    const [h, s, i] = input;
    for (const [k, c] of Object.entries(hsi2rgb({ h, s, i }))) {
      expect(c).toBeCloseTo(expected[k], 10);
    }
  });
});
