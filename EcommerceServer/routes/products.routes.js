import express from 'express'
import { 
    applyCoupon,
    claimCoupons,
    createCoupon, 
    createOrder, 
    getAllData, 
    getCartPriceDetails, 
    getCartProducts, 
    getCategory, 
    getFilteredProduct, 
    getLatestProduct, 
    getProductDetail, 
    itemCountInCart,
    productAddToCart, 
    removeProductFromCart, 
    updateCartProductQantity,
    updateProductStock
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
productRouter.post('/get-price-deatils', getCartPriceDetails)
productRouter.post('/update-product-stock', updateProductStock)

productRouter.post('/create-coupon', createCoupon)
productRouter.post('/apply-coupon', applyCoupon)
productRouter.post('/claim-coupon', claimCoupons)


productRouter.post('/create-order', createOrder)

export default productRouter