const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const actorRoutes = require("./routes/actorRoutes");
const movieRoutes = require("./routes/movieRoutes");
const imageRoutes = require('./routes/imageRoutes');
const tagRoutes = require('./routes/tagRoutes');

//many to many
app.use("/actor", actorRoutes);
app.use("/movie", movieRoutes);
app.use('/image',imageRoutes);
app.use('/tag',tagRoutes);

app.listen(port, () => {
    console.log("done");
  });
  