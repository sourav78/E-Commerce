import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { toggleCartTrigger } from '../../redux_slicer/ProductSlicer.js'
import { Link } from 'react-router-dom';

const CartProduct = ({product, setReloadTrigger, setReloadOnQuantityUpdate}) => {
    
    const dispatch = useDispatch()

    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.ecom.user)

    const [quantity, setQuantity] = useState(product.quantity)
    const [productData, setProductData] = useState({})

    const [counterDisabled, setCounterDisabled] = useState(false)

    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    useEffect(() => {
        async function getProduct(){

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-product-details`, {
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
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/update-product-quantity`, {
                    itemId: product._id,
                    userId: user._id,
                    quantity: quantity+1
                })
    
                const {data} = response

                data.success && setQuantity(prev => prev+1)
                data.success && setCounterDisabled(false)
                data.success && setReloadOnQuantityUpdate(prev => !prev)
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
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/update-product-quantity`, {
                    itemId: product._id,
                    userId: user._id,
                    quantity: quantity-1
                })
    
                const {data} = response

                data.success && setQuantity(prev => prev-1)
                data.success && setCounterDisabled(false)
                data.success && setReloadOnQuantityUpdate(prev => !prev)
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

    const handleProductRemove = async () => {
        // setReloadTrigger(prev => !prev)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/remove-product-cart`, {
                itemId: product._id,
                userId: user._id,
            })

            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && dispatch(toggleCartTrigger())
            data.success && setReloadTrigger(prev => !prev)
            data.success && setReloadOnQuantityUpdate(prev => !prev)
        } catch (error) {
            console.log(error.response.data.msg);
            openNotificationWithIcon('error', error.response.data.msg)
        }
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
                            <Link to={`../details/${product.productId}`} className='hover:text-blue-700'>{productData.name} {productData.description}</Link>
                            <p className='text-gray-500 mt-2 font-semibold'>{productData.brand}</p>
                            <div className="mt-2 flex gap-3 items-end">
                                <p className="text-2xl font-bold">₹{productData.price * quantity}</p>
                                <p className=" font-normal text-gray-700 line-through">₹{Math.round(Number(productData.price)/(1-(Number(productData.discount)/100))) * quantity}</p>
                                <p className=" text-green-600 font-semibold">{productData.discount}% off</p>
                            </div>
                            <div className="mt-2">
                                <button 
                                    onClick={() => setShowRemoveModal(true)}
                                className='font-semibold hover:text-red-500 transition-all'>REMOVE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={showRemoveModal}
                    onClose={() => setShowRemoveModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <div className="lg:w-[26%] sm:w-[50%] w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-6 rounded-md">
                            <p className='mt-1 text-lg font-semibold'>Remove Item</p>
                            <p className='my-8 text-gray-500'>Are you sure you want to remove this item?</p>
                            <div className=" flex justify-between">
                                <button 
                                    onClick={() => setShowRemoveModal(false)}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleProductRemove}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold bg-[#00ed64]'>REMOVE</button>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </>
    )
}

export default CartProduct