const { Router } = require("express");

const productRouter = require("./productRouter");
const categoryRouter = require("./categoriesRouter");
const loginRouter = require("./loginRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/user", loginRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter;
