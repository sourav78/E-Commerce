import { UserModel } from "../models/user.model.js"
import emailValidator from 'email-validator'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const {fullname, username, email, password, confirmPassword} = req.body

    if(!fullname || !username || !email || !password || !confirmPassword){
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
            username,
            email,
            password
        })
    
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {

        if(error.code == 11000){
            return res.status(400).json({
                success: false,
                msg: "Please provide a valid username/email"
            })
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

export const profile = (req, res) => {

}