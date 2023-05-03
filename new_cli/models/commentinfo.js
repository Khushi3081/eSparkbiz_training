'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.imageInfo,{
        foreignKey:'commentTableId',
        constraints:false
      })
      this.belongsTo(models.videoInfo,{
        foreignKey:'commentTableId',
        constraints:false
      })
    }
  }
  commentInfo.init({
    commentName: DataTypes.STRING,
    commentType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentInfo',
  },{
  hooks:{
    afterUpdate:(async(videoInfo)=>{
     await sequelize.models.commentInfo.update({
      commentName: req.body.commentName,
      commentType:req.body.commentType
     },
     {
     where:{
      commentTableId : videoInfo.id
     }
    })
    })
  }
});
  return commentInfo;
};