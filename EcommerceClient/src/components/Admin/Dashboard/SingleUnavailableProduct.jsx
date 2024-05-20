import React from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";

const SingleUnavailableProduct = ({product}) => {
    return (
        <>
            <div className="mt-1 border border-gray-300 bg-gray-50 rounded">
                <div className=" flex items-center">
                    <div className="p-2 border-gray-500 w-1/3">
                        <div className=" sm:mt-0 xl:w-[15%] object-contain h-10 lg:w-[20%] sm:w-[28%] w-[40%]">
                            <img className='w-full h-full max-h-24 sm:min-h-4 object-contain' src={product.image_url} alt="" />
                        </div>
                    </div>
                    <div className="p-1 border-gray-500 w-1/3">
                        <p className='text-sm text-black font-semibold'>{product.name}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/3 flex justify-between items-center">
                        <p className='text-sm text-black font-semibold capitalize'>{product.category}</p>
                        <Link to={`./edit-products/${product._id}`}>
                            <FaEdit className='text-xl text-gray-600'/>
                        </Link>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default SingleUnavailableProduct