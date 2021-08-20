"use strict";
const names = [];
names[0];
const promise = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve("This is done!");
        }, 3000);
    }
    catch (_a) {
        reject("Woops");
    }
});
promise.then(data => {
    data.split(" ");
});
const mergedObj = merge({ name: "John" }, { age: 28 });
console.log(mergedObj.age);
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
function countAndPrint(element) {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
console.log(countAndPrint("Hi there!"));
console.log(countAndPrint(["Sports", "Music"]));
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
console.log(extractAndConvert({ name: "John" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("John");
textStorage.addItem("Jane");
textStorage.removeItem("John");
console.log(textStorage.getItems());
const textStorage2 = new DataStorage();
textStorage2.addItem(5);
textStorage2.addItem(2);
textStorage2.removeItem(5);
console.log(textStorage2.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const nameArray = ["John", "Laura"];
//# sourceMappingURL=app.js.map