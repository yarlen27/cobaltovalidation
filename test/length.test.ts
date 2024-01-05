
import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from "../src/index";

export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    //Length validation should add error if person name length is less than the minimum length
    test('Length validation should add error if person name length is less than the minimum length', () => {
        // Arrange
        const person = new Person();
        person.name = 'John';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Length(5, 10);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be at least 5 characters');
    });

    //Length validation should add error if person name length is greater than the maximum length
    test('Length validation should add error if person name length is greater than the maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = 'John Doe-Perez-Williams';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Length(5, 10);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be less than 10 characters');
    });

    //Length validation should not add error if person name length is equal to the minimum length
    test('Length validation should not add error if person name length is equal to the minimum length', () => {
        // Arrange
        const person = new Person();
        person.name = '12345';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Length(5, 10);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });
    //Length validation should not add error if person name length is equal to the maximum length
    test('Length validation should not add error if person name length is equal to the maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = '1234567890';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Length(5, 10);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });
    //Length validation should not add error if person name length is between the minimum and maximum length
    test('Length validation should not add error if person name length is between the minimum and maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = 'John Doe';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Length(5, 10);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

});
    
    