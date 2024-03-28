import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import NodeCache from 'node-cache'

import { connectDB } from './database.js'
import ProductRouter from '../routes/products.routes.js'

const app = express()
export const cache = new NodeCache({ stdTTL: 900 })

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

connectDB()

app.use('/product', ProductRouter)

export default app