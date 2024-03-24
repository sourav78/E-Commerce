import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

import { connectDB } from './database.js'
import ProductRouter from '../routes/products.routes.js'

const app = express()

app.use(cors())

connectDB()

app.use('/product', ProductRouter)

export default app