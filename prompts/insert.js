const getData = require('../lib/return_data');
const insertInto = require('../model/insert');
const inquirer = require('inquirer');

const inquireInsert = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Select a table to add to:`,
            name: 'table',
            choices: [
                'Departments',
                'Roles',
                'Employees'
            ]
        }
    ]).then( ({table}) => {
        if (table === 'Departments') {
            insertPrompt.inquireDepatmentInsert();
        } else if (table === 'Roles') {
            insertPrompt.inquireRoleInsert();
        } else {
            insertPrompt.inquireEmployeeInsert();
        }
    });
};

const insertPrompt = {
    inquireDepatmentInsert: () => {
        inquirer.prompt([
            {
                type: 'input',
                message: `Enter the name of the department you want to add:`,
                name: 'name'
            }
        ]).then( ({name}) => {
            insertInto.departmentTable('name', 
            [name], 
            () => {
                console.log(`\nDepartment added to database.\n`);             
            });
            setTimeout( () => {
                inquireAgain();
            }, 500);
        });
    },
    inquireRoleInsert: () => {
        getData.departments().then(res => {
            if (res === 'No departments found.') {
                return res;
            } else {
                const departments = res;
                const departmentNames = getData.departmentNames(departments);
                inquirer.prompt([
                    {
                        type: 'input',
                        message: `Enter the title of the role you want to add:`,
                        name: 'title'
                    },
                    {
                        type: 'number',
                        message: `Enter the salary for this role:`,
                        name: `salary`
                    },
                    {
                        type: 'list',
                        message: `Select the department this role belongs to:`,
                        name: 'department',
                        choices: departmentNames
                    }
                ]).then( ({title, salary, department}) => {
                    const departmentId = getData.departmentId(departments, department);
                    insertInto.roleTable(`title, salary, department_id`, 
                    [title, salary, departmentId], 
                    () => {
                        console.log(`\nRole added to database.\n`);
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                })
            }
        });
            
    },
    inquireEmployeeInsert: () => {
        getData.roles().then(res => {
            if (res === 'No roles found.') {
                return res;
            } else {
                const roles = res;
                const roleTitles = getData.roleTitles(roles);
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter employee\'s first name:',
                        name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'Enter employee\'s last name:',
                        name: 'lastName'
                    },
                    {
                        type: 'list',
                        message: 'Select employee\'s role:',
                        name: 'role',
                        choices: roleTitles
                    },
                    {
                        type: 'number',
                        message: 'Enter id of employee\'s manager:',
                        name: 'managerId'
                    }
                ]).then( ({firstName, lastName, role, managerId}) => {
                    const roleId = getData.roleId(roles, role);
                    insertInto.employeeTable(`first_name, last_name, role_id, manager_id`, 
                    [firstName, lastName, roleId, managerId], 
                    () => {
                        console.log(`\nEmployee added to database.\n`);
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            }
        });
    }
};

module.exports = inquireInsert;