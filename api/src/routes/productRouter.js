const { Router } = require("express");

const getProduct = require("../handlers/getProduct")
const getProductByID = require("../handlers/getProductByID")
const { getPopularProduct, getProductsUser } = require("../handlers/productsHandler")



const productRouter = Router();


productRouter.get("/", getProduct);

productRouter.get("/:id", getProductByID);

productRouter.get("/popular", getPopularProduct);

productRouter.get("/user/:nameuser", getProductsUser);


module.exports = productRouter;
