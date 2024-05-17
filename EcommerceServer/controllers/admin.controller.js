import { ProductModel } from "../models/products.model.js"
import { uploadOnCloudynary } from "../utils/uploadToCloudynary.js"


export const addProductWithUrl = async (req, res) => {

    const {name, category, brand, description, discount, price, stock, imageUrl} = req.body

    if(!name || !category || !brand || !description || !discount || !price || !stock || !imageUrl){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required.'
        })
    }

    if(discount > 100){
        return res.status(400).json({
            success: false,
            msg: 'Discount can not be more then 100 percentage.' 
        })
    }

    try {
        await ProductModel.create({
            name: name,
            category: category,
            brand: brand,
            description: description,
            discount: Number(discount),
            price: Number(price),
            ratting: Number((Math.random()*4+1).toFixed(1)),
            stock: Number(stock),
            image_url: imageUrl
        })

        return res.status(200).json({
            success: true,
            data: 'Product is added to the store.'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Product is not added.'
        })
    }
}

export const addProductWithImage = async (req, res) => {
    const {name, category, brand, description, discount, price, stock} = req.body

    if(!name || !category || !brand || !description || !discount || !price || !stock){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required.'
        })
    }

    if(discount > 100){
        return res.status(400).json({
            success: false,
            msg: 'Discount can not be more then 100 percentage.' 
        })
    }

    if(discount < 0 || price < 0 || stock < 0){
        return res.status(400).json({
            success: false,
            msg: 'Please enter valid value in Price/Discount/Stock.' 
        })
    }

    const result = await uploadOnCloudynary(`./public/profiles/${req.file.filename}`, name, "Ecom-products")

    if (result === null) {
        return res.status(400).json({
            success: false,
            msg: "Image not uploaded"
        })
    }else{
        try {
            await ProductModel.create({
                name: name,
                category: category,
                brand: brand,
                description: description,
                discount: Number(discount),
                price: Number(price),
                ratting: Number((Math.random()*4+1).toFixed(1)),
                stock: Number(stock),
                image_url: result.secure_url
            })
    
            return res.status(200).json({
                success: true,
                data: 'Product is added to the store.'
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Product is not added.'
            })
        }
    }

}

export const getAllProduct = async (req, res) => {
    const {category, limit, skip} = req.query

    try {
        const query = {}
        if(category !== "all"){
            query.category = category
        }

        const totalProduct = await ProductModel.countDocuments(query)
        const products = await ProductModel.find(query).limit(Number(limit)).skip(Number(skip)*20)

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
            msg: 'Internal Server Error'
        })
    }
}

export const deleteProduct = async (req, res) => {
    const {productId} = req.body

    if(!productId){
        return res.status(400).json({
            success: false,
            msg: "Product ID is missing"
        })
    }

    try {
        const result = await ProductModel.findByIdAndDelete(productId)

        if(!result){
            return res.status(400).json({
                success: false,
                msg: "Product is not available in database."
            })
        }

        return res.status(200).json({
            success: true,
            data: "Product is deleted successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Internal Server Error"
        })
    }

    
}

export const editProduct = async (req, res) => {
    const {id, name, category, brand, description, discount, price, stock} = req.body

    if(!id || !name || !category || !brand || !description || !discount || !price || !stock){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required.'
        })
    }

    if(discount > 100){
        return res.status(400).json({
            success: false,
            msg: 'Discount can not be more then 100 percentage.' 
        })
    }

    if(discount < 0 || price < 0 || stock < 0){
        return res.status(400).json({
            success: false,
            msg: 'Please enter valid value in Price/Discount/Stock.' 
        })
    }

    try {
        const product = await ProductModel.findById(id)

        if(!product){
            throw new Error("Product is not found")
        }

        product.name = name
        product.brand = brand
        product.category = category
        product.description = description
        product.price = price
        product.discount = discount
        product.stock = stock

        await product.save()

        return res.status(200).json({
            success: true,
            data: "Product is edited successfully."
        })
    } catch (error) {
        if(error){
            return res.status(400).json({
                success: false,
                msg: error.message
            })
        }else{
            return res.status(400).json({
                success: false,
                msg: "Internal Server Error"
            })
        }
    }
}