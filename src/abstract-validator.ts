import { PropertyAccessor } from "./property-accessor";
import ValidationResult  from "./validation-result";
import  ValidationRule  from "./validation-rule";

export default abstract class AbstractValidator<T> {
  private rules: ValidationRule<T>[] = [];

  protected value: T = {} as T;
  constructor() {}

  /**
   * Adds a validation rule for the specified property.
   * 
   * @param propertyAccessor - The property accessor function.
   * @returns The validation rule for the specified property.
   */
  RuleFor(propertyAccessor: PropertyAccessor<T>): ValidationRule<T> {
    const rule = new ValidationRule(propertyAccessor, this.value);
    this.rules.push(rule);
    return rule;
  }

  

  /**
   * Validates the given value using the defined rules.
   * @param value The value to be validated.
   * @returns The validation result containing any errors found during validation.
   */
  Validate(value: T): ValidationResult {
    this.value = value;
    this.rules = [];
    this.InitializeRules();
    let errors: string[] = [];

    for (const rule of this.rules) {
      rule.setValue(value);
      errors.push(...rule.getErrors());
    }

    const validationResult = new ValidationResult();
    validationResult.addErrors(errors);

    return validationResult;
  }

  //implement ValidateAndThrow
  ValidateAndThrow(value: T): void {
    const validationResult = this.Validate(value);
    if (validationResult.getErrors().length > 0) {
      throw new Error(validationResult.getErrors().join(","));
    }
  }

  abstract InitializeRules(): void;
}
