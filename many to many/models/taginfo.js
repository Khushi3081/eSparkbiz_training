'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taginfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.imageinfo,{
        foreignKey:'tagnameId',
        through:models.tag_taggables
      })
      this.belongsToMany(models.videoinfo,{
        foreignKey:'tagnameId',
        through:models.tag_taggables
      })
    }
  }
  taginfo.init({
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'taginfo',
  });
  return taginfo;
};