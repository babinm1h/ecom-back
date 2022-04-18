import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { router } from "./routes/index.js"
import cookieParser from "cookie-parser"
import { passport } from "./utils/passport.js"
import bodyParser from "body-parser"


const app = express()
const PORT = 7777


app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || `http://localhost:3000`
}))
app.use(`/serv`, router)




const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        app.listen(PORT, () => console.log(PORT + " started"))
    } catch (e) {
        console.log(e);
    }
}
start()