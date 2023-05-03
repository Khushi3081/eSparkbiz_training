const videoinfo = require("../models").videoInfo;
const commentinfo = require("../models").commentInfo;

const addData = async (req, res) => {
  console.log(req.body);
  try {
    const data = await videoinfo.create(
      {
        videoName: req.body.videoName,
        videoType: req.body.videoType,
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
    const videos = await videoinfo.findAll();
    res.send(videos);
  } 
  catch (error) {
    const { details } = error;
    res.status(404).json({ error: details });
  }
};
const updateData = async (req, res) => {
  // const id = req.params.id;
  // const data = await videoinfo.update({
  //     videoName:req.body.videoName,
  //     videoType:req.body.videoType,
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
    "commentName": "beautyful",
    "commentType": "video" };
  var filter = {
    where: {
      id: req.params.id,
    },
    include: [{ model: commentinfo }],
  };

  videoinfo.findOne(filter).then(function (e) {
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
  const data = await videoinfo.destroy({
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
