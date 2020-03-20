const select = require('../model/select');
const returnAll = require('./return_objects');

const getData = {
    departmentNames: departments => {
        const departmentNames = [];
        for (let i = 0; i < departments.length; i++) {
            let name = departments[i].name;
            departmentNames.push(name);
        };
        return departmentNames;
    },
    departmentId: (departments, name) => {
        for (let i = 0; i < departments.length; i++) {
            let department = departments[i];
            if (department.name === name) {
                const departmentId = department.id;
                return departmentId;
            };
        };
    },
    roleTitles: roles => {
        const roleTitles = [];
        for (let i = 0; i < roles.length; i++) {
            let title = roles[i].title;
            roleTitles.push(title);
        };
        return roleTitles;
    },
    roleId: (roles, title) => {
        for (let i = 0; i < roles.length; i++) {
            let role = roles[i];
            if (role.title === title) {
                const roleId = role.id;
                return roleId;
            };
        };
    },
    employeeNames: employees => {
        const employeeNames = [];
        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];
            let firstName = employee.firstName;
            let lastName = employee.lastName;
            let employeeId = employee.id;
            let name = `${firstName} ${lastName}, id: ${employeeId}`;
            employeeNames.push(name);
        };
        return employeeNames;
    },
    departments: () => {
        return new Promise((resolve, reject) => {
            select.departmentTable(res => {
                const departments = returnAll.departments(res);
                if (departments.length > 0) {
                    resolve(departments);
                } else {
                    console.log('\nNo departments found.\n');
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                };
            });
        });
    },
    roles: () => {
        return new Promise((resolve, reject) => {
            select.roleTable(res => {
                const roles = returnAll.roles(res);
                if (roles.length > 0) {
                    resolve(roles);
                } else {
                    console.log('\nNo roles found.\n');
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                };
            });
        });
    },
    employees: () => {
        return new Promise((resolve, reject) => {
            select.employeeTable(res => {
                const employees = returnAll.employees(res);
                if (employees.length > 0) {
                    resolve(employees);
                } else {
                    console.log('\nNo employees found.\n');
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                };
            });
        });
    }
};

module.exports = getData;