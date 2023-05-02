import { UniqueEntityId } from './UniqueEntityId';
import { validate } from 'uuid';

describe('UniqueEntityId', () => {
  test('can construct a valid UniqueEntityId without provided id', () => {
    const entityId = new UniqueEntityId();
    const entityIdAsString = entityId.toString();
    expect(validate(entityIdAsString)).toBe(true);
  });

  test('can construct a valid UniqueEntityId with provided id', () => {
    const entityId = new UniqueEntityId(1);
    const entityIdAsValue = entityId.toValue();
    expect(entityIdAsValue).toBe(1);
  });

  test('two copies UniqueEntityIds of same value are the same', () => {
    const firstEntityId = new UniqueEntityId(1);
    const secondEntityId = new UniqueEntityId(1);

    expect(firstEntityId.equals(secondEntityId)).toBe(true);
  });
});
