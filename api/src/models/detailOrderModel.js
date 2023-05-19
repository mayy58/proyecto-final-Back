const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "detailOrder",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremet: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
