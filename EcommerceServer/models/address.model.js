import mongoose from 'mongoose'


const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    address: [{
        name: {
            type: String,
            require: true
        },
        mobile: {
            type: String,
            require: true
        },
        locality: {
            type: String,
            require: true
        },
        area: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        postalCode: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        }
    }]
},{
    timestamps: true
})

export const UserAddressModel = mongoose.model('address', userAddressSchema)