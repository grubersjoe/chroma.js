// interpolates between a set of colors using a bezier spline
import { lab, toLab } from '../io/lab';
import { scale } from './scale';

// nth row of the pascal triangle
const binom_row = function (n) {
  let row = [1, 1];
  for (let i = 1; i < n; i++) {
    const newRow = [1];
    for (let j = 1; j <= row.length; j++) {
      newRow[j] = (row[j] || 0) + row[j - 1];
    }
    row = newRow;
  }
  return row;
};

/**
 * @param colors Color[]
 */
const _bezier = function (colors) {
  let I, lab0, lab1, lab2;
  if (colors.length === 2) {
    // linear interpolation
    [lab0, lab1] = colors.map(c => toLab(c));
    I = function (t) {
      const l = [0, 1, 2].map(i => lab0[i] + t * (lab1[i] - lab0[i]));
      return lab(l);
    };
  } else if (colors.length === 3) {
    // quadratic bezier interpolation
    [lab0, lab1, lab2] = colors.map(c => toLab(c));
    I = function (t) {
      const l = [0, 1, 2].map(
        i => (1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i],
      );
      return lab(l);
    };
  } else if (colors.length === 4) {
    // cubic bezier interpolation
    let lab3;
    [lab0, lab1, lab2, lab3] = colors.map(c => toLab(c));
    I = function (t) {
      const l = [0, 1, 2].map(
        i =>
          (1 - t) * (1 - t) * (1 - t) * lab0[i] +
          3 * (1 - t) * (1 - t) * t * lab1[i] +
          3 * (1 - t) * t * t * lab2[i] +
          t * t * t * lab3[i],
      );
      return lab(l);
    };
  } else if (colors.length >= 5) {
    // general case (degree n bezier)
    let labs, row, n;
    labs = colors.map(c => toLab(c));
    n = colors.length - 1;
    row = binom_row(n);
    I = function (t) {
      const u = 1 - t;
      const l = [0, 1, 2].map(i =>
        labs.reduce((sum, el, j) => sum + row[j] * u ** (n - j) * t ** j * el[i], 0),
      );
      return lab(l);
    };
  } else {
    throw new RangeError('No point in running bezier with only one color.');
  }
  return I;
};

export const bezier = colors => {
  const f = _bezier(colors);
  f.scale = () => scale(f);
  return f;
};
