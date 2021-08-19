"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n, l) {
        this.age = 24;
        this.name = n;
        if (l) {
            this.lastName = l;
        }
    }
    greet(phrase) {
        if (this.lastName) {
            console.log(phrase + " " + this.name + " " + this.lastName);
        }
        else {
            console.log(phrase + " " + this.name);
        }
    }
}
let user1;
user1 = new Person("Lucy");
user1.greet("Hi, i am");
//# sourceMappingURL=app.js.map