const { Router } = require("express");
const getProduct = require("../handlers/getProduct")

const productRouter = Router();

const getProductByID = require("../handlers/getProductByID")
const { getPopularProduct, getProductsUser } = require("../handlers/productsHandler")


productRouter.get("/", getProduct);
productRouter.get("/:id", getProductByID);
productRouter.get("/popular", getPopularProduct);
productRouter.get("/user/:nameuser", getProductsUser);
productRouter.get("/orderPrice", getOrderPorice)

module.exports = productRouter;

