import express from 'express'
import { checkOut, paymentVerification } from '../controllers/payment.controller.js'


const paymentRouter = express.Router()

paymentRouter.get("/getkey", (req, res) => {
    res.status(200).json({key: process.env.RAZOR_API_KEY})
})
paymentRouter.post("/checkout", checkOut)
paymentRouter.post("/paymentverification", paymentVerification)

export default paymentRouter