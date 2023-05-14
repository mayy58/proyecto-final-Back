const { Router } = require("express");
const getProduct = require("../handlers/getProduct")
const getProductByID = require("../handlers/getProductByID")
const { getPopularProduct, getProductsUser, getPriceRangeCategory, getOrderHanlderProducto, setProduct, getPriceRangeName } = require("../handlers/productsHandler")
const productRouter = Router();

productRouter.get("/", getProduct);
productRouter.get("/:id", getProductByID);
productRouter.get("/popular", getPopularProduct);
productRouter.get("/user/:nameuser", getProductsUser);
productRouter.get("/order/orderPrice", getOrderHanlderProducto)

productRouter.get("/pricerange/category/:namecategory", getPriceRangeCategory) // product/pricerange/category/Hogar?max=80000&min=5000
productRouter.get("/pricerange/name/:nameproduct", getPriceRangeName) // product/pricerange/name/zapa?max=50000&min=5000

productRouter.post("/", setProduct)

module.exports = productRouter;

