import React, { useState } from 'react'
import { TbEditOff } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserForm from './UserForm';
import axios from 'axios'
import Modal from '@mui/material/Modal';

const SingleUser = ({user, setReloadUser}) => {

    const [showButtons, setShowButtons] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [showEdit, setShowEdit] = useState(false)

    const handleDeleteUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/delete-account`, {
                id: user._id
            })
    
            const {data} = response

            data.success && console.log(data.data);
            data.success && setReloadUser(prev => !prev)
            data.success && setShowDeleteModal(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mt-1 border border-gray-300 bg-gray-50 rounded">
                <div className=" flex items-center">
                    <div className="p-2 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black'>{user.fullname}</p>
                    </div>
                    <div className="p-1 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black'>{user.email}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4">
                        <p className='sm:text-lg text-sm text-black font-semibold'>{user.mobile}</p>
                    </div>
                    <div className="p-2 border-gray-500 w-1/4 relative mr-2 sm:mr-0">
                        <div className="flex justify-between items-center">
                            <p className={`sm:text-lg text-sm text-black ${user.isAdmin === 'ADMIN' ? 'text-green-500' : 'text-black'} capitalize`}>{user.isAdmin}</p>
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
                            <UserForm user={user}/>
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
                            <p className='mt-1 text-lg font-semibold'>Delete User</p>
                            <p className='my-8 text-gray-500'>Are you sure you want to delete this user?</p>
                            <div className=" flex justify-between">
                                <button 
                                    onClick={() => setShowDeleteModal(false)}
                                    className='w-[42%] py-3 border rounded-sm border-black text-lg font-semibold'>CANCEL</button>
                                <button 
                                    onClick={handleDeleteUser}
                                    className='w-[42%] py-3 rounded-sm border-black text-lg font-semibold bg-blue-500 text-white'>DELETE</button>
                            </div>
                        </div>
                    </div>
                    
                </Modal>
            </div>
        </>
    )
}

export default SingleUser