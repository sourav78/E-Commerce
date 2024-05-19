import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'
import { Link } from 'react-router-dom';

const SingleOrder = ({product, orderId, allOrderId}) => {

    const [showButtons, setShowButtons] = useState(false)

    const [productData, setProductData] = useState({})

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

    return (
        <>
            <div className="mt-1 border border-gray-300 bg-gray-50 rounded">
                <div className=" flex items-center">
                    <div className="p-2 border-gray-500 w-1/4">
                        <div className=" sm:mt-0 xl:w-[15%] object-contain h-12 lg:w-[20%] sm:w-[28%] w-[40%]">
                            <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={productData.image_url} alt="" />
                        </div>
                    </div>
                    <div className="p-1 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black'>₹{product.totalPrice}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black font-semibold'>{product.quantity}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4 relative mr-2 sm:mr-0">
                        <div className="flex justify-between items-center">
                            <p className={`sm:text-lg text-sm text-black ${product.status === "processing" && 'text-blue-500'} ${product.status === "shipped" && 'text-yellow-500'} ${product.status === "delivered" && 'text-green-500'} ${product.status === "canceled" && 'text-red-500'} capitalize`}>{product.status}</p>
                            <div className="sm:hidden">
                                <BsThreeDotsVertical 
                                    className="cursor-pointer"
                                    onClick={() => setShowButtons(!showButtons)}
                                />
                            </div>
                            <div className={`flex gap-2 mr-2 ${!showButtons && 'hidden sm:flex'} absolute sm:static right-1 -bottom-8 bg-white sm:bg-transparent border sm:border-none border-black p-2 sm:p-0 rounded`}>
                                <button
                                    
                                >
                                    <Link to={`../order-details/${allOrderId}?orderId=${orderId}&productId=${product.productId}`}>
                                        <FaEdit className='text-xl text-gray-600'/>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default SingleOrder