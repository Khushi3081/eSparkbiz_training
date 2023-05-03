'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kingInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.queenInfo,{
        foreignKey:'kingId',
        through:'kingqueen'
      });
    }
  }
  kingInfo.init({
    firstName: DataTypes.STRING,
    stateName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kingInfo',
  });
  return kingInfo;
};