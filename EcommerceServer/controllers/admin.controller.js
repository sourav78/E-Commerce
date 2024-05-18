import { ProductModel } from "../models/products.model.js"
import { uploadOnCloudynary } from "../utils/uploadToCloudynary.js"
import { CouponModel } from "../models/coupons.model.js"


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

export const createCoupon = async (req, res) => {
    const {code, discountType, discountAmount, minOrderAmount, maxUses, isActive} = req.body

    if(!code || !discountType || !discountAmount || !minOrderAmount || !maxUses){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required'
        }) 
    }

    if (code.includes(" ")) {
        return res.status(400).json({
            success: false,
            msg: 'Coupon code must not contain any spaces.'
        });
    }
    
    if (code.length < 6) {
        return res.status(400).json({
            success: false,
            msg: 'Coupon code at least 6 characters long.'
        });
    }

    if(discountType === 'percentage' && discountAmount > 100){
        return res.status(400).json({
            success: false,
            msg: 'Invalid discount amount for percentage discount. Please enter a value between 0 and 100.'
        })
    }

    if(discountAmount > minOrderAmount){
        return res.status(400).json({
            success: false,
            msg: 'The discount amount exceeds the minimum order amount.'
        })
    }

    try {
        const coupon = await CouponModel.create({
            code, discountType, discountAmount, minOrderAmount, maxUses, isActive
        })

        return res.status(200).json({
            success: true,
            data: 'Coupon is created.'
        })
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                msg: 'Coupon with the same name already exists.'
            });
        }
        return res.status(400).json({
            success: false,
            msg: 'Coupon not created'
        })
    }
}

export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await CouponModel.find({})

        return res.status(200).json({
            success: true,
            data: coupons
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

export const editCoupon = async (req, res) => {
    const {id, code, discountType, discountAmount, minOrderAmount, maxUses, isActive} = req.body

    if(!id || !code || !discountType || !discountAmount || !minOrderAmount || !maxUses){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required'
        }) 
    }

    if (code.includes(" ")) {
        return res.status(400).json({
            success: false,
            msg: 'Coupon code must not contain any spaces.'
        });
    }
    
    if (code.length < 6) {
        return res.status(400).json({
            success: false,
            msg: 'Coupon code at least 6 characters long.'
        });
    }

    if(discountType === 'percentage' && discountAmount > 100){
        return res.status(400).json({
            success: false,
            msg: 'Invalid discount amount for percentage discount. Please enter a value between 0 and 100.'
        })
    }

    if(discountAmount > minOrderAmount){
        return res.status(400).json({
            success: false,
            msg: 'The discount amount exceeds the minimum order amount.'
        })
    }

    try {
        const coupon = await CouponModel.findById(id)

        coupon.code = code
        coupon.discountType = discountType
        coupon.discountAmount = discountAmount
        coupon.minOrderAmount = minOrderAmount
        coupon.maxUses = maxUses
        coupon.isActive = isActive

        await coupon.save()

        return res.status(200).json({
            success: true,
            data: 'Coupon is Edited successfully.'
        })
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                msg: 'Coupon with the same name already exists.'
            });
        }
        return res.status(400).json({
            success: false,
            msg: 'Coupon not edited.'
        })
    }
}

export const deleteCoupon = async (req, res) => {
    const {couponId} = req.body

    if(!couponId){
        return res.status(400).json({
            success: false,
            msg: 'Coupon ID must be provided'
        }) 
    }

    try {
        const coupon = await CouponModel.findByIdAndDelete(couponId)

        if(!coupon){
            return res.status(400).json({
                success: false,
                msg: "Coupon is not available in database."
            })
        }

        return res.status(200).json({
            success: true,
            data: "Coupon is deleted successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}