const kingData = require("../controller/kingController");
const express = require("express");
const app = express();
const {validate,validateData} = require('../middleware/validation');

app.post('/addData',kingData.addData);
app.get('/getAllData',kingData.getAllData);
app.put('/:id',validate,kingData.updateData);
app.delete('/:id',kingData.deleteData);


module.exports = app;