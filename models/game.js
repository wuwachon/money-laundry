'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Game.hasMany(models.Items, { foreignKey: 'gameId' })
    }
  }
  Game.init({
    level: DataTypes.INTEGER,
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'Games',
    underscored: true
  });
  return Game;
};