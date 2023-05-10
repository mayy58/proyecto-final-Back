const { Router } = require("express");
const categoryRouter = require("./categoriesRouter");

const mainRouter = Router();

mainRouter.use("/categories", categoryRouter);

module.exports = mainRouter;
