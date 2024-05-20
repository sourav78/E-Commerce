import express from 'express'
import { 
    addProductWithImage, 
    addProductWithUrl, 
    createCoupon, 
    createUser, 
    deleteCoupon, 
    deleteProduct, 
    editCoupon, 
    editProduct, 
    editUser, 
    getAllCoupons, 
    getAllOrders, 
    getAllProduct, 
    getAllUser,
    getSingleOrder,
    storeOverview,
    updateOrderStatus
} from '../controllers/admin.controller.js'
import { upload } from '../middleware/uploadInMulter.middleware.js'


const adminRouter = express.Router()

adminRouter.post("/add-product-url", addProductWithUrl)
adminRouter.post("/add-product-img", upload.single("uploadImage"), addProductWithImage)

adminRouter.get("/get-all-product", getAllProduct)
adminRouter.delete("/delete-product", deleteProduct)
adminRouter.post("/edit-product", editProduct)
adminRouter.post('/create-coupon', createCoupon)
adminRouter.get('/get-all-coupons', getAllCoupons)
adminRouter.post('/edit-coupon', editCoupon)
adminRouter.delete('/delete-coupon', deleteCoupon)

adminRouter.post('/create-user', createUser)
adminRouter.post('/edit-user', editUser)
adminRouter.get('/get-all-users', getAllUser)

adminRouter.get('/get-all-orders', getAllOrders)
adminRouter.get('/get-single-orders', getSingleOrder)
adminRouter.post('/update-order-status', updateOrderStatus)


adminRouter.get('/store-overview', storeOverview)

export default adminRouter