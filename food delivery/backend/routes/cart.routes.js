import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cartRouter = express.Router()


cartRouter.get("/get",authMiddleware,getCart)
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)


export default cartRouter;