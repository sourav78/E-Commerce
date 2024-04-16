import express from 'express'
import { verifyToken } from '../middleware/jwtAuth.middleware.js'
import { upload } from '../middleware/uploadInMulter.middleware.js'
import { addNewAddress, updatePersonalInfo, uploadProfile } from '../controllers/profile.controller.js'

const ProfileRouter = express.Router()

ProfileRouter.post('/upload-image', upload.single("uploadImage"), uploadProfile)
ProfileRouter.post('/update-personal-info', updatePersonalInfo)
ProfileRouter.post('/add-new-address', addNewAddress)

export default ProfileRouter