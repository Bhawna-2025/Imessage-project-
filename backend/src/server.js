import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";
import authRoutes from "./routes/auth.Route.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const port = process.env.PORT || "4000";
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");


//webhooks
app.use("/api/webhooks/clerk",express.raw({type:"application/json"}),clerkWebhook) //it is important that u don't parse the webhook event data , it should be in the raw format


app.use(express.json()); //this line is used to parse the incoming requests with JSON payloads , it means express.json will convert the json into normal js object.

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
); //Cross origin resource sharing ---- browser security rule

app.use(clerkMiddleware()); //it is the middleware which integerate the clerk aurthentication into our express application

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

//if the public directory exists, serve the static files
//this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`server is running on the port ${port}`);

  if(process.env.NODE_ENV === "production"){
    job.start()
  }
});
