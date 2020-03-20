const getData = require('../lib/return_data');
const deleteInfo = require('../model/delete');
const inquirer = require('inquirer');
const inquireAgain = require('./again');

const inquireDelete = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which table would you like to delete from:',
            name: 'table',
            choices: [
                'Department',
                'Role',
                'Employee'
            ]
        }
    ]).then( ({table}) => {
        switch (table) {
            case 'Department':
                deletePrompt.inquireDepartmentDelete();
                break;
            case 'Role':
                deletePrompt.inquireRoleDelete();
                break;
            default: 
                deletePrompt.inquireEmployeeDelete();
                break;
        };
    });
};

const deletePrompt = {
    inquireDepartmentDelete: () => {
        getData.departments().then(res => {
            if (res === 'No departments found.') {
                return res;
            } else {
                const departmentNames = getData.departmentNames(res);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select a department to delete:',
                        name: 'name',
                        choices: departmentNames
                    }
                ]).then( ({name}) => {
                    deleteInfo.departmentTable(`name = '${name}'`, (res) => {
                        if (res.affectedRows > 0) {
                            console.log(`\n${name} department has been successfully deleted.\n`);
                        } else {
                            console.log(`\nSorry, ${name} department was not deleted.\n`)
                        }
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            }; 
        });
    },
    inquireRoleDelete: () => {
        getData.roles().then(res => {
            if (res === 'No roles found.') {
                return res;
            } else {
                const roleTitles = getData.roleTitles(res);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select a department to delete:',
                        name: 'title',
                        choices: roleTitles
                    }
                ]).then( ({title}) => {
                    deleteInfo.roleTable(`title = '${title}'`, (res) => {
                        if (res.affectedRows > 0) {
                            console.log(`\n${title} department has been successfully deleted.\n`);
                        } else {
                            console.log(`\nSorry, ${title} department was not deleted.\n`)
                        }
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            }; 
        });
    },
    inquireEmployeeDelete: () => {
        getData.employees().then(res => {
            if (res === 'No employees found.') {
                return res;
            } else {
                const employeeNames = getData.employeeNames(res);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select an employee to delete:',
                        name: 'name',
                        choices: employeeNames
                    }
                ]).then( ({name}) => {
                    const employeeId = name.split(' ').pop();
                    deleteInfo.employeeTable(`id = ${employeeId}`, (res) => {
                        if (res.affectedRows > 0) {
                            console.log(`\n${name} has been successfully deleted.\n`);
                        } else {
                            console.log(`\n${name} was not deleted.\n`)
                        }
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            }; 
        });
    }
};

module.exports = inquireDelete;