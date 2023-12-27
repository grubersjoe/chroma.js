import { scale } from './generator/scale';
import { hex } from './io/hex';
import { hsl } from './io/hsl';

export const scales = {
  cool: scale([hsl(180, 1, 0.9), hsl(250, 0.7, 0.4)]),
  hot: scale(['#000', '#f00', '#ff0', '#fff'].map(hex), [0, 0.25, 0.75, 1]).mode('rgb'),
};
