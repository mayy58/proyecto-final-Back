const { Router } = require("express");

const getProduct = require("../handlers/getProduct");
const getProductByID = require("../handlers/getProductByID");
const {
  getPopularProduct,
  getProductsUser,
  getPriceRangeCategory,
  getOrderHanlderProducto,
  setProduct,
  getPriceRangeName,
  postShoppingHandler,
  upDateProductHandler,
} = require("../handlers/productsHandler");

const getOrderNameProductPriceAlf = require("../handlers/getOrderNameProductPriceAlf");


const productRouter = Router();


productRouter.get("/", getProduct);
productRouter.put("/:id", upDateProductHandler);
productRouter.get("/:id", getProductByID);
productRouter.get("/popular", getPopularProduct);
productRouter.get("/user/:nameuser", getProductsUser);
productRouter.get("/order/orderPrice", getOrderHanlderProducto);

productRouter.get("/pricerange/category/:namecategory", getPriceRangeCategory); // product/pricerange/category/Hogar?max=80000&min=5000
productRouter.get("/pricerange/name/:nameproduct", getPriceRangeName); // product/pricerange/name/zapa?max=50000&min=5000
//para el pull request mercado pago
productRouter.post("/payment", postShoppingHandler);
///hecho por nelson para despues controlar en el pull marge request

productRouter.get("/order/name/:nameproduct", getOrderNameProductPriceAlf); //http://localhost:3001/product/order/name/nameproduct?name=samsgung Galaxi&priceMin=10&priceMax=800
productRouter.post("/", setProduct);

module.exports = productRouter;
