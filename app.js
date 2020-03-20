const inquirer = require('inquirer');
const returnAll = require('./lib/return_objects');
const render = require('./lib/render_tables');
const select = require('./model/select');
const insertInto = require('./model/insert');
const updateTable = require('./model/update');
const deleteInfo = require('./model/delete');

const startApp = () => {
    console.log(`\nWelcome to Employee Tracker! 
This program allows you to interact with yourbase.\n`);
    inquireAction();
};

const inquireAction = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Please select an action:`,
            name: 'action',
            choices: [
                'View',
                'Add',
                'Update',
                'Delete',
                'Exit'
            ]
        }
    ]).then( ({action}) => {
        if (action ==='View') {
            inquireView();
        } else if (action === 'Add') {
            inquireInsert();
        } else if (action === 'Update') {
            inquireUpdate();
        } else if (action === 'Delete') {
            inquireDelete();
        } else {
            console.log('Thanks for using Employee Tracker.')
            process.exit();
        }
    })
};

const getDepartmentNames = departments => {
    const departmentNames = [];
    for (let i = 0; i < departments.length; i++) {
        let name = departments[i].name;
        departmentNames.push(name);
    };
    return departmentNames;
};

const getDepartmentId = (departments, name) => {
    for (let i = 0; i < departments.length; i++) {
        let department = departments[i];
        if (department.name === name) {
            const departmentId = department.id;
            return departmentId;
        };
    };
};

const getRoleTitles = roles => {
    const roleTitles = [];
    for (let i = 0; i < roles.length; i++) {
        let title = roles[i].title;
        roleTitles.push(title);
    };
    return roleTitles;
};

const getRoleId = (roles, title) => {
    for (let i = 0; i < roles.length; i++) {
        let role = roles[i];
        if (role.title === title) {
            const roleId = role.id;
            return roleId;
        };
    };
};

const getEmployeeNames = employees => {
    const employeeNames = [];
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        let firstName = employee.firstName;
        let lastName = employee.lastName;
        let employeeId = employee.id;
        let name = `${firstName} ${lastName}, id: ${employeeId}`;
        employeeNames.push(name);
    };
    return employeeNames;
};

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        select.departmentTable(res => {
            const departments = returnAll.departments(res);
            if (departments.length > 0) {
                resolve(departments);
            } else {
                console.log('\nNo departments found.\n');
                setTimeout( () => {
                    inquireAgain();
                }, 500);
            };
        });
    });
};

const getRoles = () => {
    return new Promise((resolve, reject) => {
        select.roleTable(res => {
            const roles = returnAll.roles(res);
            if (roles.length > 0) {
                resolve(roles);
            } else {
                console.log('\nNo roles found.\n');
                setTimeout( () => {
                    inquireAgain();
                }, 500);
            };
        });
    });
};

const getEmployees = () => {
    return new Promise((resolve, reject) => {
        select.employeeTable(res => {
            const employees = returnAll.employees(res);
            if (employees.length > 0) {
                resolve(employees);
            } else {
                console.log('\nNo employees found.\n');
                setTimeout( () => {
                    inquireAgain();
                }, 500);
            };
        });
    });
};

// --------------------------- UPDATE ------------------------ //

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
            inquireDepartmentUpdate();
        } else if (table === 'Roles') {
            inquireRoleUpdate();
        } else {
            inquireEmployeeUpdate();
        }
    });
};

const inquireDepartmentUpdate = () => {
    getDepartments().then(res => {
        if (res === 'No departments found.') {
            return res;
        } else {
            const departments = res;
            const departmentNames = getDepartmentNames(departments);
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
};

const inquireRoleUpdate = () => {
    getRoles().then(res => {
        if (res === 'No roles found.') {
            return res;
        } else {
            const roles = res;
            const roleTitles = getRoleTitles(roles);
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
                    console.log(`${role}'s ${column} was successfully updated to ${value}.`);
                });
                setTimeout( () => {
                    inquireAgain();
                }, 500);
            });
        };
    });
};

const inquireEmployeeUpdate = () => {
    getEmployees().then(res => {
        if (res === 'No employees found.') {
            return res;
        } else {
            const employees = res;
            const employeeNames = getEmployeeNames(employees);
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
                    getRoles().then(res => {
                        if (res === 'No roles found.') {
                            return res;
                        } else {
                            const roles = res;
                            const roleTitles = getRoleTitles(roles);
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    message: 'Select a new role:',
                                    name: 'role',
                                    choices: roleTitles
                                }
                            ]).then(({role}) => {
                                const roleId = getRoleId(roles, role);
                                updateTable.employeeTable('role_id', roleId, `id = ${employeeId}`, () => {
                                    console.log(`${column} was updated to ${role}.`);
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
                            console.log(`${column} was updated to ${value}.`);
                        });
                        setTimeout( () => {
                            inquireAgain();
                        }, 500);
                    });
                };
            });
        };
    });
};

// --------------------------- INSERT------------------------ //

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
            inquireDepatmentInsert();
        } else if (table === 'Roles') {
            inquireRoleInsert();
        } else {
            inquireEmployeeInsert();
        }
    });
};

const inquireDepatmentInsert = () => {
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
};

const inquireRoleInsert = () => {
    getDepartments().then(res => {
        if (res === 'No departments found.') {
            return res;
        } else {
            const departments = res;
            const departmentNames = getDepartmentNames(departments);
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
                const departmentId = getDepartmentId(departments, department);
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
        
};

const inquireEmployeeInsert = () => {
    getRoles().then(res => {
        if (res === 'No roles found.') {
            return res;
        } else {
            const roles = res;
            const roleTitles = getRoleTitles(roles);
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
                const roleId = getRoleId(roles, role);
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
};

// --------------------------- VIEW ------------------------ //

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

// --------------------------- DELETE ------------------------ //

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
                inquireDepartmentDelete();
                break;
            case 'Role':
                inquireRoleDelete();
                break;
            default: 
                inquireEmployeeDelete();
                break;
        };
    });
};

const inquireDepartmentDelete = () => {
    getDepartments().then(res => {
        if (res === 'No departments found.') {
            return res;
        } else {
            const departmentNames = getDepartmentNames(res);
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
                        console.log(`${name} department has been successfully deleted.`);
                    } else {
                        console.log(`Sorry, ${name} department was not deleted.`)
                    }
                });
                setTimeout( () => {
                    inquireAgain();
                }, 500);
            });
        }; 
    });
};

const inquireRoleDelete = () => {
    getRoles().then(res => {
        if (res === 'No roles found.') {
            return res;
        } else {
            const roleTitles = getRoleTitles(res);
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
};

const inquireEmployeeDelete = () => {
    getEmployees().then(res => {
        if (res === 'No employees found.') {
            return res;
        } else {
            const employeeNames = getEmployeeNames(res);
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
};

const inquireAgain = () => {
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
            console.log(`\nThank you for using Employee Tracker!\n`);
            process.exit();
        }
    });
};

startApp();




