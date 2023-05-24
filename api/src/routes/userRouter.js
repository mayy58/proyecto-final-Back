const { Router } = require("express");

const { getShoppinghistory,putUserHandler,getIdUserHandler,deleteLogicHandler, getSalesghistory } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/shoppinghistory", getShoppinghistory);
userRouter.get("/saleshistory", getSalesghistory);
userRouter.put("/update/:id", putUserHandler)
userRouter.get("/:id", getIdUserHandler)
userRouter.put("/delete/logic/:id", deleteLogicHandler)

module.exports = userRouter;