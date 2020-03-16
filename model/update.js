const orm = require('../config/orm');

const updateTable = {
    departmentTable: (col, val, location, cb) => {
        orm.update('department', col, val, location, (res) => {
            cb(res);
        });
    },
    roleTable: (col, val, location, cb) => {
        orm.update('role', col, val, location, (res) => {
            cb(res);
        });
    },
    employeeTable: (col, val, location, cb) => {
        orm.update('employee', col, val, location, (res) => {
            cb(res);
        });
    }
};

module.exports = updateTable;