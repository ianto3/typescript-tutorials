
// Setting the return type.
// Remember to normally let TS to infer types if possible.
function add1(n1: number, n2: number): number {
    return n1 + n2;
}

function add(n1: number, n2: number) {
    return n1 + n2;
}

// We don't return anything in the next function so the return type is "void".
// Don't need to specify the return, it's just to show as an example, it'll be inferred.
function printResult(num: number): void {
    console.log("Result: " + num);
}

// undefined is a type to, however it's not usually useful.
function printResult2(num: number): undefined {
    console.log("Result: " + num);
    return;
}

printResult(add(5, 12));

// let combineValues; // type any
// let combineValues: Function; // Now it must be a function.
// let combineValues: () => number; // Takes a function and returns a number.
let combineValues: (a: number, b: number) => number; // Two parameters of type number and returns number.

combineValues = add;
// combineValues = printResult; // JS will not complain since it's still a function (if not specifying parameters and/or return).
// combineValues = 5; 
// Would create an error when calling combineValues since it's not a function.
console.log(combineValues(8, 8));

// callbacks
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

// TS will now result is a number, we specified it.
addAndHandle(10, 20, (result) => {
    console.log(result);
    // Since return type is void, it doesn't care about what happens there.
    // You could return something and no error would be found.
    return result;
})