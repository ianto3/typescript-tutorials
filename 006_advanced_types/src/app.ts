// Interfaces
// interface Admin {
//     name: string;
//     privileges: string[];
// };

// interface Employee {
//     name: string;
//     startDate: Date;
// };

// interface ElevatedEmployee extends Employee, Admin {}

// Types using intersections (a bit shorter)
// Intersections of object types combine all in one.
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "John",
    privileges: ["Server"],
    startDate: new Date()
}

// Also works with things that are not objects.
// Note: intersection of union types are what are in common.
// In this case number.
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guards
// function add(a:Combinable, b:Combinable){
//     if (typeof a === "string" || typeof b === "string"){
//         return a.toString() + b.toString();
//     }
//     return a + b;
// }

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee){
    console.log("Name " + emp.name);
    // Note: "in" searches even in prototypes, consider .hasOwnProperty()
    if ("privileges" in emp){
        console.log("Privileges: " + emp.privileges);
    };

    if ("startDate" in emp){
        console.log("Start Date: " + emp.startDate);
    };
}

printEmployeeInformation(e1);


class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...");
    }
    loadCargo(amount: number){
        console.log("Loading cargo..." + amount);
    }
}

type Vehicule = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicule(vehicule: Vehicule){
    vehicule.drive();
    // Remember instanceof is plain JS, use it!
    if (vehicule instanceof Truck) {
        vehicule.loadCargo(1000);
    }
}

useVehicule(v1);
useVehicule(v2);

// Discriminated Unions
interface Bird {
    /*
    This is an interface, "bird" is NOT a value.
    "bird" is a "literal type".
    Narrows down the value stored in type to exactly that.
    */
    type: "bird"; 
    flyingSpeed: number;
}

interface Horse {
    type: "horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    let speed;

    switch(animal.type){
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }

    console.log("Moving with speed at " + speed + " km/h")
}

moveAnimal({type: "bird", flyingSpeed: 60})

// Type casting

// Note: TS doesn't read out HTML code.
/*
Hovering over paragraph variable name we see
TS detects it as type HTMLParagraphElement | null.
*/
const paragraph = document.querySelector("p");
/*
Hovering over paragraph1 variable name we see
TS detects it as type HTMLElement | null.
*/
const paragraph1 = document.getElementById("message-output");


/*
TS will shout at us because he doesn't know what type
our element is.
We have to tell TS what it is so as to keep him shut.

In the next line TS thinks inputElement is just a HTMLElement
and doesn't allow later to play with it's value.
We have to tell it it's an HTMLInputElement.
*/
// const inputElement = document.getElementById("user-input");

// Type casting: telling TS what type it really is.
// The following method WON'T work in React due to JSX clashing
// with the syntax!
// const inputElement = <HTMLInputElement>document.getElementById("user-input");
// Another alternative way...
const inputElement = document.getElementById("user-input") as HTMLInputElement;

inputElement.value = "Hi there!";

// Index Properties

/* 
We want an object that contains errors but it should be flexible.
We might not want properties when there isn't an error for it
or add more properties in certain places if errors are 
possible there.
*/

// {
//     email: "Not a valid email",
//     username: "Must start with a character!"
// }

interface ErrorContainer {
 // Only string, numbers and symbols can be keys in an object.
 // Even if not wrapped with quotes, as keys, names are strings.
 // e.g username: "Alex", username is a string.

 // Every property added must be key of type string and value of type string.
    [prop: string]: string 
    // We can add more predefined key/values here but they must
    // be of the same type as what we defined before.
};

const errorBag: ErrorContainer = {
    email: "Not a valid email.",
    username: "Must start with a character!"
};

// Function overloads

/*
Specifies the return value for every possibilty.
If not done, the return will be type "Combinable"
and TS will not allow using string methods or number
methods on them.
*/
function add(a:number, b:number): number;
function add(a:string, b:string): string;
function add(a:string, b:number): string;
function add(a:number, b:string): string;
function add(a:Combinable, b:Combinable){
    if (typeof a === "string" || typeof b === "string"){
        return a.toString() + b.toString();
    }
    return a + b;
}

// Optional chaining
const fetchedUserData = {
    id: "u1",
    name: "John",
    job: {title:"CEO", description: "My own company"}
};

// If job or title is not there, we would have an error.
console.log(fetchedUserData.job.title);

// In normal JS we would do
console.log(fetchedUserData.job && fetchedUserData.job.title);

// With TS chaining operator
console.log(fetchedUserData?.job?.title);

const userInput = null;

// undefined, null, "", 0...would be ignored in favor of "DEFAULT"
const storedData = userInput || "DEFAULT";

// undefined and null would be ignored in favor of "DEFAULT" but not 0 or ""
const storedData2 = userInput ?? "DEFAULT";