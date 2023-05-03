const imageinfo = require("../models").imageInfo;
const commentinfo = require("../models").commentInfo;

const addData = async (req, res) => {
  console.log(req.body);
  try {
    const data = await imageinfo.scope('addData').create(
      {
        imageName: req.body.imageName,
        imageURL: req.body.imageURL,
        commentInfos: req.body.commentInfos,
      },
      {
        include: [
          {
            model: commentinfo,
          },
        ],
      }
    );
    res.send(data);
  } 
  catch (error) {
    const { details } = error;
    res.status(404).json({ error: details });
  }
};
const getAllData = async (req, res) => {
  try {
    // const ids = req.quer.id;
    const images = await imageinfo.findAll();
    res.send(images);
  } 
  catch (error) {
    const { details } = error;
    res.status(404).json({ error: details });
  }
};
const updateData = async (req, res) => {
  // const id = req.params.id;
  // const data = await imageinfo.update({
  //     imageName:req.body.imageName,
  //     imageType:req.body.imageType,
  //     commentInfos:req.body.commentInfos
  // },{
  //     where:{
  //         id:id
  //     }
  // },{
  //     include:[{
  //     model:commentinfo
  //     }]
  // })
  // res.send(data);
  var updateProfile = { 
    
      imageName: "laugh",
      imageURL: "laugh.png",
      commentInfos:{    
      commentName: "beautyful",
      commentType: "image" 
  }
}
  var filter = {
    where: {
      id: req.params.id,
    },
    include: [{ model: commentinfo }],
  };

  imageinfo.findOne(filter).then(function (e) {
    if (e) {
        console.log(e.commentInfos);
      return e.commentInfos.updateAttributes(updateProfile).then(function (
        result
      ) {
        console.log(result);

        return result;
      });
    } else {
      throw new Error("no such product type id exist to update");
    }
  });
};
const deleteData = async (req, res) => {
  try{
  const id = req.params.id;
  const data = await imageinfo.destroy({
    where: {
      id: id,
    },
  });
  res.send("Data is deleted");
  }
  catch(error) {
    const {details} = error;
    res.status(404).json({error:details})
}
};
module.exports = {
  addData,
  getAllData,
  updateData,
  deleteData,
};
