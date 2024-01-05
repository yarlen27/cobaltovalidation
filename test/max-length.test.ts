//write test for MaxLength


import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from '../src/validation-rule';

export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    //MaxLength validation should add error if person name length is greater than the maximum length
    test('MaxLength validation should add error if person name length is greater than the maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = 'John Doe-Perez-Williams';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MaxLength(10);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be less than 10 characters');
    });

    //MaxLength validation should not add error if person name length is equal to the maximum length
    test('MaxLength validation should not add error if person name length is equal to the maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = '1234567890';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MaxLength(10);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

    //MaxLength validation should not add error if person name length is less than the maximum length
    test('MaxLength validation should not add error if person name length is less than the maximum length', () => {
        // Arrange
        const person = new Person();
        person.name = '12345';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MaxLength(10);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });
    
});
    
    