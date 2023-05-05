const movieinfo = require('../models').movie;
const actor= require('../models').actor;
// console.log(movieinfo);

const addData = async(req,res) => {
    try{
      const movies = await movieinfo.create({
        movieName : req.body.movieName
      })
    const findActor = await actor.findAll({
        where:[{
           actorName:req.body.actorName
        }]
      })
      let data = await movies.addActor(findActor);
      res.send(data);
    
}
catch(error) {
    res.status(404).json({ error: error.message });
   }
 };
module.exports =  {addData}