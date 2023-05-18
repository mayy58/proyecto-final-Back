const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isOnSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("USADO", "NUEVO"),
      defaultValue: "NUEVO",
    },

    deleteLogic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
