import express from "express"
import { createOrder,getTransporters ,getManufacturerOrders,getChats,getTransporterOrders} from "../controllers/order.js"
import { authenticateUser } from "../middleware/auth.js"
const router = express.Router()
router.post("/createorder", authenticateUser, createOrder)
router.get("/manufacturerorders", authenticateUser, getManufacturerOrders)
router.get("/transporterorders",authenticateUser,getTransporterOrders)
router.get("/transporter", getTransporters);
router.get("/chats/:room", getChats);
export default router
