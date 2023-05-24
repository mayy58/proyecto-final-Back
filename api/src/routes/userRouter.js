const { Router } = require("express");
const { getShoppinghistory, getSalesghistory } = require("../handlers/userHandler")

const userRouter = Router();

userRouter.get("/shoppinghistory", getShoppinghistory);
userRouter.get("/saleshistory", getSalesghistory);


module.exports = userRouter;