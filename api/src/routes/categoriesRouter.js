const { Router } = require("express");
const {
    getAllCategories,
    morePopularCategory,
    setCategories
  } = require("../handlers/categoriesHandler");

const getCategoryProduct = require("../handlers/getCategoryProduct");
const getOrderNameCategoryPriceAlf = require("../handlers/getOrderNameCategoryPriceAlf")
const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.get("/:namecategory", getCategoryProduct)

categoryRouter.get("/:id/click", morePopularCategory);

categoryRouter.post("/", setCategories);
///hecho por nelson para despues controlar en el pull marge request
categoryRouter.get("/order/category/:namecategory", getOrderNameCategoryPriceAlf)
module.exports = categoryRouter;
