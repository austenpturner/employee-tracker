const inquirer = require('inquirer');
const render = require('./lib/render_tables');
const insertInto = require('./model/insert');
const updateInfo = require('./model/update');
const deleteInfo = require('./model/delete');

const inquireAction = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Welcome! 
This program allows you to interact with your company database. 
What would you like to do?`,
            name: 'action',
            choices: [
                'View a table',
                'Add to a table',
                'Update a table'
            ]
        }
    ]).then( ({action}) => {
        if (action ==='View a table') {
            inquireTableView();
        } else if (action === 'Add to a table') {
            inquireTableInsert();
        } else {
            inquireTableUpdate();
        }
    })
};

const inquireTableView = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Which table would you like to view?`,
            name: 'table',
            choices: [
                'Departments',
                'Roles',
                'Employees'
            ]
        }
    ]).then( ({table}) => {
        if (table === 'Departments') {
            render.departmentTable();
        } else if (table === 'Roles') {
            render.roleTable();
        } else {
            render.employeeTable();
        }
    });
};

const inquireTableInsert = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Which table you you like to add to?`,
            name: 'table',
            choices: [
                'Departments',
                'Roles',
                'Employees'
            ]
        }
    ]).then( ({table}) => {
        if (table === 'Departments') {
            inquireDepartmentInfo();
        } else if (table === 'Roles') {
            inquireRoleInfo();
        } else {
            inquireEmployeeInfo();
        }
    });
};

const inquireDepartmentInfo = () => {
    inquirer.prompt([
        {
            message: `Enter the department you want to add:`,
            name: 'newDepartment'
        }
    ]).then( ({newDepartment}) => {
        insertInto.departmentTable('name', 
        [`${newDepartment}`], 
        (err, data) => {
            console.log(`Inserted department.`);             
        });
    });
};

const inquireRoleInfo = () => {
    inquirer.prompt([
        {
            message: `Enter the role you want to add:`,
            name: 'newRole'
        },
        {
            message: `Enter role salary:`,
            name: `newSalary`
        }
    ]).then( ({newRole, newSalary}) => {
        insertInto.roleTable('name', 
        [`${newRole}, ${newSalary}`], 
        (err, data) => {
            console.log(`Inserted role.`);
        });
    });
};

const inquierAgain = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to select another action?',
            name: 'resume'
        }
    ]).then( ({resume}) => {
        if (resume) {
            inquireAction();
        } else {
            console.log(`Thank you for using Employee Tracker!`);
            process.exit();
        }
    });
};

inquireAction();




