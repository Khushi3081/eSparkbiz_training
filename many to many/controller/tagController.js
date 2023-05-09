const image = require('../models').imageinfo;
const tag = require('../models').taginfo;
// console.log(movieinfo);

const addData = async(req,res) => {
    try{
      const tags = await tag.create({
        tagName : req.body.tagName
      })
    const findimage = await image.findAll({
        where:[{
           imageName:req.body.imageName
        }]
      })
      console.log(tags,findimage);
      let data = await tags.addImage(findimage);
      res.send(data);
    
}
catch(error) {
    res.status(404).json({ error: error.message });
   }
 };
module.exports =  {addData}