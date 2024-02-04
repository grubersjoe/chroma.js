import { hsv2rgb } from '../src/io/hsv/hsv2rgb';

describe('hsv2rgb()', () => {
  const tests = [
    [
      [NaN, 0, 0],
      [0, 0, 0, 1],
    ],
    [
      [NaN, 0, 1],
      [255, 255, 255, 1],
    ],
    [
      [0, 0, 0.5],
      [127.5, 127.5, 127.5, 1],
    ],
    [
      [0, 1, 1],
      [255, 0, 0, 1],
    ],
    [
      [60, 1, 1],
      [255, 255, 0, 1],
    ],
    [
      [120, 1, 1],
      [0, 255, 0, 1],
    ],
    [
      [180, 1, 1],
      [0, 255, 255, 1],
    ],
    [
      [240, 1, 1],
      [0, 0, 255, 1],
    ],
    [
      [300, 1, 1],
      [255, 0, 255, 1],
    ],
    [
      [360, 1, 1],
      [255, 0, 0, 1],
    ],
  ];

  test.each(tests)('%j -> %j', (input, expected) => {
    for (const [k, c] of Object.entries(hsv2rgb(input))) {
      expect(c).toBeCloseTo(expected[k], 10);
    }

    const [h, s, v] = input;
    for (const [k, c] of Object.entries(hsv2rgb({ h, s, v }))) {
      expect(c).toBeCloseTo(expected[k], 10);
    }
  });
});
