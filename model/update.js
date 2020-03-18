const orm = require('../config/orm');

const updateTable = {
    departmentTable: (col, val, condition, cb) => {
        orm.updateOne('department', col, val, condition, (res) => {
            cb(res);
        });
    },
    roleTable: (col, val, condition, cb) => {
        orm.updateOne('role', col, val, condition, (res) => {
            cb(res);
        });
    },
    employeeTable: (col, val, condition, cb) => {
        orm.updateOne('employee', col, val, condition, (res) => {
            cb(res);
        });
    }
};

module.exports = updateTable;