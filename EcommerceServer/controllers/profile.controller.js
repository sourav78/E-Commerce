import { UserModel } from "../models/user.model.js"
import { WishlistModel } from "../models/wishlist.model.js"
import { CartModel } from "../models/cart.model.js"
import emailValidator from 'email-validator'
import { uploadOnCloudynary } from "../utils/uploadToCloudynary.js"
import { UserAddressModel } from "../models/address.model.js"

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

export const addNewAddress = async (req, res) => {
    const { id, name, mobile, locality, area, city, state, postalCode, type} = req.body

    if(!id || !name || !mobile || !locality || !area || !city || !state || !postalCode || !type ){
        return res.status(400).json({
            success: false,
            msg: "All fields are required."
        })
    }

    if(mobile.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid phone number."
        })
    }

    if(postalCode.length !== 6){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid postal code."
        })
    }

    try {

        const newAddress = {
            name, mobile, locality, area, city, state, postalCode, type
        }
        
        const updatedAddress = await UserAddressModel.findOneAndUpdate({userId: id}, {$push: {address: newAddress}})

        if(!updatedAddress){
            throw new Error('Address is not added!!.');
        }

        return res.status(200).json({
            success: true,
            data: "New address is added successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
    
}

export const updateAddress = async (req, res) => {
    const { addressId, name, mobile, locality, area, city, state, postalCode, type} = req.body

    if(!addressId || !name || !mobile || !locality || !area || !city || !state || !postalCode || !type ){
        return res.status(400).json({
            success: false,
            msg: "All fields are required."
        })
    }

    if(mobile.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid phone number."
        })
    }

    if(postalCode.length !== 6){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid postal code."
        })
    }

    try {

        const newAddress = {
            name, mobile, locality, area, city, state, postalCode, type
        }
        
        const updatedAddress = await UserAddressModel.findOneAndUpdate({"address._id": addressId},{
            $set: {
                "address.$" : newAddress
            }
        })

        if(!updatedAddress){
            throw new Error('Address is not update!!.');
        }

        return res.status(200).json({
            success: true,
            data: "Aaddress is updated successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}