require("dotenv").config();
const { Sequelize } = require("sequelize");

const detailOrderModel = require("./models/detailOrderModel");
const productModel = require("./models/productModel");
const categoryModel = require("./models/categoryModel");
const orderModel = require("./models/orderModel");
const userModel = require("./models/userModel");
const reviewModel = require("./models/reviewModel");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

//const sequelize = new Sequelize(
//  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//  {
//    logging: false,
//    native: false,
//  }
//);

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

detailOrderModel(sequelize);
productModel(sequelize);
categoryModel(sequelize);
orderModel(sequelize);
userModel(sequelize);
reviewModel(sequelize);

const { product, detailOrder, Category, order, user, review } =
  sequelize.models;

product.hasMany(detailOrder);
detailOrder.belongsTo(product);

Category.belongsToMany(product, { through: "categoryproduct" });
product.belongsToMany(Category, { through: "categoryproduct" });

order.hasMany(detailOrder);
detailOrder.belongsTo(order);

user.hasMany(product);
product.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

product.hasMany(review);
review.belongsTo(product);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
