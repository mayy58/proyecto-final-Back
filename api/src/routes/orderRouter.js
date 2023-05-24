const { Router } = require("express");
const { setOrder, updateOrder } = require("../handlers/orderHandler")

const orderRouter = Router();

orderRouter.post("/", setOrder);
orderRouter.put("/update", updateOrder);


module.exports = orderRouter;