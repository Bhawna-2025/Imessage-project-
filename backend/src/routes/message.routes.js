import express from "express"
import { getUserForSidebar,getConversationsForSidebar,getMessages,sendMessages } from "../controllers/message.controllers.js"
import protectRoute from "../middleware/auth.middleware.js"
import { upload } from "../middleware/upload.middleware.js"

const router = express.Router()

router.use(protectRoute)

//this end point is for user appear at the side bar of the UI 
router.get("/users",getUserForSidebar)

//this end point is for user appear at the side bar of the UI 
router.get("/conversations",getConversationsForSidebar) 

// this is the end point for user getting messages 
router.get("/:id",getMessages) 

//this is the end point for user sending messages 
router.post("/send/:id",upload.single("media"),sendMessages) 


export default router