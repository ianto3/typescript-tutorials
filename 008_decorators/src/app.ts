
// You don't have to start with uppercase.
// function Logger(constructor: Function) {
//     console.log("Logging...");
//     console.log(constructor);
// }

// Adding a decorator to a class...
// @Logger
// class Person {
//     name = "John";

//     constructor(){
//         console.log("Creating person...");
//     }
// }

// We can see the console.logs of the decorator before.
// Decorators are executed when we define a class, not instantiated.
// const pers = new Person;
// console.log(pers);


// Working with decorator factories
// It returns a decorator but allows to configure it
// before applying it to a class.

function Logger(logString: string) {
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

// Now we have to execute Logger to get the decorator.
// We now also pass an argument customizing it.
// @Logger("Logging - Person")
// class Person {
//     name = "John";

//     constructor(){
//         console.log("Creating person...");
//     }
// }

// const pers = new Person;
// console.log(pers);


// More useful decorators...
// function WithTemplate(template: string, hookId: string) {
//     /* 
//     TS was warning us because we didn't use the constructor
//     from the following function parameters so we changed it to
//     "_" which is a way to say that we are aware of the parameter
//     but we don't care.
//     */
//     // return function(_: Function){
//     return function(constructor: any){
//         const hookEl = document.getElementById(hookId);
//         const person = new constructor();
        
//         if (hookEl){
//             hookEl.innerHTML = template;
//             hookEl.querySelector("h1")!.textContent = person.name;
//         }
//     }
// }

// @Logger("Logging - Person")
// @WithTemplate("<h1>My Person Object<h1/>", "app")
// class Person {
//     name = "John";

//     constructor(){
//         console.log("Creating person...");
//     }
// }

// const pers = new Person;
// console.log(pers);

// Property decorators
// Decorators for properties use at least two arguments.
function Log(target: any, propertyName: string){ 
    console.log("Property decorator!");
    console.log(target + propertyName);
}

class Product{
    @Log // Decorator for title property
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0){
            this._price = val;
        } else {
            throw new  Error("Invalid price - should be positive");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) { // You can add to each parameter a decorator.
        return this._price * (1 + tax);
    }
}


// Accesor decorators (setters, getters)
// Uses three arguments
// target = prototype in instance
// target = constructor if static function
// target = any, we don't know

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Method decorator
// Uses three arguments
// target = prototype in instance
// target = constructor if static function
// target = any, we don't know

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Parameter decorator
// name parameter is the name of the method in which we use the parameter, 
// not the parameter itself.
// position is the position of the parameter in the method's parameters.
// In this case it comes first.

function Log4(target: any, name: string | Symbol, position: number){
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}

// The following doesn't execute decorators again
// Decorators are executed on the definition of the class
// only and not on instancing.
const p1 = new Product("Book 1", 20);
const p2 = new Product("Book 2", 30);

// Returning and modifying a class in a class decorator

function WithTemplate(template: string, hookId: string) {
    /*
    We set a "new" property, "new" tells TS it can be "newed"
    meaning we create instances calling by "new".
    We also specify that the constructor function accepts any number
    of arguments of any type, that is to create a new Person class in
    this case. 
    Finally we return an object and specify it has a "name" property
    which is true, Person class has a name property.
    */
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){
        // return a new class constructor function based
        // on the original class constructor keeping the
        // original functionality and adding new functionality.
        return class extends originalConstructor{
            // TS warns us that args is not used.
            // Change to "_" to tell it we know, we don't want to.
            // constructor(...args: any[]) {
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);                
                // With this  new logic added to the constructor
                // we render on each instance created.
                if (hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    }
}

@Logger("Logging - Person")
@WithTemplate("<h1>My Person Object<h1/>", "app")
class Person {
    name = "John";

    constructor(){
        console.log("Creating person...");
    }
}

const pers = new Person;
console.log(pers);


// Other decorator return types

// Accesor decorators and method decorators can also return values.
// Not normal in property and parameter decorators.

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // "this" is whatever is responsible for triggering the getter method.
            // "this" will always be part of the object itself and won't be the event 
            // target from addeventlistener.
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return adjustedDescriptor;
}


class Printer {
    message = "This works!";

    @autobind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);


// Decorators for validation

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ["required", "positive"]
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    // constructor is a function and all functions have a name property
    // in this case it will be "Course"
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["required"] // This is an example, naive, but this would overwrite
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["positive"] 
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]){
            switch(validator) {
                case "required":
                    isValid = isValid && !!obj[prop]; // !! converts to true or false instead of truthy/falsy
                    break; 
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price:  number;

    constructor(t: string, p: number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", ev => {
    ev.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement

    const title = titleEl.value;
    const price = +priceEl.value; // convert to number

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)){
        alert("Invalid input!")
        return;
    }
    console.log(createdCourse);
});