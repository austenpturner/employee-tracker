const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company_db"
});

// Connect to mysql database
connection.connect( err => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
});

module.exports = connection;