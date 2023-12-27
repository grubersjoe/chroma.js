import { contrast } from '../src/contrast';
import { named } from '../src/io/named';

describe('contrast()', () => {
  test('maximum contrast', () => {
    expect(contrast(named('black'), named('white'))).toEqual(21);
    expect(contrast(named('white'), named('white'))).toEqual(1);
    expect(contrast(named('red'), named('white'))).toBeCloseTo(4, 2);
  });
});
