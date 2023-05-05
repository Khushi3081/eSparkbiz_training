const movieinfo = require('../models').movieinfo;
const actor = require('../models').actor;

const addData = async(req,res)=>{
    const data = await actor.create({
        actorName:req.body.actorName
    })
    res.send(data);
}

module.exports =  {addData}