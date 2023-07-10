var express = require('express');
var sql = require('mysql2');
var bodyparser = require('body-parser');
var webtoken = require('jsonwebtoken');
const { verify } = require('crypto');
var app = express();
const port = 8080;
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
const joi_pack = require('joi');
var connection = sql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "job_application_form"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
});

//TO DISPLAY ALL DROPDOWN DATA........
let data1;
let data2;
let data3;
let data4;
let data5;
let data6;
let data7;
let state_data;
let data_ct;
app.get('/', function (req, res) {

    const candidatedatabse = require('./dbfile')

    var header = req.headers.cookie
    var token;
    if (header != undefined) {
        var headersValue = header.split(" ");
        headersValue.forEach((value) => {
            if (value.startsWith("token")) {
                token = value.split("=")[1];
            }
        })
        if (token != undefined) {
            query1 = "SELECT * FROM job_application_form.state_name";
            connection.query(query1, function (err, ans) {
                if (err) return console.log(err.message);
                data1 = ans

                // res.render('job_application',{data:ans});
            })
            query_ct = "SELECT * FROM job_application_form.city_name where state_id='1'";
            connection.query(query_ct, function (err, ans_ct) {
                if (err) return console.log(err.message);
                data_ct = ans_ct;
                //    console.log(ans);
                // res.render('job_application',{data:ans});
            })
            query2 = "SELECT option_value FROM job_application_form.option_master where option_name='reletion'";
            connection.query(query2, function (err, ans2) {
                if (err) return console.log(err.message);
                data2 = ans2;
                //console.log(ans2);

            })
            query3 = "SELECT option_value FROM job_application_form.option_master where option_name='education'";
            connection.query(query3, function (err, ans3) {
                if (err) return console.log(err.message);
                // console.log(ans3);
                data3 = ans3;
            })
            query4 = "SELECT option_value FROM job_application_form.option_master where option_name='language'";
            connection.query(query4, function (err, ans4) {
                if (err) return console.log(err.message);
                // console.log(ans4);
                data4 = ans4;
            })
            query5 = "SELECT option_value FROM job_application_form.option_master where option_name='technology'";
            connection.query(query5, function (err, ans5) {
                if (err) return console.log(err.message);
            //console.log(ans5);
                data5 = ans5;
            })
            query6 = "SELECT option_value FROM job_application_form.option_master where option_name='pref_loc'";
            connection.query(query6, function (err, ans6) {
                if (err) return console.log(err.message);
                //console.log(ans6);
                data6 = ans6;
            })
            query7 = "SELECT option_value FROM job_application_form.option_master where option_name='department'";
            connection.query(query7, function (err, ans7) {
                if (err) return console.log(err.message);
                //console.log(ans7);
                data7 = ans7;
                res.render('job_application', { data: data1, data_ct: data_ct, data2: data2, data3: data3, data4: data4, data5: data5, data6: data6, data7: data7 });
            })
        }
        else {
            res.redirect("http://localhost:8000/login");
        }
    }
    else {
        res.redirect("http://localhost:8000/login");
    }
    // }
})

//APPLY VALIDATION WITH JOI PACKAGE.........
const now = new Date();
const setBirthDate = new Date(now - (1000*60*60*24*365*18) - (1000*60*60*24*4));

const validateWithMiddle = function(req,res,next) {
    const createSchema = joi_pack.object().keys({
        fname:joi_pack.string().required(),
        lname:joi_pack.string().required(),
        adr1:joi_pack.string().optional(),
        adr2:joi_pack.string().optional(),
        designation:joi_pack.string().required(),
        email:joi_pack.string().email(),
        pn:joi_pack.string().pattern(/^[0-9]+$/).length(10).required(),
        state:joi_pack.string().invalid("selectone"),
        ct:joi_pack.string().invalid("selectone"),
        zpc:joi_pack.string().optional(),
        gender:joi_pack.string().valid("male","female","other"),
        dob:joi_pack.date().max(setBirthDate),
        rs:joi_pack.string().invalid("selectone"),
        course:joi_pack.string().invalid("selectone"),
        board:joi_pack.string().invalid("selectone"),
        passing_yr:joi_pack.string().length(4).required(),
        percentage:joi_pack.string().required(),
        company:joi_pack.string().required(),
        ctc:joi_pack.string().pattern(/^[0-9]+$/).length(6).required(),
        sd:joi_pack.date().max(now),
        ld:joi_pack.date().min(setBirthDate),
        name:joi_pack.string().required(),
        contact_num:joi_pack.string().required(),
        relation:joi_pack.string().required(),
        name2:joi_pack.string().required(),
        contact_num2:joi_pack.string().required(),
        relation2:joi_pack.string().required(),
        city:joi_pack.string().invalid("selectone"),
        ec:joi_pack.string().pattern(/^[0-9]+$/).length(6).required(),
        cc:joi_pack.string().pattern(/^[0-9]+$/).length(6).required(),
        np:joi_pack.string().required(),
        dep:joi_pack.string().invalid("selectone"),
        sbmt:joi_pack.string().required(),
    }).unknown(true)
    const {error} = createSchema.validate(req.body);
    if(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
    else{
        next();
    }
}


// TO INSERT FORM DATA IN DATABASE
let result;
let result2;
let result3;
let result4;
let result5;
let alt_result;
app.post('/jobdata', validateWithMiddle,function (req, res) {
    let answer = req.body;
    console.log(answer);
   fname = req.body.fname;
    lname = req.body.lname;
    designation = req.body.designation;
    email = req.body.email;
    adr1 = req.body.adr1;
    adr2 = req.body.adr2;
    phone = req.body.pn;
    city = req.body.ct;
    state = req.body.state;
    zip = req.body.zpc;
    gndr = req.body.gender;
    rltn = req.body.rs;
    dob = req.body.dob;
    course = req.body.course;
    board = req.body.board;
    year = req.body.passing_yr;
    percentage = req.body.percentage;
    cname = req.body.company;
    salary = req.body.ctc;
    joining = req.body.sd;
    leaving = req.body.ld;
    ref_name = req.body.name;
    ref_number = req.body.contact_num;
    ref_rltn = req.body.relation;
    ref_name2 = req.body.name2;
    ref_number2 = req.body.contact_num2;
    ref_rltn2 = req.body.relation2;
    pref_loc = req.body.city;
    c_ctc = req.body.cc;
    e_ctc = req.body.ec;
    department = req.body.dep;
    notice_period = req.body.np;
    //console.log(pref_loc, c_ctc, e_ctc, department);

    temp_qry = `select state_name from state_name where state_id="${parseInt(state)}"`;
    connection.query(temp_qry, function (err, temp_ans) {
        if (err) {
            throw err;
        }

        // state_data = temp_ans[0]['state_name'];
        qry = `insert into job_application (first_name,last_name,designation,email,address_1,address_2,phone_no,city,state,zip_code,gender,reletion,date_of_birth) values ('${fname}','${lname}','${designation}','${email}','${adr1}','${adr2}','${phone}','${city}','${temp_ans[0].state_name}','${zip}','${gndr}','${rltn}','${dob}')`;
        connection.query(qry, function (err, answer) {
            if (err) {
                throw err;
            }
            else {
                let id = answer.insertId;
                if (typeof (course, board, { year }, percentage) == "string") {
                    qry2 = `insert into education_info (id,course_name,board_name,passing_year,percentage) values (${id},'${course}','${board}','${year}','${percentage}');`
                    connection.query(qry2, function (err, answer2) {
                        if (err) {
                            throw err;
                        }
                        else {
                            result2 = answer2;
                        }
                    })
                }
                else {
                    for (let h = 0; h < course.length; h++) {
                        alt_qry = `insert into education_info (id,course_name,board_name,passing_year,percentage) values (${id},'${course[h]}','${board[h]}','${year[h]}','${percentage[h]}');`
                        connection.query(alt_qry, function (err, alt_ans) {
                            if (err) {
                                throw err;
                            }
                            else {
                                alt_result = alt_ans;
                            }
                        })
                    }
                }
                if (typeof (cname, salary, joining, leaving) == "string") {
                    qry3 = `INSERT INTO job_application_form.experience_info (id,company_name,ctc,start_date,end_date) 
             VALUES (${id},'${cname}', '${salary}', '${joining}', '${leaving}')`;
                    //    console.log(qry3);
                    connection.query(qry3, function (err, answer3) {
                        if (err) {
                            return console.log(err.message);
                        }
                        else {
                            result3 = answer3;
                        }
                    })
                }
                else {
                    for (let g = 0; g < cname.length; g++) {
                        alt_qry = `INSERT INTO job_application_form.experience_info (id,company_name,ctc,start_date,end_date) 
            VALUES (${id},'${cname[g]}', '${salary[g]}', '${joining[g]}', '${leaving[g]}')`;
                        connection.query(alt_qry, function (err, alt_ans) {
                            if (err) {
                                return console.log(err.message);
                            }
                            else {
                                alt_result = alt_ans;
                            }
                        })
                    }
                }

                query = "SELECT option_value FROM job_application_form.option_master where option_name='language'";
                 connection.query(query, function (err, result) {
                   // console.log(result);
    
                 for (let temp = 0; temp < result.length; temp++) {
                 let lan = req.body[result[temp].option_value];
                //console.log(lan);
                let read = req.body[result[temp].option_value + "r"];
                let write = req.body[result[temp].option_value + "w"];
                let speak = req.body[result[temp].option_value + "s"];
                //console.log(read, write, speak);
                if(typeof(read) == "undefined") read="No";
                if(typeof(write) == "undefined") write="No";
                if(typeof(speak) == "undefined") speak="No";
    
                if (typeof (lan) == "string") {
                 language_query = `INSERT INTO job_application_form.language_info (language_name,can_read,can_write,can_speak,id) VALUES ('${lan}', '${read}', '${write}','${speak}','${id}')`;
                 connection.query(language_query, function (err1, answer4) {
                  if (err1) {
                           return console.log(err1.message);
                        }  
                        else{
                            result4 = answer4;
                        }                          
                })
             }
             }
     })


                 query = "SELECT option_value FROM job_application_form.option_master where option_name='technology'";
                        connection.query(query,(err,tech_ans) => {

                    //console.log(tech_ans);
                    for (let i = 0; i < tech_ans.length; i++)
                    {
                    var tech = req.body[tech_ans[i].option_value];
                    var a = req.body[tech_ans[i].option_value + "a"];
                        //console.log(tech);

                    //console.log(tech,a);
                    var query_tech = technology_query = `INSERT INTO job_application_form.technology_info (technology_name,technology_efficiency,id) VALUES ('${tech}', '${a}','${id}')`;

                    connection.query(query_tech, (err, ans6) => {
                    if (err) console.log(err.message);
                    //console.log("for candidate tech insert " + query_tech , ans6);
                    });

                    }

                });
                refrence_query = `INSERT INTO job_application_form.reference_info (reference_name,reference_con,reference_reletion,id) VALUES ('${ref_name}', '${ref_number}', '${ref_rltn}','${id}')`;
                connection.query(refrence_query, function (err, answer6) {
                    if (err) {
                        return console.log(err.message);
                    }
                })
                refrence_query2 = `INSERT INTO job_application_form.reference_info (reference_name,reference_con,reference_reletion,id) VALUES ('${ref_name2}', '${ref_number2}', '${ref_rltn2}','${id}')`;
                connection.query(refrence_query2, function (err, answer7) {
                    if (err) {
                        return console.log(err.message);
                    }
                })
                preference_query = `INSERT INTO job_application_form.preference_info(preference_location, c_ctc,e_ctc,department,notice_period,id) VALUES ('${pref_loc}', '${c_ctc}', '${e_ctc}', '${department}','${notice_period}', '${id}')`;
                connection.query(preference_query, function (err, answer10) {
                    if (err) {
                        return console.log(err.message);
                    }
                    //console.log(answer10);
                })
            }
        })
         res.render("sample_ready");
    })
})

// TO DISPLAY ONLY BASIC DATA...
app.get('/alldata', function (req, res) {
    count = `select count(id) as count from job_application_form.job_application where isdeleted = "0"`;
    connection.query(count, function (err, result) {
        if (err) return console.log(err.message);
        total = result[0]["count"];
        Total_table = Math.ceil(total / 5)
    })

    const limit = 5;
    let pageone = req.query.page || 1;
    const offset = (pageone - 1) * limit;
    query = `select * from job_application_form.job_application where isdeleted = "0" limit ${offset},${limit}`;
    connection.query(query, function (err, ans) {
        if (err) return console.log(err.message);

        res.render('all_data', { data: ans, page: pageone, total_count: total, table_count: Total_table });
        //console.log(ans);
    })
})

//TO DISPLAY ANOTHER FIELD DATA
let edu_data, exp_data, lan_data, tcn_data, ref_data, pref_data;
app.get('/moredata', function (req, res) {
    //var get_id = req.query.id;
    //console.log(get_id);
    education = `select * from job_application_form.education_info where id= ${req.query.id}`;
    connection.query(education, function (err, edu_ans) {
        if (err) return console.log(err.message);
        //console.log(edu_ans);
        edu_data = edu_ans;
    })
    experience = `select * from job_application_form.experience_info where id= ${req.query.id}`;
    connection.query(experience, function (err, exp_ans) {
        if (err) return console.log(err.message);
        //console.log(exp_ans);
        exp_data = exp_ans;
    })
    language = `select * from job_application_form.language_info where id= ${req.query.id}`;
    connection.query(language, function (err, lan_ans) {
        if (err) return console.log(err.message);
        //console.log(lan_ans);
        lan_data = lan_ans;
    })
    technology = `select * from job_application_form.technology_info where id= ${req.query.id}`;
    connection.query(technology, function (err, tcn_ans) {
        if (err) return console.log(err.message);
        //console.log(tcn_ans);
        tcn_data = tcn_ans;
    })
    refrence = `select * from job_application_form.reference_info where id= ${req.query.id}`;
    connection.query(refrence, function (err, ref_ans) {
        if (err) return console.log(err.message);
        //console.log(ref_ans);
        ref_data = ref_ans;
        // console.log(ref_data);
    })
    prefrence = `select * from job_application_form.preference_info where id= ${req.query.id}`;
    connection.query(prefrence, function (err, pref_ans) {
        if (err) return console.log(err.message);
       // console.log(pref_ans);
        pref_data = pref_ans;
        res.render('more_data', { edu_data: edu_data, exp_data: exp_data, lan_data: lan_data, tcn_data: tcn_data, ref_data: ref_data, pref_data: pref_ans });

    })
})

//SHOW OLD DATA AND CHANGE/EDIT IT...
app.get('/updatedata', async function (req, res) {
    query1 = "SELECT * FROM job_application_form.state_name";
    let r_query1 = await queryExeccutor(query1);
    // console.log(r_query1);

    query2 = "SELECT option_value FROM job_application_form.option_master where option_name='reletion'";
    let r_query2 = await queryExeccutor(query2);

    update_basic_qry = `select * from job_application_form.job_application where id=${req.query.id}`;
    let data = await queryExeccutor(update_basic_qry);
    // console.log(data);

    update_basic_qry = `SELECT state_id FROM job_application_form.state_name where state_name="${data[0]['state']}";`;
    let data123 = await queryExeccutor(update_basic_qry);

    let state_id = data123[0].state_id;

    city = `select * from job_application_form.city_name where state_id = ${state_id}`;
    let r_city = await queryExeccutor(city);
    // console.log(r_city);


    update_edu_qry = `select * from job_application_form.education_info where id= ${req.query.id}`;
    let r_edu_data = await queryExeccutor(update_edu_qry);
    //console.log(r_edu_data);

    query3 = "SELECT option_value FROM job_application_form.option_master where option_name='education'";
    let r_query = await queryExeccutor(query3);

    experience = `select * from job_application_form.experience_info where id= ${req.query.id}`;
    let r_exp_data = await queryExeccutor(experience);
    // console.log(r_experience);



    language = `select * from job_application_form.language_info where id= ${req.query.id}`;
    let r_lan_data = await queryExeccutor(language);
    //console.log(r_lan_data);

    technology = `select * from job_application_form.technology_info where id= ${req.query.id}`;
    let r_tech_data = await queryExeccutor(technology);
    // console.log(r_tech_data);
    refrence = `select * from job_application_form.reference_info where id= ${req.query.id}`;
    let r_ref_data = await queryExeccutor(refrence);
    //console.log(r_ref_data);

    query6 = "SELECT option_value FROM job_application_form.option_master where option_name='pref_loc'";
    let r_query6 = await queryExeccutor(query6);
    //console.log(r_query6);
    query7 = "SELECT option_value FROM job_application_form.option_master where option_name='department'";
    let r_query7 = await queryExeccutor(query7);
    //console.log(r_query7);
    prefrence = `select * from job_application_form.preference_info where id= ${req.query.id}`;
    let r_pref_data = await queryExeccutor(prefrence);
   // console.log(r_pref_data);


    res.render('backup2', {
        data: data, data1: r_query1, data2: r_query2,
        gender: ['Male', 'Female', 'Other'], lan_type: ['Read', 'Write', 'Speak'], city: r_city, edu_data: r_edu_data, data3: r_query, exp_data: r_exp_data, lan_data: r_lan_data, tech_data: r_tech_data, ref_data: r_ref_data, data6: r_query6, data7: r_query7, pref_data: r_pref_data
    })
})

//INSERT UPDATED DATA IN DATABASE...
app.post('/insertupdated', async function (req, res) {
    // answer = req.body;
     console.log(answer);
    id = req.body.c_id;
    // console.log(id);
    e_id = req.body.edu;
    //console.log(e_id );
    exp_id = req.body.exp;
    //console.log(exp_id );
    ref1_id = req.body.ref;
    ref2_id = req.body.ref2;
    lan_id = req.body.lan;
    //console.log(lan_id);
    tech_id = req.body.tech;
    //console.log(tech_id);
    //console.log(answer.state);
    pref_id = req.body.pref;
    //console.log(pref_id);

    temp_qry = `select state_name from state_name where state_id="${answer.state})}"`;
    r_temp_qry = await queryExeccutor(temp_qry);
    //console.log(r_temp_qry);
    let update_basic_info = `update  job_application_form.job_application set first_name = '${answer.fname}',
                            last_name = '${answer.lname}',
                            designation	= '${answer.designation}',
                            email = '${answer.email}',
                            address_1='${answer.adr1}',
                            address_2='${answer.adr2}',
                            phone_no='${answer.pn}',
                            city='${answer.ct}',
                            state='${r_temp_qry[0].state_name}',
                            zip_code='${answer.zpc}',
                            gender='${answer.gender}',
                            reletion='${answer.rs}',
                            date_of_birth='${answer.dob}' where id = ${id};`

    let update_basic = await queryExeccutor(update_basic_info);

    let update_edu_info = `update education_info set course_name='${answer.nc}',
                        board_name='${answer.nb}',
                        passing_year='${answer.py}',
                        percentage='${answer.percentage}' where education_id = ${e_id};`

    let update_edu = await queryExeccutor(update_edu_info);



    let update_exp_info = `update job_application_form.experience_info set 
                        company_name= '${answer.cn}', 
                        ctc= '${answer.ctc}',
                        start_date='${answer.sd}',
                        end_date='${answer.ld}'  where experience_id = ${exp_id}`;
    let update_exp = await queryExeccutor(update_exp_info);


    let update_ref_info = `update job_application_form.reference_info  set 
                        reference_name = '${answer.n}',
                        reference_con= '${answer.cno}',
                        reference_reletion= '${answer.relation}' where reference_id=  ${ref1_id};`

    let update_ref = await queryExeccutor(update_ref_info);

    let update_ref2_info = `update job_application_form.reference_info  set 
                        reference_name = '${answer.n2}',
                        reference_con= '${answer.cno2}',
                        reference_reletion= '${answer.relation2}' where reference_id=  ${ref2_id};`

    let update_ref2 = await queryExeccutor(update_ref2_info);



    query = `SELECT language_name FROM job_application_form.language_info where id='${id}'`;
    result = await queryExeccutor(query);

    for (let temp = 0; temp < result.length; temp++) {
        let lan = req.body[result[temp].language_name];
        let read = req.body[result[temp].language_name + "r"];
        let write = req.body[result[temp].language_name + "w"];
        let speak = req.body[result[temp].language_name + "s"];
        if (typeof (read) == "undefined") read = "No";
        if (typeof (write) == "undefined") write = "No";
        if (typeof (speak) == "undefined") speak = "No";

        if (typeof (lan) == "string") {
            //console.log(lan);

            // console.log(read, write, speak);


            update_lan_info = `update job_application_form.language_info set 
                                 language_name ='${lan}',
                                 can_read='${read}',
                                 can_write='${write}',
                                 can_speak='${speak}' where language_id= ${lan_id[temp]} `;
            //console.log(update_lan_info);
            update_lan = await queryExeccutor(update_lan_info);
            //console.log(update_lan);

        }
    }

    tech_query = `SELECT technology_name FROM job_application_form.technology_info where  id ='${id}'`;
    r_tech_query = await queryExeccutor(tech_query);

    for (let k = 0; k < r_tech_query.length; k++) {
        let tcn = req.body[r_tech_query[k].technology_name];
        // console.log(tcn);
        let level = req.body[r_tech_query[k].technology_name + "a"];
        //console.log(level);
        if (typeof (tcn) == "string") {
            technology_query = `update job_application_form.technology_info set 
                        technology_name = '${tcn}',
                        technology_efficiency = '${level}' where technology_id= '${tech_id[k]}'`;
            r_technology_query = await queryExeccutor(technology_query);
            //console.log(r_technology_query);
        }
    }

    update_preference_info = `update job_application_form.preference_info set 
     preference_location = '${answer.city}', 
     c_ctc= '${answer.cc}',
     e_ctc='${answer.ec}',
     department = '${answer.dep}',
     notice_period='${answer.np}'  where preference_id = ${pref_id}`;

    update_preference = await queryExeccutor(update_preference_info);
    console.log(update_preference);
    res.render('sample_ready');

})


//APPLY SINGLE DELETE
app.get('/deletedata', function (req, res) {
    var get_id = req.query.id;
    console.log(get_id);
    delete_data = `update job_application_form.job_application set isdeleted = '1' where id = ${get_id}; `;
    connection.query(delete_data, function (err, delete_ans) {
        if (err) return console.log(err.message);
        delete_data = delete_ans;
        // res.render('all_data');

    })
})

//APPLY MULTIPLE DELETE
app.get('/deletealldata', function (req, res) {
    var get_id = req.query.id;
    //console.log(get_id);
    const allid = get_id.split(",");
    for (let x = 0; x < allid.length; x++) {
        let delete_query = `update job_application_form.job_application set isdeleted = '1' where id = ${allid[x]}`;
        connection.query(delete_query, function (err, ans) {
            if (err) return console.log(err.message);
            //console.log(ans);
            data = ans;
            // res.send(data);
        })
    }
})

//APPLY SEARCH 
app.post('/searching', function (req, res) {
    let delemeter = ['^', '#', '$', '!', '@'];
    let string = req.body.demo;
    let name = "";
    var count = 0;

    for (let i = 0; i < string.length; i++) {
        if (delemeter.includes(string[i])) {
            name += " " + string[i];
            count++;
        }
        else {
            name += string[i];

        }
    }

    let currname = name.split(" ")

    let queryStr = ``;
    currname.forEach(name => {
        if (name[0] == '^') {
            count--;
            if (count) {
                queryStr += `first_name LIKE '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `first_name LIKE '${name.slice(1)}%'`
            }
        }

        if (name[0] == '#') {
            count--
            if (count) {
                queryStr += `last_name Like '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `last_lame Like '${name.slice(1)}%' `
            }

        }
        if (name[0] == '$') {
            count--
            if (count) {
                queryStr += `city Like '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `city Like '${name.slice(1)}%' `
            }
        }
        if (name[0] == '!') {
            count--
            if (count) {
                queryStr += `state Like '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `state Like '${name.slice(1)}%' `
            }
        }
        if (name[0] == '@') {
            count--
            if (count) {
                queryStr += `phone_no Like '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `phone_no Like '${name.slice(1)}%' `
            }
        }
        //console.log(queryStr);
        connection.query(`select * from job_application where ${queryStr}`, (err, srch_answer) => {
            if (err) return err.message
            else {
                res.render('searchingdata', { srch_data: srch_answer });
                //console.log(srch_answer);
            }
        })

    })
})

//CHANGING CITY ACCORDING TO SELECTED STATE...
app.get('/changecity', function (req, res) {
    city = `select * from job_application_form.city_name where state_id = ${parseInt(req.query.state_id)}`;
    connection.query(city, function (err, city_ans) {
        if (err) return console.log(err.message);
        res.send(city_ans);

    })
})

connection.connect();
const queryExeccutor = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            resolve(result)
        })
    })
}

app.listen(port, () => {
    // console.log("done");
    console.log("http://localhost:8080/");
})