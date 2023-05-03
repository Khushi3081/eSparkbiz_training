const imagemtom = require('../controller/imageCmtom');
const express = require("express");
const app = express();
const {validate} = require('../middleware/validation');

app.post('/addData',imagemtom.addData);
app.get('/getAllData',imagemtom.getAllData);
app.put('/:id',validate,imagemtom.updateData);
app.delete('/:id',imagemtom.deleteData);

module.exports = app;