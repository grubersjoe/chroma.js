import { css, toCss } from '../src/io/css';
import { hex, toHex } from '../src/io/hex';
import { toHsl } from '../src/io/hsl';
import { toHsv } from '../src/io/hsv';
import { named, toName } from '../src/io/named';
import { num, toNum } from '../src/io/num';
import { rgb, toRgb } from '../src/io/rgb';
import { alpha } from '../src/ops/alpha';

describe('color constructors', () => {
  test('named colors', () => {
    const c = named('red');
    expect(toHex(c)).toEqual('#ff0000');
    expect(toRgb(c)).toEqual([255, 0, 0]);
  });

  test('hex colors', () => {
    const c = hex('#f00');
    expect(toName(c)).toEqual('red');
    expect(toHex(c)).toEqual('#ff0000');
    expect(toHex(c, 'rgba')).toEqual('#ff0000ff');
    expect(toHex(c, 'argb')).toEqual('#ffff0000');
    expect(toRgb(c)).toEqual([255, 0, 0]);
  });

  test('hex color, no #', () => {
    const c = hex('F00');
    expect(toName(c)).toEqual('red');
    expect(toHex(c)).toEqual('#ff0000');
    expect(toRgb(c)).toEqual([255, 0, 0]);
  });

  test('css color rgb', () => {
    const c = css('rgb(255 0 0)');
    expect(toHex(c)).toEqual('#ff0000');
  });

  test('css color rgba', () => {
    const c = css('rgba(128 0 128 0.5)');
    expect(toHex(c)).toEqual('#80008080');
    expect(toHex(c, 'rgb')).toEqual('#800080');
    expect(alpha(c)).toEqual(0.5);
    expect(toCss(c)).toEqual('rgba(128 0 128 0.5)');
  });

  test('css color hsla', () => {
    const c = css('hsla(240 100% 50% 0.5)');
    expect(toHex(c)).toEqual('#0000ff80');
    expect(toHex(c, 'rgb')).toEqual('#0000ff');
    expect(alpha(c)).toEqual(0.5);
    expect(toCss(c)).toEqual('rgba(0 0 255 0.5)');
  });

  test('hsla color', () => {
    const c = named('lightsalmon');
    expect(toCss(c)).toEqual('rgb(255 160 122)');
    expect(toCss(c, 'rgb')).toEqual('rgb(255 160 122)');
    expect(toCss(c, 'hsl')).toEqual('hsl(17.14 100% 73.92%)');
  });

  test('rgb color', () => {
    const c = rgb(255, 0, 0);
    expect(toHex(c)).toEqual('#ff0000');
  });

  test('hsv black', () => {
    const c = toHsv(named('black'));
    expect(c[0]).toBeNaN();
  });

  test('hsl black', () => {
    const hsla = toHsl(named('black'));
    expect(hsla).toEqual([NaN, 0, 0, 1]);
  });

  test('default mode of rgb', () => {
    expect(rgb([255, 0, 0])).toEqual(rgb([255, 0, 0], 'rgb'));
  });

  test('num color', () => {
    expect(toHex(num(0xff0000))).toEqual('#ff0000');
    expect(toNum(num(0xff0000))).toEqual(0xff0000);

    expect(toHex(num(0x000000))).toEqual('#000000');
    expect(toNum(num(0xff0000))).toEqual(0xff0000);

    expect(toHex(num(0xffffff))).toEqual('#ffffff');
    expect(toNum(num(0xffffff))).toEqual(0xffffff);

    expect(toHex(num(0x31ff98))).toEqual('#31ff98');
    expect(toNum(num(0x31ff98))).toEqual(0x31ff98);

    expect(toNum(named('red'))).toEqual(0xff0000);
  });
});
