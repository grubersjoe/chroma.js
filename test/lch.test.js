import { toHex } from '../src/io/hex';
import { hcl, lch } from '../src/io/lch';
import { clipped } from '../src/ops/clipped';

describe('lch()', () => {
  test('argument parsing', () => {
    expect(toHex(lch(50, 0, 0))).toStrictEqual('#777777');
    expect(toHex(lch({ l: 50, c: 0, h: 0 }))).toStrictEqual('#777777');
    expect(toHex(lch([50, 0, 0]))).toStrictEqual('#777777');
  });

  test('lch grayscale', () => {
    expect(toHex(lch(0, 0, 0))).toStrictEqual('#000000');
    expect(toHex(lch(25, 0, 0))).toStrictEqual('#3b3b3b');
    expect(toHex(lch(50, 0, 0))).toStrictEqual('#777777');
    expect(toHex(lch(75, 0, 0))).toStrictEqual('#b9b9b9');
    expect(toHex(lch(100, 0, 0))).toStrictEqual('#ffffff');
  });

  test('lch hues', () => {
    expect(toHex(lch(50, 70, 0))).toStrictEqual('#dc2c7a');
    expect(toHex(lch(50, 70, 60))).toStrictEqual('#bd5c00');
    expect(toHex(lch(50, 70, 120))).toStrictEqual('#548400');
    expect(toHex(lch(50, 70, 180))).toStrictEqual('#009175');
    expect(toHex(lch(50, 70, 240))).toStrictEqual('#008cde');
    expect(toHex(lch(50, 70, 300))).toStrictEqual('#6f67df');
    expect(toHex(lch(50, 70, 360))).toStrictEqual('#dc2c7a');
  });

  test('clipping', () => {
    expect(clipped(hcl(50, 40, 20))).toBe(true);
    expect(clipped(hcl(50, 40, 40))).toBe(false);
    expect(clipped(hcl(50, 40, 60))).toBe(false);
    expect(clipped(hcl(50, 40, 80))).toBe(true);
    expect(clipped(hcl(50, 40, 100))).toBe(true);
  });
});
