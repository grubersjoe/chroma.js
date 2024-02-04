import { contrast } from '../src/contrast';
import { named } from '../src/io/named';

describe('contrast()', () => {
  test('maximum contrast', () => {
    expect(contrast(named('black'), named('white'))).toStrictEqual(21);
    expect(contrast(named('white'), named('white'))).toStrictEqual(1);
    expect(contrast(named('red'), named('white'))).toBeCloseTo(4, 2);
  });
});
