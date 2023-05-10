const { Router } = require("express");

// const findAllDogs = require("../controllers/findAllDogs");
// const findDogById = require("../controllers/findDogById");
// const findAllNombreRaza = require("../controllers/findAllNombreRaza");
// const createDog = require("../controllers/createDog")
const getAllProduct = require("../handlers/getAllProduct")
const getCategoryProduct = require("../handlers/getCategoryProduct")

const ProcuctRouter = Router();

// 📍 GET | /
// Obtiene un arreglo de objetos, donde cada objeto es uma publicacion/producto.

dogsRouter.get("/product", getAllProduct);
dogsRouter.get("/", getCategoryProduct);


module.exports = ProcuctRouter;