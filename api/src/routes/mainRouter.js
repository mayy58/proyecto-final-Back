const { Router } = require("express");
const getAllProduct = require("../handlers/getAllProduct");

const productRouter = require("./productRouter")
const categoryRouter = require("./categoriesRouter");


const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);


module.exports = mainRouter;
