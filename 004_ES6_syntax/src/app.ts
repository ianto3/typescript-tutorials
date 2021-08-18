// const userName = "Ivan";
// let age = 30;

// age = 29;

// With default value
// function add(a: number, b: number = 1){
//     let result = a + b;
//     console.log(result);
// }

// Using REST
function add(...numbers: number[]){
    return numbers.reduce((acc, val) => {
        return acc + val
    }, 0);
};

// Using tuples
// Admits exactly three parameters
// Could have just set the parameters but this is a shorter way in the end
// function add(...numbers: [number, number, number]){
//     return numbers.reduce((acc, val) => {
//         return acc + val
//     }, 0);
// };


console.log(add(5, 2, 1.5));

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const otherHobbies = ["Running", ...hobbies]

// Destructuring
const [hobby1, hobby2, ...remaininghobbies] = hobbies;

const person = {
    userName: "Ivan",
    age: 30
}

const {userName: firstName, age} = person;