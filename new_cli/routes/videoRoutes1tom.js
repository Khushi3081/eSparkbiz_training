const videoData = require("../controller/videoC1tom");
const express = require("express");
const app = express();
// const {validate} = require('../middleware/validation');

app.post('/addData',videoData.addData);
app.get('/getAllData',videoData.getAllData);
app.put('/:id',videoData.updateData);
app.delete('/:id',videoData.deleteData);


module.exports = app;