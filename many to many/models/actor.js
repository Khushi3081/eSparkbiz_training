'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.movie, {
				foreignKey: 'movieId',
				through:models.movieactor
			});
    }
  }
  actor.init({
    actorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'actor',
  });
  return actor;
};