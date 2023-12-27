import { Color } from '../src/color';
import { scale } from '../src/generator/scale.js';
import { brewer } from '../src/io/brewer';
import { css, toCss } from '../src/io/css';
import { hex, toHex } from '../src/io/hex';
import { named } from '../src/io/named';
import { rgb } from '../src/io/rgb';
import { alpha } from '../src/ops/alpha';

describe('scale()', () => {
  test('input validation', () => {
    const c = rgb(255, 0, 0);
    expect(scale).toThrow();
    expect(scale.bind(null, 'not a color')).toThrow();
    expect(scale.bind(null, c)).not.toThrow();
    expect(scale.bind(null, [])).toThrow();
    expect(scale.bind(null, [c])).not.toThrow();
  });

  test('simple rgb scale (white-->black)', () => {
    const s = scale([named('white'), named('black')]);
    expect(toHex(s(0))).toEqual('#ffffff');
    expect(toHex(s(0.5))).toEqual('#808080');
    expect(toHex(s(1))).toEqual('#000000');
  });

  test('simple hsv scale (white-->black)', () => {
    const s = scale([named('white'), named('black')]).mode('hsv');
    expect(toHex(s(0))).toEqual('#ffffff');
    expect(toHex(s(0.5))).toEqual('#808080');
    expect(toHex(s(1))).toEqual('#000000');
    expect(toHex(s.colors())).toEqual(['#ffffff', '#000000']);
    expect(toHex(s.colors(2))).toEqual(['#ffffff', '#000000']);
    expect(s.colors(2, null)).toHaveLength(2);
  });

  test('simple hsv scale (white-->black), classified', () => {
    const s = scale([named('white'), named('black')])
      .classes(7)
      .mode('hsv');
    expect(toHex(s(0))).toEqual('#ffffff');
    expect(toHex(s(0.5))).toEqual('#808080');
    expect(toHex(s(1))).toEqual('#000000');
    expect(toHex(s.colors(7))).toEqual([
      '#ffffff',
      '#d5d5d5',
      '#aaaaaa',
      '#808080',
      '#555555',
      '#2a2a2a',
      '#000000',
    ]);
  });

  test('simple lab scale (white-->black)', () => {
    const s = scale([named('white'), named('black')]).mode('lab');
    expect(toHex(s(0))).toEqual('#ffffff');
    expect(toHex(s(0.5))).toEqual('#777777');
    expect(toHex(s(1))).toEqual('#000000');
  });

  test('colorbrewer scale', () => {
    const s = scale(brewer('RdYlGn'));
    expect(toHex(s(0))).toEqual('#a50026');
    expect(toHex(s(0.5))).toEqual('#ffffbf');
    expect(toHex(s(1))).toEqual('#006837');
  });

  test('colorbrewer scale domained', () => {
    const s = scale(brewer('RdYlGn')).domain([0, 100]);
    expect(toHex(s(0))).toEqual('#a50026');
    expect(toHex(s(10))).not.toEqual('#ffffbf');
    expect(toHex(s(50))).toEqual('#ffffbf');
    expect(toHex(s(100))).toEqual('#006837');
  });

  test('colorbrewer scale - lowercase', () => {
    const s = scale(brewer('rdylgn'));
    expect(toHex(s(0))).toEqual('#a50026');
    expect(toHex(s(0.5))).toEqual('#ffffbf');
    expect(toHex(s(1))).toEqual('#006837');
  });

  test('colorbrewer scale - domained - classified', () => {
    const s = scale(brewer('RdYlGn')).domain([0, 100]).classes(5);
    expect(toHex(s(0))).toEqual('#a50026');
    expect(toHex(s(50))).toEqual('#ffffbf');
    expect(toHex(s(100))).toEqual('#006837');
    expect(toHex(s.colors(5))).toEqual(['#a50026', '#f98e52', '#ffffbf', '#86cb67', '#006837']);
  });

  test('calling domain with not arguments', () => {
    const s = scale(brewer('RdYlGn')).domain([0, 100]).classes(5);
    expect(s.domain()).toEqual([0, 100]);
    expect(s.classes()).toEqual([0, 20, 40, 60, 80, 100]);
  });

  test('source array keeps untouched', () => {
    const c = brewer('Blues');
    expect(c).toHaveLength(9);
    expect(c[0]).toBeInstanceOf(Color);
    expect(() => scale(c)).not.toThrow();
    expect(c[0]).toBeInstanceOf(Color);
  });

  test('domain with same min and max', () => {
    const s = scale([named('white'), named('black')]).domain([1, 1]);
    expect(toHex(s(1))).toEqual('#000000');
  });

  test('simple num scale (white-->black)', () => {
    const s = scale([named('white'), named('black')]).mode('num');
    expect(toHex(s(0))).toEqual('#ffffff');
    expect(toHex(s(0.25))).toEqual('#bfffff');
    expect(toHex(s(0.5))).toEqual('#7fffff');
    expect(toHex(s(0.75))).toEqual('#3fffff');
    expect(toHex(s(0.95))).toEqual('#0ccccc');
    expect(toHex(s(1))).toEqual('#000000');
  });

  test('css rgb colors have rounded rgb() values', () => {
    const c = toCss(scale(brewer('YlGnBu'))(0.3));
    expect(c).toEqual('rgb(170 222 183)');
  });

  test('css rgba colors dont round alpha value', () => {
    const s = scale(brewer('YlGnBu'))(0.3);
    const c = toCss(alpha(s, 0.675));
    expect(c).toEqual('rgba(170 222 183 0.675)');
  });

  test('get colors from scale', () => {
    const s = scale(['yellow', 'darkgreen'].map(named));
    expect(toHex(s.colors())).toEqual(['#ffff00', '#006400']);
    expect(toHex(s.colors(5))).toEqual(['#ffff00', '#bfd800', '#80b200', '#408b00', '#006400']);
    expect(toCss(s.colors(3, 'css'))).toEqual(['rgb(255 255 0)', 'rgb(128 178 0)', 'rgb(0 100 0)']);
  });

  test('get colors from a scale with more than two colors', () => {
    const s = scale(['yellow', 'orange', 'darkgreen'].map(named));
    expect(toHex(s.colors())).toEqual(['#ffff00', '#ffa500', '#006400']);
  });

  test('test example in README', () => {
    const s = scale(brewer('RdYlGn'));
    expect(toHex(s.colors(5))).toEqual(['#a50026', '#f98e52', '#ffffbf', '#86cb67', '#006837']);
  });

  test('scale padding, simple', () => {
    const s = scale(brewer('RdYlBu')).padding(0.15);
    expect(toHex(s(0))).toEqual('#e64f35');
    expect(toHex(s(0.5))).toEqual('#ffffbf');
    expect(toHex(s(1))).toEqual('#5d91c3');
  });

  test('scale padding, one-sided', () => {
    const s = scale(brewer('OrRd')).padding([0.2, 0]);
    expect(toHex(s(0))).toEqual('#fddcaf');
    expect(toHex(s(0.5))).toEqual('#f26d4b');
    expect(toHex(s(1))).toEqual('#7f0000');
  });

  test('colors return original colors', () => {
    const s = scale(['red', 'white', 'blue'].map(named));
    expect(toHex(s.colors())).toEqual(['#ff0000', '#ffffff', '#0000ff']);
  });

  test('scale with one color', () => {
    const s = scale(named('red'));
    expect(toHex(s(0.3))).toEqual('#ff0000');
  });

  test('scale() no data color', () => {
    const s = scale(brewer('OrRd'));
    expect(toHex(s(null))).toEqual('#cccccc');
    expect(toHex(s(undefined))).toEqual('#cccccc');
    expect(toHex(s.nodata(hex('#eee'))(null))).toEqual('#eeeeee');
  });

  test('scale wrapped in a scale', () => {
    const s1 = scale(brewer('OrRd'));
    const s = scale(brewer('OrRd')).domain([0, 0.25, 1]);
    expect(s(0)).toEqual(s1(0));
    expect(s(1)).toEqual(s1(1));
    expect(s(0.125)).toEqual(s1(0.25));
    expect(s(0.25)).toEqual(s1(0.5));
    expect(s(0.625)).toEqual(s1(0.75));
  });
});
