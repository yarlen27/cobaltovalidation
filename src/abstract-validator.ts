import { PropertyAccessor } from "./property-accessor";
import { ValidationRule } from "./validation-rule"

export abstract class AbstractValidator<T> {
    private rules: ValidationRule<T>[] = [];
  
    protected value: T = {} as T;
    constructor() {}
  
    RuleFor(propertyAccessor: PropertyAccessor<T>): ValidationRule<T> {
      const rule = new ValidationRule(propertyAccessor, this.value);
      this.rules.push(rule);
      return rule;
    }
  
    Validate(value: T): string[] {
      this.value = value;
      this.rules = [];
      this.InitializeRules();
      let errors: string[] = [];

      for (const rule of this.rules) {
        rule.setValue(value);
        errors.push(... rule.getErrors());
      }

      return errors;
    }

    //implement ValidateAndThrow
    ValidateAndThrow(value: T): void {
        const errors = this.Validate(value);
        if (errors.length > 0) {
            throw new Error(errors.join(','));
        }
    }

  
    abstract InitializeRules(): void;
  }