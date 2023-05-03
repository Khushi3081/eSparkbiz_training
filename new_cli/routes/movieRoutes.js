const movieData = require("../controller/movieController");
const express = require("express");
const app = express();

// app.post('/addData',movieData.addData);
app.get('/getAllData',movieData.getAllData);
app.put('/:id',movieData.updateData);
app.delete('/:id',movieData.deleteData);

module.exports = app;