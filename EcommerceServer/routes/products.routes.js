import express from 'express'
import { getAllData, getCartProducts, getCategory, getFilteredProduct, getLatestProduct, getProductDetail, itemCountInCart, productAddToCart } from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/get-all-product', getAllData)
productRouter.get('/get-home-category', getCategory)
productRouter.get('/get-latest-product', getLatestProduct)
productRouter.post('/get-product-details', getProductDetail)
productRouter.post('/get-filtered-product', getFilteredProduct)
productRouter.post('/add-to-cart', productAddToCart)
productRouter.get('/items-in-cart', itemCountInCart)
productRouter.get('/get-cart-product', getCartProducts)

export default productRouter