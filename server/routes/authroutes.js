import express from "express"
// import { authenticateUser } from "../middleware/auth.js"
import { register,login } from "../controllers/Auth.js"
const router = express.Router()
router.post("/register", register);
router.post("/login", login);
export default router 