import { cache } from "../config/app.js"
import { CartModel } from "../models/cart.model.js"
import { CouponModel } from "../models/coupons.model.js"
import { OrderModel } from "../models/orders.model.js"
import { ProductModel } from "../models/products.model.js"
import { WishlistModel } from "../models/wishlist.model.js"

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

    if (quantity > 10) {
        return res.status(400).json({
            success: false,
            msg: 'Maximum order limit is 10'
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
            msg: 'User ID parameter is required'
        });
    }
    try {
        const cartData = await CartModel.findOne({userId})

        if(!cartData) throw new Error('User ID not found')

        return res.status(200).json({
            success: true,
            data: cartData.items
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

export const updateCartProductQantity = async (req, res) => {
    const {itemId, userId, quantity} = req.body

    if(!itemId || !userId || !quantity){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required'
        })
    }

    if (quantity > 10) {
        return res.status(400).json({
            success: false,
            msg: 'Maximum order limit is 10'
        })
    }

    try {
        const userCart = await CartModel.findOne({ userId });
        if (!userCart) {
            throw new Error('User cart not found');
        }

        const item = userCart.items.find(item => item._id.toString() === itemId);

        if (!item) {
            throw new Error('Item not found in the user cart');
        }

        item.quantity = quantity;

        await userCart.save();

        return res.status(200).json({
            success: true,
            data: `Changed product quantity to ${quantity}`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
    
}

export const removeProductFromCart = async (req, res) => {
    const {itemId, userId} = req.body

    if(!itemId || !userId){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required'
        })
    }

    try {
        await CartModel.updateOne(
            { userId },
            { $pull: { items: { _id: itemId } } }
        );

        return res.status(200).json({
            success: true,
            data: `Product is removed from cart.`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Product not removed from cart'
        })
    }
}

export const getCartPriceDetails = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, msg: 'Cart not found' });
        }

        const productIds = cart.items.map(item => item.productId);

        const products = await ProductModel.find({ _id: { $in: productIds } });

        const cartProducts = cart.items.map(item => {
            const product = products.find(prod => prod._id.toString() === item.productId.toString());
            const totalPrice = product ? (product.price * item.quantity) : 0; 
            const totalAcutualPrice = product ? (Math.round(Number(product.price)/(1-(Number(product.discount)/100))) * item.quantity) : 0;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product ? product.price : 0,
                totalPrice: totalPrice,
                actualPrice: product ? Math.round(Number(product.price)/(1-(Number(product.discount)/100))) : 0,
                totalAcutualPrice: totalAcutualPrice
            };
        });

        return res.status(200).json({ success: true, data: cartProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }

}

export const applyCoupon = async (req, res) => {
    const { couponCode, userId, totalAmount } = req.body;

    if(!couponCode || !userId || !totalAmount){
        return res.status(400).json({
            success: false,
            msg: 'All fields are required'
        }) 
    }

    try {
        const coupon = await CouponModel.findOne({code: couponCode})

        if(!coupon){
            return res.status(400).json({
                success: false,
                msg: 'Coupon not found.'
            }) 
        }
        
        const isClaimed = coupon.claimedBy.includes(userId);
        
        if(isClaimed){
            return res.status(400).json({
                success: false,
                msg: 'This coupon is already claimed by you.'
            }) 
        }
        
        if(!coupon.isActive){
            return res.status(400).json({
                success: false,
                msg: 'The coupon is not currently active.'
            }) 
        }
        
        if(coupon.uses >= coupon.maxUses){
            return res.status(400).json({
                success: false,
                msg: 'The maximum number of uses for this coupon has been reached.'
            }) 
        }

        let discountedAmount
        if(totalAmount > coupon.minOrderAmount){
            
            if(coupon.discountType === "percentage"){
                const discountPercentage = coupon.discountAmount / 100;
                discountedAmount = totalAmount * discountPercentage;
            }else if(coupon.discountType === "fixed"){
                discountedAmount = coupon.discountAmount;
            }else{
                return res.status(400).json({
                    success: false,
                    msg: 'Unsupported discount type'
                })
            }

            
            
        }else{
            return res.status(400).json({
                success: false,
                msg: `Minimum order amount should be ${coupon.minOrderAmount} in this coupon.`
            })
        }
        
        
        const finalAmount = totalAmount - discountedAmount;
            
        return res.status(200).json({
            success: true,
            data: finalAmount
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error
        })
    }
}

export const createOrder = async (req, res) => {
    const {userId, products, totalAmount, address} = req.body

    if(!userId || !products || !totalAmount || !address){
        return res.status(400).json({
            success: false,
            msg: "All fields are required"
        })
    }

    try {
        const order = await OrderModel.findOneAndUpdate({userId: userId}, {
            $push:{
                orders:{
                    products,
                    totalAmount,
                    address
                }
            }
        })

        if(!order){
            throw new Error("Order is not created.")
        }

        return res.status(200).json({
            success: true,
            data: "Order has been created successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

export const claimCoupons = async (req, res) => {
    const { couponCodes, userId } = req.body;

    try {
        const coupons = await CouponModel.find({ code: { $in: couponCodes } });
        // console.log(coupons);
        if (!coupons || coupons.length === 0) {
            return res.status(404).json({ 
                success: false,
                msg: 'Coupons not found' 
            });
        }

        
        for (const coupon of coupons) {
            
            coupon.uses++;

            coupon.claimedBy.push(userId);
            
            await coupon.save();
        }

        return res.status(200).json({ 
            success: true,
            msg: 'Coupons claimed successfully' 
        });
    } catch (error) {
        return res.status(404).json({ 
            success: false,
            msg: 'Internal server Error' 
        });
    }
}

export const updateProductStock = async (req, res) => {
    const {productsToUpdate} = req.body

    try {
        for (const productData of productsToUpdate) {
            const { productId, quantity } = productData;
            
            // Find the product by its ID
            const product = await ProductModel.findById(productId);
            
            product.stock = product.stock - quantity;
            
            // Save the updated product
            await product.save();
        }

        return res.status(200).json({ 
            success: true,
            msg: 'Product Updated successfully' 
        });
    } catch (error) {
        return res.status(404).json({ 
            success: false,
            msg: 'Internal server Error' 
        });
    }
}

export const wishlistAProduct = async (req, res) => {
    const {productId, userId} = req.body

    if(!productId || !userId){
        return res.status(400).json({
            success: false,
            msg: "All fields are required."
        })
    }

    try {
        const wishlist = await WishlistModel.findOne({userId})

        const isAlreadyWishlisted = wishlist.items.includes(productId)

        if(isAlreadyWishlisted){
            const newWishlist = wishlist.items.filter(item => item !== productId)
            wishlist.items = newWishlist
        }else{
            wishlist.items.push(productId)
        }

        await wishlist.save()

        return res.status(200).json({
            success: true,
            data: `${isAlreadyWishlisted ? "Product is removed from wishlist." : "Product is add to wishlist"}`
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Internal server error."
        })
    }
}

export const checkWishlistProduct = async (req, res) => {
    const {productId, userId} = req.body

    if(!productId || !userId){
        return res.status(400).json({
            success: false,
            msg: "All fields are required."
        })
    }

    try {
        const wishlist = await WishlistModel.findOne({userId})

        const isAlreadyWishlisted = wishlist.items.includes(productId)

        return res.status(200).json({
            success: true,
            data: isAlreadyWishlisted
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Internal server error."
        })
    }
}

export const getWishlistProduct = async (req, res) => {
    const { userId } = req.query;
    
    if(!userId){
        return res.status(400).json({
            success: false,
            msg: "All fields are required."
        })
    }

    try {
        const wishlist = await WishlistModel.findOne({userId})

        return res.status(200).json({
            success: true,
            data: wishlist.items
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Internal server error."
        })
    }
}

export const getOrders = async (req, res) => {
    const {userId} = req.query

    try {
        const order = await OrderModel.findOne({userId})

        if(!order){
            return res.status(404).json({ 
                success: false, 
                msg: 'Order not found' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: order 
        });
    } catch (error) {
        return res.status(404).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}

export const cancelOrder = async (req, res) => {
    const {userId, orderId, productId, quantity} = req.body

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
                    orders.orders[index].products[ind].status = 'canceled'
                }
            })
        })

        const product = await ProductModel.findById(productId);
            
        product.stock = product.stock + quantity;
        
        // Save the updated product
        await product.save();

        await orders.save()
      
        return res.status(200).json({ 
            success: true, 
            data: 'Order canceled successfully' 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
}