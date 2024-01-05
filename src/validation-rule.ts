import { PropertyAccessor } from "../src/property-accessor";

export class ValidationRule<T> {
  private errors: string[] = [];
  constructor(
    private propertyAccessor: PropertyAccessor<T>,
    private value: T
  ) {}

  setValue(value: T) {
    this.value = value;
  }

  getErrors(): string[] {
    return this.errors;
  }

  NotNull(errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (propertyValue === null || propertyValue === undefined) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must have a value`);
      }
    }
    return this;
  }

  GreatherThan(minValue: number, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "number" &&
      propertyValue <= minValue
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be greater than ${minValue}`);
      }
    }
    return this;
  }

  GreatherThanOrEquals(
    minValue: number,
    errorMessage?: string
  ): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    console.log(propertyValue);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "number" &&
      propertyValue < minValue
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be greater than or equal to ${minValue}`);
      }
    }
    return this;
  }

  //LessThan, Ensures that a particular numeric property is less than the specified value.
  LessThan(maxValue: number, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "number" &&
      propertyValue >= maxValue
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be less than ${maxValue}`);
      }
    }
    return this;
  }

  //LessThanOrEquals, Ensures that a particular numeric property is less than or equal to the specified value.
  LessThanOrEquals(maxValue: number, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "number" &&
      propertyValue > maxValue
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be less than or equal to ${maxValue}`);
      }
    }
    return this;
  }

  //implemente Matches for string
  Matches(regex: string, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "string" &&
      !propertyValue.match(regex)
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must match ${regex}`);
      }
    }
    return this;
  }
  //implemente Length for string, Ensures that the length of a particular string property is within the specified range.
  Length(
    minLength: number,
    maxLength: number,
    errorMessage?: string
  ): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "string" &&
      (propertyValue.length < minLength || propertyValue.length > maxLength)
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        //if propertyValue.length < minLength
        if (propertyValue.length < minLength) {
          this.errors.push(`Must be at least ${minLength} characters`);
        } else {
          this.errors.push(`Must be less than ${maxLength} characters`);
        }
      }
    }
    return this;
  }

  //MinLength, Ensures that the length of a particular string property is longer than the specified value.
  MinLength(minLength: number, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "string" &&
      propertyValue.length < minLength
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be at least ${minLength} characters`);
      }
    }
    return this;
  }

  //implement MaxLength for string
  MaxLength(maxLength: number, errorMessage?: string): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (
      propertyValue !== undefined &&
      typeof propertyValue === "string" &&
      propertyValue.length > maxLength
    ) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        this.errors.push(`Must be less than ${maxLength} characters`);
      }
    }
    return this;
  }

  //Must validation, Passes the value of the specified property into a arrow function that can perform custom validation logic on the value.
  Must(
    validationFunction: (value: any) => boolean,
    errorMessage?: string
  ): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
    if (propertyValue !== undefined && !validationFunction(propertyValue)) {
      if (errorMessage !== undefined) {
        this.errors.push(errorMessage);
      } else {
        //property name
        const propertyName = this.propertyAccessor.toString().split(".")[1];
        //the specified condition was not met for ´{propertyName}´
        this.errors.push(
          `The specified condition was not met for '${propertyName}'`
        );
      }
    }
    return this;
  }
}
