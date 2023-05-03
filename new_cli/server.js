const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const router = require("../new_cli/routes/playerr");
const routers = require("../new_cli/routes/teamr");
const actorRoutes = require("./routes/actorRoutes");
const movieRoutes = require("./routes/movieRoutes");
const kingRoutes = require("./routes/kingRoutes");
const videoRoutes = require("./routes/videoRoutes1tom");
const imageRoutes = require("./routes/imageRoutes1tom");
const videoRoutesmtom = require("./routes/videoRoutesmtom");
const imageRoutesmtom = require("./routes/imageRoutesmtom");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//one to many
app.use("/player", router);
app.use("/team", routers);

//many to many
app.use("/actor", actorRoutes);
app.use("/movie", movieRoutes);

//many to many
app.use("/king", kingRoutes);

//one to many polymorphic
app.use("/video", videoRoutes);
app.use("/image", imageRoutes);

//many to many polymorphic
app.use("/videos",videoRoutesmtom);
app.use("/images",imageRoutesmtom);

app.listen(port, () => {
  console.log("done");
});
