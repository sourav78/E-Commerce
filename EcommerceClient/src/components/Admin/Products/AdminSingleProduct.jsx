import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'
import { BASE_URL } from '../../../utils/constraints'

const AdminSingleProduct = ({productId}) => {

    const [showButtons, setShowButtons] = useState(false)

    const [product, setProduct] = useState({})

    useEffect(() => {
        async function getProduct(){

            const response = await axios.post(`${BASE_URL}/product/get-product-details`, {
                productId
            })

            const {data} = response
            data.success && setProduct(data.data)
        }

        getProduct()
    }, [])

    const handleEditProduct = () => {
        
    }

    const handleDeleteProduct = () => {

    }

    return (
        <>
            <div className="mt-1 border border-gray-300 bg-gray-50 rounded flex items-center">
                <div className="p-2 border-gray-500 w-1/4">
                    <p className='text-lg text-black'>{product.name}</p>
                </div>
                <div className="p-1 border-gray-500 w-1/4">
                    <div className=" sm:mt-0 xl:w-[15%] object-contain h-12 lg:w-[20%] sm:w-[28%] w-[40%]">
                        <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={product.image_url} alt="" />
                    </div>
                </div>
                <div className="p-2 border-gray-500 w-1/4">
                    <p className='text-lg text-black font-semibold'>₹{product.price}</p>
                </div>
                <div className="p-2 border-gray-500 w-1/4 relative mr-2 sm:mr-0">
                    <div className="flex justify-between items-center">
                        <p className='text-lg text-black'>{product.category}</p>
                        <div className="sm:hidden">
                            <BsThreeDotsVertical 
                                className="cursor-pointer"
                                onClick={() => setShowButtons(!showButtons)}
                            />
                        </div>
                        <div className={`flex gap-2 mr-2 ${!showButtons && 'hidden sm:flex'} absolute sm:static right-1 -bottom-8 bg-white sm:bg-transparent border sm:border-none border-black p-2 sm:p-0 rounded`}>
                            <button
                                onClick={handleEditProduct}
                            >
                                <FaEdit className='text-xl text-gray-600'/>
                            </button>
                            <button
                                onClick={handleDeleteProduct}
                            >
                                <MdDelete className='text-xl text-gray-600'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSingleProduct