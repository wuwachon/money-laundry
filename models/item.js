'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Item.belongsTo(models.Game, { foreignKey: 'gameId' })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    law: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    ans: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
    underscored: true,
  });
  return Item;
};