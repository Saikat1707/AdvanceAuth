import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import DBconnection from "./utils/DBconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./router/userRoutes.routes.js";

dotenv.config()
DBconnection()

const app = express()

app.use(cookieParser())
app.use(cors({
    origin:process.env.DEV_SERVER,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',userRoutes)


export default app;
