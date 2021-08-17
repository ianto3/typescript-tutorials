var person = {
    name: "John",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author"]
};
// {} is the way to be specific and tell TS it's an object.
// You can use person2: object but that object is not specific to what
// type of object.
var person2 = {
    name: "John",
    age: 30
};
// Being more specific without relaying on type inferrance.
// Note: it's better to just let TS infer most of the times.
var person3 = {
    name: "John",
    age: 30
};
// enums
// Uppercase variable name because it's a custom type, conventions...
// Inside the brackets the uppercase is not needed.
// enums assign labels to numbers.
// ADMIN = 0, READ_ONLY = 1, AUTHOR = 2
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
var person4 = {
    name: "John",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};
var favoriteActivities; // Array of strings.
var favoriteActivities2; // Any is flexible but gets rid of benefits of specifying types.
// tuples
person.role.push("admin"); // Push is allowed, it's an exception unfortunately.
// person.role[1] = 10; // We avoid overriding the type with a tuple.
// person.role = []; // The length is controlled by the tuple except when using push.
// person.role = [0, "admin", "user"]
console.log(person);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase()); // It knows hobby is going to be a string so it doesn't complain.
    // console.log(hobby.map()); // ERROR!
}
