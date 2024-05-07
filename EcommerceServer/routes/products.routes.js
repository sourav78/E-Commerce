import express from 'express'
import { 
    createCoupon, 
    getAllData, 
    getCartProducts, 
    getCategory, 
    getFilteredProduct, 
    getLatestProduct, 
    getProductDetail, 
    itemCountInCart,
    productAddToCart, 
    removeProductFromCart, 
    updateCartProductQantity
} from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/get-all-product', getAllData)
productRouter.get('/get-home-category', getCategory)
productRouter.get('/get-latest-product', getLatestProduct)
productRouter.post('/get-product-details', getProductDetail)
productRouter.post('/get-filtered-product', getFilteredProduct)
productRouter.post('/add-to-cart', productAddToCart)
productRouter.get('/items-in-cart', itemCountInCart)
productRouter.get('/get-cart-product', getCartProducts)
productRouter.post('/update-product-quantity', updateCartProductQantity)
productRouter.post('/remove-product-cart', removeProductFromCart)

productRouter.post('/create-coupon', createCoupon)

export default productRouter