const express = require("express");

const cookie_parser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require('mysql2');
const body_parser = require("body-parser");
const { render } = require("ejs");
const port = 8041;
const app = express();
app.set("view engine", "ejs");
let total = 0;
let Total_table = 0;
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "student_record"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
});


app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());


// /getdata
module.exports = (req, res) => {


    const studentdatabse = require('./dbfile')
    studentdatabse.ab();

    const token = req.cookies['token'];

    if (token) {
        const data_token = jwt.verify(token, process.env.secret_key);


        count = "select count(id) as count from student_record.student_express";
        connection.query(count, function (err, result) {
            if (err) return console.log(err.message);
            total = result[0].count;
            Total_table = Math.ceil(total / 100);

        })

        const limit = 100;
        let pageone = req.query.page || 1;
        //console.log(pageone);
        if(pageone == 0){
           res.send("enter valid number");
        }
        
        const offset = (pageone - 1) * limit;
        query = `select * from student_record.student_express limit ${offset},${limit}`;
        connection.query(query, function (err, ans) {
            if (err) return console.log(err.message);
           
            res.render('page', { data: ans, page: pageone, table_count: Total_table });
            //console.log(ans);
        });
    }

    else {
        res.redirect('/login');
    }
};

app.listen(port, () => {
    console.log("done");
})