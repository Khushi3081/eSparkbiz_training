'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movieactor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.actor, {
        foreignKey: "actorId",
      });

      this.belongsTo(models.movie, {
        foreignKey: "movieId",
      });
    }
  }

  
  movieactor.init({
    movieId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movieactor',
  });
  return movieactor;
};