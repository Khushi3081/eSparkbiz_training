'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imageinfo extends Model {
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
          tagType:'image'
        }
      })
    }
  }
  imageinfo.init({
    imageName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'imageinfo',
  });
  return imageinfo;
};