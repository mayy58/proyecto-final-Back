const { Router } = require("express");
const { setOrder, updateOrder,getOrderDateHandler } = require("../handlers/orderHandler");

const orderRouter = Router();

orderRouter.post("/", setOrder);
orderRouter.put("/update", updateOrder);
orderRouter.get("/orderdate", getOrderDateHandler)

module.exports = orderRouter;

