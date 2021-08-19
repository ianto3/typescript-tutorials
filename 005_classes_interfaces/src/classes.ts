// Have to specify it's an abstract class so as to use abstract methods inside.
abstract class Department { 
    // name field
    // private name: string;
    // private employees: string[] = []; // Can't be inherited
    protected employees: string[] = []; // Can be inherited but still can't be modified from outside code
    static fiscalYear = 2021;

    // shorthand initialization
    // initialize properties in the constructor
    constructor(protected readonly id: string, public name: string) {
        // this.name = n;
    }

    // Static methods are used on the Class itself and not through instances.
    static createEmployee(name: string){
        return {name: name};
    }

    // describe() {
    //     console.log("Department: " + this.name);
    // }

    // Specify to what this should refer to.
    // It knows it depends on a name property now.
    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ` + this.name);
    // }

    // Abstract
    abstract describe(this: Department): void;

    addEmployee(employee:string) {
        this.employees.push(employee);
    }

    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

// Inheritance
class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT"); // Hardcoding name property as "IT"
        this.admins = admins;
    }

    describe(){
        console.log("IT Department - ID: " + this.id);
    }

}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;
    // Static: only accesible from the class itself.
    // Private: only accesible from within the class itself.
    // In instance we store an AccountingDepartment instance.

    // Getter to retrieve private property with some logic.
    get mostRecentReport() {
        if (this.lastReport){
            return this.lastReport;
        }
        throw new Error("No report found");
    }

    set mostRecentReport(value: string) {
        if (!value){
            throw new Error("Please pass a value.");
        }
        this.addReport(value);
    }

    private constructor(id:string, private reports: string[]){
        super(id, "IT");
        this.lastReport = reports[0];
    }

    addEmployee(name: string) {
        if (name === "Lewis") {
            return
        }
        this.employees.push(name)
    }

    addReport(text:string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    static getInstance() {
        if (this.instance){
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }

    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
}

// Using a static method.
// Used directly on the Class itself, not an instance.
const employee1 = Department.createEmployee("James");
console.log(employee1);

// const accounting = new Department("d1", "Accounting");
// console.log(accounting);

const accounting2 = new ITDepartment("d2", ["Lewis"]);
console.log(accounting2);

// Create instance using private constructor, singleton pattern
// You can create multiple times but it will always be the same instance.
const accounting3 = AccountingDepartment.getInstance();
// console.log(accounting3.mostRecentReport); // Getter is called as a property, without (), returns our custom error
// accounting3.addReport("Something went wrong...");
accounting3.mostRecentReport = "Something went wrong..."; // = for setter methods, like a property
accounting3.printReports();
console.log(accounting3.mostRecentReport);
accounting3.addEmployee("Lewis");
accounting3.addEmployee("Anna");
accounting3.printEmployeeInformation();
accounting3.describe();


// accounting.addEmployee("Max");
// accounting.addEmployee("Jane");

// If property is marked as private the following won't work.
// accounting.employees[2] = "Anna"; // Modifies the instance properties from outside!

// accounting.describe();
// accounting.printEmployeeInformation();

// const accountingCopy = {describe: accounting.describe};

// We get an error in the next line if we specify
// the parameter this in describe method in Dep artment.
// Since it's not an instance of Department it knows we are
// violating what we specified as a parameter of describe.

// accountingCopy.describe(); // undefined, the object doesn't have a name property.

// Fix it adding a name property just like Department

// const accountingCopy = {name: "any", describe: accounting.describe};
// accountingCopy.describe();