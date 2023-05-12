const { Router } = require("express");

const getProduct = require("../handlers/getProduct")
const getProductByID = require("../handlers/getProductByID")
const { getPopularProduct, getProductsUser, getPriceRange, setProduct } = require("../handlers/productsHandler")



const productRouter = Router();


productRouter.get("/", getProduct);

productRouter.get("/:id", getProductByID);

productRouter.get("/popular", getPopularProduct);

productRouter.get("/user/:nameuser", getProductsUser);

productRouter.get("/price/range", getPriceRange) // http://localhost:3001/product/price/range?max="valorMaximo"&min="valorMinimo"

productRouter.post("/", setProduct)

module.exports = productRouter;
