import { UserModel } from "../models/user.model.js"
import { WishlistModel } from "../models/wishlist.model.js"
import { CartModel } from "../models/cart.model.js"
import emailValidator from 'email-validator'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const {fullname, mobile, email, password, confirmPassword} = req.body

    if(!fullname || !mobile || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "All fileds are required"
        })
    }

    const validatedEmail = emailValidator.validate(email)

    if(!validatedEmail){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid email"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "Confirm password not matched"
        })
    }

    try {
        const user = await UserModel.create({
            fullname,
            mobile,
            email,
            password
        })

        const wishlist = await WishlistModel.create({
            userId: user._id
        })

        const cart = await CartModel.create({
            userId: user._id
        })
    
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {

        //this response duplication
        if(error.code === 11000){
            let errorMsg = "";
            // Determine whether it's a duplicate username or email
            if (error.keyPattern.username) {
                errorMsg = "This username is already taken";
            } else if (error.keyPattern.email) {
                errorMsg = "This email is already registered";
            }
            return res.status(400).json({
                success: false,
                msg: errorMsg
            });
        }
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            msg: "All fileds are required"
        })
    }

    try {
        
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                msg: "Invalid username/email"
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                msg: "Wrong password! try again"
            })
        }

        user.password = undefined

        const token = user.JWTSign()

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie('jwttoken', token, cookieOption)

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const profile = async (req, res) => {
    const {id} = req.user

    if(!id){
        return res.status(400).json({
            success: false,
            msg: "Not authorize"
        })
    }

    try {
        const user = await UserModel.findById(id)

        user.password = undefined

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('jwttoken')

        res.status(200).json({
            success: true,
            data: 'Loged out successfully'
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            data: error.massage
        })
    }
}