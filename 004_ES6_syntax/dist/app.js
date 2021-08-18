"use strict";
function add(...numbers) {
    return numbers.reduce((acc, val) => {
        return acc + val;
    }, 0);
}
;
console.log(add(5, 2, 1.5));
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const otherHobbies = ["Running", ...hobbies];
const [hobby1, hobby2, ...remaininghobbies] = hobbies;
const person = {
    userName: "Ivan",
    age: 30
};
const { userName: firstName, age } = person;
//# sourceMappingURL=app.js.map