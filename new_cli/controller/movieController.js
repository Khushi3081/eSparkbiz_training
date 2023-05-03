const movieInfo = require('../models').movieinfo;
const addData = async(req,res)=>{
    try{
        const data = await movieInfo.create({
            movieName:req.body.movieName,
            actorinfos:req.body.actorinfos
            },{
            include: [
                actorInfo]
            }   
        );
        res.send(data);
    }
    catch(error) {
        res.status(404).json({error:error.message})
    }
}
const getAllData = async(req,res) => {
    const movies = await movieInfo.findAll({
        include:[{
            model:actor
        }]
    });
    try{
        res.send(movies);
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}

const updateData = async (req,res) =>{
    try{
    const id = req.params.id;
    const data = await movieInfo.update(req.body,{
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
    const data = await movieInfo.destroy({
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
    addData,
    getAllData,
    updateData,
    deleteData
}