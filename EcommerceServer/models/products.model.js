import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image_url: {
        type: String,
        require: true,
        default: 'https://voicebot.ai/wp-content/uploads/2019/09/amazon-alexa-event-sept-2019.jpg'
    },
    price: {
        type: Number,
        require: true
    },
    ratting: {
        type: Number
    },
    stock: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },

})

export const ProductModel = mongoose.model('products', productSchema)