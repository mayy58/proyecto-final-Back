const { Router } = require("express");
const { getShoppinghistory,putUserHandler,getIdUserHandler,deleteLogicHandler } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/shoppinghistory", getShoppinghistory);
userRouter.put("/update/:id", putUserHandler)
userRouter.get("/:id", getIdUserHandler)
userRouter.put("/delete/logic/:id", deleteLogicHandler)
//userRouter.get("/", getUser);

//userRouter.post("/update", updateOrder);

module.exports = userRouter;