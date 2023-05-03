const imageData = require("../controller/imageC1tom");
const express = require("express");
const app = express();
const {validate} = require('../middleware/validation');

app.post('/addData',imageData.addData);
app.get('/getAllData',imageData.getAllData);
app.put('/:id',validate,imageData.updateData);
app.delete('/:id',imageData.deleteData);

module.exports = app;