import express from 'express'
import { login, logout, profile, register } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/jwtAuth.middleware.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.get('/profile', verifyToken, profile)
AuthRouter.get('/logout', logout)


export default AuthRouter