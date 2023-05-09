'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class combo_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.option_master,
        {
          foreignKey:'comboId'
        })
    }
  }
  combo_master.init({
    comboName: DataTypes.STRING,
    comboType: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'combo_master',
    paranoid:true

  });
  return combo_master;
};