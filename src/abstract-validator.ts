import { PropertyAccessor } from "./property-accessor";
import  ValidationResult  from "./validation-result";
import  ValidationRule  from "./validation-rule";

export default abstract class AbstractValidator<T> {
  private rules: ValidationRule<T>[] = [];

  protected value: T = {} as T;
  constructor() {}

  RuleFor(propertyAccessor: PropertyAccessor<T>): ValidationRule<T> {
    const rule = new ValidationRule(propertyAccessor, this.value);
    this.rules.push(rule);
    return rule;
  }

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
