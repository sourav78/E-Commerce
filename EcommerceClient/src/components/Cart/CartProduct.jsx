import React, {useState, useEffect} from 'react'
import {BASE_URL} from '../../utils/constraints.js'
import axios from 'axios'

const CartProduct = ({product, setReloadTrigger}) => {

    const [quantity, setQuantity] = useState(product.quantity)
    const [productData, setProductData] = useState({})

    useEffect(() => {
        async function getProduct(){

            try {
                const response = await axios.post(`${BASE_URL}/product/get-product-details`, {
                    productId : product.productId
                })
    
                const {data} = response
                data.success && setProductData(data.data)
            } catch (error) {
                console.log(error.response.data.msg);
            }
            
        }

        getProduct()
    }, [])

    const handleCounterIncrease = () => {
        if(quantity < productData.stock){
            setQuantity(prev => prev+1)
        }
    }

    const handleCounterDecrease = () => {
        if(quantity > 1){
            setQuantity(prev => prev-1)
        }
    }

    const handleProductRemove = () => {
        setReloadTrigger(prev => !prev)
    }

    return (
        <>
            <div className="w-full border-b pb-4 mt-4">
                <div className="flex gap-2 sm:flex-row flex-col items-center">
                    <div className="sm:w-1/4 w-full flex flex-col items-center">
                        <div className="sm:w-[90%] w-2/4">
                            <img className='m-auto h-full max-h-40 sm:min-h-4max-h-40 object-contain' src={productData.image_url} alt="" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleCounterDecrease}
                                    className='border border-gray-400 w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all'>-</button>
                                <p className='text-lg w-10 h-6 border border-gray-400 grid place-content-center'>{quantity}</p>
                                <button 
                                    onClick={handleCounterIncrease}
                                    className='border border-gray-400 w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 sm:mt-0 mt-4">
                        <div className="w-full flex flex-col justify-between">
                            <p className=''>{productData.name} {productData.description}</p>
                            <p className='text-gray-500 mt-2 font-semibold'>{productData.brand}</p>
                            <div className="mt-2 flex gap-3 items-end">
                                <p className="text-2xl font-bold">₹{productData.price}</p>
                                <p className=" font-normal text-gray-700 line-through">₹{Math.round(Number(productData.price)/(1-(Number(productData.discount)/100)))}</p>
                                <p className=" text-green-600 font-semibold">{productData.discount}% off</p>
                            </div>
                            <div className="mt-2">
                                <button 
                                    onClick={handleProductRemove}
                                className='font-semibold hover:text-red-500 transition-all'>REMOVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct