"use strict";
var _a;
const e1 = {
    name: "John",
    privileges: ["Server"],
    startDate: new Date()
};
function printEmployeeInformation(emp) {
    console.log("Name " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    ;
    if ("startDate" in emp) {
        console.log("Start Date: " + emp.startDate);
    }
    ;
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
    loadCargo(amount) {
        console.log("Loading cargo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicule(vehicule) {
    vehicule.drive();
    if (vehicule instanceof Truck) {
        vehicule.loadCargo(1000);
    }
}
useVehicule(v1);
useVehicule(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving with speed at " + speed + " km/h");
}
moveAnimal({ type: "bird", flyingSpeed: 60 });
const paragraph = document.querySelector("p");
const paragraph1 = document.getElementById("message-output");
const inputElement = document.getElementById("user-input");
inputElement.value = "Hi there!";
;
const errorBag = {
    email: "Not a valid email.",
    username: "Must start with a character!"
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const fetchedUserData = {
    id: "u1",
    name: "John",
    job: { title: "CEO", description: "My own company" }
};
console.log(fetchedUserData.job.title);
console.log(fetchedUserData.job && fetchedUserData.job.title);
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput = null;
const storedData = userInput || "DEFAULT";
const storedData2 = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
//# sourceMappingURL=app.js.map