import express from 'express'
import { 
    addProductWithImage, 
    addProductWithUrl, 
    deleteProduct, 
    getAllProduct 
} from '../controllers/admin.controller.js'
import { upload } from '../middleware/uploadInMulter.middleware.js'


const adminRouter = express.Router()

adminRouter.post("/add-product-url", addProductWithUrl)
adminRouter.post("/add-product-img", upload.single("uploadImage"), addProductWithImage)

adminRouter.get("/get-all-product", getAllProduct)
adminRouter.delete("/delete-product", deleteProduct)

export default adminRouter