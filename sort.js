const sql = require('mysql2');
const express = require('express');
const app = express();
const port = 8040;
app.set('view engine', 'ejs');
const cookieParser = require('cookie-parser');
var webtoken = require('jsonwebtoken');
let total = 0;
let Total_table = 0;


var connection = sql.createConnection({
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
// app.use(body_parser.urlencoded({ extended: true }));
// app.use(body_parser.json());

app.get('/sortdata', function (req, res) {
 
    const studentdatabse = require('./dbfile')
    //studentdatabse.ab();
    var header = req.headers.cookie;

    var token;
    if (header != undefined) {
        var headersValue = header.split(";");
        headersValue.forEach((value) => {
            if (value.startsWith("token")) {
                token = value.split("=")[1];
            }
        })
        

    if (token != undefined) {
        const data_token = webtoken.verify(token, process.env.secret_key);
        count = "select count(id) as count from student_record.student_express";
        connection.query(count, function (err, result) {
            if (err) return console.log(err.message);

            total = result[0]["count"];
            //console.log(total);
            Total_table = Math.ceil(total / 100);
            //console.log(Total_table);
            //return Total_table;

        })

        const limit = 100;
        let pageone = req.query.page || 1;
        const offset = (pageone - 1) * limit;
        const order = req.query.orderby || 'first_Name';
        var form = req.query.typing || 'ASC';
        //console.log(form);
        query = `select * from student_record.student_express order by ${order} ${form} limit ${offset},${limit}`;
        connection.query(query, function (err, ans) {
            if (err) return console.log(err.message);
           if(form == "ASC") {
            form = "DESC";
           } 
           else {
            form = "ASC";
           }
            // switch(order) {
            //     case 'id':
            //     if (form === "ASC") {
            //         form = "DESC";
            //     }
            //     else{
            //         form = "ASC"
            //     }
            //     break;
            //     case 'first_Name':
            //     if (form === "ASC") {
            //         form = "DESC";
            //     }
            //     else{
            //         form = "ASC"
            //     }
            //     break;
            //     case 'last_Name':
            //     if (form === "ASC") {
            //         form = "DESC";
            //     }
            //     else{
            //         form = "ASC"
            //     }
            //     break;
            //     case 'city_Name':
            //     if (form === "ASC") {
            //         form = "DESC";
            //     }
            //     else{
            //         form = "ASC"
            //     }
            //     break;
            //     case 'mobile_No':
            //     if (form === "ASC") {
            //         form = "DESC";
            //     }
            //     else{
            //         form = "ASC"
            //     }
            //     break;
            //     case 'e_mail':
            //         if (form === "ASC") {
            //             form = "DESC";
            //         }
            //         else{
            //             form = "ASC"
            //         }
            //         break;
            //     default:
            //         form = "ASC";
            //         break;
            // }
            res.render('sorting', { data: ans, page: pageone, order: order, form: form, total_count: total, table_count: Total_table });
        })
    }

    else {
        res.redirect('http://localhost:8000/login')
         }
    }
    })

    app.listen(port, () => {
        console.log("done");
    })