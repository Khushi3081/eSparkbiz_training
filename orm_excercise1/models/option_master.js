'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.combo_master,{
        foreignKey:'comboId'
      })
    }
  }
  option_master.init({
    optionName: DataTypes.STRING,
   

  }, {
    sequelize,
    modelName: 'option_master',
    paranoid:true

  });
  return option_master;


};