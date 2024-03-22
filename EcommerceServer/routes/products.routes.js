import express from 'express'
import { getAllData } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/get-all-product', getAllData)

export default router