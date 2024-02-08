// Corresponds roughly to RGB brighter/darker
const Kn = 18;

// D65 standard referent
const Xn = 0.95047;
const Yn = 1;
const Zn = 1.08883;

const t0 = 4 / 29;
const t1 = 6 / 29;
const t2 = 3 * Math.pow(t1, 2);
const t3 = Math.pow(t1, 3);

export const LAB = {
  Kn,
  Xn,
  Yn,
  Zn,
  t0,
  t1,
  t2,
  t3,
};
