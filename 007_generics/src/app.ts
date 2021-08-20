const names: Array<string> = []; // same as string[]
names[0]; // TS know everythin are strings and can use string methods on them.

// another generic type are promise type
// If i were to set the generic type to number, 
// the split method on the .then would give an error.
// If you use <any> you could have problems using for 
// example a string method on a number!
const promise: Promise<string> = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve("This is done!");
        }, 3000);
    }
    catch {
        reject("Woops");
    }
    
})

promise.then(data => {
    data.split(" ");
})

// Creating a generic function

// Create a function that merges two objects, returning one
// function merge(objA: object, objB: object) {
//     return Object.assign(objA, objB);
// }

// const mergedObj = merge({name: "John"}, {age: 28});
// console.log(mergedObj.age) // TS doesn't know age is there and will shout.

/*
Using a generic function
TS infers the function will return intersection of T & U
With object it can't infer it since object is highly unspecific type
It is "any" object and the intersection of two any objects is just any object.
If we specify they are different objects, different types, TS understands
what the intersection should be now. We don't need to enter specific details,
It's enough that they are different.
*/

// function merge<T, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }

const mergedObj = merge({name: "John"}, {age: 28});
console.log(mergedObj.age); // Now works


// Constraints

/*
There is a problem with the last code, it doesn't check if the parameter 
is an object, we can introduce the number 30 as the second argument and it won't work as intended.

You want to restrict the types of the generic types setting constraints with the `extends` keyword.
*/

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

// Another generic function

// Avoids shouting because of element.length
interface Lengthy {
    length: number;
}

// Being generic, here we only care that it has a length property
// Be it a string, an array...
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value.";
    if (element.length === 1){
        descriptionText = "Got 1 element."
    }
    else if (element.length > 1){ 
        descriptionText = "Got " + element.length + " elements."
    }
    return [element, descriptionText];
}

console.log(countAndPrint("Hi there!"));
console.log(countAndPrint(["Sports", "Music"]));

// The keyof constraint
// function extractAndConvert(obj: object, key: string){
//     return "Value: " + obj[key]; // complains because TS doesn't know if the obj will have the key.
// }

// Use generic types to guarantee it has key in obj
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return "Value: " + obj[key]; 
}

console.log(extractAndConvert({name: "John"}, "name"));

// Generic classes

// T will be filled out by a type to be used and assure we always
// use the same type in the instance.
// indexOf doesn't work with objects so we use extend for things that do work.
// We don't allow objects.
class DataStorage<T extends string | number | boolean > {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T){
        if (this.data.indexOf(item) === -1){
            return
        }
        // indexOf works with numbers and string but not objects.
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

// With generics we can specify now that this new object will use
// string items
const textStorage = new DataStorage<string>();
textStorage.addItem("John");
textStorage.addItem("Jane");
textStorage.removeItem("John");
console.log(textStorage.getItems());

const textStorage2 = new DataStorage<number>();
textStorage2.addItem(5);
textStorage2.addItem(2);
textStorage2.removeItem(5);
console.log(textStorage2.getItems());

// Generic utility types
// Ship with TS

// Partial type

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // Partial type says in the case that in the end it will be a CourseGoal
    // Turns all CourseGoal properties optional.
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    // return will complain if we're still using a Partial.
    // Having all data ready we convert it to CourseGoal.
    return courseGoal as CourseGoal;
}

// Readonly type

const nameArray: Readonly<string[]> = ["John", "Laura"];
// nameArray.push("Jane") // Shouts, not allowed to modify it