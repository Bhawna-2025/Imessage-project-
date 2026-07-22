import express from "express";
import "dotenv/config"
import { connectDB } from "./lib/db.js";
import {clerkMiddleWare} from "@clerk/express"
import cors from "cors"
const app = express();
const port = process.env.PORT||"4000";
const FRONTEND_URL = process.env.FRONTEND_URL
app.use(express.json())//this line is used to parse the incoming requests with JSON payloads , it means express.json will convert the json into normal js object.

app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}))//Cross origin resource sharing ---- browser security rule

app.use(clerkMiddleWare())//it is the middleware which integerate the clerk aurthentication into our express application

app.get("/health",(req,res)=>{
    res.status(200).json({
        ok:true
    })
})

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on the port ${port}`)
})

