//example of how to user the library

import {AbstractValidator} from './abstract-validator';

class User {    
    constructor(public name: string, public age: number) {
        
    }

}

class UserValidator extends AbstractValidator<User> {
    
    constructor() {
        super();        
    }

    InitializeRules(): void {
         this.RuleFor(x => x.name).MaxLength(5);
         this.RuleFor(x => x.age).GreaterThanOrEquals(18);
         this.RuleFor(x => x.age).Length(18,21);
    }
}


const user = new User('John', 17);
const validator = new UserValidator();
let result = validator.Validate(user);
console.log(result);
console.log(result.isValid);
console.log(result.getErrors());
user.age = 19;
user.name = 'John Doe';
console.log('-------------------');
result = validator.Validate(user);
console.log(result.isValid);

console.error(validator.ValidateAndThrow(user));