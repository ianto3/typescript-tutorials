"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department (${this.id}): ` + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
        this.admins = admins;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "IT");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass a value.");
        }
        this.addReport(value);
    }
    addEmployee(name) {
        if (name === "Lewis") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
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
accounting3.mostRecentReport = "Something went wrong...";
accounting3.printReports();
console.log(accounting3.mostRecentReport);
accounting3.addEmployee("Lewis");
accounting3.addEmployee("Anna");
accounting3.printEmployeeInformation();
accounting.addEmployee("Max");
accounting.addEmployee("Jane");
accounting.describe();
accounting.printEmployeeInformation();
const accountingCopy = { name: "any", describe: accounting.describe };
//# sourceMappingURL=app.js.map