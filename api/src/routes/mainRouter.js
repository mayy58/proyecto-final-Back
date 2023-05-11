const { Router } = require("express");

const mainRouter = Router();

const productRouter = require("./productRouter");
const categoryRouter = require("./categoriesRouter");

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);

module.exports = mainRouter;
