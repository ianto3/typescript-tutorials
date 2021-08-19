class Department {
    // name field
    // private name: string;
    // private employees: string[] = []; // Can't be inherited
    protected employees: string[] = []; // Can be inherited but still can't be modified from outside code

    // shorthand initialization
    // initialize properties in the constructor
    constructor(private readonly id: string, public name: string) {
        // this.name = n;
    }

    // describe() {
    //     console.log("Department: " + this.name);
    // }

    // Specify to what this should refer to.
    // It knows it depends on a name property now.
    describe(this: Department) {
        console.log(`Department (${this.id}): ` + this.name);
    }

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

}

class AccountingDepartment extends Department {
    private lastReport: string;

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

    constructor(id:string, private reports: string[]){
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
}

const accounting = new Department("d1", "Accounting");
console.log(accounting);

const accounting2 = new ITDepartment("d2", ["Lewis"]);
console.log(accounting2);


const accounting3 = new AccountingDepartment("d2", []);
// console.log(accounting3.mostRecentReport); // Getter is called as a property, without (), returns our custom error
// accounting3.addReport("Something went wrong...");
accounting3.mostRecentReport = "Something went wrong..."; // = for setter methods, like a property
accounting3.printReports();
console.log(accounting3.mostRecentReport);
accounting3.addEmployee("Lewis");
accounting3.addEmployee("Anna");
accounting3.printEmployeeInformation();


accounting.addEmployee("Max");
accounting.addEmployee("Jane");

// If property is marked as private the following won't work.
// accounting.employees[2] = "Anna"; // Modifies the instance properties from outside!

accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = {describe: accounting.describe};

// We get an error in the next line if we specify
// the parameter this in describe method in Dep artment.
// Since it's not an instance of Department it knows we are
// violating what we specified as a parameter of describe.

// accountingCopy.describe(); // undefined, the object doesn't have a name property.

// Fix it adding a name property just like Department

const accountingCopy = {name: "any", describe: accounting.describe};
// accountingCopy.describe();