'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playerinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    this.belongsTo(models.teaminfo)

    }
  }
  playerinfo.init({
    playerName: DataTypes.STRING,
    playerEmail: DataTypes.STRING,
    playerGame: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'playerinfo',
  });
  
  return playerinfo;
};