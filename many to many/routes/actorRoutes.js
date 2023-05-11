const actorData = require("../controller/actorController.js");
const express = require("express");
const app = express();
// const {validate,validateData} = require('../middleware/validation');

app.post('/addData',actorData.addData);
// app.get('/getAllData',actorData.getAllData);
app.put('/:id',actorData.updateData);
// app.delete('/:id',actorData.deleteData);


module.exports = app;