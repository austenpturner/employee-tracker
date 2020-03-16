const orm = require('../config/orm');

const insertIntoTable = {
    departmentTable: (cols, vals, cb) => {
        orm.insertOne('department', cols, vals, (res) => {
            cb(res);
        });
    },
    roleTable: (cols, vals, cb) => {
        orm.insertOne('role', cols, vals, (res) => {
            cb(res);
        });
    },
    employeeTable: (cols, vals, cb) => {
        orm.insertOne('employee', cols, vals, (res) => {
            cb(res);
        });
    }
};

module.exports = insertIntoTable;