import express from "express"
import { placeOrder, userOrders, verfiyOrder,listOrders, updateStatus } from "../controllers/order.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verfiyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)



export default orderRouter;