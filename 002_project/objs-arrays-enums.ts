const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]; // tuple: special array with just two specific elements.
} = {
    name: "John",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author"]
};

// {} is the way to be specific and tell TS it's an object.
// You can use person2: object but that object is not specific to what
// type of object.
const person2: {} = {
    name: "John",
    age: 30
};

// Being more specific without relaying on type inferrance.
// Note: it's better to just let TS infer most of the times.
const person3: {
    name: string;
    age: number;
} = {
    name: "John",
    age: 30
};

// enums
// Uppercase variable name because it's a custom type, conventions...
// Inside the brackets the uppercase is not needed.
// enums assign labels to numbers.
// ADMIN = 0, READ_ONLY = 1, AUTHOR = 2
enum Role { ADMIN, READ_ONLY, AUTHOR };

const person4 = {
    name: "John",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN // Using numbers in a human readable way.
};

// Custom numbers
// ADMIN = 5, READ_ONLY = 6, AUTHOR = 7
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR };
// OR
// ADMIN = 5, READ_ONLY = 100, AUTHOR = 2
// enum Role { ADMIN = 5, READ_ONLY = 100, AUTHOR = 2 };
// OR mix it
// ADMIN = "ADMIN", READ_ONLY = 100, AUTHOR = 2
// enum Role { ADMIN = "ADMIN", READ_ONLY = 100, AUTHOR = 2 };


let favoriteActivities: string[]; // Array of strings.
let favoriteActivities2: any[]; // Any is flexible but gets rid of benefits of specifying types.

let favoriteActivities3: any; // Anything goes here.

// tuples
person.role.push("admin"); // Push is allowed, it's an exception unfortunately.
// person.role[1] = 10; // We avoid overriding the type with a tuple.
// person.role = []; // The length is controlled by the tuple except when using push.
// person.role = [0, "admin", "user"]

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase()); // It knows hobby is going to be a string so it doesn't complain.
    // console.log(hobby.map()); // ERROR!
}