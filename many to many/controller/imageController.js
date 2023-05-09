const image = require('../models').imageinfo;

const addData = async(req,res)=>{
    const data = await image.create({
        imageName:req.body.imageName
    })
    res.send(data);
}

module.exports =  {addData}