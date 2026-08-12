import express from "express"
import { getUseForSidebar } from "../controllers/message.controllers.js"
import protectRoute from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/users",protectRoute,getUseForSidebar)

export default router