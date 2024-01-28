import { bezier } from '../src/generator/bezier';
import { scale } from '../src/generator/scale';
import { toHex } from '../src/io/hex';
import { named } from '../src/io/named';

describe('bezier()', () => {
  test('simple two color linear interpolation', () => {
    const b = bezier(['white', 'black'].map(named));
    expect(toHex(b(0))).toEqual('#ffffff');
    expect(toHex(b(0.5))).toEqual('#777777');
    expect(toHex(b(1))).toEqual('#000000');
  });

  test('three color quadratic bezier interpolation', () => {
    const b = bezier(['white', 'red', 'black'].map(named));
    expect(toHex(b(0))).toEqual('#ffffff');
    expect(toHex(b(0.5))).toEqual('#c45c44');
    expect(toHex(b(1))).toEqual('#000000');
  });

  test('four color cubic bezier interpolation', () => {
    const b = bezier(['white', 'yellow', 'red', 'black'].map(named));
    expect(toHex(b(0))).toEqual('#ffffff');
    expect(toHex(b(0.25))).toEqual('#ffe085');
    expect(toHex(b(0.5))).toEqual('#e69735');
    expect(toHex(b(0.75))).toEqual('#914213');
    expect(toHex(b(1))).toEqual('#000000');
  });

  test('five color diverging quadratic bezier interpolation', () => {
    const b = bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue'].map(named));
    expect(toHex(b(0))).toEqual('#8b0000');
    expect(toHex(b(0.25))).toEqual('#dd8d49');
    expect(toHex(b(0.5))).toEqual('#dfcb98');
    expect(toHex(b(0.75))).toEqual('#a7c1bd');
    expect(toHex(b(1))).toEqual('#4169e1');
  });

  test('using bezier in a chroma.scale', () => {
    const b = bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue'].map(named));
    const s = scale(b).domain([0, 1]);

    expect(toHex(s(0))).toEqual('#8b0000');
    expect(toHex(s(0.25))).toEqual('#dd8d49');
    expect(toHex(s(0.5))).toEqual('#dfcb98');
    expect(toHex(s(0.75))).toEqual('#a7c1bd');
    expect(toHex(s(1))).toEqual('#4169e1');
  });
});
