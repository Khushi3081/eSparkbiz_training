const imageinfo = require("../models").imageInfo;
const commentinfo = require("../models").commentInfo;

const addData = async (req, res) => {
  console.log(req.body);
  try {
    const data = await imageinfo.create(
      {
        imageName: req.body.imageName,
        imageType: req.body.imageType,
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
  try {
    const ids = req.params.id;
    const findData = await imageinfo.findOne({
      where: {
        id: ids,
      },
      include: [
        {
          model: commentinfo,
        },
      ],
    });
    const updateData = findData.commentInfos.find(
      (commentInfo) => ids == commentInfo.commentTableId
    );
    findData.imageName = req.body.imageName;
    findData.imageURL = req.body.imageURL;
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
