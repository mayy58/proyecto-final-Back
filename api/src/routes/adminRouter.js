const { Router } = require("express");
//const {
//  verifyToken,
//  isAdmin,
//  isSuperAdmin,
//} = require("../middlewares/authJwt");
const {
  postCreateAdmin,
  getAllUser,
  logicDelete,
  allProduct,
  percentegeGoogle,
  getSellers,
  getPieChart,
  getSales,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

adminRouter.post("/createadmin", postCreateAdmin);
adminRouter.get("/listusers", getAllUser);
adminRouter.delete("/listusers", logicDelete);
adminRouter.get("/percentage", percentegeGoogle);
adminRouter.get("/piechart", getPieChart);
adminRouter.get("/sellers", getSellers);
adminRouter.get("/deliveredProducts", allProduct);
adminRouter.get("/sales", getSales);

module.exports = adminRouter;
