const movieinfo = require('../models').movieinfo;
const actor = require('../models').actor;

const addData = async(req,res)=>{
    const data = await actor.create({
        actorName:req.body.actorName
    })
    res.send(data);
}
const updateData = async(req,res)=>{
    let id = req.params.id;
    const data = await actor.update(req.body,{
    where:{
        id:id
    }
})
    res.send(data);
}
module.exports =  {addData,updateData}