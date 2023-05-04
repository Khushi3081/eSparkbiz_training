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
  try {
    const ids = req.params.id;
    const findData = await videoinfo.findOne({
      where: {
        id: ids,
      },
      include: [
        {
          model: commentinfo,
        },
      ],
    });
    console.log(findData);
    // console.log(findData.playerinfos);
    const updateData = findData.commentInfos.find(
      (commentInfo) => ids == commentInfo.commentTableId
    );
    findData.videoName = req.body.videoName;
    findData.videoType = req.body.videoType;
    updateData.commentName = req.body.commentInfos.commentName;
    const data = await findData.save();
    const data2 = await updateData.save();
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
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
