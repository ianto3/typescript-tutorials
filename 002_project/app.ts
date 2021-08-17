// Unknown type
let userInput: unknown; // We don't know what the user will enter.
let userName: string;

userInput = 5; // allowed
userInput = "Max"; // allowed

// userName = userInput; // Error, type "any" would allow it.

// To assign a value of fixed type to unknown you need to type check first.
if (typeof userInput === "string") {
    userName = userInput;
}

// unknown is better than any, it enforces type checking meaning you know what to expect.

// Never type
// We know it will never return anything.
// By default it would infer void.
// It makes it very clear that it's intended to NEVER return anything.
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}

generateError("Error ocurred!", 500);