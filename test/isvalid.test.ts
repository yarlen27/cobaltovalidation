import { describe, expect, test } from "@jest/globals";
import AbstractValidator from "../src/abstract-validator";

// Arrange
export class Person {
  name: string = "";
  age: number = 0;
}

class PersonValidator extends AbstractValidator<Person> {
  InitializeRules(): void {
    this.RuleFor((x) => x.age).GreaterThanOrEquals(18);
  }
}

describe("AbstractValidator", () => {
  // AbstractValidator should return isvalid true when validation is successful
  test("AbstractValidator should return isvalid true when validation is successful", () => {
    // Arrange
    const person = new Person();
    person.age = 18;
    const validator = new PersonValidator();

    // Act
    const result = validator.Validate(person);

    // Assert
    expect(result.isValid).toBe(true);
  });
});
