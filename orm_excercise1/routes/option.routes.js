const optiondata = require('../controllers/option.controller');
const express = require('express');
const app = express();

app.post('/addData',optiondata.addData);
app.put('/:id',optiondata.updateData);
app.delete('/:id',optiondata.deleteData);

module.exports = app;