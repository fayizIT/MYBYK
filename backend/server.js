import express from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import connectDB from "./config/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
const port =process.env.PORT || 8000
const app = express();
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended:true }))

app.use(cookieParser());

app.use('/api/users', userRoutes)

app.get('/',(req,res) => res.send("Server is Ready"));



app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`Server started on port  ${port}`))
