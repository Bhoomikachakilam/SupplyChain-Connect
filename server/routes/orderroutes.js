import express from "express"
import { createOrder, getTransporters,getOrders,getChats } from "../controllers/order.js"
import { authenticateUser } from "../middleware/auth.js"
const router = express.Router()
router.post("/createorder", authenticateUser, createOrder)
router.get("/orders",authenticateUser,getOrders)
router.get("/transporter", getTransporters);
router.get("/chats/:room", getChats);
export default router
