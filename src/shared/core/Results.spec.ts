import { Result, ResultFactory } from './Result';

describe('Results', () => {
  test('can create a successful result', () => {
    const result = ResultFactory.create(true, null, 5);
    expect(result.getValue()).toBe(5);
    expect(result.isSuccess).toBe(true);
  });

  test('can create a failed result', () => {
    const result = ResultFactory.create(false, 'This is an error');
    expect(result.getErrorValue()).toBe('This is an error');
  });

  test('combined results are logically anded together with a failing result', () => {
    const results = [
      ResultFactory.create(false, 'This is an error'),
      ResultFactory.create(true, null, 5),
      ResultFactory.create(true, null, 'Another successful answer'),
      ResultFactory.create(true, null, { a: 5, c: 45 }),
      ResultFactory.create(true, null, { a: 5, c: 45 })
    ];

    const finalResult = ResultFactory.combine(results);
    expect(finalResult.isSuccess).toBe(false);
    expect(finalResult.isFailure).toBe(true);
  });

  test('combined results are logically anded together without a failing result', () => {
    const results = [
      ResultFactory.create(true, null, 5),
      ResultFactory.create(true, null, 'Another successful answer'),
      ResultFactory.create(true, null, { a: 5, c: 45 }),
      ResultFactory.create(true, null, {
        func: () => {
          console.log('hi');
        },
        c: 45
      })
    ];

    const finalResult = ResultFactory.combine(results);
    expect(finalResult.isSuccess).toBe(true);
    expect(finalResult.getValue()).toBe(undefined);
  });
});
