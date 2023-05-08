const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncremet: true,
        allowNull: false,
        primaryKey: true,
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
