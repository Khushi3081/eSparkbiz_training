
//pagination database
var db_connect = function database() {
    const sql = require('mysql2');
    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'student_record'
    });

    connection.connect();
    console.log('Connected to the student database');
}
module.exports.ab = db_connect;


//job_application_form database
var db_connection = function database_c() {
    const sql = require('mysql2');
var connection = sql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "job_application_form"
})
connection.connect();
console.log('Connected to the candidate database');
};
module.exports.abc = db_connection;