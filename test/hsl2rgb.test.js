import { hsl2rgb } from '../src/io/hsl/hsl2rgb';

describe('hsl2rgb()', () => {
  const tests = [
    ['black', [0, 0, 0], [0, 0, 0, 1]],
    ['white', [0, 0, 1], [255, 255, 255, 1]],
    ['gray', [0, 0, 0.5], [127.5, 127.5, 127.5, 1]],
    ['red', [0, 1, 0.5], [255, 0, 0, 1]],
    ['yellow', [60, 1, 0.5], [255, 255, 0, 1]],
    ['green', [120, 1, 0.5], [0, 255, 0, 1]],
    ['cyan', [180, 1, 0.5], [0, 255, 255, 1]],
    ['blue', [240, 1, 0.5], [0, 0, 255, 1]],
    ['magenta', [300, 1, 0.5], [255, 0, 255, 1]],
    ['red_again', [360, 1, 0.5], [255, 0, 0, 1]],
  ];

  test.each(tests)('%s', (name, input, expected) => {
    const [h, s, l] = input;
    expect(hsl2rgb(input)).toStrictEqual(expected);
    expect(hsl2rgb({ h, s, l })).toStrictEqual(expected);
  });
});
