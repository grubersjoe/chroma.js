import { num as numColor, toNum } from '../io/num';

export const num = (col1, col2, f) => {
  const c1 = toNum(col1);
  const c2 = toNum(col2);
  return numColor(c1 + f * (c2 - c1), 'num');
};
