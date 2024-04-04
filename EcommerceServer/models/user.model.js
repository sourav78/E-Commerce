import { hash } from "bcrypt";
import mongoose from "mongoose";

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
        unique: true
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

export const UserModel = mongoose.model('users', userSchema)