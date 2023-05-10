const { Router } = require("express");

const getProduct = require("../handlers/getProduct")

const ProductRouter = Router();

// 📍 GET | /
// Obtiene un arreglo de objetos, donde cada objeto es uma publicacion/producto.

ProductRouter.get("/", getProduct);


module.exports = ProductRouter;
