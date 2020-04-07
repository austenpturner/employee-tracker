const inquirer = require('inquirer');
const render = require('../lib/render_tables');

const inquireView = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `What would you like to view?`,
            name: 'view',
            choices: [
                'Departments Table',
                'Roles Table',
                'Employees Table',
                'Employee Info',
                'Employee Roles',
                'Department Roles'
            ]
        }
    ]).then( ({view}) => {
        switch (view) {
            case 'Departments Table':
                render.departmentTable();
                break;
            case 'Roles Table':
                render.roleTable();
                break;
            case 'Employees Table':
                render.employeeTable();
                break;
            case 'Employee Info':
                render.employeeInfoTable();
                break;
            case 'Employee Roles':
                render.employeeRolesTable();
                break;
            default:
                render.departmentRolesTable();
                break;
        }
        setTimeout( () => {
            inquireAgain();
        }, 500);
    });
};

module.exports = inquireView;