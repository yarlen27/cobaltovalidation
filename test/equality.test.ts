import { describe, expect, test } from "@jest/globals";
import { ValidationRule } from "../src/index";
// Arrange
export class Person {
  name: string = "";
  age: number = 0;
}

describe("ValidationRule", () => {
  //Equal validation should add error if person name is no equal to the value
  test("Equal validation should add error if person name is no equal to the value", () => {
    // Arrange
    const person = new Person();
    person.name = "John";

    const rule = new ValidationRule((p: Person) => p.name, person);

    // Act
    rule.Equal("John Doe");

    // Assert
    expect(rule.getErrors().length).toBe(1);
    expect(rule.getErrors()[0]).toBe("Must be equal to John Doe");
  });

  //Equal validation should not add error if person name is equal to the value
  test("Equal validation should not add error if person name is equal to the value", () => {
    // Arrange
    const person = new Person();
    person.name = "John";

    const rule = new ValidationRule((p: Person) => p.name, person);

    // Act
    rule.Equal("John");

    // Assert
    expect(rule.getErrors().length).toBe(0);
  });

  //Equal validation should add error if person age is no equal to the value
  test("Equal validation should add error if person age is no equal to the value", () => {
    // Arrange
    const person = new Person();
    person.age = 20;

    const rule = new ValidationRule((p: Person) => p.age, person);

    // Act
    rule.Equal(21);

    // Assert
    expect(rule.getErrors().length).toBe(1);
    expect(rule.getErrors()[0]).toBe("Must be equal to 21");
  });

  //Equal validation should not add error if person age is equal to the value
  test("Equal validation should not add error if person age is equal to the value", () => {
    // Arrange
    const person = new Person();
    person.age = 20;

    const rule = new ValidationRule((p: Person) => p.age, person);

    // Act
    rule.Equal(20);

    // Assert
    expect(rule.getErrors().length).toBe(0);
  });

  //NotEqual validation should add error if person name is equal to the value
  test("NotEqual validation should add error if person name is equal to the value", () => {
    // Arrange
    const person = new Person();
    person.name = "John";

    const rule = new ValidationRule((p: Person) => p.name, person);

    // Act
    rule.NotEqual("John");

    // Assert
    expect(rule.getErrors().length).toBe(1);
    expect(rule.getErrors()[0]).toBe("Must not be equal to John");
  });
});
