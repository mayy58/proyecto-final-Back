const { Router } = require("express");
const getAllProduct = require("../handlers/getAllProduct")

//const activitiesRouter = require("./activitiesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

mainRouter.use("/product", getAllProduct);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;
