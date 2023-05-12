const { Router } = require("express");

const mainRouter = Router();

const productRouter = require("./productRouter");
const categoryRouter = require("./categoriesRouter");
const loginRouter = require("./loginRouter");

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);

mainRouter.use("/user", loginRouter);

module.exports = mainRouter;
