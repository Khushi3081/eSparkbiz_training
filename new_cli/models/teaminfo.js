'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teaminfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.playerinfo)
    }
  }
  teaminfo.init({
    teamName: DataTypes.STRING,
    noOfPlayer: DataTypes.STRING,
    teamType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teaminfo',
  });
 
  return teaminfo;
};