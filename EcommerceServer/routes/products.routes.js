import express from 'express'
import { getAllData, getCategory } from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/get-all-product', getAllData)
productRouter.get('/get-home-category', getCategory)

export default productRouter