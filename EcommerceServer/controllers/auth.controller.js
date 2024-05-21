import { UserModel } from "../models/user.model.js"
import { WishlistModel } from "../models/wishlist.model.js"
import { CartModel } from "../models/cart.model.js"
import emailValidator from 'email-validator'
import bcrypt from 'bcrypt'
import nodeMailer from 'nodemailer'
import otpGenerator from 'otp-generator'
import { UserAddressModel } from "../models/address.model.js"
import { OrderModel } from "../models/orders.model.js"

export const register = async (req, res) => {
    const {fullname, mobile, email, password, confirmPassword} = req.body

    if(!fullname || !mobile || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "All fileds are required."
        })
    }

    const validatedEmail = emailValidator.validate(email)

    if(!validatedEmail){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid email."
        })
    }

    if(mobile.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid mobile number."
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "Password and confirm password not matched."
        })
    }

    try {
        const user = await UserModel.create({
            fullname,
            mobile,
            email,
            password
        })
        
        await WishlistModel.create({
            userId: user._id
        })
        
        await CartModel.create({
            userId: user._id
        })
        
        await UserAddressModel.create({
            userId: user._id
        })

        await OrderModel.create({
            userId: user._id
        })
    
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {

        //this response duplication
        if(error.code === 11000){
            let errorMsg = "";
            // Determine whether it's a duplicate username or email
            if (error.keyPattern.email) {
                errorMsg = "This email is already registered";
            }
            return res.status(400).json({
                success: false,
                msg: errorMsg
            });
        }
        return res.status(400).json({
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

        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true, // Set to true in production
            sameSite: 'Strict'
        };

        res.cookie('jwttoken', token, cookieOptions)

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

export const sendOtp = async (req, res) => {

    const {email} = req.body

    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    const mailOptions = {
        from: '"Sourav" <no-reply@example.com>',
        to: email,
        subject: "OTP Verification",
        text: `your OTP: ${otp}`,
        replyTo: 'no-reply@example.com',
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        if(!info){
            new Error('OTP not sent')
        }

        return res.status(200).json({
            success: true,
            data: otp
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: 'OTP not sent'
        });
    }
}

export const changePassword = async (req, res) => {
    const {id, password} = req.body

    if(!id || !password){
        return res.status(400).json({
            success: false,
            data: 'Password must not be empty'
        })
    }

    try {
        await UserModel.findByIdAndUpdate({_id: id}, {
            password
        })
    
        return res.status(200).json({
            success: true,
            data: 'Password updated successfully'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: 'Password not updated.'
        })
    }
}

export const deleteAccount = async (req, res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({
            success: false,
            msg: 'User id not found'
        })
    }

    try {
        
        await UserModel.findByIdAndDelete(id)

        await WishlistModel.findOneAndDelete({userId: id})
        await CartModel.findOneAndDelete({userId: id})
        await UserAddressModel.findOneAndDelete({userId: id})

        return res.status(200).json({
            success: true,
            data: 'Account Deleted successfully'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Account not deleted'
        })
    }
}