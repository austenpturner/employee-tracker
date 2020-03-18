const select = require('../model/select');
const join = require('../model/join');
const createTable = require('./create_tables');

const render = {
    departmentTable: () => {
        select.departmentTable(res => {
            const table = createTable.departmentTable(res);
            console.table('\nDepartments:\n', table);
        });
    },
    roleTable: () => {
        select.roleTable(res => {
            const table = createTable.roleTable(res);
            console.table('\nRoles:\n', table);
        });
    },
    employeeTable: () => {
        select.employeeTable(res => {
            const table = createTable.employeeTable(res);
            console.table('\nEmployees:\n', table);
        });
    },
    employeesByManagerTable: id => {
        select.employeeColumn(`first_name, last_name`, `manager_id = ${id}`, (res) => {
            const table = createTable.employeesByManagerTable(res);
            console.table(`\nEmployees Under Manager #${id}:\n`, table);
        });
    },
    employeeInfoTable: () => {
        join.allTables(`department.name, role.title, employee.first_name, employee.last_name`,
        `id`, `department_id`, `id`, `role_id`, (res) => {
            const table = createTable.employeeInfoTable(res);
            console.table(`\nEmployees by Role and Department:\n`, table);
        });
    },
    departmentRolesTable: () => {
        join.departmentAndRole(`department.name, role.title`, `id`, `department_id`, 
            (res) => {
            const table = createTable.departmentRolesTable(res);
            console.table(`\nDepartments and Associated Roles:\n`, table);
        });
    },
    employeeRolesTable: () => {
        join.roleAndEmployee(`role.title, employee.first_name, employee.last_name`, `id`, `role_id`, 
        (res) => {
            const table = createTable.employeeRolesTable(res);
            console.log(`\nAll Employees by Role:\n`, table);
        });
    }
};

module.exports = render;





