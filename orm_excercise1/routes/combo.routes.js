const combodata = require('../controllers/combo.controller');
const express = require('express');
const app = express();

app.post('/addData',combodata.addData);
app.get('/showData',combodata.showData);
app.put('/:id',combodata.updateData);
app.delete('/:id',combodata.deleteData);

module.exports = app;