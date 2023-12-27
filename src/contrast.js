import { luminance } from './ops/luminance';

/**
 * @param col1 Color
 * @param col2 Color
 * @returns {number}
 */
export const contrast = (col1, col2) => {
  // WCAG contrast ratio
  // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  const l1 = luminance(col1);
  const l2 = luminance(col2);
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};
