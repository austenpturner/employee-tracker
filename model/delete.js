const orm = require('../config/orm');

const deleteFromTable = {
    departmentTable: (condition, cb) => {
        orm.deleteOne('department', condition, (res) => {
            cb(res);
        });
    },
    roleTable: (condition, cb) => {
        orm.deleteOne('role', condition, (res) => {
            cb(res);
        });
    },
    employeeTable: (condition, cb) => {
        orm.deleteOne('employee', condition, (res) => {
            cb(res);
        });
    }
};

module.exports = deleteFromTable;