const inquirer = require('inquirer');
const render = require('./model/render');
const insertInto = require('./model/insert');
const update = require('./model/update');

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




