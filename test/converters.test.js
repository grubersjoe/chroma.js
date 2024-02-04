import { w3cx11 } from '../src/colors/w3cx11.js';
import { cmyk, toCmyk } from '../src/io/cmyk';
import { css, toCss } from '../src/io/css';
import { gl, toGl } from '../src/io/gl';
import { hex, toHex } from '../src/io/hex';
import { hsi, toHsi } from '../src/io/hsi';
import { hsl, toHsl } from '../src/io/hsl';
import { hsv, toHsv } from '../src/io/hsv';
import { lab, toLab } from '../src/io/lab';
import { lch, toLch } from '../src/io/lch';
import { named, toName } from '../src/io/named';
import { num, toNum } from '../src/io/num';
import { oklab, toOklab } from '../src/io/oklab';
import { oklch, toOklch } from '../src/io/oklch';
import { rgb, toRgb } from '../src/io/rgb';

describe('converters', () => {
  for (const input of Object.values(w3cx11)) {
    const c = hex(input);

    test(`${input} - to cmyk and back`, () => {
      expect(toHex(cmyk(toCmyk(c)))).toStrictEqual(input);
    });

    test(`${input} - to css and back`, () => {
      expect(toHex(css(toCss(c)))).toStrictEqual(input);
    });

    test(`${input} - to gl and back`, () => {
      expect(toHex(gl(toGl(c)))).toStrictEqual(input);
    });

    test(`${input} - to hsi and back`, () => {
      expect(toHex(hsi(toHsi(c)))).toStrictEqual(input);
    });

    test(`${input} - to hsl and back`, () => {
      expect(toHex(hsl(toHsl(c)))).toStrictEqual(input);
    });

    test(`${input} - to hsv and back`, () => {
      expect(toHex(hsv(toHsv(c)))).toStrictEqual(input);
    });

    test(`${input} - to lab and back`, () => {
      expect(toHex(lab(toLab(c)))).toStrictEqual(input);
    });

    test(`${input} - to lch and back`, () => {
      expect(toHex(lch(toLch(c)))).toStrictEqual(input);
    });

    test(`${input} - to name and back`, () => {
      expect(toHex(named(toName(c)))).toStrictEqual(input);
    });

    test(`${input} - to num and back`, () => {
      expect(toHex(num(toNum(c)))).toStrictEqual(input);
    });

    test(`${input} - to oklab and back`, () => {
      expect(toHex(oklab(toOklab(c)))).toStrictEqual(input);
    });

    test(`${input} - to oklch and back`, () => {
      expect(toHex(oklch(toOklch(c)))).toStrictEqual(input);
    });

    test(`${input} - to rgb and back`, () => {
      expect(toHex(rgb(toRgb(c)))).toStrictEqual(input);
    });
  }
});
