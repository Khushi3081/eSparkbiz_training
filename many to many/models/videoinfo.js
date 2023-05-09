'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class videoinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.taginfo,{
        foreignKey:'taggableId',
        through:models.tag_taggables,
        scope:{
          tagType:'video'
        }
      })
    }
  }
  videoinfo.init({
    videoName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'videoinfo',
  });
  return videoinfo;
};