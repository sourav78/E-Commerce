import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            require: true
        },
        quantity: {
            type: Number,
            require: true
        }
    }]
},{
    timestamps: true
}
)

export const CartModel = mongoose.model('carts', cartSchema)