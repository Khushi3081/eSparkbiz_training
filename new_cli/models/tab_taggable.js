'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tab_taggable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tab_taggable.init({
    tagNameId: DataTypes.INTEGER,
    taggableId: DataTypes.INTEGER,
    tagType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tab_taggable',
  });
  return tab_taggable;
};