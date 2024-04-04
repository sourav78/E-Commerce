import { hash } from "bcrypt";
import mongoose from "mongoose";
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: [true, 'Username must be unique'],
    },
    imageUrl: {
        type: String,
        default: 'https://images.pexels.com/photos/14807470/pexels-photo-14807470.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    password: {
        type: String,
        require: true
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword

    next()
})


userSchema.methods.JWTSign = function(){
    const payload = {
        id: this._id,
        email: this.email,
    }

    const token = JWT.sign(payload, process.env.JWT_SECRET)

    return token
}

export const UserModel = mongoose.model('users', userSchema)