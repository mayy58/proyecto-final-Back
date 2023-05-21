const { Router } = require("express");
const { getShoppinghistory } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/shoppinghistory", getShoppinghistory);
//userRouter.get("/", getUser);

//userRouter.post("/update", updateOrder);

module.exports = userRouter;