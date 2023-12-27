import { lab as labColor, toLab } from '../io/lab';

export const lab = (col1, col2, f) => {
  const xyz0 = toLab(col1);
  const xyz1 = toLab(col2);
  return labColor(
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2]),
  );
};
