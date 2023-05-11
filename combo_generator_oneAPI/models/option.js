'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.combo,{
        foreignKey:'combo_id'
      })
    }
  }
  option.init({
    optionName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'option',
  });
  return option;
};