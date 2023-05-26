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
  percentegeGoogle,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

adminRouter.post("/createadmin", [verifyToken, isSuperAdmin], postCreateAdmin);
adminRouter.get("/listusers", [verifyToken, isAdmin], getAllUser);
adminRouter.delete("/listusers", [verifyToken, isAdmin], logicDelete);
//adminRouter.get("/piechart", getCategory);
adminRouter.get("/percentage", percentegeGoogle);

module.exports = adminRouter;
