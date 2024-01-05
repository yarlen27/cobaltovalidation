import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from '../src/validation-rule';

// Arrange
export class Person {
    name: string = '';
    age: number = 0;
}

describe('ValidationRule', () => {
    // LessThanOrEquals validation should add error if person age is greater than the maximum value
    test('LessThanOrEquals validation should add error if person age is greater than the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 35;

        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThanOrEquals(30);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be less than or equal to 30');
    });

    // LessThanOrEquals validation should not add error if person age is equal to the maximum value
    test('LessThanOrEquals validation should not add error if person age is equal to the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 30;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThanOrEquals(30);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

    // LessThanOrEquals validation should not add error if person age is less than the maximum value
    test('LessThanOrEquals validation should not add error if person age is less than the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 25;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThanOrEquals(30);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

    //should add custom error message when provided
    test('LessThanOrEquals should add custom error message when provided', () => {
        // Arrange
        const person = new Person();
        person.age = 35;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThanOrEquals(30, 'Age must be less than or equal to 30');

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Age must be less than or equal to 30');
    });
    
});