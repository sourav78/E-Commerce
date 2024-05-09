import mongoose from 'mongoose'

const orderAddressSchema = new mongoose.Schema({
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
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    orders:[
        {
            products: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    }
                }
            ],
            totalAmount: {
                type: Number,
                required: true
            },
            address: orderAddressSchema,
            status: {
                type: String,
                enum: ['processing', 'shipped', 'delivered', 'canceled'],
                default: 'processing'
            },
            orderData: {
                type: Date,
                default: Date.now()
            }
        }
    ]
}, {timestamps: true})

export const OrderModel = mongoose.model('orders', orderSchema)