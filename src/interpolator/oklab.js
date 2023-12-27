import { oklab as oklabColor } from '../io/oklab';

export const oklab = (col1, col2, f) => {
  const xyz0 = col1.oklab();
  const xyz1 = col2.oklab();
  return oklabColor(
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2]),
  );
};
