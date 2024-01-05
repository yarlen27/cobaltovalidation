import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from '../src/index';

// Arrange
export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    // LessThan validation should add error if person age is greater than the maximum value
    test('LessThan validation should add error if person age is greater than the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 35;

        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be less than 30');
    });

    // LessThan validation should not add error if person age is equal to the maximum value
    test('LessThan validation should add error if person age is equal to the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 30;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(1);
    });
    

    // LessThan validation should not add error if person age is less than the maximum value
    test('LessThan validation should not add error if person age is less than the maximum value', () => {
        // Arrange
        const person = new Person();
        person.age = 25;
        const rule = new ValidationRule((p: Person) => p.age, person);

        // Act
        rule.LessThan(30);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });
    
});