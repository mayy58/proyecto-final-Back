const { Router } = require("express");

const mainRouter = Router();

const productRouter = require("./productRouter");
const categoryRouter = require("./categoriesRouter");
const loginRouter = require("./loginRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/user", loginRouter);

module.exports = mainRouter;
