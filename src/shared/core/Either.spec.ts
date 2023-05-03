import { Either, left, right } from './Either';
import { Result, ResultFactory } from './Result';

describe('Either', () => {
  test('can create a left result', () => {
    const errResult = ResultFactory.create(false, 'This is an error');
    const result = left(errResult);
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBe(errResult);
  });

  test('can return a right result', () => {
    const successResult = ResultFactory.create(
      true,
      undefined,
      'A successfulResponse'
    );
    const result = right(successResult);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(successResult);
  });
});
