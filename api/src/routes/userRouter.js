const { Router } = require("express");
const { getUser, getShoppinghistory } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/shoppinghistory", getShoppinghistory);

//userRouter.post("/update", updateOrder);

module.exports = userRouter;