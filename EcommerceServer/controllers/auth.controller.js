import { UserModel } from "../models/user.model.js"
import emailValidator from 'email-validator'

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
        res.status(400).json({
            success: false,
            msg: "error"
        })
    }
}

export const login = (req, res) => {

}

export const profile = (req, res) => {

}