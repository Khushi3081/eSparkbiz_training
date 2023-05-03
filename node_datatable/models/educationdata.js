'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class educationData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.userData) 
    }
  }
  educationData.init({
    courseName: DataTypes.STRING,
    passingYear: DataTypes.STRING,
    percentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'educationData',
  });
  return educationData;
};