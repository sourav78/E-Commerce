import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import NodeCache from 'node-cache'
import cookieParser from 'cookie-parser'

import { connectDB } from './database.js'
import ProductRouter from '../routes/products.routes.js'
import AuthRouter from '../routes/auth.routes.js'
import ProfileRouter from '../routes/profile.routes.js'

const app = express()
export const cache = new NodeCache({ stdTTL: 900 })

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());

connectDB()

app.use('/product', ProductRouter)
app.use('/auth', AuthRouter)
app.use('/profile', ProfileRouter)

export default app