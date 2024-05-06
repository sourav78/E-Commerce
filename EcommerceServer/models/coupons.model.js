import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'], // You can customize these options based on your requirements
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    minOrderAmount: {
        type: Number,
        required: true
    },
    maxUses: {
        type: Number,
        default: null // If null, there's no limit on the number of times the coupon can be used
    },
    uses: {
        type: Number,
        default: 0 // Number of times the coupon has been used
    },
    isActive: {
        type: Boolean,
        default: true // Whether the coupon is currently active or not
    },
    claimedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

export const CouponModel = mongoose.model('coupons', couponSchema)