const { Router } = require("express");
const { getShoppinghistory,putUserHandler } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/shoppinghistory", getShoppinghistory);
userRouter.put("/:idUser", putUserHandler)
//userRouter.get("/", getUser);

//userRouter.post("/update", updateOrder);

module.exports = userRouter;