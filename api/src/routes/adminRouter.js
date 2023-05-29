const { Router } = require("express");
const {
  verifyToken,
  isAdmin,
  isSuperAdmin,
} = require("../middlewares/authJwt");
const {
  postCreateAdmin,
  getAllUser,
  logicDelete,
  allProduct,
  percentegeGoogle,

  getPieChart,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

adminRouter.post("/createadmin", [verifyToken, isSuperAdmin], postCreateAdmin);
adminRouter.get("/listusers", getAllUser);
adminRouter.delete("/listusers", [verifyToken, isAdmin], logicDelete);
adminRouter.get("/deliveredProducts", allProduct);
adminRouter.get("/percentage", percentegeGoogle);

adminRouter.get("/piechart", getPieChart);

module.exports = adminRouter;
