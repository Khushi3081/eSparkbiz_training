const express = require("express");
const app = express();
const port = 7000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const comboRoutes = require('./routes/combo.routes');
const optionRoutes = require('./routes/option.routes.js');

app.use('/combo',comboRoutes);
app.use('/option',optionRoutes);

app.listen(port, () => {
    console.log("done");
  });