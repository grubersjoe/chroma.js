import { analyze } from '../src/analyze';

describe('analyze()', () => {
  const tests = [
    ['array of numbers', [1, 2, 2, 3, 4, 5], undefined],
    ['object of numbers', { a: 1, b: 2, c: 2, d: 3, e: 4, f: 5 }, undefined],
    ['array of objects', [{ k: 1 }, { k: 2 }, { k: 2 }, { k: 3 }, { k: 4 }, { k: 5 }], 'k'],
    [
      'object of objects',
      { a: { k: 1 }, b: { k: 2 }, c: { k: 2 }, d: { k: 3 }, e: { k: 4 }, f: { k: 5 } },
      'k',
    ],
  ];

  test.each(tests)('%s', (name, input, key) => {
    const a = analyze(input, key);
    expect(a.sum).toStrictEqual(17);
    expect(a.count).toStrictEqual(6);
    expect(a.max).toStrictEqual(5);
    expect(a.min).toStrictEqual(1);
    expect(a.domain).toStrictEqual([1, 5]);
  });
});
