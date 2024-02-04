import { isValidName } from '../../valid';
import { hsl2rgb } from '../hsl/hsl2rgb';
import { name2rgb } from '../named/name2rgb';

const RE_RGB = /^rgb\(\s*(-?\d+)\s*(?:,\s*)?(-?\d+)\s*(?:,\s*)?(-?\d+)\s*\)$/;
const RE_RGBA =
  /^rgba\(\s*(-?\d+)\s*(?:,\s*)?(-?\d+)\s*(?:,\s*)?(-?\d+)\s*(?:,\s*)?([01]|[01]?\.\d+)\)$/;
const RE_RGB_PCT =
  /^rgb\(\s*(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_RGBA_PCT =
  /^rgba\(\s*(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?([01]|[01]?\.\d+)\)$/;
const RE_HSL =
  /^hsl\(\s*(-?\d+(?:\.\d+)?)\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_HSLA =
  /^hsla\(\s*(-?\d+(?:\.\d+)?)\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?(-?\d+(?:\.\d+)?)%\s*(?:,\s*)?([01]|[01]?\.\d+)\)$/;

/**
 * @param css string
 */
export const css2rgb = css => {
  css = css.toLowerCase().trim();

  if (!css2rgb.test(css)) {
    throw new Error(`invalid argument: "${css}"`);
  }

  let m;

  // rgb(250 20 0)
  if ((m = css.match(RE_RGB))) {
    const rgb = m.slice(1, 4).map(Number);
    for (let i = 0; i < 3; i++) {
      rgb[i] = rgb[i];
    }
    rgb[3] = 1;
    return rgb;
  }

  // rgba(250 20 0 0.4)
  if ((m = css.match(RE_RGBA))) {
    const rgba = m.slice(1, 5).map(Number);
    for (let i = 0; i < 4; i++) {
      rgba[i] = rgba[i];
    }
    return rgba;
  }

  // rgb(100% 0% 0%)
  if ((m = css.match(RE_RGB_PCT))) {
    const rgb = m.slice(1, 4).map(Number);
    for (let i = 0; i < 3; i++) {
      rgb[i] = Math.round(rgb[i] * 2.55);
    }
    rgb[3] = 1;
    return rgb;
  }

  // rgba(100% 0% 0% 0.4)
  if ((m = css.match(RE_RGBA_PCT))) {
    const rgba = m.slice(1, 5).map(Number);
    for (let i = 0; i < 3; i++) {
      rgba[i] = Math.round(rgba[i] * 2.55);
    }
    return rgba;
  }

  // hsl(0 100% 50%)
  if ((m = css.match(RE_HSL))) {
    const hsl = m.slice(1, 4).map(Number);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    return hsl2rgb(hsl);
  }

  // hsla(0 100% 50% 0.5)
  if ((m = css.match(RE_HSLA))) {
    const hsl = m.slice(1, 4).map(Number);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    const rgb = hsl2rgb(hsl);
    rgb[3] = Number(m[4]); // default alpha = 1
    return rgb;
  }

  if (isValidName(css)) {
    return name2rgb(css);
  }
};

css2rgb.test = s => {
  return (
    RE_RGB.test(s) ||
    RE_RGBA.test(s) ||
    RE_RGB_PCT.test(s) ||
    RE_RGBA_PCT.test(s) ||
    RE_HSL.test(s) ||
    RE_HSLA.test(s) ||
    isValidName(s)
  );
};
