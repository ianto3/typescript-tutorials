// interface keyword is only in TS
// It only defines structure, not values.

// Interfaces for functions
// Using types
// type AddFn = (a:number, a:number) => number;
// Using interface
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1:number, n2: number) => {
    return n1 + n2;
}

// Class interfaces
interface Named {
    readonly name: string;
    // Question mark means optional.
    outputName?: string;
}

// extends inherits from Named here like in classes.
// Unlike classes, you can extend here multiple interfaces...
// interface Greetable extends Named, Anotherinterface {}
interface Greetable extends Named {
    // Properties
    // We can use readonly modifier but not public or private...
    // readonly name: string;

    // Methods
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    // Question mark means optional.
    lastName?: string;
    // We can have added properties and methods.
    age = 24;

    constructor(n: string, l?:string){
        this.name = n;
        if(l){
            this.lastName = l;
        }
    }

    greet(phrase: string){
        if (this.lastName){
            console.log(phrase + " " + this.name + " " + this.lastName);
        } else{
            console.log(phrase + " " + this.name);
        }
    }
}

// Use interface as a type
let user1: Greetable; 

user1 = new Person("Lucy"); 

user1.greet("Hi, i am");