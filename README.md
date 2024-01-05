Simple fluent validation like library.
A validation library for typescript that allow building strongly-typed validation rules.

Example of use:


```typescript
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
```
Returns the list of errors.

Also can use ValidateAndThrow
```typescript
validator.ValidateAndThrow(user);
```
