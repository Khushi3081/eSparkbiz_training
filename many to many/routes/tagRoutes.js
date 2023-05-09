const tagData = require("../controller/tagController.js");
console.log(tagData);
const express = require("express");
const app = express();

app.post('/addData',tagData.addData);

module.exports = app;