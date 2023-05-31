const { Router } = require("express");

const getProduct = require("../handlers/getProduct");
const getProductByID = require("../handlers/getProductByID");
const {
  getPopularProduct,
  getProductsActivosUser, 
  getProductsInactivosUser,
  getPriceRangeCategory,
  getOrderHanlderProducto,
  setProduct,
  getPriceRangeName,
  postShoppingHandler,
  upDateProductHandler,
  setReviewProduct,
  getReviewProduct,
  putActiveProductHandler
} = require("../handlers/productsHandler");

const productRouter = Router();


const getOrderNameProductPriceAlf = require("../handlers/getOrderNameProductPriceAlf");


productRouter.get("/", getProduct);
productRouter.post("/", setProduct);

productRouter.put("/:id",  upDateProductHandler)
productRouter.get("/:id", getProductByID);

productRouter.get("/active/:useremail",   getProductsActivosUser);
productRouter.get("/inactive/:useremail", getProductsInactivosUser);

productRouter.get("/pricerange/category/:namecategory", getPriceRangeCategory); // product/pricerange/category/Hogar?max=80000&min=5000
productRouter.get("/pricerange/name/:nameproduct", getPriceRangeName); // product/pricerange/name/zapa?max=50000&min=5000

productRouter.get("/order/name/:nameproduct", getOrderNameProductPriceAlf); //http://localhost:3001/product/order/name/nameproduct?name=samsgung Galaxi&priceMin=10&priceMax=800

productRouter.post("/review/:id", setReviewProduct)
productRouter.get("/review/:id", getReviewProduct)

//******************** */
productRouter.get("/popular", getPopularProduct);
productRouter.get("/order/orderPrice", getOrderHanlderProducto);
//para el pull request mercado pago
productRouter.post("/payment", postShoppingHandler);
productRouter.put("/delete/deleteLogic/:idProducto", putActiveProductHandler)

module.exports = productRouter;
