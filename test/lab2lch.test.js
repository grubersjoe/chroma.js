import { lab2lch } from '../src/io/lch/lab2lch';

describe('lab2lch()', () => {
  const tests = [
    [
      [0, 0, 0],
      [0, 0, NaN],
    ],
    [
      [100, 0, 0],
      [100, 0, NaN],
    ],
    [
      [53.59, 0, 0],
      [53.59, 0, NaN],
    ],
    [
      [53.24, 80.09, 67.2],
      [53.24, 104.55, 40],
    ],
    [
      [97.14, -21.55, 94.48],
      [97.14, 96.91, 102.85],
    ],
    [
      [87.73, -86.18, 83.18],
      [87.73, 119.77, 136.01],
    ],
    [
      [91.11, -48.09, -14.13],
      [91.11, 50.12, 196.37],
    ],
    [
      [32.3, 79.19, -107.86],
      [32.3, 133.81, 306.29],
    ],
    [
      [60.32, 98.23, -60.82],
      [60.32, 115.53, 328.24],
    ],
  ];

  test.each(tests)('%j -> %j', (input, expected) => {
    for (const [k, c] of Object.entries(lab2lch(input))) {
      isNaN(expected[k]) ? expect(c).toBeNaN() : expect(c).toBeCloseTo(expected[k]);
    }

    const [l, a, b] = input;
    for (const [k, c] of Object.entries(lab2lch({ l, a, b }))) {
      isNaN(expected[k]) ? expect(c).toBeNaN() : expect(c).toBeCloseTo(expected[k]);
    }
  });
});
