import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from '../src/validation-rule';

// Arrange
export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    test('GreatherThan should add error message when value is less than or equal to the minimum value', () => {
        // Arrange
        const person = new Person();
        person.age = 25;

        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.GreaterThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be greater than 30');
    });

    test('GreatherThan should not add error message when value is greater than the minimum value', () => {
        // Arrange
        const person = new Person();
        person.age = 35;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.GreaterThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

    test('GreatherThan should add custom error message when provided', () => {
        // Arrange
        const person = new Person();
        person.age = 25;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.GreaterThan(30, 'Age must be greater than 30');

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Age must be greater than 30');
    });

    // GreatherThan must add error if value is undefined
    test('GreatherThan should add error message when value is undefined', () => {
        // Arrange
        const person = new Person();
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.GreaterThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be greater than 30');
    });
    
    
});