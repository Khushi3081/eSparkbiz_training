var express = require("express")
var sql = require("mysql2")
var bodyparser = require("body-parser")
var bcrypt = require("bcryptjs")
var webtoken = require("jsonwebtoken")
const ejs = require("ejs")
const cookieParser = require("cookie-parser")
var crypto = require("crypto")
var nodemailer = require("nodemailer")

var app = express()
const port = 4000
app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))
require("dotenv").config()
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rachchh.khushi30@gmail.com",
        pass: "sfhwmowrhmrujtou",
    },
})

var connection = sql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "aunthetication",
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected!")
})

const studentdatabse = require("./dbfile")
studentdatabse.ab()
const candidatedatabse = require("./dbfile")
candidatedatabse.abc()

app.get("/", function (req, res) {
    res.render("register")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.post("/register", async function (req, res) {
    let data = req.body
    //console.log(data);
    if (!data.email && !data.password) {
        return res.status(404).send("username and password is required")
    }
    if (data.password != data.cpassword) {
        return res.send("Both password must be same")
    }

    const encrypt = await bcrypt.hash(data.password, 10) //10 is salt value that represent permutation

    const insert = await queryExeccutor(
        `insert into user_table (name,email,password) values ('${data.name}','${data.email}','${encrypt}')`
    )

    // res.render('login')

    //First Activate user account then login
    const activationURL = "https://activationlink.in"
    //console.log(insert.insertId);
    //res.render('activateuser',{activate_status:false,URL:activationURL,userid : insert.insertId});

    let emailContent = `<h1>welcome ${data.name}</h1>
                        <h3>Please verify your account</h3>
                        <a href="http://localhost:3000/activateuser/?id=${insert.insertId}">${activationURL}</a>`

    var mailOptions = {
        from: "rachchh.khushi30@gmail.com",
        to: "rachchh.khushi30@gmail.com",
        subject: "sending activation link in gmail using nodejs",
        html: emailContent,
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            res.render("activateuser", {
                activate_status: false,
                URL: activationURL,
                userid: insert.insertId,
            })
        }
    })
})

app.get("/activateuser", async function (req, res) {
    userid = req.query.id
    //console.log(userid);

    update_activateuser = await queryExeccutor(
        `update user_table set activateuser='1' where id="${parseInt(userid)}"`
    )

    res.render("activateuser", { activate_status: true })
})
app.post("/login", async function (req, res) {
    const email = req.body.email
    const result = await queryExeccutor(
        `select * from user_table  where user_table.email = '${email}'`
    )
    // console.log(result);
    const data = result[0]
    //console.log(data);
    const correctpassword = await bcrypt.compare(
        req.body.password,
        data.password
    )

    if (correctpassword) {
        const token = await webtoken.sign({ data }, process.env.secret_key)
        //console.log(token);
        res.cookie("token", token)
        res.redirect("/welcome")
        //res.send("success")
    }
})

app.get("/welcome", async function (req, res) {
    const token = req.cookies["token"]
    //console.log(token);
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("welcome", { user: validuser.data })
    }
})

app.get("/profile", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        let userid = validuser.data.id
        //console.log(userid);
        let answer = await queryExeccutor(
            `select * from user_table where id='${userid}'`
        )
        //console.log(answer);
        res.render("profile", { data: answer })
    }
})

app.get("/logout", async function (req, res) {
    res.clearCookie("token")
    res.redirect("login")
})

app.get("/checkemail", async function (req, res) {
    let user_enterd_email = req.query.email
    //console.log(user_enterd_email);
    validateemail = `select * from user_table where email = '${user_enterd_email}'`
    result = await queryExeccutor(validateemail)

    //console.log(result[0].email);

    if (result.length > 0) {
        //console.log("User already exists!");
        let status = true
        res.json(status)
    } else {
        let status = false
        res.json(status)
    }
})
app.get("/password", function (req, res) {
    res.render("forget-password")
})
app.post("/forget-password", async function (req, res) {
    email = req.body.email
    password = req.body.password
    //console.log(email);
    check_correctuser = await queryExeccutor(
        `select email from user_table where email="${email}"`
    )
    //console.log(check_correctuser[0].email);

    if (email == check_correctuser[0].email) {
        encrypt = await bcrypt.hash(password, 10)
        query = await queryExeccutor(
            `update user_table set password="${encrypt}" where email="${email}"`
        )
        //console.log(query);
    }
    res.redirect("/welcome")
})

// add tic-tac-toe
app.get("/tic-tac-toe", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("tic-tac-toe")
    }
})

app.get("/kokoo-cube", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("kokoo-cube")
    }
})

app.get("/dynamic-grid", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("dynamic-grid")
    }
})

app.get("/first-webpage", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("first_webpage")
    }
})

app.get("/second-webpage", async function (req, res) {
    const token = req.cookies["token"]
    if (!token) {
        res.redirect("/login")
    } else {
        const validuser = await webtoken.verify(token, process.env.secret_key)
        res.render("second_webpage")
    }
})

const pagination = require("./pagination.js")
const sort = require("./sort.js")
app.get("/pagination", pagination)

// const search = require("./search_with_delemeter.js");
const job_application_form = require("./job_application.js")

connection.connect()
const queryExeccutor = (query) => {
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, result) {
            resolve(result)
        })
    })
}
app.listen(port, () => {
    // console.log("done");
    console.log("http://localhost:3000")
})
