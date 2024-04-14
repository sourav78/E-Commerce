import express from 'express'
import { changePassword, login, logout, profile, register, sendOtp } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/jwtAuth.middleware.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.get('/profile', verifyToken, profile)
AuthRouter.get('/logout', logout)
AuthRouter.post('/send-otp', sendOtp)
AuthRouter.post('/change-password', changePassword)


export default AuthRouter