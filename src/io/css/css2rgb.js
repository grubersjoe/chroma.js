import { hsl2rgb } from '../hsl/hsl2rgb';

const RE_RGB = /^rgb\(\s*(-?\d+) \s*(-?\d+)\s* \s*(-?\d+)\s*\)$/;
const RE_RGBA = /^rgba\(\s*(-?\d+) \s*(-?\d+)\s* \s*(-?\d+)\s* \s*([01]|[01]?\.\d+)\)$/;
const RE_RGB_PCT =
  /^rgb\(\s*(-?\d+(?:\.\d+)?)% \s*(-?\d+(?:\.\d+)?)%\s* \s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_RGBA_PCT =
  /^rgba\(\s*(-?\d+(?:\.\d+)?)% \s*(-?\d+(?:\.\d+)?)%\s* \s*(-?\d+(?:\.\d+)?)%\s* \s*([01]|[01]?\.\d+)\)$/;
const RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?) \s*(-?\d+(?:\.\d+)?)%\s* \s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_HSLA =
  /^hsla\(\s*(-?\d+(?:\.\d+)?) \s*(-?\d+(?:\.\d+)?)%\s* \s*(-?\d+(?:\.\d+)?)%\s* \s*([01]|[01]?\.\d+)\)$/;

const { round } = Math;

/**
 * @param css string
 */
export const css2rgb = css => {
  if (!css2rgb.test(css)) {
    throw new Error(`invalid argument: "${css}"`);
  }

  css = css.toLowerCase().trim();
  let m;

  // rgb(250,20,0)
  if ((m = css.match(RE_RGB))) {
    const rgb = m.slice(1, 4);
    for (let i = 0; i < 3; i++) {
      rgb[i] = +rgb[i];
    }
    return rgb;
  }

  // rgba(250,20,0,0.4)
  if ((m = css.match(RE_RGBA))) {
    const rgb = m.slice(1, 5);
    for (let i = 0; i < 4; i++) {
      rgb[i] = +rgb[i];
    }
    return rgb;
  }

  // rgb(100%,0%,0%)
  if ((m = css.match(RE_RGB_PCT))) {
    const rgb = m.slice(1, 4);
    for (let i = 0; i < 3; i++) {
      rgb[i] = round(rgb[i] * 2.55);
    }
    return rgb;
  }

  // rgba(100%,0%,0%,0.4)
  if ((m = css.match(RE_RGBA_PCT))) {
    const rgb = m.slice(1, 5);
    for (let i = 0; i < 3; i++) {
      rgb[i] = round(rgb[i] * 2.55);
    }
    return rgb;
  }

  // hsl(0,100%,50%)
  if ((m = css.match(RE_HSL))) {
    const hsl = m.slice(1, 4);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    return hsl2rgb(hsl);
  }

  // hsla(0,100%,50%,0.5)
  if ((m = css.match(RE_HSLA))) {
    const hsl = m.slice(1, 4);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    const rgb = hsl2rgb(hsl);
    rgb[3] = m[4]; // default alpha = 1
    return rgb;
  }
};

css2rgb.test = s => {
  return (
    RE_RGB.test(s) ||
    RE_RGBA.test(s) ||
    RE_RGB_PCT.test(s) ||
    RE_RGBA_PCT.test(s) ||
    RE_HSL.test(s) ||
    RE_HSLA.test(s)
  );
};
