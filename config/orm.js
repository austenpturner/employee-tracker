const connection = require('./connection');

const printQuestionMarks = numOfVals => {
    let questionMarks = [];
    for (let i = 0; i < numOfVals; i++) {
      questionMarks.push('?');
    }
    return questionMarks.toString();
};

const orm = {
    selectAll: (table, cb) => {
        const queryString = `SELECT * FROM ${table}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        const queryString = `INSERT INTO ${table} (${cols}) VALUES (${printQuestionMarks(vals.length)})`;
        connection.query(queryString, vals, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    updateOne: (table, col, val, condition, cb) => {
        const queryString = `UPDATE ${table} SET ${col}=${val} WHERE ${condition}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    selectCondition: (cols, table, condition, cb) => {
        const queryString = `SELECT ${cols} FROM ${table} WHERE ${condition}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    deleteOne: (table, condition, cb) => {
        const queryString = `DELETE FROM ${table} WHERE ${condition}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    innerJoin: (cols, table1, table2, col1, col2, cb) => {
        const queryString = `SELECT ${cols} FROM ${table1} INNER JOIN ${table2} ON ${table1}.${col1} = ${table2}.${col2}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    innerJoinMulti: (tableColPairs, table1, table2, table3, col1, col2, col3, col4, cb) => {
        const queryString = `SELECT ${tableColPairs} FROM ${table1} INNER JOIN ${table2} 
        ON ${table1}.${col1} = ${table2}.${col2} INNER JOIN ${table3} ON ${table2}.${col3} = ${table3}.${col4}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    }
};

module.exports = orm;