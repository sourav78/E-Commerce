import express from 'express'
import { getAllData, getCategory, getLatestProduct, getProductDetail } from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/get-all-product', getAllData)
productRouter.get('/get-home-category', getCategory)
productRouter.get('/get-latest-product', getLatestProduct)
productRouter.post('/get-product-details', getProductDetail)

export default productRouter