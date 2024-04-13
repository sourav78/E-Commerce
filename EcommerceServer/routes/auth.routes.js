import express from 'express'
import { login, logout, profile, register, uploadProfile } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/jwtAuth.middleware.js'
import { upload } from '../middleware/uploadInMulter.middleware.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.get('/profile', verifyToken, profile)
AuthRouter.get('/logout', logout)

AuthRouter.post('/upload-image', upload.single("uploadImage"), uploadProfile)

export default AuthRouter