import { ProductModel } from "../models/products.model.js"
import { uploadOnCloudynary } from "../utils/uploadToCloudynary.js"
import { CouponModel } from "../models/coupons.model.js"
import { UserModel } from "../models/user.model.js"
import { WishlistModel } from "../models/wishlist.model.js"
import { CartModel } from "../models/cart.model.js"
import emailValidator from 'email-validator'
import { UserAddressModel } from "../models/address.model.js"
import { OrderModel } from "../models/orders.model.js"


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

export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find({})

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

export const createUser = async (req, res) => {
    const {fullname, mobile, email, password, confirmPassword, isAdmin} = req.body

    if(!fullname || !mobile || !email || !password || !confirmPassword || !isAdmin){
        return res.status(400).json({
            success: false,
            msg: "All fileds are required."
        })
    }

    const validatedEmail = emailValidator.validate(email)

    if(!validatedEmail){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid email."
        })
    }

    if(mobile.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid mobile number."
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            msg: "Password and confirm password not matched."
        })
    }

    try {
        const user = await UserModel.create({
            fullname,
            mobile,
            email,
            password,
            isAdmin
        })
        
        await WishlistModel.create({
            userId: user._id
        })
        
        await CartModel.create({
            userId: user._id
        })
        
        await UserAddressModel.create({
            userId: user._id
        })

        await OrderModel.create({
            userId: user._id
        })
    
        return res.status(200).json({
            success: true,
            data: "New user is created."
        })
    } catch (error) {

        //this response duplication
        if(error.code === 11000){
            let errorMsg = "";
            // Determine whether it's a duplicate username or email
            if (error.keyPattern.email) {
                errorMsg = "This email is already registered";
            }
            return res.status(400).json({
                success: false,
                msg: errorMsg
            });
        }
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const editUser = async (req, res) => {
    const {id, fullname, mobile, email, isAdmin} = req.body

    if(!id || !fullname || !mobile || !email || !isAdmin){
        return res.status(400).json({
            success: false,
            msg: "All fileds are required."
        })
    }

    const validatedEmail = emailValidator.validate(email)

    if(!validatedEmail){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid email."
        })
    }

    if(mobile.length !== 10){
        return res.status(400).json({
            success: false,
            msg: "Please provide a valid mobile number."
        })
    }

    try {
        const user = await UserModel.findById(id)

        if(!user){
            if(mobile.length !== 10){
                return res.status(400).json({
                    success: false,
                    msg: "User not found."
                })
            }
        }

        user.fullname = fullname
        user.mobile = mobile
        user.email = email
        user.isAdmin = isAdmin

        await user.save()

        return res.status(200).json({
            success: true,
            data: "Information updated successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            msg: "Internal server error."
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({})


        return res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

export const getSingleOrder = async (req, res) => {
    const {orderId} = req.query

    if(!orderId){
        return res.status(400).json({
            success: false,
            msg: 'Order ID is not Provided'
        })
    }

    try {
        const order = await OrderModel.findById(orderId)

        if(!order){
            return res.status(400).json({
                success: false,
                msg: 'Orders is not found.'
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    const {userId, orderId, productId, quantity, status} = req.body

    try {
        const orders = await OrderModel.findOne({ userId: userId });

        if (!orders) {
            return res.status(404).json({ 
                success: false, 
                msg: 'Order not found for the provided user ID' 
            });
        }

        // console.log(orders);

        orders.orders.map((order, index) => {
            order.products.map((product, ind) => {
                if(String(product._id) === orderId){
                    orders.orders[index].products[ind].status = status
                }
            })
        })

        if(status === 'canceled'){
            const product = await ProductModel.findById(productId);
            
            product.stock = product.stock + quantity;
            
            // Save the updated product
            await product.save();
        }

        await orders.save()
      
        return res.status(200).json({ 
            success: true, 
            data: 'Order Updated successfully' 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}

export const storeOverview = async (req, res) => {
    try {
        
        const totalProducts = await ProductModel.countDocuments({})
        const totalUsers = await UserModel.countDocuments({})

        const orders = await OrderModel.find({})

        let totalOrders = 0

        let totalAmount = 0
        
        orders.map(order => {
            order.orders.map(ord => {
                if(ord){
                    totalAmount += ord.totalAmount
                    totalOrders += 1
                }
            })
        })

        return res.status(200).json({ 
            success: true, 
            data: {
                totalProducts,
                totalUsers,
                totalOrders,
                totalAmount
            }
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}


export const totalTransactionAmount = async (req, res) => {
    try {
        const orders = await OrderModel.aggregate([
            { $unwind: "$orders" },
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$orders.orderDate" } },
                totalAmount: { $sum: "$orders.totalAmount" }
            }},
            { $sort: { _id: 1 } }, // Sort by date
            { $project: { _id: 0, date: "$_id", totalAmount: 1 } }
        ]);
    
        res.status(200).json({ 
            success: true,
            data: orders 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}


export const allOrderStatus = async (req, res) => {
    try {
        const statusCounts = await OrderModel.aggregate([
            { $unwind: "$orders" },
            { $unwind: "$orders.products" }, // Unwind products to access the status field
            { $group: {
                _id: "$orders.products.status",
                count: { $sum: 1 }
            }},
            { $project: { _id: 0, status: "$_id", count: 1 } } // Rename _id to status
        ]);
      
    
        res.status(200).json({ 
            success: true,
            data: statusCounts 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}


export const stockDetails = async (req, res) => {
    try {
        const availableStockCount = await ProductModel.countDocuments({ stock: { $gt: 0 } });
        const unavailableStockCount = await ProductModel.countDocuments({ stock: { $eq: 0 } });
      
    
        res.status(200).json({ 
            success: true,
            data: {
                availableStock: availableStockCount,
                unavailableStock: unavailableStockCount
            } 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}


export const getUnavailableProducts = async (req, res) => {
    try {
        const unavailableProducts = await ProductModel.find({ stock: { $eq: 0 } }).select('_id name category brand price stock image_url');
      
        res.status(200).json({ 
            success: true,
            data: unavailableProducts 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}