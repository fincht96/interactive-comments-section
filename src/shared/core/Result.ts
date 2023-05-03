export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: T | string;
  private _value: T;

  public constructor(isSuccess: boolean, error: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    if (!isSuccess && error && value) {
      throw new Error(`InvalidOperation: A failing result can't have a value`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }
    return this._value as T;
  }

  public getErrorValue(): T {
    return this.error as T;
  }
}

export class ResultFactory {
  private constructor() {}

  public static create<T>(
    isSuccess: boolean,
    error?: T | string,
    value?: T
  ): Result<T> {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    const result = new Result<T>(isSuccess, <T | string>error, <T>value);

    return result;
  }

  public static ok<U>(value?: U): Result<U> {
    return this.create<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return this.create<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return this.ok<void>();
  }
}
