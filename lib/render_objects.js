const Employee = require('./employee');
const Role = require('./role');
const Department = require('./department');

const returnAll = {
    departments: data => {
        let departments = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            const department = new Department(
                row.id, 
                row.name
            );
            departments.push(department);
        };
        return departments;
    },
    roles: data => {
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
       return roles;
    },
    employees: data => {
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
        return employees;
    }
};

module.exports = returnAll;