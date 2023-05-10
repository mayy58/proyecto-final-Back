const { Router } = require("express");
const getAllProduct = require("../handlers/getAllProduct");
const getCategoryProduct = require("../handlers/getCategoryProduct");
const productRouter = require("./productRouter")

//const activitiesRouter = require("./activitiesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/",getCategoryProduct ); //este se tiene que ir al CategoryRouter



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;
