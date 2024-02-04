import { deltaE } from '../src/delta-e';
import { num } from '../src/io/num';

describe('deltaE()', () => {
  const tests = [
    ['no difference', [num(0x000000), num(0x000000)], 0],
    ['max difference', [num(0xffffff), num(0x000000)], 100],
    ['red green', [num(0xff0000), num(0x00ff00)], 86.6082374535373],
    ['green red', [num(0x00ff00), num(0xff0000)], 86.6082374535373],
    ['beef', [num(0x00beef), num(0xbeef00)], 56.75641476716213],
    ['similar', [num(0xededee), num(0xedeeed)], 1.3211081906645834],
    ['similarish', [num(0xececee), num(0xeceeec)], 2.601879624602976],
    ['less similar', [num(0xe9e9ee), num(0xe9eee9)], 6.220878841368716],
    ['less similarish', [num(0xe4e4ee), num(0xe4eee4)], 11.598175546813964],
    ['not very similar', [num(0xe0e0ee), num(0xe0eee0)], 15.391371803506503],
  ];

  test.each(tests)('%s', (name, input, expected) => {
    expect(deltaE(input[0], input[1])).toBeCloseTo(expected, 10);
  });
});
