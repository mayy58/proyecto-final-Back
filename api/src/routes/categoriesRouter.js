const { Router } = require("express");
const { getAllCategories } = require("../handlers/categoriesHandler");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

module.exports = categoryRouter;
