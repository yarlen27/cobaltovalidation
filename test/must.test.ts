//Must valdidation, passes the value of the specified property into a delegate that can perform custom validation logic on the value.

import { describe, expect, test } from "@jest/globals";
import { ValidationRule } from "../src/index";

// Arrange
export class Person {
  name: string = "";
  age: number = 0;
}

describe("ValidationRule", () => {
  // Must validation should add error if person age is greater than the maximum value
  test("Must validation should add error if person age is greater than the maximum value", () => {
    // Arrange
    const person = new Person();
    person.age = 35;

    const rule = new ValidationRule((p: Person) => p.age, person);

    // Act
    rule.Must((age: number) => age < 30);

    // Assert
    expect(rule.getErrors().length).toBe(1);
    expect(rule.getErrors()[0]).toBe("The specified condition was not met for 'age'");
  });
});
