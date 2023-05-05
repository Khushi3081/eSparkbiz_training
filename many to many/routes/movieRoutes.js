const movieData = require("../controller/movieController.js");
// console.log(movieData);
const express = require("express");
const app = express();
// const {validate,validateData} = require('../middleware/validation');

app.post('/addData',movieData.addData);

module.exports = app;
