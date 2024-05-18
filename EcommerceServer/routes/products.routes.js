import express from 'express'
import { 
    applyCoupon,
    cancelOrder,
    checkWishlistProduct,
    claimCoupons,
    createOrder, 
    getAllData, 
    getCartPriceDetails, 
    getCartProducts, 
    getCategory, 
    getFilteredProduct, 
    getLatestProduct, 
    getOrders, 
    getProductDetail, 
    getWishlistProduct, 
    itemCountInCart,
    productAddToCart, 
    removeProductFromCart, 
    updateCartProductQantity,
    updateProductStock,
    wishlistAProduct
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
productRouter.post('/wishlist-product', wishlistAProduct)
productRouter.post('/check-wishlist-product', checkWishlistProduct)
productRouter.get('/get-wishlist-product', getWishlistProduct)
productRouter.get('/get-order-product', getOrders)
productRouter.post('/cancel-order-product', cancelOrder)

productRouter.post('/apply-coupon', applyCoupon)
productRouter.post('/claim-coupon', claimCoupons)


productRouter.post('/create-order', createOrder)

export default productRouter