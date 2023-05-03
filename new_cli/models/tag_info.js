'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.imageInfo,{
        through:{
          model:'tab_taggable',
          unique:false
        },
        foreignKey:'tagNameId',
        constraints:false
      })
      this.belongsToMany(models.videoInfo,{
        through:{
          model:'tab_taggable',
          unique:false
        },
        foreignKey:'tagNameId',
        constraints:false
      })
    }
  }
  tag_info.init({
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag_info',
  });
  return tag_info;
};