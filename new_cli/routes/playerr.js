const playerData = require('../controller/playerc');
const {validateWithMiddle,validate} = require('../middleware/validation');
const express = require('express');
const app = express();
// require('validateWithMiddle');
 app.post('/addData',validateWithMiddle,playerData.addData);
app.get('/getAllData', playerData.getAllData);
app.get('/getOneData', playerData.getOneData);
app.put('/:id',validate,playerData.updateData);
app.delete('/:id',playerData.deleteData);

module.exports = app;