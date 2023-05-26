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
  getPieChart,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

adminRouter.post("/createadmin", [verifyToken, isSuperAdmin], postCreateAdmin);
adminRouter.get("/listusers", [verifyToken, isAdmin], getAllUser);
adminRouter.delete("/listusers", [verifyToken, isAdmin], logicDelete);
adminRouter.get("/piechart", getPieChart);



module.exports = adminRouter;
