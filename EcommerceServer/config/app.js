import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import NodeCache from 'node-cache'
import cookieParser from 'cookie-parser'
import Razorpay from 'razorpay'

import { connectDB } from './database.js'
import ProductRouter from '../routes/products.routes.js'
import AuthRouter from '../routes/auth.routes.js'
import ProfileRouter from '../routes/profile.routes.js'
import PaymentRouter from '../routes/payment.routes.js'
import adminRouter from '../routes/admin.routes.js'

const app = express()
export const cache = new NodeCache({ stdTTL: 900 })

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());

connectDB()

export const instance = new Razorpay({
    key_id: process.env.RAZOR_API_KEY,
    key_secret: process.env.RAZOR_API_SECRET,
});

app.use('/product', ProductRouter)
app.use('/auth', AuthRouter)
app.use('/profile', ProfileRouter)
app.use('/api', PaymentRouter)
app.use('/admin', adminRouter)

export default app