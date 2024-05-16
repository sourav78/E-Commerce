import express from 'express'
import { addProductWithUrl } from '../controllers/admin.controller.js'


const adminRouter = express.Router()

adminRouter.post("/add-product-url", addProductWithUrl)

export default adminRouter