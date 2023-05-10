require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const detailOrderModel = require("./models/detailOrderModel");
const productModel = require("./models/productModel");
const categoryModel = require("./models/CategoryModel");
const orderModel = require("./models/orderModel");
const userModel = require("./models/userModel");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

//const sequelize = new Sequelize(DB_DEPLOY, {
//  logging: false,
//  native: false,
//});

detailOrderModel(sequelize);
productModel(sequelize);
categoryModel(sequelize);
orderModel(sequelize);
userModel(sequelize);

const { product, detailOrder, Category, order, user } = sequelize.models;

detailOrder.belongsTo(product);

Category.belongsToMany(product, { through: "categoryproduct" });
product.belongsToMany(Category, { through: "categoryproduct" });

detailOrder.belongsTo(order);
product.belongsTo(user);
order.belongsTo(user);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
