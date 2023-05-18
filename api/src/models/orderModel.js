const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremet: true,
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "PENDIENTE",
          "ENVIADO",
          "ENTREGADO",
          "RECHAZADO",
          "CANCELADO"
        ),
        defaultValue: "PENDIENTE",
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
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
