const { Router } = require("express");
const {
  getAllCategories,
  morePopularCategory,
} = require("../handlers/categoriesHandler");
const getCategoryProduct = require("../handlers/getCategoryProduct");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:namecategory", getCategoryProduct);
categoryRouter.get("/:id/click", morePopularCategory);

module.exports = categoryRouter;
