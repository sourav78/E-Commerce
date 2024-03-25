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
        const allCategory = await ProductModel.aggregate([
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

        res.status(200).json({
            success: true,
            msg: allCategory
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "There is some error in get category"
        })
    }
    
}

export const getLatestProduct = async (req, res) =>{
    try {
        const latestProduct = await ProductModel.find({}).limit(10)

        res.status(200).json({
            success: true,
            msg: latestProduct
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "There is some error in 'getLatestProduct'"
        })
    }
}