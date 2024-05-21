import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';

const AdminSingleProduct = ({productId, setReloadProducts}) => {

    const [showButtons, setShowButtons] = useState(false)

    const [product, setProduct] = useState({})

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        async function getProduct(){

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/product/get-product-details`, {
                productId
            })

            const {data} = response
            data.success && setProduct(data.data)
        }

        getProduct()
    }, [])

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete-product`, {
                data: {
                    productId
                }
            })
    
            const {data} = response

            data.success && setReloadProducts(prev => !prev)
        } catch (error) {
            console.log(error);
        }
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
                        <p className='text-lg text-black capitalize'>{product.category } - {product.stock}</p>
                        <div className="sm:hidden">
                            <BsThreeDotsVertical 
                                className="cursor-pointer"
                                onClick={() => setShowButtons(!showButtons)}
                            />
                        </div>
                        <div className={`flex gap-2 mr-2 ${!showButtons && 'hidden sm:flex'} absolute sm:static right-1 -bottom-8 bg-white sm:bg-transparent border sm:border-none border-black p-2 sm:p-0 rounded`}>
                            <button
                                
                            >
                                <Link to={`../edit-products/${productId}`}>
                                    <FaEdit className='text-xl text-gray-600'/>
                                </Link>
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <MdDelete className='text-xl text-gray-600'/>
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <div className="lg:w-[26%] sm:w-[50%] w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-6 rounded-md">
                            <p className='mt-1 text-lg font-semibold'>Delete Product</p>
                            <p className='my-8 text-gray-500'>Are you sure you want to delete this product?</p>
                            <div className=" flex justify-between">
                                <button 
                                    onClick={() => setShowDeleteModal(false)}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleDeleteProduct}
                                    className='w-[42%] py-3 rounded-sm border-black text-lg font-semibold bg-blue-500 text-white'>DELETE</button>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </>
    )
}

export default AdminSingleProduct