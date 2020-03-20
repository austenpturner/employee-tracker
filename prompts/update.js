const getData = require('../lib/return_data');
const updateTable = require('../model/update');
const inquirer = require('inquirer');
const inquireAgain = require('./again');

const inquireUpdate = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Select a table to update:`,
            name: 'table',
            choices: [
                'Departments',
                'Roles',
                'Employees'
            ]
        }
    ]).then( ({table}) => {
        if (table === 'Departments') {
            updatePrompt.inquireDepartmentUpdate();
        } else if (table === 'Roles') {
            updatePrompt.inquireRoleUpdate();
        } else {
            updatePrompt.inquireEmployeeUpdate();
        }
    });
};

const updatePrompt = {
    inquireDepartmentUpdate: () => {
        getData.departments().then(res => {
            if (res === 'No departments found.') {
                return res;
            } else {
                const departments = res;
                const departmentNames = getData.departmentNames(departments);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select a department to update:',
                        name: 'department',
                        choices: departmentNames
                    },
                    {
                        type: 'input',
                        message: 'Enter new department name:',
                        name: 'newDepartment'
                    }
                ]).then(({department, newDepartment}) => {
                    updateTable.departmentTable(`name`, `'${newDepartment}'`,
                    `name = '${department}'`, () => {
                        console.log(`\n${department} successfully updated to ${newDepartment}.\n`);
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            };
        });
    },
    inquireRoleUpdate: () => {
        getData.roles().then(res => {
            if (res === 'No roles found.') {
                return res;
            } else {
                const roles = res;
                const roleTitles = getData.roleTitles(roles);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select a role to update:',
                        name: 'role',
                        choices: roleTitles
                    },
                    {
                        type: 'list',
                        message: 'Select a role value to update:',
                        name: 'column',
                        choices: [
                            'title',
                            'salary'
                        ]
                    },
                    {
                        type: 'input',
                        message: 'Enter updated value:',
                        name: 'value'
                    }
                ]).then(({role, column, value}) => {
                    if (column === 'salary') {
                        value = parseInt(value);
                    } else {
                        value = `'${value}'`;
                    }
                    updateTable.roleTable(column, value, `title = '${role}'`,  () => {
                        console.log(`\n${role}'s ${column} was successfully updated to ${value}.\n`);
                    });
                    setTimeout( () => {
                        inquireAgain();
                    }, 500);
                });
            };
        });
    },
    inquireEmployeeUpdate: () => {
        getData.employees().then(res => {
            if (res === 'No employees found.') {
                return res;
            } else {
                const employees = res;
                const employeeNames = getData.employeeNames(employees);
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Select an employee to update:',
                        name: 'employeeName',
                        choices: employeeNames
                    },
                    {
                        type: 'list',
                        message: 'Select a employee value to update:',
                        name: 'column',
                        choices: [
                            'First name',
                            'Last name',
                            'Role',
                            'Manager Id'
                        ]
                    }
                ]).then(({employeeName, column}) => {
                    const employeeId = employeeName.split(' ').pop();
                    if (column === 'Role') {
                        getData.roles().then(res => {
                            if (res === 'No roles found.') {
                                return res;
                            } else {
                                const roles = res;
                                const roleTitles = getData.roleTitles(roles);
                                inquirer.prompt([
                                    {
                                        type: 'list',
                                        message: 'Select a new role:',
                                        name: 'role',
                                        choices: roleTitles
                                    }
                                ]).then(({role}) => {
                                    const roleId = getData.roleId(roles, role);
                                    updateTable.employeeTable('role_id', roleId, `id = ${employeeId}`, () => {
                                        console.log(`\n${column} was updated to ${role}.\n`);
                                    });
                                    setTimeout( () => {
                                        inquireAgain();
                                    }, 500);
                                });
                            };
                        });
                    } else {
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: `Enter new value for employee's ${column}:`,
                                name: 'value'
                            }
                        ]).then(({value}) => {
                            let colName;
                            if (column === 'Manager Id') {
                                colName = 'manager_id';
                                value = parseInt(value);
                            } else if (column === 'First name') {
                                colName = 'first_name';
                                value = `'${value}'`;
                            } else if (column === 'Last name') {
                                colName = 'last_name';
                                value = `'${value}'`;
                            };
                            updateTable.employeeTable(colName, value, `id = ${employeeId}`, () => {
                                console.log(`\n${column} was updated to ${value}.\n`);
                            });
                            setTimeout( () => {
                                inquireAgain();
                            }, 500);
                        });
                    };
                });
            };
        });
    }
};

module.exports = inquireUpdate;
