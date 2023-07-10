const sql = require("mysql2")
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const port = 8080
app.set("view engine", "ejs")

app.use(bodyparser.urlencoded({ extended: false }))
var webtoken = require("jsonwebtoken")
let total = 0
let Total_table = 0

var connection = sql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "student_record",
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected!")
})

app.get("/searchdelemeter", function (req, res) {
    const studentdatabse = require("./dbfile")
    // studentdatabse.ab();

    var header = req.headers.cookie
    var token
    if (header != undefined) {
        var headersValue = header.split(" ")
        headersValue.forEach((value) => {
            if (value.startsWith("token")) {
                token = value.split("=")[1]
            }
        })

        if (token != undefined) {
            count =
                "select count(id) as count from student_record.student_express"
            connection.query(count, function (err, result) {
                if (err) return console.log(err.message)

                total = result[0].count
                //console.log(total);
                Total_table = Math.ceil(total / 100)
                //console.log(Total_table);
                //return Total_table;
            })
            //const valid_token = webtoken.verify(req.headers.cookie, process.env.secret_key);
            const limit = 100
            let pageone = req.query.page || 1
            const offset = (pageone - 1) * limit
            const order = req.query.orderby || "first_Name"
            var form = req.query.typing || "ASC"
            //console.log(form);
            query = `select * from student_record.student_express order by ${order} ${form} limit ${offset},${limit}`
            connection.query(query, function (err, ans) {
                if (err) return console.log(err.message)
                res.render("searching_delemeter", {
                    data: ans,
                    page: pageone,
                    order: order,
                    form: form,
                    table_count: Total_table,
                })
            })
        } else {
            res.redirect("http://localhost:8000/login")
        }
    } else {
        res.redirect("http://localhost:8000/login")
    }
})

app.post("/searching_delemeter", function (req, res) {
    //     let delemeter = ['^', '#', '$', '!', '*'];
    //     let text = req.body.demo;
    //     //console.log(text);
    //     let temp = req.body.type;
    //     //console.log(temp);
    //     let range = [];
    //     for (let i = 0; i < delemeter.length; i++) {
    //         range[i] = text.indexOf(delemeter[i]);
    //     }
    // //console.log(range);
    //     let result = [];
    //     for (let j = 0; j < range.length; j++) {
    //         result[j] = text.substring(range[j] + 1, range[j + 1]);
    //     }
    // //console.log(result);
    var firstName = ""
    var lastName = ""
    var cityName = ""
    var mobileNo = ""
    var email = ""

    //     connection.query(`select * from student_express where first_Name like '${firstName}'  ||
    //      last_Name like '${lastName}'  ||
    //      city_Name like '${cityName}'||
    //      mobile_No like ${mobileNo} ||
    //      e_mail like '${email}' `,function(err,answer) {
    //         if (err) return console.log(err.message);
    //         //console.log(answer);
    //     res.render('searching_with_delemeter',{data:answer});
    //     });
    let text = req.body.demo || 0
    console.log(text)
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == "^") {
            for (let j = i + 1; j < text.length; j++) {
                if (
                    text.charAt(j) == "#" ||
                    text.charAt(j) == "$" ||
                    text.charAt(j) == "!" ||
                    text.charAt(j) == "*"
                ) {
                    break
                } else {
                    firstName += text.charAt(j)
                    // console.log(firstName);
                }
            }
        } else if (text.charAt(i) == "#") {
            for (let k = i + 1; k < text.length; k++) {
                if (
                    text.charAt(k) == "^" ||
                    text.charAt(k) == "$" ||
                    text.charAt(k) == "!" ||
                    text.charAt(k) == "*"
                ) {
                    break
                } else {
                    lastName += text.charAt(k)
                    //  console.log(lastName);
                }
            }
        } else if (text.charAt(i) == "$") {
            for (let l = i + 1; l < text.length; l++) {
                if (
                    text.charAt(l) == "^" ||
                    text.charAt(l) == "#" ||
                    text.charAt(l) == "!" ||
                    text.charAt(l) == "*"
                ) {
                    break
                } else {
                    cityName += text.charAt(l)
                    // console.log(cityName);
                }
            }
        } else if (text.charAt(i) == "!") {
            for (let m = i + 1; m < text.length; m++) {
                if (
                    text.charAt(m) == "^" ||
                    text.charAt(m) == "#" ||
                    text.charAt(m) == "$" ||
                    text.charAt(m) == "*"
                ) {
                    break
                } else {
                    mobileNo += text.charAt(m)
                    //  console.log(mobileNo);
                }
            }
        } else if (text.charAt(i) == "*") {
            for (let n = i + 1; n < text.length; n++) {
                if (
                    text.charAt(n) == "^" ||
                    text.charAt(n) == "#" ||
                    text.charAt(n) == "$" ||
                    text.charAt(n) == "!"
                ) {
                    break
                } else {
                    email += text.charAt(n)
                    //  console.log(email);
                }
            }
        }
    }

    let query = `Select * from student_express where first_Name like '%${firstName}' and last_Name like '%${lastName}' and city_Name like '%${cityName}' and mobile_No like '%${mobileNo}' and e_mail like '%${email}' `
    console.log(query)
    connection.query(query, (error, answer) => {
        // if (err) return console.log(err.message);
        // if (error) throw error

        // console.log(result);
        res.render("searching_with_delemeter", { data: answer })
    })
})
app.listen(port, () => {
    console.log("done")
})
