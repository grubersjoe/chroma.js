import { fromMode, toMode } from '../io/mode';

export const set = function (color, mc, value, mutate = false) {
  const [mode, channel] = mc.split('.');
  const src = toMode(color, mode);
  if (channel) {
    const i = mode.indexOf(channel) - (mode.substring(0, 2) === 'ok' ? 2 : 0);
    if (i > -1) {
      if (typeof value === 'string') {
        switch (value.charAt(0)) {
          case '+':
            src[i] += +value;
            break;
          case '-':
            src[i] += +value;
            break;
          case '*':
            src[i] *= +value.substring(1);
            break;
          case '/':
            src[i] /= +value.substring(1);
            break;
          default:
            src[i] = +value;
        }
      } else if (typeof value === 'number') {
        src[i] = value;
      } else {
        throw new Error(`unsupported value for Color.set`);
      }
      const out = fromMode(src, mode);
      if (mutate) {
        color._rgb = out._rgb;
        return color;
      }
      return out;
    }
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  } else {
    return src;
  }
};
