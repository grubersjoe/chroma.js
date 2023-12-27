import { brewer } from './io/brewer';
import { cmyk } from './io/cmyk';
import { css } from './io/css';
import { gl } from './io/gl';
import { hcg } from './io/hcg';
import { hex } from './io/hex';
import { hsi } from './io/hsi';
import { hsl } from './io/hsl';
import { hsv } from './io/hsv';
import { lab } from './io/lab';
import { lch } from './io/lch';
import { named } from './io/named';
import { num } from './io/num';
import { oklab } from './io/oklab';
import { oklch } from './io/oklch';
import { rgb } from './io/rgb';
import { temp } from './io/temp';

export function isValidBrewer(arg) {
  try {
    return Boolean(brewer(arg));
  } catch {
    return false;
  }
}

export function isValidCmyk(arg) {
  try {
    return Boolean(cmyk(arg));
  } catch {
    return false;
  }
}

export function isValidCss(arg) {
  try {
    return Boolean(css(arg));
  } catch {
    return false;
  }
}

export function isValidGl(arg) {
  try {
    return Boolean(gl(arg));
  } catch {
    return false;
  }
}

export function isValidHcg(arg) {
  try {
    return Boolean(hcg(arg));
  } catch {
    return false;
  }
}

export function isValidHex(arg) {
  try {
    return Boolean(hex(arg));
  } catch {
    return false;
  }
}

export function isValidHsi(arg) {
  try {
    return Boolean(hsi(arg));
  } catch {
    return false;
  }
}

export function isValidHsl(arg) {
  try {
    return Boolean(hsl(arg));
  } catch {
    return false;
  }
}

export function isValidHsv(arg) {
  try {
    return Boolean(hsv(arg));
  } catch {
    return false;
  }
}

export function isValidLab(arg) {
  try {
    return Boolean(lab(arg));
  } catch {
    return false;
  }
}

export function isValidLch(arg) {
  try {
    return Boolean(lch(arg));
  } catch {
    return false;
  }
}

export function isValidName(arg) {
  try {
    return Boolean(named(arg));
  } catch {
    return false;
  }
}

export function isValidNum(arg) {
  try {
    return Boolean(num(arg));
  } catch {
    return false;
  }
}

export function isValidOklab(arg) {
  try {
    return Boolean(oklab(arg));
  } catch {
    return false;
  }
}

export function isValidOklch(arg) {
  try {
    return Boolean(oklch(arg));
  } catch {
    return false;
  }
}

export function isValidRgb(arg) {
  try {
    return Boolean(rgb(arg));
  } catch {
    return false;
  }
}

export function isValidTemp(arg) {
  try {
    return Boolean(temp(arg));
  } catch {
    return false;
  }
}
