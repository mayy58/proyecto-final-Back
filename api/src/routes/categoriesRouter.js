const { Router } = require("express");
const { getAllCategories } = require("../handlers/categoriesHandler");
const getCategoryProduct = require("../handlers/getCategoryProduct");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:namecategory", getCategoryProduct)

module.exports = categoryRouter;
