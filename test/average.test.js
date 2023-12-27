import { get, lch, rgb } from '../index';
import { average } from '../src/generator/average';
import { mix } from '../src/generator/mix';
import { css } from '../src/io/css';
import { hex, toHex } from '../src/io/hex';
import { named } from '../src/io/named';
import { toRgba } from '../src/io/rgb';

describe('average', () => {
  test('average colors', () => {
    const c = ['red', 'blue'].map(named);
    expect(average(c)).toEqual(mix(...c));
  });

  test('three colors', () => {
    const a = average(['blue', 'red', 'white'].map(named), 'rgb');
    expect(toHex(a)).toEqual('#aa55aa');
  });

  test('alpha average', () => {
    const a = average([css('rgba(0 0 0 0)'), named('red')], 'rgb');
    expect(toRgba(a)).toEqual([128, 0, 0, 0.5]);
    expect(toRgba(a, false)).toEqual([127.5, 0, 0, 0.5]);
  });

  test('average in lab', () => {
    const a = average(['blue', 'red', 'white'].map(named), 'lab');
    expect(toHex(a)).toEqual('#e26daf');
  });

  test('average h in lch', () => {
    const a = average([lch(50, 50, 0), lch(50, 50, 90)], 'lch');
    expect(get(a, 'lch.h')).toBeCloseTo(45, 4);
  });

  test('average of same colors', () => {
    const c = hex('#e3c329');
    const a = average([c, c]);
    expect(a).toEqual(c);
  });

  test('average in hsl of same colors', () => {
    const c = hex('#02c03a');
    const a = average([c, c], 'hsl');
    expect(a).toEqual(c);
  });

  test('lrgb average', () => {
    const c = [
      [125, 133, 127],
      [131, 127, 134],
      [138, 121, 141],
      [144, 114, 147],
      [149, 107, 153],
      [165, 83, 170],
      [160, 92, 164],
      [170, 73, 175],
      [175, 62, 180],
      [155, 100, 159],
    ].map(c => rgb(c));

    const a = average(c, 'lrgb');
    expect(toHex(a)).toEqual('#98689c');
  });

  test('three colors, weighted rgb average', () => {
    const a = average(['blue', 'red', 'white'].map(named), 'rgb', [1, 1, 2]);
    expect(toHex(a)).toEqual('#bf80bf');
  });

  test('three colors, weighted lrgb average', () => {
    const a = average(['blue', 'red', 'white'].map(named), 'lrgb', [1, 3, 2]);
    expect(toHex(a)).toEqual('#e993b4');
  });

  test('three colors, weighted hsl average', () => {
    const a = average(['blue', 'red', 'white'].map(named), 'hsl', [0.25, 1, 0.5]);
    expect(toHex(a)).toEqual('#e58263');
  });
});
