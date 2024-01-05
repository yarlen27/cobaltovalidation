import { PropertyAccessor } from "../src/property-accessor";

export default class ValidationRule<T> {
  private errors: string[] = [];
  constructor(
    private propertyAccessor: PropertyAccessor<T>,
    private value: T
  ) {}

  setValue(value: T) {
    this.value = value;
  }

/**
 * Retrieves the errors associated with the validation rule.
 * 
 * @returns An array of strings representing the errors.
 */
  getErrors(): string[] {
    return this.errors;
  }

/**
 * Checks if the property value is not null or undefined.
 * @param errorMessage The error message to be added to the errors array if the validation fails.
 * @returns The current instance of the ValidationRule.
 */
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

/**
 * Checks if the property value is greater than the specified minimum value.
 * @param minValue The minimum value that the property value should be greater than.
 * @param errorMessage Optional error message to be added to the errors array if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
  GreaterThan(minValue: number, errorMessage?: string): ValidationRule<T> {
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

/**
 * Checks if the property value is greater than or equal to the specified minimum value.
 * @param minValue The minimum value that the property value should be greater than or equal to.
 * @param errorMessage Optional. The error message to be added if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
  GreaterThanOrEquals(
    minValue: number,
    errorMessage?: string
  ): ValidationRule<T> {
    const propertyValue = this.propertyAccessor(this.value!);
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

/**
 * Checks if the property value is less than the specified maximum value.
 * @param maxValue - The maximum value that the property value should be less than.
 * @param errorMessage - Optional. The error message to be added to the errors array if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
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

/**
 * Checks if the property value is less than or equal to the specified maximum value.
 * @param maxValue - The maximum value that the property value should be less than or equal to.
 * @param errorMessage - Optional. The error message to be added if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
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

/**
 * Checks if the value of the property matches the specified regular expression.
 * @param regex - The regular expression to match against.
 * @param errorMessage - Optional error message to be added to the errors array if the value does not match the regex.
 * @returns The current instance of the ValidationRule.
 */
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

/**
 * Validates the length of a string property.
 * @param minLength The minimum length allowed.
 * @param maxLength The maximum length allowed.
 * @param errorMessage An optional error message to be added to the errors array if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
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

/**
 * Validates that the value of the property is a string with a minimum length.
 * @param minLength The minimum length required for the string value.
 * @param errorMessage Optional custom error message to be added to the errors array if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
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

/**
 * Sets a maximum length validation rule for the property.
 * @param maxLength The maximum length allowed for the property value.
 * @param errorMessage Optional custom error message to be displayed if the validation fails.
 * @returns The ValidationRule instance for method chaining.
 */
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

/**
 * Adds a validation rule that checks if the specified validation function returns true for the property value.
 * If the validation function returns false, an error message is added to the validation rule.
 * @param validationFunction The function that performs the validation check.
 * @param errorMessage The optional error message to be added if the validation fails.
 * @returns The current instance of the ValidationRule.
 */
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
