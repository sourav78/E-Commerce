import { hash } from "bcrypt";
import mongoose from "mongoose";
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
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
    isAdmin: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    
    if(this.isModified("password")){
        const hashedPassword = await hash(this.password, 10)
        this.password = hashedPassword
    }

    next()
})

userSchema.pre('findOneAndUpdate', async function(next) {
    if (this._update.password) {
        const hashedPassword = await hash(this._update.password, 10);
        this._update.password = hashedPassword;
    }
    next();
});


userSchema.methods.JWTSign = function(){
    const payload = {
        id: this._id,
        email: this.email,
    }

    const token = JWT.sign(payload, process.env.JWT_SECRET)

    return token
}

export const UserModel = mongoose.model('users', userSchema)