const orm = require('../config/orm');

const select = {
    departmentTable: cb => {
        orm.selectAll('department', res => {
            cb(res);
        });
    },
    roleTable: cb => {
        orm.selectAll('role', res => {
            cb(res);
        });
    },
    employeeTable: cb => {
        orm.selectAll('employee', res => {
            cb(res);
        });
    },
    departmentColumn: (cols, condition, cb) => {
        orm.selectCondition(cols, 'department', condition, (res) => {
            cb(res);
        });
    },
    roleColumn: (cols, condition, cb) => {
        orm.selectCondition(cols, 'role', condition, (res) => {
            cb(res);
        });
    },
    employeeColumn: (cols, condition, cb) => {
        orm.selectCondition(cols, 'employee', condition, (res) => {
            cb(res);
        });
    }
};

module.exports = select;