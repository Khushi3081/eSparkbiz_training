const kinginfo = require('../models').kingInfo;
const queeninfo = require('../models').queenInfo;

// const actor = db.actorInfo;
// const movie = db.movieInfo;

  
const addData = async(req,res)=>{

    try{
        console.log(req.body);

        const data = await kinginfo.create({
            firstName:req.body.firstName,
            stateName:req.body.stateName,
            queenInfos:req.body.queenInfos
            },{
            include: [
                queeninfo]
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
    const actors = await kinginfo.scope('showactor','getOneData').findAll()
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
    const data = await kinginfo.update(req.body,{
        where:{
            id:id
        }
    })
    res.send(data);
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}

const deleteData = async (req,res) => {
    try{
    const id = req.params.id;
    const data = await kinginfo.destroy({
        where: {
            id:id
        }
    })
    res.send('Data is deleted');
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}
module.exports = {
    getAllData,
    addData,
    updateData,
    deleteData
}