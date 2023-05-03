'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actorinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.movieinfo, {
				foreignKey: 'actorId',
				through: 'movieactor',
			});
      // define association here
    }
  }
  actorinfo.init({
    actorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'actorinfo',
  });
  // actorinfo.associate = (models)=>{
  //   actorinfo.belongsToMany(models.,{through:'movieactor'})
  // }
  return actorinfo;
};