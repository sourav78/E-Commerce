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
                    image_url: { $first: '$image_url' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    image_url: 1
                }
            }
        ])

        res.status(200).json({
            success: true,
            msg: allCategory
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            msg: "There is some error in get category"
        })
    }
    
}