const combodata = require('../controller/combo.controller');
const express = require('express');
const app = express();

app.post('/addFeture',combodata.addData);
app.put('/:id',combodata.updateData);
app.get('/showData',combodata.showData);

module.exports = app;