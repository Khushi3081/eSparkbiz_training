'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movieinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.actorinfo, {
				foreignKey: 'movieId',
				through:'movieactor'
			});
    }
  }
  movieinfo.init({
    movieName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'movieinfo',
  });

  
  // movieinfo.associate = (models)=>{
  //   movieinfo.belongsToMany(models.actorinfo,{through:'movieactor'})
  // }
  return movieinfo;
};