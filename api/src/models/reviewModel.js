
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
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
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


