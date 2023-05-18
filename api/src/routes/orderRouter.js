const { Router } = require("express");
const { setOrder } = require("../handlers/orderHandler")

const orderRouter = Router();

orderRouter.post("/", setOrder);
orderRouter.post("/update", updateOrder);

module.exports = orderRouter;