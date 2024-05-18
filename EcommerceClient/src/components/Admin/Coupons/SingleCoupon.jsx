import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import CouponForm from './CouponForm';
import { TbEditOff } from "react-icons/tb";

const SingleCoupon = ({coupon}) => {

    const [showButtons, setShowButtons] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [showEdit, setShowEdit] = useState(false)


    const handleDeleteCoupon = () => {
        
    }

    return (
        <>
            <div className="mt-1 border border-gray-300 bg-gray-50 rounded">
                <div className=" flex items-center">
                    <div className="p-2 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black'>{coupon.code}</p>
                    </div>
                    <div className="p-1 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black'>{coupon.discountType}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black font-semibold'>{coupon.maxUses} - ({coupon.uses} )</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4 relative mr-2 sm:mr-0">
                        <div className="flex justify-between items-center">
                            <p className={`sm:text-lg text-sm text-black ${coupon.isActive ? 'text-blue-500' : 'text-red-500'} capitalize`}>{coupon.isActive ? 'Active' : 'Not Active'}</p>
                            <div className="sm:hidden">
                                <BsThreeDotsVertical 
                                    className="cursor-pointer"
                                    onClick={() => setShowButtons(!showButtons)}
                                />
                            </div>
                            <div className={`flex gap-2 mr-2 ${!showButtons && 'hidden sm:flex'} absolute sm:static right-1 -bottom-8 bg-white sm:bg-transparent border sm:border-none border-black p-2 sm:p-0 rounded`}>
                                <button
                                    onClick={() => setShowEdit(!showEdit)}
                                >
                                    {showEdit ? (<TbEditOff className='text-xl text-gray-600'/>) : (<FaEdit className='text-xl text-gray-600'/>)}
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    <MdDelete className='text-xl text-gray-600'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showEdit && (
                        <div className="flex flex-col items-center p-2">
                            <h2 className='text-2xl font-bold text-center'>Edit Coupon</h2>
                            <CouponForm coupon={coupon}/>
                        </div>
                    )
                }
                <Modal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <div className="lg:w-[26%] sm:w-[50%] w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white p-6 rounded-md">
                            <p className='mt-1 text-lg font-semibold'>Delete Coupon</p>
                            <p className='my-8 text-gray-500'>Are you sure you want to delete this coupon?</p>
                            <div className=" flex justify-between">
                                <button 
                                    onClick={() => setShowDeleteModal(false)}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleDeleteCoupon}
                                    className='w-[42%] py-3 rounded-sm border-black text-lg font-semibold bg-blue-500 text-white'>DELETE</button>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </>
    )
}

export default SingleCoupon