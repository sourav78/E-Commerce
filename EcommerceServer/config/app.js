import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import { connectDB } from './database.js'
import ProductRouter from '../routes/products.routes.js'

const app = express()

connectDB()

app.use('/product', ProductRouter)

export default app