import { cubehelix } from '../src/generator/cubehelix';
import { toHex } from '../src/io/hex';
import { get } from '../src/ops/get';

describe('cubehelix', () => {
  test('default helix', () => {
    const ch = cubehelix();
    expect(toHex(ch(0))).toStrictEqual('#000000');
    expect(toHex(ch(0.25))).toStrictEqual('#16534c');
    expect(toHex(ch(0.5))).toStrictEqual('#a07949');
    expect(toHex(ch(0.75))).toStrictEqual('#c7b3ed');
    expect(toHex(ch(1))).toStrictEqual('#ffffff');
  });

  test('red helix', () => {
    const ch = cubehelix(0, 1, 1, 1);
    expect(toHex(ch(0))).toStrictEqual('#000000');
    expect(toHex(ch(0.25))).toStrictEqual('#2e5117');
    expect(toHex(ch(0.5))).toStrictEqual('#4c949f');
    expect(toHex(ch(0.75))).toStrictEqual('#d1aee8');
    expect(toHex(ch(1))).toStrictEqual('#ffffff');
  });

  test('red helix - partial l range', () => {
    const ch = cubehelix(0, 1, 1, 1, [0.25, 0.75]);
    expect(toHex(ch(0))).toStrictEqual('#663028');
    expect(toHex(ch(0.25))).toStrictEqual('#49752d');
    expect(toHex(ch(0.5))).toStrictEqual('#4c949f');
    expect(toHex(ch(0.75))).toStrictEqual('#b68ad2');
    expect(toHex(ch(1))).toStrictEqual('#e6b0a8');
  });

  test('red helix - gamma', () => {
    const ch = cubehelix(0, 1, 1, 0.8, [0, 1]);
    expect(toHex(ch(0))).toStrictEqual('#000000');
    expect(toHex(ch(0.25))).toStrictEqual('#3f6824');
    expect(toHex(ch(0.5))).toStrictEqual('#60a6b1');
    expect(toHex(ch(0.75))).toStrictEqual('#dabcee');
    expect(toHex(ch(1))).toStrictEqual('#ffffff');
  });

  test('red helix - no saturation', () => {
    const ch = cubehelix(0, 1, 0, 1, [0, 1]);
    expect(toHex(ch(0))).toStrictEqual('#000000');
    expect(toHex(ch(0.25))).toStrictEqual('#404040');
    expect(toHex(ch(0.5))).toStrictEqual('#808080');
    expect(toHex(ch(0.75))).toStrictEqual('#bfbfbf');
    expect(toHex(ch(1))).toStrictEqual('#ffffff');
  });

  test('red helix - saturation range', () => {
    const ch = cubehelix(0, 1, [1, 0], 1, [0, 1]);
    expect(toHex(ch(0))).toStrictEqual('#000000');
    expect(toHex(ch(0.25))).toStrictEqual('#324c21');
    expect(toHex(ch(0.5))).toStrictEqual('#668a8f');
    expect(toHex(ch(0.75))).toStrictEqual('#c4bbc9');
    expect(toHex(ch(1))).toStrictEqual('#ffffff');
    // saturation decreases
    expect(get(ch(0.33), 'hsl.s')).toBeGreaterThan(get(ch(0.66), 'hsl.s'));
  });

  test('non-array lightness', () => {
    const ch = cubehelix(300, -1.5, 1, 1, 0.5);
    expect(toHex(ch(0))).toStrictEqual('#ae629f');
    expect(toHex(ch(0.5))).toStrictEqual('#a07949');
    expect(toHex(ch(1))).toStrictEqual('#519d60');
  });
});
