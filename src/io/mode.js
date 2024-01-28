import { css, toCss } from './css';
import { gl, toGl } from './gl';
import { hcv, toHcv } from './hcv';
import { hex, toHex } from './hex';
import { hsi, toHsi } from './hsi';
import { hsl, toHsl } from './hsl';
import { hsv, toHsv } from './hsv';
import { lab, toLab } from './lab';
import { lch, toLch } from './lch';
import { named, toName } from './named';
import { num, toNum } from './num';
import { oklab, toOklab } from './oklab';
import { oklch, toOklch } from './oklch';
import { rgb, toRgb, toRgba } from './rgb';
import { temp, toTemp } from './temp';

export const fromMode = (args, mode) => {
  switch (mode) {
    case 'css':
      return css(args);
    case 'gl':
      return gl(args);
    case 'hcv':
      return hcv(args);
    case 'hex':
      return hex(args);
    case 'hsi':
      return hsi(args);
    case 'hsl':
      return hsl(args);
    case 'hsv':
      return hsv(args);
    case 'lab':
      return lab(args);
    case 'lch':
      return lch(args);
    case 'name':
      return named(args);
    case 'num':
      return num(args);
    case 'oklab':
      return oklab(args);
    case 'oklch':
      return oklch(args);
    case 'rgb':
      return rgb(args);
    case 'temp':
      return temp(args);
    default:
      throw new Error(`unknown format: ${mode}`);
  }
};

/**
 *
 * @param color Color
 * @param mode string
 */
export const toMode = (color, mode) => {
  switch (mode) {
    case 'css':
      return toCss(color);
    case 'gl':
      return toGl(color);
    case 'hcv':
      return toHcv(color);
    case 'hex':
      return toHex(color);
    case 'hsi':
      return toHsi(color);
    case 'hsl':
      return toHsl(color);
    case 'hsv':
      return toHsv(color);
    case 'lab':
      return toLab(color);
    case 'lch':
      return toLch(color);
    case 'name':
      return toName(color);
    case 'num':
      return toNum(color);
    case 'oklab':
      return toOklab(color);
    case 'oklch':
      return toOklch(color);
    case 'rgb':
      return toRgb(color);
    case 'rgba':
      return toRgba(color);
    case 'temp':
      return toTemp(color);
    default:
      return color;
  }
};
