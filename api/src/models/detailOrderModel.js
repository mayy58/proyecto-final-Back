const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "detailOrder",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchaseprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    },
    {
      timestamps: false,
    }
  );
};
