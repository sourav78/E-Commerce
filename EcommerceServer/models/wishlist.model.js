import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    items: []
},{
    timestamps: true
}
)

export const WishlistModel = mongoose.model('wishlists', wishlistSchema)