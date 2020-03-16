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
        const queryString = `INSERT INTO ${table} (${cols.toString()}) WHERE (${printQuestionMarks(vals.length)})`;
        connection.query(queryString, vals, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    update: (table, col, val, location, cb) => {
        const queryString = `UPDATE ${table} SET ${col}=${val} WHERE ${location}`;
        connection.query(queryString, (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    }
};

module.exports = orm;