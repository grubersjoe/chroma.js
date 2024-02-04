import { bezier } from '../src/generator/bezier';
import { scale } from '../src/generator/scale';
import { toHex } from '../src/io/hex';
import { named } from '../src/io/named';

describe('bezier()', () => {
  test('simple two color linear interpolation', () => {
    const b = bezier(['white', 'black'].map(named));
    expect(toHex(b(0))).toStrictEqual('#ffffff');
    expect(toHex(b(0.5))).toStrictEqual('#777777');
    expect(toHex(b(1))).toStrictEqual('#000000');
  });

  test('three color quadratic bezier interpolation', () => {
    const b = bezier(['white', 'red', 'black'].map(named));
    expect(toHex(b(0))).toStrictEqual('#ffffff');
    expect(toHex(b(0.5))).toStrictEqual('#c45c44');
    expect(toHex(b(1))).toStrictEqual('#000000');
  });

  test('four color cubic bezier interpolation', () => {
    const b = bezier(['white', 'yellow', 'red', 'black'].map(named));
    expect(toHex(b(0))).toStrictEqual('#ffffff');
    expect(toHex(b(0.25))).toStrictEqual('#ffe085');
    expect(toHex(b(0.5))).toStrictEqual('#e69735');
    expect(toHex(b(0.75))).toStrictEqual('#914213');
    expect(toHex(b(1))).toStrictEqual('#000000');
  });

  test('five color diverging quadratic bezier interpolation', () => {
    const b = bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue'].map(named));
    expect(toHex(b(0))).toStrictEqual('#8b0000');
    expect(toHex(b(0.25))).toStrictEqual('#dd8d49');
    expect(toHex(b(0.5))).toStrictEqual('#dfcb98');
    expect(toHex(b(0.75))).toStrictEqual('#a7c1bd');
    expect(toHex(b(1))).toStrictEqual('#4169e1');
  });

  test('using bezier in a chroma.scale', () => {
    const b = bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue'].map(named));
    const s = scale(b).domain([0, 1]);

    expect(toHex(s(0))).toStrictEqual('#8b0000');
    expect(toHex(s(0.25))).toStrictEqual('#dd8d49');
    expect(toHex(s(0.5))).toStrictEqual('#dfcb98');
    expect(toHex(s(0.75))).toStrictEqual('#a7c1bd');
    expect(toHex(s(1))).toStrictEqual('#4169e1');
  });
});
