
import { describe, expect, test } from '@jest/globals';
import { ValidationRule } from "../src/index";

export class Person {
    name: string = '';
    age: number = 0;
}


describe('ValidationRule', () => {
    test('Matches validation should add error if person name has letters ', () => {
        // Arrange
        const person = new Person();
        person.name = 'John';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[0-9]+$');

        // Assert
        expect(rule.getErrors().length).toBe(1);        
        
    });
    
    // Matches validation should not add error if person name contains only  numbers
    test('Matches validation should not add error if person name has numbers ', () => {
        // Arrange
        const person = new Person();
        person.name = '123';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[0-9]+$');

        // Assert
        expect(rule.getErrors().length).toBe(0);        
        
    });

    // Matches validation should add custom error message when provided
    test('Matches validation should add custom error message when provided', () => {
        // Arrange
        const person = new Person();
        person.name = 'John';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[0-9]+$', 'Name must be a number');

        // Assert
        expect(rule.getErrors().length).toBe(1);        
        expect(rule.getErrors()[0]).toBe('Name must be a number');
    });

    // Matches validation should add error if value is undefined
    test('Matches validation should add error message when value is undefined', () => {
        // Arrange
        const person = new Person();
        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[0-9]+$', 'Must have a value');

        // Assert
        expect(rule.getErrors().length).toBe(1);        
        expect(rule.getErrors()[0]).toBe('Must have a value');
    });

    // Matches validation should add error if value has numbers, use ^[a-zA-Z]+$
    test('Matches validation should add error message when value has numbers', () => {
        // Arrange
        const person = new Person();
        person.name = 'John123';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[a-zA-Z]+$');

        // Assert
        expect(rule.getErrors().length).toBe(1);        
        expect(rule.getErrors()[0]).toBe('Must match ^[a-zA-Z]+$');
    });

    // Matches validation should not add error if value has only letters, use ^[a-zA-Z]+$
    test('Matches validation should not add error message when value has only letters', () => {
        // Arrange
        const person = new Person();
        person.name = 'John';

        const rule = new ValidationRule((p: Person) => p.name, person);

        // Act
        rule.Matches('^[a-zA-Z]+$');

        // Assert
        expect(rule.getErrors().length).toBe(0);        
    });

});
    
    