import express from 'express'
import { 
    addProductWithImage, 
    addProductWithUrl, 
    createCoupon, 
    deleteCoupon, 
    deleteProduct, 
    editCoupon, 
    editProduct, 
    getAllCoupons, 
    getAllProduct 
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

export default adminRouter