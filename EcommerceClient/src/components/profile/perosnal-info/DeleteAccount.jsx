import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { notification } from 'antd';
import axios from "axios";
import { toggleTrigger } from "../../../redux_slicer/EcomSlicer";

const DeleteAccount = () => {
    
    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.ecom.user)
    const dispatch = useDispatch()
    
    const [showModal, setShowModal] = useState(false)
    
    
    const [userEmail, setUserEmail] = useState('')
    const [incorrectOtp, setIncorrectOtp] = useState(false)

    const [userOtp, setUserOtp] = useState('')
    const [verifyOtp, setVerifyOtp] = useState('')
    const [userOtpMsg, setUserOtpMsg] = useState('')
    const [isOtpMatch, setIsOtpMatch] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight',
        });
    };

    useEffect(() => {
        setUserEmail(user.email || "")
    }, [user])

    const handleSendOtp = async () => {
        setShowModal(true)

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {email: userEmail}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response

            data.success && setVerifyOtp(data.data)
            data.success && openNotificationWithIcon('success', 'OTP is send to your email.')
        } catch (error) {
            openNotificationWithIcon('error', 'OTP not sent')
        }
    }
    
    const onVerify = () => {

        if(userOtp.length !== 6){
            setIncorrectOtp(true)
            setUserOtpMsg('OTP must be a character long')
            return
        }
        
        if(userOtp === verifyOtp) {
            setIsOtpMatch(true)
            setIncorrectOtp(false)
        }else{
            setIncorrectOtp(true)
            setUserOtpMsg('OTP is not matched')
        }

    }

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/delete-account`, {id: user._id}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && handleClose()
            data.success && dispatch(toggleTrigger())
        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
        }
    }

    const handleClose = () => {
        setShowModal(false)
        setIsOtpMatch(false)
        setVerifyOtp('')
        setUserOtp('')
        setIncorrectOtp(false)
        setUserOtpMsg('')
    }

    return (
        <>
        {contextHolder}
            <div className="">
                <button 
                    onClick={handleSendOtp}
                    className="font-semibold text-red-600"
                >Delete Account</button>
                <div className="">
                    <Modal
                        open={showModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        
                        <div className="p-10 lg:w-[30%] sm:w-[50%] w-[95%] rounded-md bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {
                                !isOtpMatch && (
                                    <div className="">
                                        <p className="font-semibold mb-4">Verify OTP: </p>
                                        <TextField
                                            error = {incorrectOtp}
                                            className="w-full"
                                            required
                                            id="outlined-required"
                                            label="OTP"
                                            value={userOtp}
                                            onChange={(e) => setUserOtp(e.target.value)}
                                            helperText={incorrectOtp ? userOtpMsg : ""}  
                                        />
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={onVerify}
                                                className="mt-2 px-6 py-2 border border-black bg-[#00ed64] font-semibold">Verify</button>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                isOtpMatch && (
                                    <div className="">
                                        <p className="text-sm ">When you delete your account your account is permannetly delete from the S78store server</p>
                                        <p className="text-lg font-semibold">Are you sure want to delete:</p>
                                        <div className="flex gap-4 justify-end mt-4">
                                                <button 
                                            onClick={handleClose}
                                            className="rounded mt-2 px-6 py-2 border border-black bg-[#00ed64]  font-semibold">Cancel</button>
                                                <button 
                                            onClick={handleDeleteAccount}
                                            className="rounded mt-2 px-6 py-2 border border-black bg-red-500 font-semibold">Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default DeleteAccount;
