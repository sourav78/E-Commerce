import express from 'express'
import { login, profile, register } from '../controllers/auth.controller.js'

const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.get('/profile', profile)

export default AuthRouter