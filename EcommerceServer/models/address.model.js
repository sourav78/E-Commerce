import mongoose, { mongo } from 'mongoose'

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    address: [addressSchema]
},{
    timestamps: true
})

export const UserAddressModel = mongoose.model('addresses', userAddressSchema)