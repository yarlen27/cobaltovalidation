Simple fluent validation like library.
A validation library for TypeScript that allow building strongly-typed validation rules.

Installation using NPM:

npm install cobaltovalidation@1.0.4    

Example of use:




```typescript
import { AbstractValidator } from "cobaltovalidation";

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
console.log(result.isValid);
console.log(result.getErrors());
```
Returns the validationResult

Also can use ValidateAndThrow
```typescript
validator.ValidateAndThrow(user);
```
