// union types
// function combine(
//     input1: number | string,
//     input2: number | string,
//     // We specify literal types, the exact values we expect.
//     resultConversion: "as-number" | "as-text") {
//     let result;
//     if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
//         result = +input1 + +input2;
//     } else {
//         result = input1.toString() + input2.toString();
//     }
//     return result;
// }

// Type aliases
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
    input1: Combinable,
    input2: Combinable,
    // We specify literal types, the exact values we expect.
    resultConversion: ConversionDescriptor) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);