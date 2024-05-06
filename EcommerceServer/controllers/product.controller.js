import { cache } from "../config/app.js"
import { CartModel } from "../models/cart.model.js"
import { ProductModel } from "../models/products.model.js"

export const getAllData = async (req, res) => {

    const allData = await ProductModel.find()

    res.status(200).json({
        success: true,
        msg: allData
    })
}

export const getCategory = async (req, res) =>{
    
    try {

        let allCategory

        if(cache.has('category')){
            allCategory = JSON.parse(cache.get('category'))
        }else{
            allCategory = await ProductModel.aggregate([
                {
                    $group: {
                        _id: '$category',
                        image_url: { $first: '$image_url' },
                        maxDiscount: { $max: '$discount' },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        image_url: 1,
                        maxDiscount: 2
                    }
                }
            ])
            cache.set('category', JSON.stringify(allCategory))
        }
        

        res.status(200).json({
            success: true,
            data: allCategory
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "There is some error in get category"
        })
    }
    
}

export const getLatestProduct = async (req, res) =>{
    try {
        let latestProduct

        if(cache.has('latestProduct')){
            latestProduct = JSON.parse(cache.get('latestProduct'))
        }else{
            latestProduct = await ProductModel.find({}).limit(8)
            cache.set('latestProduct', JSON.stringify(latestProduct))
        }
        
        res.status(200).json({
            success: true,
            data: latestProduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "There is some error in 'getLatestProduct'"
        })
    }
}

export const getProductDetail = async (req, res) => {
    const {productId} = req.body

    try {
        const productDetail = await ProductModel.findById(productId)

        res.status(200).json({
            success: true,
            data: productDetail
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "There is some error in 'getProductDetail'"
        })
    }
}

export const getFilteredProduct = async(req, res) => {

    const {price, category, ratting, dataOrder} = req.body

    const {limit, skip} = req.query

    if(!price || !dataOrder){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid information."
        })
    }

    try {

        const query = {
            price: { $gte: Number(price.low), $lte: Number(price.high) } ,
        }

        if(category !== "all"){
            query.category = category
        }

        if(ratting){
            query.ratting = {$gte: Number(ratting)}
        }

        const totalProduct = await ProductModel.countDocuments(query)

        let products = await ProductModel.find(query).limit(Number(limit)).skip(Number(skip)*12)

        if(dataOrder !== 'rec'){
            if (dataOrder === "lth") {
                products = products.sort((a, b) => a.price - b.price);
            } else if (dataOrder === "htl") {
                products = products.sort((a, b) => b.price - a.price);
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                products,
                total: totalProduct
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }


}

export const productAddToCart = async(req, res) => {
    const {userId, productId, quantity} = req.body

    if(!userId || !productId || !quantity){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    try {

        const existingCartItem = await CartModel.findOne({
            userId: userId,
            "items.productId": productId
        });

        if(existingCartItem){
            return res.status(400).json({
                success: false,
                msg: "Product is already added in your cart"
            })
        }
        
        const result = await CartModel.findOneAndUpdate({userId: userId}, {
            $push:{
                items:{
                    productId: productId,
                    quantity: Number(quantity)
                }
            }
        })

        if(!result){
            throw new Error("Product is not added to the cart")
        }


        return res.status(200).json({
            success: true,
            data: "Product is added in your cart"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const itemCountInCart = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID parameter is required'
        });
    }

    try {
        const cartData = await CartModel.find({userId})

        return res.status(200).json({
            success: true,
            data: cartData[0].items.length
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getCartProducts = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID parameter is required'
        });
    }
    try {
        const cartData = await CartModel.find({userId})

        if(!cartData) throw new Error('User ID not found')

        return res.status(200).json({
            success: true,
            data: cartData[0].items
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}