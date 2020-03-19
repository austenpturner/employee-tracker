const cTable = require('console.table');
const select = require('../model/select');
const join = require('../model/join');
const returnAll = require('./render_objects');

const renderTable = {
    departmentTable: () => {
        select.departmentTable(res => {
            const departments = returnAll.departments(res);
            const table = cTable.getTable(departments);
            console.table('\nDepartments:\n', table);
        });
    },
    roleTable: () => {
        select.roleTable(res => {
            const roles = returnAll.roles(res);
            const table = cTable.getTable(roles);
            console.table('\nRoles:\n', table);
        });
    },
    employeeTable: () => {
        select.employeeTable(res => {
            const employees = returnAll.employees(res);
            const table = cTable.getTable(employees);
            console.table('\nEmployees:\n', table);
        });
    },
    employeesByManagerTable: id => {
        select.employeeColumn(`first_name, last_name`, `manager_id = ${id}`, (res) => {
            let employees = [];
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                const employee = { 
                    'First Name': row.first_name, 
                    'Last Name': row.last_name 
                };
                employees.push(employee);
            };
            const table = cTable.getTable(employees);
            console.table(`\nEmployees Under Manager #${id}:\n`, table);
        });
    },
    employeeInfoTable: () => {
        join.allTables(`department.name, role.title, employee.first_name, employee.last_name`,
        `id`, `department_id`, `id`, `role_id`, (res) => {
            let employees = [];
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                const employee = {
                    'First Name': row.first_name,
                    'Last Name': row.last_name,
                    'Role': row.title,
                    'Department': row.name
                };
                employees.push(employee);
            };
            const table = cTable.getTable(employees);
            console.table(`\nEmployees by Role and Department:\n`, table);
        });
    },
    departmentRolesTable: () => {
        join.departmentAndRole(`department.name, role.title`, `id`, `department_id`, 
            (res) => {
            let roles = [];
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                const role = {
                    'Department': row.name,
                    'Role': row.title
                };
                roles.push(role);
            }
            const table = cTable.getTable(roles);
            console.table(`\nDepartments and Associated Roles:\n`, table);
        });
    },
    employeeRolesTable: () => {
        join.roleAndEmployee(`role.title, employee.first_name, employee.last_name`, `id`, `role_id`, 
        (res) => {
            let employees = [];
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                const employee = {
                    'Role': row.title,
                    'Employee': `${row.first_name} ${row.last_name}`
                };
                employees.push(employee);
            };
            const table = cTable.getTable(employees);
            console.log(`\nAll Employees by Role:\n`, table);
        });
    }
};

module.exports = renderTable;





