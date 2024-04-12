import React, { useState } from "react";
import logo from '../../assets/S78_b.png'
import {Link, useNavigate} from 'react-router-dom'
import { Alert} from 'antd';
import axios from "axios";

import {BASE_URL} from '../../utils/constraints.js'

const Register = () => {

    const navigate = useNavigate()

    const [fullname, setFullname] = useState('')
    const [ mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showErrors, setShowErrors] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const registerData = {fullname, mobile: mobile.toString(), email, password, confirmPassword}

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, registerData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            )

            const data = response.data
            data.success && navigate('/login')
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
            setShowErrors(error.response.data.msg)
        }
    }

    const handleAlertClose = () => {
        setShowErrors('')
    }


    return (
        <>
            <div className="w-full p-2 border-black bg-gray-200 flex justify-center items-start " style={{ minHeight: 'calc(100vh - 85px)' }}>
                <div className=" border-black lg:w-1/3 sm:w-1/2 w-full py-4 px-1 bg-white mt-5">
                    <div className="flex items-end justify-center">
                        <div className="w-1/3 ">
                            <img src={logo} alt="" />
                        </div>
                        <p className="text-4xl font-bold mb-1">Store</p>
                    </div>
                    <div className="">
                        <p className="text-3xl font-semibold text-center mt-4">Register</p>
                    </div>
                    {
                        showErrors && (
                            <div className=" mt-2 px-4">
                                <Alert
                                    message={showErrors}
                                    type="error"
                                    closable
                                    onClose={handleAlertClose}
                                />
                            </div>
                        )
                    }
                    <form className="mt-4" onSubmit={handleFormSubmit}>
                        <div className=" px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Full Name:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="text" 
                                required 
                                placeholder="John Doe" 
                                onChange={(e)=> setFullname(e.target.value)}
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Mobile No. :</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                type="number"
                                required
                                placeholder="7848823478" 
                                onChange={(e)=> setMobile(e.target.value)}
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Email:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="email" 
                                required 
                                placeholder="john@example.com" 
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Password:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="password" 
                                required 
                                placeholder="[):sjs&8" 
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-1 px-6">
                            <label className="w-full text-xl text-gray-800" htmlFor="">Confirm Password:</label>
                            <input 
                                className="mt-1 w-full border-2 border-gray-600 outline-none px-2 py-1 text-xl" 
                                type="password" 
                                required 
                                placeholder="[):sjs&8" 
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 px-6">
                            <button 
                                className="bg-[#00ed64] border-2 border-black w-full text-black text-xl py-1 hover:bg-[#69f287] transition-all"
                            >Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-[#00ed64]" >login</Link></p>
                    
                </div>  
            </div>
        </>
    );
};

export default Register;
