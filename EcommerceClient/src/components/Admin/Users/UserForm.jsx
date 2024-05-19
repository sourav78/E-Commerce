import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { notification } from 'antd';
import axios from 'axios';

const UserForm = ({user}) => {

    
    const [api, contextHolder] = notification.useNotification();

    
    const [fullname, setFullName] = useState(user?.fullname || '')
    const [email, setEmail] = useState(user?.email || '')
    const [mobile, setMobile] = useState(user?.mobile || '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin || 'USER')

    const [onPromiseState, setOnPromiseState] = useState(false)

    const openNotificationWithIcon = (type, msg) => {
        api[type]({
            description: msg,
            placement: 'bottomRight'
        });
    };

    const onClose = () => {
        setFullName('')
        setEmail('')
        setMobile('')
        setPassword('')
        setConfirmPassword('')
        setIsAdmin('')
    }

    const createUser = async () => {
        setOnPromiseState(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-user`, {
                fullname,
                email,
                mobile,
                password,
                confirmPassword,
                isAdmin
            })

            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && setOnPromiseState(false)
            data.success && onClose()
        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
            setOnPromiseState(false)
        }
    }

    const editUser = async () => {
        setOnPromiseState(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/edit-user`, {
                id: user._id,
                fullname,
                email,
                mobile,
                isAdmin
            })
    
            const {data} = response

            data.success && openNotificationWithIcon('success', data.data)
            data.success && setOnPromiseState(false)
        } catch (error) {
            openNotificationWithIcon('error', error.response.data.msg)
            setOnPromiseState(false)
        }
    }


    const handleSaveUser = () => {
        if(user){
            editUser()
        }else{
            createUser()
        }
    }

    return (
        <>
        {contextHolder}
            <div className=" mt-8 xl:w-[50%] lg:w-[70%] sm:w-[90%] w-full border-gray-500 rounded px-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className=" w-full">
                        <label className='font-semibold mb-2'>Full name:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <div className=" w-full">
                        <label className='font-semibold mb-2'>Email address:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <div className=" w-full">
                        <label className='font-semibold mb-2'>Mobile number:</label>
                        <TextField
                            className="w-full"
                            required
                            id="name"
                            size='small'
                            type='number'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                </div>
                {
                    !user && (
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                            <div className="sm:w-1/2 w-full">
                                <label className='font-semibold mb-2'>Password:</label>
                                <TextField
                                    className="w-full"
                                    required
                                    id="name"
                                    size='small'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="sm:w-1/2 w-full">
                                <label className='font-semibold mb-2'>Confirm Password:</label>
                                <TextField
                                    className="w-full"
                                    required
                                    id="name"
                                    size='small'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    )
                }
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <div className=" w-full flex gap-4">
                        <label className='font-semibold mb-2'>User Type:</label>
                        <div className=" flex gap-8 items-start">
                            <button
                                onClick={() => setIsAdmin('USER')}
                                className={`sm:px-6 px-2 sm:py-1 py-1 bg-blue-500 ${isAdmin === 'USER' ? ' outline-4 outline-red-500' : ' outline-2 outline-blue-500'}  rounded text-white outline  `}
                            >USER</button>
                            <button
                                onClick={() => setIsAdmin('ADMIN')}
                                className={`sm:px-6 px-2 sm:py-1 py-1 bg-blue-500 ${isAdmin === 'ADMIN' ? ' outline-4 outline-red-500' : ' outline-2 outline-blue-500'}  rounded text-white outline  `}
                            >ADMIN</button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={handleSaveUser}
                        disabled={onPromiseState}
                        className={`text-lg font-semibold px-12 py-2 rounded ${onPromiseState ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500'} text-white`}>SAVE</button>
                </div>
            </div>  
        </>
    )
}

export default UserForm