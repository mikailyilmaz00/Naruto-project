const mysql = require('mysql2');
const { error } = require('console');
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'x',
    database: 'naruto_db'
});

// connecting to db
database.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database');
        return;
    }
    console.log('Connected to MySQL database.');
});
module.exports = database;
