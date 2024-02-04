import { cubehelix } from '../src/generator/cubehelix';
import { toHex } from '../src/io/hex';
import { get } from '../src/ops/get';

describe('cubehelix', () => {
  test('default helix', () => {
    const ch = cubehelix();
    expect(toHex(ch(0))).toEqual('#000000');
    expect(toHex(ch(0.25))).toEqual('#16534c');
    expect(toHex(ch(0.5))).toEqual('#a07949');
    expect(toHex(ch(0.75))).toEqual('#c7b3ed');
    expect(toHex(ch(1))).toEqual('#ffffff');
  });

  test('red helix', () => {
    const ch = cubehelix(0, 1, 1, 1);
    expect(toHex(ch(0))).toEqual('#000000');
    expect(toHex(ch(0.25))).toEqual('#2e5117');
    expect(toHex(ch(0.5))).toEqual('#4c949f');
    expect(toHex(ch(0.75))).toEqual('#d1aee8');
    expect(toHex(ch(1))).toEqual('#ffffff');
  });

  test('red helix - partial l range', () => {
    const ch = cubehelix(0, 1, 1, 1, [0.25, 0.75]);
    expect(toHex(ch(0))).toEqual('#663028');
    expect(toHex(ch(0.25))).toEqual('#49752d');
    expect(toHex(ch(0.5))).toEqual('#4c949f');
    expect(toHex(ch(0.75))).toEqual('#b68ad2');
    expect(toHex(ch(1))).toEqual('#e6b0a8');
  });

  test('red helix - gamma', () => {
    const ch = cubehelix(0, 1, 1, 0.8, [0, 1]);
    expect(toHex(ch(0))).toEqual('#000000');
    expect(toHex(ch(0.25))).toEqual('#3f6824');
    expect(toHex(ch(0.5))).toEqual('#60a6b1');
    expect(toHex(ch(0.75))).toEqual('#dabcee');
    expect(toHex(ch(1))).toEqual('#ffffff');
  });

  test('red helix - no saturation', () => {
    const ch = cubehelix(0, 1, 0, 1, [0, 1]);
    expect(toHex(ch(0))).toEqual('#000000');
    expect(toHex(ch(0.25))).toEqual('#404040');
    expect(toHex(ch(0.5))).toEqual('#808080');
    expect(toHex(ch(0.75))).toEqual('#bfbfbf');
    expect(toHex(ch(1))).toEqual('#ffffff');
  });

  test('red helix - saturation range', () => {
    const ch = cubehelix(0, 1, [1, 0], 1, [0, 1]);
    expect(toHex(ch(0))).toEqual('#000000');
    expect(toHex(ch(0.25))).toEqual('#324c21');
    expect(toHex(ch(0.5))).toEqual('#668a8f');
    expect(toHex(ch(0.75))).toEqual('#c4bbc9');
    expect(toHex(ch(1))).toEqual('#ffffff');
    // saturation decreases
    expect(get(ch(0.33), 'hsl.s')).toBeGreaterThan(get(ch(0.66), 'hsl.s'));
  });

  test('non-array lightness', () => {
    const ch = cubehelix(300, -1.5, 1, 1, 0.5);
    expect(toHex(ch(0))).toEqual('#ae629f');
    expect(toHex(ch(0.5))).toEqual('#a07949');
    expect(toHex(ch(1))).toEqual('#519d60');
  });
});
