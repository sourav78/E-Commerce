import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";
import axios from "axios";
import {BASE_URL} from '../../../utils/constraints'
import { notification } from 'antd';

const UpdatePassword = () => {

    const [api, contextHolder] = notification.useNotification();

    const user = useSelector(state => state.ecom.user)

    const [showModal, setShowModal] = useState(false)

    const [isOtpMatch, setIsOtpMatch] = useState(false)

    const [userEmail, setUserEmail] = useState('')

    const [verifyOtp, setVerifyOtp] = useState('')
    const [userOtp, setUserOtp] = useState('')
    const [userOtpMsg, setUserOtpMsg] = useState('')

    const [incorrectOtp, setIncorrectOtp] = useState(false)

    const [newPassword, setNewPassword] = useState('')

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
            const response = await axios.post(`${BASE_URL}/auth/send-otp`, {email: userEmail}, {
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

    const onPasswordChange = async () => {
        
        try {
            const response = await axios.post(`${BASE_URL}/auth/change-password`, {
                id: user._id,
                password: newPassword
            },{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
    
            const {data} = response

            if(data.success){
                openNotificationWithIcon('success', data.data)
                onModalClose()
            }

        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
            onModalClose()
        }
    }

    const onModalClose = () => {
        setShowModal(false)
        setIsOtpMatch(false)
        setVerifyOtp('')
        setUserOtp('')
        setIncorrectOtp(false)
        setUserOtpMsg('')
        setNewPassword('')
    }

    return (
        <>
            {contextHolder}
            <div className="">
                <button 
                    onClick={handleSendOtp}
                    className="border-2 border-black px-10 py-3 font-semibold bg-[#00ed64]">Update Password</button>
                
                <Modal
                    open={showModal}
                    onClose={onModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="w-[95%] flex items-start justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-4 bg-white rounded-md lg:w-[30%] sm:w-1/2 w-11/12">
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
                                    <div className="mt-4">
                                        <p className="font-semibold mb-4">New Password: </p>
                                        <TextField
                                            className="w-full"
                                            required
                                            id="outlined-required"
                                            label="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={onPasswordChange}
                                                className="mt-2 px-6 py-2 border border-black bg-[#00ed64] font-semibold">Change Password</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>           
                        <RxCross2 
                            onClick={onModalClose}
                            className="text-4xl text-[#00ed64] cursor-pointer" />
                    </div>

                </Modal>
            </div>
        </>
    );
};

export default UpdatePassword;
