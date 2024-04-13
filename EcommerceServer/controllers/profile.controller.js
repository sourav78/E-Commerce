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