import { toHcv } from '../io/hcv/index.js';
import { toHsi } from '../io/hsi/index.js';
import { toHsl } from '../io/hsl/index.js';
import { toHsv } from '../io/hsv/index.js';
import { toHcl } from '../io/lch/index.js';
import { fromMode } from '../io/mode';
import { oklch, toOklch } from '../io/oklch';

export const interpolateHsx = (col1, col2, f, mode) => {
  let xyz0, xyz1;
  if (mode === 'hsl') {
    xyz0 = toHsl(col1);
    xyz1 = toHsl(col2);
  } else if (mode === 'hsv') {
    xyz0 = toHsv(col1);
    xyz1 = toHsv(col2);
  } else if (mode === 'hcv') {
    xyz0 = toHcv(col1);
    xyz1 = toHcv(col2);
  } else if (mode === 'hsi') {
    xyz0 = toHsi(col1);
    xyz1 = toHsi(col2);
  } else if (mode === 'lch' || mode === 'hcl') {
    mode = 'hcl';
    xyz0 = toHcl(col1);
    xyz1 = toHcl(col2);
  } else if (mode === 'oklch') {
    xyz0 = toOklch(col1).reverse();
    xyz1 = toOklch(col2).reverse();
  }

  let hue0, hue1, sat0, sat1, lbv0, lbv1;
  if (mode.substring(0, 1) === 'h' || mode === 'oklch') {
    [hue0, sat0, lbv0] = xyz0;
    [hue1, sat1, lbv1] = xyz1;
  }

  let sat, hue, lbv, dh;

  if (!isNaN(hue0) && !isNaN(hue1)) {
    // both colors have hue
    if (hue1 > hue0 && hue1 - hue0 > 180) {
      dh = hue1 - (hue0 + 360);
    } else if (hue1 < hue0 && hue0 - hue1 > 180) {
      dh = hue1 + 360 - hue0;
    } else {
      dh = hue1 - hue0;
    }
    hue = hue0 + f * dh;
  } else if (!isNaN(hue0)) {
    hue = hue0;
    if ((lbv1 === 1 || lbv1 === 0) && mode !== 'hsv') sat = sat0;
  } else if (!isNaN(hue1)) {
    hue = hue1;
    if ((lbv0 === 1 || lbv0 === 0) && mode !== 'hsv') sat = sat1;
  } else {
    hue = Number.NaN;
  }

  if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
  lbv = lbv0 + f * (lbv1 - lbv0);

  if (mode === 'oklch') {
    return oklch([lbv, sat, hue]);
  }

  return fromMode([hue, sat, lbv], mode);
};
