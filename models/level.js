'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Level.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Level.hasMany(models.Item, { foreignKey: 'levelId' })
    }
  }
  Level.init({
    level: DataTypes.INTEGER,
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Level',
    tableName: 'Levels',
    underscored: true
  });
  return Level;
};