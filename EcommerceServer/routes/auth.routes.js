import express from 'express'
import { login, profile, register } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/jwtAuth.middleware.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.get('/profile', verifyToken, profile)

export default AuthRouter