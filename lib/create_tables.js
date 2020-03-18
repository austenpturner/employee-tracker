const cTable = require('console.table');
const Employee = require('./employee');
const Role = require('./role');
const Department = require('./department');

const createTable = {
    departmentTable: data => {
        let departments = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const department = new Department(
                row.id, 
                row.name
            );
            departments.push(department);
        };
        const table = cTable.getTable(departments);
        return table;
    },
    roleTable: data => {
        let roles = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const role = new Role(
                row.id, 
                row.title, 
                row.salary, 
                row.department_id
            );
            roles.push(role);
        };
        const table = cTable.getTable(roles);
        return table;
    },
    employeeTable: data => {
        let employees = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const employee = new Employee(
                row.id, 
                row.first_name, 
                row.last_name, 
                row.role_id,
                row.manager_id
            );
            employees.push(employee);
        };
        const table = cTable.getTable(employees);
        return table;
    },
    employeesByManagerTable: data => {
        let employees = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const employee = { 
                'First Name': row.first_name, 
                'Last Name': row.last_name 
            };
            employees.push(employee);
        };
        const table = cTable.getTable(employees);
        return table;
    },
    employeeInfoTable: data => {
        let employees = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const employee = {
                'First Name': row.first_name,
                'Last Name': row.last_name,
                'Role': row.title,
                'Department': row.name
            };
            employees.push(employee);
        };
        const table = cTable.getTable(employees);
        return table;
    },
    departmentRolesTable: data => {
        let roles = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const role = {
                'Department': row.name,
                'Role': row.title
            };
            roles.push(role);
        }
        const table = cTable.getTable(roles);
        return table;
    },
    employeeRolesTable: data => {
        let employees = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const employee = {
                'Role': row.title,
                'Employee': `${row.first_name} ${row.last_name}`
            };
            employees.push(employee);
        };
        const table = cTable.getTable(employees);
        return table;
    }
};

module.exports = createTable;