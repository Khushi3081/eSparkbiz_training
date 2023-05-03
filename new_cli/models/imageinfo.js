'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imageInfo extends Model {
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
          commentType:'image'
        })
      })
      this.belongsToMany(models.tag_info,{through:{
        model:'tab_taggable',
        unique:false,
      },
      foreignKey:"taggableId",
      constraints:false
    })
    }
  }
  imageInfo.init({
    imageName: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'imageInfo',
  });
  return imageInfo;
};