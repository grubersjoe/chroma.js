import { lab2rgb } from '../src/io/lab/lab2rgb';

describe('lab2rgb()', () => {
  const tests = [
    [
      [0, 0, 0],
      [0, 0, 0, 1],
    ],
    [
      [100, 0, 0],
      [255, 255, 255, 1],
    ],
    [
      [53.59, 0, 0],
      [128, 128, 128, 1],
    ],
    [
      [53.24, 80.09, 67.2],
      [255, 0, 0, 1],
    ],
    [
      [97.14, -21.55, 94.48],
      [255, 255, 0, 1],
    ],
    [
      [87.73, -86.18, 83.18],
      [0, 255, 0, 1],
    ],
    [
      [91.11, -48.09, -14.13],
      [0, 255, 255, 1],
    ],
    [
      [32.3, 79.19, -107.86],
      [0, 0, 255, 1],
    ],
    [
      [60.32, 98.23, -60.82],
      [255, 0, 255, 1],
    ],
  ];

  const round = v => Math.max(0, Math.round(v));

  test.each(tests)('%j -> %j', (input, expected) => {
    expect(lab2rgb(input).map(round)).toStrictEqual(expected);

    const [l, a, b] = input;
    expect(lab2rgb({ l, a, b }).map(round)).toStrictEqual(expected);
  });
});
