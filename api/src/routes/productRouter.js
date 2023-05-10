const { Router } = require("express");

const getAllProduct = require("../handlers/getAllProduct");
const { getPopularProduct } = require("../handlers/productsHandler");

const productRouter = Router();

// 📍 GET | /
// Obtiene un arreglo de objetos, donde cada objeto es uma publicacion/producto.

productRouter.get("/", getAllProduct);
productRouter.get("/popular", getPopularProduct);

module.exports = productRouter;
