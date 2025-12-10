'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      // Defined relationship: Store belongs to User
      this.belongsTo(models.User, { foreignKey: 'ownerId' });
    }
  }
  Store.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 400]
        }
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};