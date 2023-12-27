import { hex } from '../io/hex';

const digits = '0123456789abcdef';

const { floor } = Math;

export const random = () => {
  let code = '#';
  for (let i = 0; i < 6; i++) {
    code += digits.charAt(floor(Math.random() * 16));
  }
  return hex(code);
};
