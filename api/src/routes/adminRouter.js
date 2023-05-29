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
  getSellers,
  getPieChart,

} = require("../handlers/adminHandlers");

const adminRouter = Router();

adminRouter.post("/createadmin", postCreateAdmin);
adminRouter.get("/listusers", getAllUser);
adminRouter.delete("/listusers", logicDelete);

adminRouter.get("/percentage", percentegeGoogle);

adminRouter.get("/piechart", getPieChart);
adminRouter.get("/sellers", getSellers);


module.exports = adminRouter;
