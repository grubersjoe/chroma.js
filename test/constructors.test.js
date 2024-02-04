import { css, toCss } from '../src/io/css';
import { hex, toHex } from '../src/io/hex';
import { toHsl } from '../src/io/hsl';
import { toHsv } from '../src/io/hsv';
import { named, toName } from '../src/io/named';
import { num, toNum } from '../src/io/num';
import { rgb, toRgb } from '../src/io/rgb';
import { alpha } from '../src/ops/alpha';

describe('color constructors', () => {
  test('named()', () => {
    const c = named('red');
    expect(toHex(c)).toStrictEqual('#ff0000');
    expect(toRgb(c)).toStrictEqual([255, 0, 0]);
    expect(() => named('invalid')).toThrow(`invalid argument "invalid"`);
  });

  test('hex colors', () => {
    const c = hex('#f00');
    expect(toName(c)).toStrictEqual('red');
    expect(toHex(c)).toStrictEqual('#ff0000');
    expect(toHex(c, 'rgba')).toStrictEqual('#ff0000ff');
    expect(toHex(c, 'argb')).toStrictEqual('#ffff0000');
    expect(toRgb(c)).toStrictEqual([255, 0, 0]);
  });

  test('hex color, no #', () => {
    const c = hex('F00');
    expect(toName(c)).toStrictEqual('red');
    expect(toHex(c)).toStrictEqual('#ff0000');
    expect(toRgb(c)).toStrictEqual([255, 0, 0]);
  });

  test('css color rgb', () => {
    const c = css('rgb(255 0 0)');
    expect(toHex(c)).toStrictEqual('#ff0000');
  });

  test('css color rgba', () => {
    const c = css('rgba(128 0 128 0.5)');
    expect(toHex(c)).toStrictEqual('#80008080');
    expect(toHex(c, 'rgb')).toStrictEqual('#800080');
    expect(alpha(c)).toStrictEqual(0.5);
    expect(toCss(c)).toStrictEqual('rgba(128 0 128 0.5)');
  });

  test('css color hsla', () => {
    const c = css('hsla(240 100% 50% 0.5)');
    expect(toHex(c)).toStrictEqual('#0000ff80');
    expect(toHex(c, 'rgb')).toStrictEqual('#0000ff');
    expect(alpha(c)).toStrictEqual(0.5);
    expect(toCss(c)).toStrictEqual('rgba(0 0 255 0.5)');
  });

  test('hsla color', () => {
    const c = named('lightsalmon');
    expect(toCss(c)).toStrictEqual('rgb(255 160 122)');
    expect(toCss(c, 'rgb')).toStrictEqual('rgb(255 160 122)');
    expect(toCss(c, 'hsl')).toStrictEqual('hsl(17.14 100% 73.92%)');
  });

  test('rgb color', () => {
    const c = rgb(255, 0, 0);
    expect(toHex(c)).toStrictEqual('#ff0000');
  });

  test('hsv black', () => {
    const c = toHsv(named('black'));
    expect(c[0]).toBeNaN();
  });

  test('hsl black', () => {
    const hsla = toHsl(named('black'));
    expect(hsla).toStrictEqual([NaN, 0, 0, 1]);
  });

  test('default mode of rgb', () => {
    expect(rgb([255, 0, 0])).toStrictEqual(rgb([255, 0, 0], 'rgb'));
  });

  test('num color', () => {
    expect(toHex(num(0xff0000))).toStrictEqual('#ff0000');
    expect(toNum(num(0xff0000))).toStrictEqual(0xff0000);

    expect(toHex(num(0x000000))).toStrictEqual('#000000');
    expect(toNum(num(0xff0000))).toStrictEqual(0xff0000);

    expect(toHex(num(0xffffff))).toStrictEqual('#ffffff');
    expect(toNum(num(0xffffff))).toStrictEqual(0xffffff);

    expect(toHex(num(0x31ff98))).toStrictEqual('#31ff98');
    expect(toNum(num(0x31ff98))).toStrictEqual(0x31ff98);

    expect(toNum(named('red'))).toStrictEqual(0xff0000);
  });
});
