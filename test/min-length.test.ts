
import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from '../src/validation-rule';

export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    //MinLength validation should add error if person name length is less than the minimum length
    test('MinLength validation should add error if person name length is less than the minimum length', () => {
        // Arrange
        const person = new Person();
        person.name = 'John';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MinLength(5);

        // Assert
        expect(rule.getErrors().length).toBe(1);
        expect(rule.getErrors()[0]).toBe('Must be at least 5 characters');
    });

    //MinLength validation should not add error if person name length is equal to the minimum length
    test('MinLength validation should not add error if person name length is equal to the minimum length', () => {
        // Arrange
        const person = new Person();
        person.name = '12345';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MinLength(5);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

    //MinLength validation should not add error if person name length is greater than the minimum length
    test('MinLength validation should not add error if person name length is greater than the minimum length', () => {
        // Arrange
        const person = new Person();
        person.name = '1234567890';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.MinLength(5);

        // Assert
        expect(rule.getErrors().length).toBe(0);
    });

});
    
    