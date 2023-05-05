const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const actorRoutes = require("./routes/actorRoutes");
const movieRoutes = require("./routes/movieRoutes");

//many to many
app.use("/actor", actorRoutes);
app.use("/movie", movieRoutes);

app.listen(port, () => {
    console.log("done");
  });
  