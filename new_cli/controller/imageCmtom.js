const imageInfo = require('../models').imageInfo;
const tagInfo = require('../models').tag_info;
  
const addData = async(req,res)=>{

    try{
        const data = await imageInfo.create({
            imageName:req.body.imageName,
            imageURL:req.body.imageURL,
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
    const actors = await imageInfo.scope('showactor','getOneData').findAll()
    res.send(actors)
    }
    catch(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
}
const updateData = async (req,res) =>{
    const id = req.params.id;
    const data = await imageInfo.update(req.body,{
        where:{
            id:id
        }
    })
    res.send(data);
}

const deleteData = async (req,res) => {
    const id = req.params.id;
    const data = await imageInfo.destroy({
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