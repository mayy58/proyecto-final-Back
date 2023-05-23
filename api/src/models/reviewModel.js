
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      punctuationproduct: {
        type: DataTypes.INTEGER, //del 1 al 5
        allowNull: false,
      },
      punctuationseller: {
        type: DataTypes.INTEGER, //del 1 al 5
        allowNull: true,
      },
      coment: {
        type: DataTypes.TEXT,
      },

      deleteLogic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,

    }
  );
};


