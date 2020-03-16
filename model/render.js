const orm = require('../config/orm');
const cTable = require('console.table');
const Employee = require('../lib/employee');
const Role = require('../lib/role');
const Department = require('../lib/department');

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
    }
};

const renderTables = {
    departmentTable: () => {
        orm.selectAll('department', res => {
            const table = createTable.departmentTable(res);
            console.table('Departments', table);
        });
    },
    roleTable: () => {
        orm.selectAll('role', res => {
            const table = createTable.roleTable(res);
            console.table('Roles', table);
        });
    },
    employeeTable: () => {
        orm.selectAll('employee', res => {
            const table = createTable.employeeTable(res);
            console.table('Employees', table);
        });
    }
};

module.exports = renderTables;





