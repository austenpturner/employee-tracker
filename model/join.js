const orm = require('../config/orm');

const join = {
    roleAndEmployee: (cols, col1, col2, cb) => {
        orm.innerJoin(cols, 'role', 'employee', col1, col2, (res) => {
            cb(res);
        });
    },
    departmentAndRole: (cols, col1, col2, cb) => {
        orm.innerJoin(cols, 'department', 'role', col1, col2, (res) => {
            cb(res);
        });
    },
    allTables: (tableColPairs, col1, col2, col3, col4, cb) => {
        orm.innerJoinMulti(tableColPairs, 'department', 'role', 'employee', col1, col2, col3, col4, (res) => {
            cb(res);
        });
    }
};

module.exports = join;