import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/constraints'
import { Link } from 'react-router-dom'
import { Modal } from '@mui/material'
import { notification } from 'antd';

const SingleOrders = ({product, userId, setReloadOrder}) => {

    const [api, contextHolder] = notification.useNotification();

    const [productData, setProductData] = useState({})

    const [showCancelModal, setShowCancelModal] = useState(false)

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
                    productId: product.productId
                })
                const {data} = response
    
                data.success && console.log(data.data)
                data.success && setProductData(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getProduct()
    }, [])

    const handleCancelOrder = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/cancel-order-product`, {
                orderId: product._id,
                userId,
                productId: product.productId,
                quantity: product.quantity
            })

            const {data} = response
            data.success && setReloadOrder(prev => !prev)
            data.success && setShowCancelModal(false)
            data.success && openNotificationWithIcon('success', data.data)

        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', error.response.data.msg)
        }
    }

    return (
        <>
        {contextHolder}
            <div className="w-full border-b border-gray-300 sm:p-6 p-2">
                <div className="">
                    <div className="flex sm:flex-row flex-col gap-8">
                        <div className="m-auto mt-4 sm:mt-0 xl:w-[12%] lg:w-[18%] sm:w-[25%] w-[30%]">
                            <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={productData.image_url} alt="" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <Link to={`../../details/${productData._id}`} className='text-lg font-semibold'>{productData.name}</Link>
                                {
                                    product.status !== 'canceled' && product.status !== 'delivered' && (
                                        <button
                                            onClick={() => setShowCancelModal(true)}
                                            className='px-2 py-1 border border-gray-400 rounded-md hover:border-red-500 hover:bg-red-500 hover:text-white transition-all'>Cancel Order</button>
                                )}
                            </div>
                            <p className=' text-gray-500 font-semibold'>{productData.brand}</p>
                            <p className="text-sm font-normal text-gray-700">Quantity - {product.quantity}</p>
                            <div className="flex gap-3 items-end justify-between">
                                <p className="text-xl font-bold">₹{product.totalPrice}</p>
                                <p className="font-semibold">Status - <span className={`${product.status === 'processing' && 'text-blue-700'} ${product.status === 'canceled' && 'text-red-500'} ${product.status === 'shipped' && 'text-yellow-500'} ${product.status === 'delivered' && 'text-[#00ce56]'} capitalize`}>{product.status}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <div className="lg:w-[26%] sm:w-[50%] w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-6 rounded-md">
                            <p className='mt-1 text-lg font-semibold'>Cancel Order</p>
                            <p className='my-8 text-gray-500'>Are you sure you want to cancel this order?</p>
                            <div className=" flex justify-between">
                                <button 
                                    onClick={() => setShowCancelModal(false)}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleCancelOrder}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold bg-[#00ed64]'>REMOVE</button>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </>
    )
}

export default SingleOrders