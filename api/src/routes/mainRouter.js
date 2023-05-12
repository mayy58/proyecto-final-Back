const { Router } = require("express");

const productRouter = require("./productRouter");
const categoryRouter = require("./categoriesRouter");
const loginRouter = require("./loginRouter");

const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);

mainRouter.use("/user", loginRouter);

module.exports = mainRouter;
