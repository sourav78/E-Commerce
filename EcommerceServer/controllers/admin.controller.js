import { ProductModel } from "../models/products.model.js"


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
            data: 'Product is not added.'
        })
    }
}

