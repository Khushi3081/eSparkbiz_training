const imageData = require("../controller/imageController.js");
const express = require("express");
const app = express();
// const {validate,validateData} = require('../middleware/validation');

app.post('/addData',imageData.addData);

module.exports = app;