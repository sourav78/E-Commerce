import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleTrigger } from "../../../redux_slicer/EcomSlicer";
import { notification } from 'antd';

import {BASE_URL} from '../../../utils/constraints'

const ProfileImage = () => {

    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const [selectedImage, setSelectedImage] = useState(null);

    const [imageFile, setImageFile] = useState(null)

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };
    

    const onHandleChange = (event) => {
        setShowModal(true)
        const file = event.target.files[0];
        setImageFile(event.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setShowModal(true);
            };
            reader.readAsDataURL(file);
        }
    }

    const onCancel = () => {
        setSelectedImage(null);
        setShowModal(false)
    }

    const onUpdate = async () => {

        setLoading(true)

        const formData = new FormData()
        formData.append('uploadImage', imageFile)
        formData.append('id', user._id)

        try {
            const response = await axios.post(`${BASE_URL}/profile/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response);

            const {data} = response

            data.success && setShowModal(false)
            data.success && setImageFile(null)
            data.success && dispatch(toggleTrigger())
            data.success && setLoading(false)
            data.success && openNotificationWithIcon('success', data.data)

        } catch (error) {
            console.error("Error is", error);
            setShowModal(false)
            setImageFile(null)
            setLoading(false)
            openNotificationWithIcon('error', error.response.data.msg)
        }

        
    }

    return (
        <>
            
            {contextHolder}
            <div className="flex sm:flex-row w-full flex-col gap-4 sm:items-end items-center relative">
                <div className="w-44 h-44 overflow-hidden border rounded-full">
                    <img className="w-full h-full object-cover" src={user.imageUrl} alt="" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="profileImage" className="font-semibold text-[#00ce56] cursor-pointer">Change Profile</label>
                    <input 
                        className="hidden" 
                        type="file" 
                        name="profileImage" 
                        id="profileImage" 
                        onChange={onHandleChange}
                    />
                    <button className="px-3 py-2 border border-black bg-[#00ed64] font-semibold hover:rounded-md">View Profile</button>
                </div>
                
                <div className={` ${showModal ? 'block' : 'hidden'} p-7 shadow-md sm:w-3/4 w-full bg-gray-200 rounded absolute top-4 left-1/2 -translate-x-1/2`}>
                    {
                        loading ? (
                            <div className="flex justify-center">
                                <div className='m-auto' role="status">
                                    <svg aria-hidden="true" className="inline w-32 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-1/2 m-auto overflow-hidden border-2 border-black">
                                    <img className="w-full h-full object-contain" src={selectedImage} alt="" />
                                </div>
                                <div className="flex gap-4 justify-end mt-4">
                                    <button 
                                        onClick={onCancel}
                                        className="font-semibold bg-red-600 px-3 py-1 border-2 border-black">Cancel</button>
                                    <button 
                                        onClick={onUpdate}
                                        className="font-semibold bg-[#00ed64] px-3 py-1 border-2 border-black">Update</button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ProfileImage;
