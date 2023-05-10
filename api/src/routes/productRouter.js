const { Router } = require("express");

const getAllProduct = require("../handlers/getAllProduct")

const ProcuctRouter = Router();

// 📍 GET | /
// Obtiene un arreglo de objetos, donde cada objeto es uma publicacion/producto.

ProcuctRouter.get("/product", getAllProduct);

module.exports = ProcuctRouter;
