import { rgb2hcv } from '../src/io/hcv/rgb2hcv';

describe('rgb2hcv()', () => {
  const tests = [
    [
      [255, 0, 0],
      [0, 1, 0],
    ],
    [
      [128, 0, 0],
      [0, 0.5, 0],
    ],
    [
      [255, 128, 128],
      [0, 0.5, 1],
    ],
    [
      [192, 64, 64],
      [0, 0.5, 0.5],
    ],
    [
      [255, 255, 255],
      [0, 0, 1],
    ],
    [
      [128, 128, 128],
      [0, 0, 0.5],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
  ];

  test.each(tests)('%j -> %j', (input, expected) => {
    const hgv1 = rgb2hcv(input);
    for (const i in hgv1) {
      expect(hgv1[i]).toBeCloseTo(expected[i]);
    }

    const [r, g, b] = input;
    const hgv2 = rgb2hcv({ r, g, b });
    for (const i in hgv2) {
      expect(hgv2[i]).toBeCloseTo(expected[i]);
    }
  });
});
