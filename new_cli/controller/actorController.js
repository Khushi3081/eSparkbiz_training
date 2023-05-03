const actorInfo = require('../models').actorinfo;
const movieInfo = require('../models').movieinfo;

// const actor = db.actorInfo;
// const movie = db.movieInfo;

  
const addData = async(req,res)=>{

    try{
        const data = await actorInfo.create({
            actorName:req.body.actorName,
            movieinfos:req.body.movieinfos
            },{
            include: [
                movieInfo]
            }
            
        );
        res.send(data);
    }
    catch(error) {
        res.status(404).json({error:error.message})
    }
}

const getAllData = async(req,res) => {
    try{
        // const ids = req.quer.id;
    const actors = await actorInfo.scope('showactor','getOneData').findAll()
    res.send(actors)
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}
const updateData = async (req,res) =>{
    try{
    const id = req.params.id;
    const data = await actorInfo.update(req.body,{
        where:{
            id:id
        }
    })
   
    res.send(data);
    }
    catch(error){
        console.log(error.message);
    }
}

const deleteData = async (req,res) => {
    try{
    const id = req.params.id;
    const data = await actorInfo.destroy({
        where: {
            id:id
        }
    })
    res.send('Data is deleted');
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports = {
    getAllData,
    addData,
    updateData,
    deleteData
}