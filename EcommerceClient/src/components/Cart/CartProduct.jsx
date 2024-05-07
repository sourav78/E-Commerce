import React, {useState, useEffect} from 'react'
import {BASE_URL} from '../../utils/constraints.js'
import axios from 'axios'
import { notification } from 'antd';
import { useSelector } from 'react-redux';

const CartProduct = ({product, setReloadTrigger}) => {

    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.ecom.user)

    const [quantity, setQuantity] = useState(product.quantity)
    const [productData, setProductData] = useState({})

    const [counterDisabled, setCounterDisabled] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

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

    const handleCounterIncrease = async () => {
        if(quantity < productData.stock){
            setCounterDisabled(true)
            try {
                const response = await axios.post(`${BASE_URL}/product/update-product-quantity`, {
                    itemId: product._id,
                    userId: user._id,
                    quantity: quantity+1
                })
    
                const {data} = response

                data.success && console.log(data.data);
                data.success && setQuantity(prev => prev+1)
                data.success && setCounterDisabled(false)
                data.success && openNotificationWithIcon('success', data.data)
            } catch (error) {
                console.log(error.response.data.msg);
                setCounterDisabled(false)
                openNotificationWithIcon('error', error.response.data.msg)
            }

            // setQuantity(prev => prev+1)
        }else{
            openNotificationWithIcon('error', 'Quantity has reached the maximum stock limit.')
        }
    }

    const handleCounterDecrease = async () => {
        if(quantity > 1){
            setCounterDisabled(true)
            try {
                const response = await axios.post(`${BASE_URL}/product/update-product-quantity`, {
                    itemId: product._id,
                    userId: user._id,
                    quantity: quantity-1
                })
    
                const {data} = response

                data.success && setQuantity(prev => prev-1)
                data.success && setCounterDisabled(false)
                data.success && openNotificationWithIcon('success', data.data)
            } catch (error) {
                console.log(error.response.data.msg);
                setCounterDisabled(false)
                openNotificationWithIcon('error', error.response.data.msg)
            }
        }else{
            openNotificationWithIcon('error', 'Quantity can not be 0')
        }
    }

    const handleProductRemove = () => {
        setReloadTrigger(prev => !prev)
    }

    return (
        <>
            {contextHolder}
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
                                    disabled={counterDisabled}
                                    className={`border border-gray-400 ${counterDisabled ? 'bg-gray-100 opacity-55' : ''} w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all`}>-</button>
                                <p className={`text-lg ${counterDisabled ? 'bg-gray-100 opacity-55' : ''} w-10 h-6 border border-gray-400 grid place-content-center`}>{quantity}</p>
                                <button 
                                    onClick={handleCounterIncrease}
                                    disabled={counterDisabled}
                                    className={`border border-gray-400 ${counterDisabled ? 'bg-gray-100 opacity-55' : ''} w-6 h-6 rounded grid place-content-center font-semibold hover:bg-gray-200 transition-all`}>+</button>
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