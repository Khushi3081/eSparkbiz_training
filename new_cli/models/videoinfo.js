'use strict';
const {
  Model
} = require('sequelize');
// const imageInfo = require('./imageInfo');
module.exports = (sequelize, DataTypes) => {
  class videoInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.commentInfo,{
        foreignKey:'commentTableId',
        constraints:false,
        addScope:('addData',{
          commentType:'video'
        })
      })
      this.belongsToMany(models.tag_info,{through:{
        model:'tab_taggable',
        unique:false
      },
      foreignKey:"taggableId",
      constraints:false
    })
    }
  }
  videoInfo.init({
    videoName: DataTypes.STRING,
    videoType: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'videoInfo',
  });
  
  return videoInfo;
};