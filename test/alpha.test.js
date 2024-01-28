import { mix } from '../src/generator/mix';
import { cmyk } from '../src/io/cmyk';
import { css, toCss } from '../src/io/css';
import { gl, toGl } from '../src/io/gl';
import { hex, toHex } from '../src/io/hex';
import { hsi } from '../src/io/hsi';
import { hsl } from '../src/io/hsl';
import { hsv } from '../src/io/hsv';
import { lab } from '../src/io/lab';
import { lch } from '../src/io/lch';
import { named, toName } from '../src/io/named';
import { toNum } from '../src/io/num';
import { rgb, toRgb, toRgba } from '../src/io/rgb';
import { alpha } from '../src/ops/alpha';

describe('alpha()', () => {
  describe('setting & getting alpha channel', () => {
    const c = named('red');
    test('no arguments gets alpha', () => expect(alpha(c)).toEqual(1));
    test('setting alpha to 0.5', () => expect(alpha(alpha(c, 0.5))).toEqual(0.5));
    test('alpha is unchanged', () => expect(alpha(c)).toEqual(1));
  });
  describe('interpolating alpha channel', () => {
    const c1 = alpha(named('white'), 0);
    const c2 = alpha(named('black'), 1);
    const c = mix(c1, c2, 0.3, 'rgb');
    test('hex is #b3b3b3', () => expect(toHex(c, 'rgb')).toEqual('#b3b3b3'));
    test('hex with alpha', () => expect(toHex(c)).toEqual('#b3b3b34d'));
    test('alpha is 30%', () => expect(alpha(c)).toEqual(0.3));
  });
  describe('constructing rgba color, hsl shorthand', () => {
    const c = alpha(rgb(255, 0, 0, 0.5), 0.5);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 50%', () => expect(alpha(c)).toEqual(0.5));
  });
  describe('parsing hex rgba colors', () => {
    const c = hex('#ff00004d');
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 30%', () => expect(alpha(c)).toEqual(0.3));
    test('rgba output', () => expect(toRgba(c)).toEqual([255, 0, 0, 0.3]));
  });
  describe('parsing css rgba colors', () => {
    const c = css('rgba(255 255 0 .3)');
    test('color is yellow', () => expect(toName(c)).toEqual('yellow'));
    test('alpha is 30%', () => expect(alpha(c)).toEqual(0.3));
    test('rgba output', () => expect(toRgba(c)).toEqual([255, 255, 0, 0.3]));
  });
  describe('parsing css rgba colors (percentage)', () => {
    const c = css('rgba(100% 0% 0% 0.2)');
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 30%', () => expect(alpha(c)).toEqual(0.2));
    test('rgba output', () => expect(toRgb(c)).toEqual([255, 0, 0]));
    test('rgba output', () => expect(toRgba(c)).toEqual([255, 0, 0, 0.2]));
  });
  describe('parsing hsla colors', () => {
    const c = css('hsla(0 100% 50% 0.25)');
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
    test('rgba output', () => expect(toRgb(c)).toEqual([255, 0, 0]));
    test('rgba output', () => expect(toRgba(c)).toEqual([255, 0, 0, 0.25]));
  });
  describe('constructing hsla color', () => {
    const c = hsl(0, 1, 0.5, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('constructing hsva color', () => {
    const c = hsv(0, 1, 1, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('constructing hsia color', () => {
    const c = hsi(0, 1, 0.3333334, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('constructing laba color', () => {
    const c = lab(53.24079414130722, 80.09245959641109, 67.20319651585301, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('constructing lcha color', () => {
    const c = lch(53.24079414130722, 104.55176567686985, 39.99901061253297, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('constructing cmyka color', () => {
    const c = cmyk(0, 1, 1, 0, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
  });
  describe('gl output', () => {
    const c = gl(1, 0, 0, 0.25);
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
    test('gl output', () => expect(toGl(c)).toEqual([1, 0, 0, 0.25]));
  });
  describe('rgba css output', () => {
    const c = css('hsla(0 100% 50% 0.25)');
    test('color is red', () => expect(toName(c)).toEqual('red'));
    test('alpha is 25%', () => expect(alpha(c)).toEqual(0.25));
    test('css output', () => expect(toCss(c)).toEqual('rgba(255 0 0 0.25)'));
  });
  describe('hex output', () => {
    const c = gl(1, 0, 0, 0.25);
    test('hex', () => expect(toHex(c)).toEqual('#ff000040'));
    test('rgb', () => expect(toHex(c, 'rgb')).toEqual('#ff0000'));
    test('rgba', () => expect(toHex(c, 'rgba')).toEqual('#ff000040'));
    test('argb', () => expect(toHex(c, 'argb')).toEqual('#40ff0000'));
  });
  describe('num output', () => {
    const c = gl(1, 0, 0, 0.25);
    test('num ignores alpha', () => expect(toNum(c)).toEqual(0xff0000));
  });
  describe('setting alpha returns new instance', () => {
    const c = named('blue');
    const d = alpha(c, 0.5);
    test('alpha stays the same', () => {
      expect(c).not.toBe(d);
      expect(alpha(c)).toEqual(1);
      expect(alpha(d)).toEqual(0.5);
    });
  });
});
