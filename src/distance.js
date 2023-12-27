import { get } from './ops/get';

/**
 * @param col1 Color
 * @param col2 Color
 * @param mode string
 * @returns {number}
 */
export const distance = function (col1, col2, mode = 'lab') {
  // Delta E (CIE 1976)
  // see http://www.brucelindbloom.com/index.html?Equations.html
  const l1 = get(col1, mode);
  const l2 = get(col2, mode);
  let sum_sq = 0;
  for (let i in l1) {
    const d = (l1[i] || 0) - (l2[i] || 0);
    sum_sq += d * d;
  }
  return Math.sqrt(sum_sq);
};
