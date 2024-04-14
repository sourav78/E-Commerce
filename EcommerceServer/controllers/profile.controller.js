import { UserModel } from "../models/user.model.js"
import { WishlistModel } from "../models/wishlist.model.js"
import { CartModel } from "../models/cart.model.js"
import emailValidator from 'email-validator'
import { uploadOnCloudynary } from "../utils/uploadToCloudynary.js"

export const uploadProfile = async (req, res) => {
    const { id } = req.body

    const result = await uploadOnCloudynary(`./public/profiles/${req.file.filename}`, id)

    if (result === null) {
        return res.status(400).json({
            success: false,
            msg: "Image not uploaded"
        })
    } else {

        try {

            await UserModel.findByIdAndUpdate(id, {
                imageUrl: result.secure_url
            })

            return res.status(200).json({
                success: true,
                data: "Image updated succesfully"
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: "Image not updated"
            })
        }
    }
}

export const updatePersonalInfo = async (req, res) => {
    const {id, field, userdata} = req.body

    if(!id || !field || !userdata){
        return res.status(400).json({
            success: false,
            msg: "Field Should not be empty"
        })
    }

    if(field === 'email'){
        const validatedEmail = await emailValidator.validate(userdata)

        if(!validatedEmail){
            return res.status(400).json({
                success: false,
                msg: "Please provide a valid email."
            })
        }
    }

    if(field === 'mobile' && userdata.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid mobile number."
        })
    }

    try {

        let updateObject = {};
        updateObject[field] = userdata;
        
        await UserModel.findByIdAndUpdate(id, updateObject)

        return res.status(200).json({
            success: true,
            data: `${field} updated successfully.`
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

    
}