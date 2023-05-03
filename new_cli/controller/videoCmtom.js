const videoInfo = require('../models').videoInfo;
const tagInfo = require('../models').tag_info;
  
const addData = async(req,res)=>{

    try{
        const data = await videoInfo.create({
            videoName:req.body.videoName,
            videoType:req.body.videoType,
            tag_infos:req.body.tag_infos
            },{
            include: [
                tagInfo]
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
    const actors = await videoInfo.scope('showactor','getOneData').findAll()
    res.send(actors)
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}
const updateData = async (req,res) =>{
    const id = req.params.id;
    const data = await videoInfo.update(req.body,{
        where:{
            id:id
        }
    })
    res.send(data);
}

const deleteData = async (req,res) => {
    const id = req.params.id;
    const data = await videoInfo.destroy({
        where: {
            id:id
        }
    })
    res.send('Data is deleted');
}
module.exports = {
    addData,
    getAllData,
    updateData,
    deleteData
}